
from django.db import models

class student(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    department = models.CharField(max_length=100)
    status = models.CharField(
        max_length=20,
        default="active"
    )

    def __str__(self):
        return self.email
