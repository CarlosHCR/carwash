from django.urls import path
from rest_framework import routers
from rest_auth.views import (
    LoginView,
    LogoutView,
    UserDetailsView,
    PasswordChangeView,
    PasswordResetConfirmView,
    PasswordResetView,
)
from rest_auth.registration.views import (
    RegisterView,
)
from app.accounts.api.v1.views.change_email_views import (
    ChangeEmailViewSet,
    ChangeEmailConfirmationViewSet,
)

# Routers
router = routers.DefaultRouter()

# URLs
urlpatterns = [
    path('login/', LoginView.as_view(), name='rest_login'),
    path('logout/', LogoutView.as_view(), name='rest_logout'),
    path('user/', UserDetailsView.as_view(), name='rest_user_details'),
    path('change-password/', PasswordChangeView.as_view(),
         name='rest_password_change'),
    path('change-email/<str:uuid>/', ChangeEmailConfirmationViewSet.as_view(),
         name='change-email-confirmation'),
    path('change-email/', ChangeEmailViewSet.as_view(), name='change-email'),
    path('password/reset/', PasswordResetView.as_view(),
         name='rest_password_reset'),
    path('password/reset/confirm/', PasswordResetConfirmView.as_view(),
         name='rest_password_reset_confirm'),
    path('register/', RegisterView.as_view(), name='rest_register'),
]

urlpatterns += router.urls
