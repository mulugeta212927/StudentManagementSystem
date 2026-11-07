
from django.middleware import http
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, login, logout
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from .models import student
from django.contrib.auth.models import User
from .serializers import studentserializer
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout_view(request):
    request.user.auth.delete()
    return Response({"message": "Logout successful"}, status=status.HTTP_200_OK)
@api_view(["POST"])
def login_view(request):
    username=request.data.get("username")
    password=request.data.get("password")
    user=authenticate(request,username=username,password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({"message": "Login successful", "token": token.key},
                        status=status.HTTP_200_OK )
    return Response({"message":"invalid password or username"},status=status.HTTP_401_UNAUTHORIZED)

# GET: Get all students
# POST: Add a new student
@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def student_list(request):

    if request.method == "GET":
        students = student.objects.all()
        serializer = studentserializer(students, many=True)
        return Response(serializer.data)

    elif request.method == "POST":
        serializer = studentserializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


# DELETE: Delete one student
@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def student_delete(request, student_id):

    try:
        student_obj = student.objects.get(id=student_id)

    except student.DoesNotExist:
        return Response(
            {"error": "Student not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    student_obj.delete()

    return Response(
        {"message": "Student deleted successfully"},
        status=status.HTTP_200_OK
    )


# PUT: Update all student fields
@api_view(["PUT"])
@permission_classes([IsAuthenticated])                                          
def student_update(request, student_id):

    try:
        student_obj = student.objects.get(id=student_id)

    except student.DoesNotExist:
        return Response(
            {"error": "Student not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = studentserializer(
        student_obj,
        data=request.data  
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# PATCH: Update selected student fields
@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def student_partial_update(request, student_id):

    try:
        student_obj = student.objects.get(id=student_id)

    except student.DoesNotExist:
        return Response(
            {"error": "Student not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = studentserializer(
        student_obj,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


# PATCH: Edit a student
# DELETE: Delete a student
@api_view(["PATCH", "DELETE"])
@permission_classes([IsAuthenticated])      
def student_detail(request, pk):

    try:
        student_obj = student.objects.get(pk=pk)

    except student.DoesNotExist:
        return Response(
            {"error": "Student not found"},
            status=status.HTTP_404_NOT_FOUND
        )

    if request.method == "PATCH":

        serializer = studentserializer(
            student_obj,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    elif request.method == "DELETE":

        student_obj.delete()

        return Response(
            status=status.HTTP_204_NO_CONTENT
        )
@api_view(["POST"])
def register_view(request):
    username=request.data.get("username")
    password=request.data.get("password")

    if not username or not password:
        return Response({"message":"username and password are required"},status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({"message":"Invalid password"},status=status.HTTP_400_BAD_REQUEST)
        return Response({"message":"username already exists"},status=status.HTTP_400_BAD_REQUEST)
    user=User.objects.create_user(username=username,password=password)
    return Response({"message":"account created succefully"},status=status.HTTP_201_CREATED)
