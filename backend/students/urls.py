
from atexit import register

from django.urls import path

from .views import (
    logout_view,
    student_list,
    student_delete,
    student_update,register_view,
    student_partial_update,student_detail,login_view,logout_view
)

urlpatterns = [
    path('students/', student_list, name='student-list'),

    path(
        'students/<int:student_id>/delete/',
        student_delete,
        name='student-delete'
    ),

    path(
        'students/<int:student_id>/update/',
        student_update,
        name='student-update'
    ),

    path(
        'students/<int:student_id>/partial-update/',
        student_partial_update,
        name='student-partial-update'
    ),
    path('students/<int:pk>/',student_detail,name='student_detail'),
    path("login/",login_view,name="login"),
    path('logout/', logout_view, name='logout'),
    path("register/",register_view,name="register")
]
