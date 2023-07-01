"""
Accounts admin
"""
###
# Libraries
###
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from app.accounts.models.accounts import User
from app.accounts.models.change_email_request import ChangeEmailRequest


###
# Inline Admin Models
###


###
# Main Admin Models
###
@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ('id', 'email', 'username', 'is_active',
                    'last_login', 'date_joined',)


@admin.register(ChangeEmailRequest)
class ChangeEmailRequestAdmin(admin.ModelAdmin):
    list_display = ('email',)
    readonly_fields = ('uuid',)
