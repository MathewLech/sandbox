from django.contrib import admin
from .models import StreamChannel

admin.site.register(
    StreamChannel,
    list_display=["id", "title"],
    list_display_links=["id", "title"],
)

