from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from django.core.files.base import ContentFile
from django.core.files.temp import NamedTemporaryFile
from django.db import transaction
from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
import io
import qrcode

from .models import CustomUser

@csrf_exempt
def register(request):
    if request.method == 'POST':
        data = request.POST.copy()
        if data['password'] != data['password_confirmation']:
            return HttpResponseBadRequest('Passwords do not match')
        user = CustomUser.objects.create_user(
            username=data['username'],
            email=data['email'],
            password=data['password'],
        )
        user.phone_number = data['phone_number']
        user.save()

        qr_code = user.generate_qr_code()
        output = io.BytesIO()
        qr_code.save(output, format="JPEG")
        output.seek(0)

        user.qr_code.save('qr_code.jpg', ContentFile(output.read()), save=False)
        return HttpResponse(output.read(), content_type="image/jpeg")
    return render(request, 'registration/register.html')


@csrf_exempt
def login(request):
    if request.method == 'POST':
        data = request.POST.copy()
        user = authenticate(
            username=data['username'],
            password=data['password'],
        )
        if user is not None:
            login(request, user)
            return HttpResponse('OK')
        return HttpResponseBadRequest('Invalid credentials')
    return render(request, 'registration/login.html')


def balance(request, userID):
    if request.method == 'GET':
        user = CustomUser.objects.get(id=userID)
        return HttpResponse(str(user.balance))


def profile(request, userID):
    if request.method == 'GET':
        user = CustomUser.objects.get(id=userID)
        qr_code = user.generate_qr_code()
        output = io.BytesIO()
        qr_code.save(output, format="JPEG")
        output.seek(0)
        return HttpResponse(output.read(), content_type="image/jpeg")


@csrf_exempt
def add_balance(request, userID):
    if request.method == 'POST':
        data = request.POST.copy()
        try:
            with transaction.atomic():
                user = CustomUser.objects.get(id=userID)
                user.balance += int(data['points'])
                user.save()
                return HttpResponse('OK')
        except Exception as e:
            return HttpResponseBadRequest(str(e))
    return HttpResponseBadRequest('Invalid data')
