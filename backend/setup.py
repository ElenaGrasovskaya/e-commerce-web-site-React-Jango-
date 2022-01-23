from setuptools import setup, find_packages

setup(
    name='ProShop',
    version='0.1.0',
    packages=find_packages(include=['exampleproject', 'exampleproject.*']),
     install_requires=[
        'asgiref==3.4.1',
        'boto3==1.20.38',
        'botocore==1.23.38',
        'Django==3.2.9',
        'django-cors-headers==3.10.0',
        'django-storages==1.12.3',
        'djangorestframework==3.12.4',
        'djangorestframework-simplejwt==5.0.0',
        'gunicorn==20.1.0',
        'jmespath==0.10.0',
        'Pillow==8.4.0',
        'psycopg2==2.9.3',
        'PyJWT==2.3.0',
        'python-dateutil==2.8.2',
        'pytz==2021.3',
        's3transfer==0.5.0',
        'six==1.16.0',
        'sqlparse==0.4.2',
        'urllib3==1.26.8',
        'whitenoise==5.3.0'
        ]
    )
