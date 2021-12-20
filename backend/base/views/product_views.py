from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.permissions import IsAuthenticated, IsAdminUser


from base.models import Product
from base.products import products
from base.serializers import ProductSerializer
# Create your views here.

from rest_framework import status

@api_view(['GET'])
def getProducts(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)
 
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