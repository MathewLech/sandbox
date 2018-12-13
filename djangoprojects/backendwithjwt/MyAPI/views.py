from django.shortcuts import render
import datetime
import os
import sys
from django.views import generic
import json
from django.core import serializers
from django.shortcuts import HttpResponse
from rest_framework import views, serializers, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from django.http import JsonResponse
from django.forms.models import model_to_dict
from django.utils import timezone
from .models import StreamChannel
import random
def index(request):
    # Render that in the index template
    return render(request, "index.html")

class MessageSerializer(serializers.Serializer):
    AllData = serializers.CharField()

#this is auth by JWT
class TestData(views.APIView):    
    def post(self, request, *args, **kwargs):
        d = {'Message': 'This is a protected post'}
        serializer = MessageSerializer(data=d)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def get(self, request, *args, **kwargs):        
        d = {'Message': 'This is a protected get' + str(random.randint(0,100))}
        return JsonResponse(d, status=status.HTTP_201_CREATED, safe=False)