from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger


from base.models import Product, Review
from base.products import products
from base.serializers import ProductSerializer
# Create your views here.
 
from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    query = request.query_params.get("keyword")
    print("query:", query)
    if query == None:
        query = ""
    products = Product.objects.filter(name__icontains=query)
    page = request.query_params.get('page')
    paginator = Paginator(products, 2)

    try: 
        products = paginator.page(page)
    except PageNotAnInteger:
        product = paginator.page(1)
    except EmptyPage:
        product = paginator.page(paginator.num_pages)

    if page == None:
        page = 1

    page = int(page)

    serializer = ProductSerializer(products, many=True)
    return Response({'products': serializer.data, 'page':page, 'pages':paginator.num_pages})
 
@api_view(['GET'])
def getProduct(request, pk):

    product = Product.objects.get(_id=pk)
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAdminUser])
def createProduct(request):
    user = request.user
    product = Product.objects.create(
        user=user,
        name= 'Sample Name',
        price = 0,
        brand = 'Sample Brand',
        countInStock = 0,
        category = "Sample Category",
        description = " "

    )
    serializer = ProductSerializer(product, many=False)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAdminUser])
def updateProduct(request, pk):
    data = request.data
    product = Product.objects.get(_id=pk)

    product.name=data["product"]["name"]
    product.price=data["product"]["price"]
    product.brand=data["product"]["brand"]
    product.countInStock=data["product"]["countInStock"]
    product.category=data["product"]["name"]
    product.category=data["product"]["category"]
    product.description=data["product"]["description"]

    product.save()

    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAdminUser])
def deleteProduct(request, pk):
    product = Product.objects.get(_id=pk)
    product.delete()
    return Response('Product deleted')

@api_view(['POST'])
def uploadImage(request):
    data = request.data

    product_id = data["product_id"]
    product = Product.objects.get(_id=product_id)

    product.image = request.FILES.get("image")
    product.save()
    return Response("Image was uploaded")


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def createProductReview(request, pk):
    user = request.user
    product = Product.objects.get(_id=pk)
    data = request.data

    #1 - Review already exists
    alreadyExists = product.review_set.filter(user=user).exists()

    if alreadyExists:
        content = {"detail":"Product already reviewed"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)

    #2 - No rating or 0
    elif data["review"]["rating"] == 0:
        content = {"detail":"Please select a rating"}
        return Response(content, status=status.HTTP_400_BAD_REQUEST)


    #3 - Create review
    else: 
        review = Review.objects.create(
            user=user,
            product = product,
            name=user.first_name,
            rating=data["review"]["rating"],
            comment=data["review"]["comment"],

        )
        reviews = product.review_set.all()
        product.numReviews = len(reviews)

        total = 0
        for i in reviews:
            total+= i.rating 
        product.rating=total/len(reviews)

        product.save()

        return Response({"Review Added"})