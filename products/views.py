from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Product
from .serializers import ProductSerializer
import boto3


class ProductViewSet(viewsets.ViewSet):

    def list(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data, status.HTTP_202_ACCEPTED)

    def create(self, request):
        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, pk=None):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(product)
        return Response(serializer.data)

    def update(self, request, pk=None):
        product = Product.objects.get(id=pk)
        serializer = ProductSerializer(instance=product, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

    def destroy(self, request, pk=None):
        product = Product.objects.get(id=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class DownloadViewSet(viewsets.ViewSet):

    def get_secret_key_local(self):
        secret_key = open('rootkey.csv').read().splitlines()[-1].split('=')[-1]
        return secret_key

    # TODO:
    # Download both LH/RH data from FS requests
    # Implement multiple file downloads from single request
    #   - single url download?
    #   - individual data download page will have some # of PKs selected
    #       -- iterate PKs to gather list of 'subject' IDs -> maybe just handle this on the frontend
    #       -- zip the folders and download? otherwise simultaneous downloading of hundreds of files...
    #   - requests spm AND fs data

    def download_individual(self, request, category=None, subject=None, subcategory=None, contrast=None):
        if not all([category, subject, subcategory, contrast]):
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

        key_pattern = '/'.join(
            [category, subject, subcategory, 'lh', contrast + '.nii.gz']
            if category == 'LanA_FS'
            else [category, subject, subcategory, contrast + '.nii.gz']
        )

        s3 = boto3.resource(
            service_name='s3', aws_access_key_id='AKIAI6WJRFWPGVKQLTBQ',
            aws_secret_access_key=self.get_secret_key_local(),
        )
        url = s3.meta.client.generate_presigned_url(
            ClientMethod="get_object", ExpiresIn=3600,
            Params={
                "Bucket": 'langatlas',
                "Key": key_pattern
            },
        )
        return Response(url, status=status.HTTP_202_ACCEPTED)

    # TODO:
    # Download SPM/FS in single request
    # Simultaneous downloading
    def download_category(self, request, category=None):
        if category is None:
            return Response(None, status=status.HTTP_400_BAD_REQUEST)

        key_pattern = category + '.zip'

        s3 = boto3.resource(
            service_name='s3', aws_access_key_id='AKIAI6WJRFWPGVKQLTBQ',
            aws_secret_access_key=self.get_secret_key_local(),
        )

        url = s3.meta.client.generate_presigned_url(
            ClientMethod="get_object", ExpiresIn=3600,
            Params={
                "Bucket": 'langatlas',
                "Key": key_pattern
            },
        )
        return Response(url, status=status.HTTP_202_ACCEPTED)
