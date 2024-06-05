from django.contrib.auth.models import AbstractUser
from django.db import models
import qrcode

class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=15, unique=True)
    balance = models.IntegerField(default=0)

    groups = models.ManyToManyField(
        "auth.Group",
        related_name="custom_users",
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        "auth.Permission",
        related_name="custom_users",
        blank=True,
    )

    def generate_qr_code(self):
        qr = qrcode.QRCode(
            version=1,
            error_correction=qrcode.constants.ERROR_CORRECT_L,
            box_size=10,
            border=4,
        )
        qr.add_data(self.id)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        return img
