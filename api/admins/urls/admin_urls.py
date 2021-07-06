from admins.views.admin_users_views import CreateAdminUser, DeleteAdminUser, FetchAdminUsers, ActivateAdminUser
from django.urls import path

urlpatterns = [
    path('create/', CreateAdminUser.as_view()),
    path('list/', FetchAdminUsers.as_view()),
    path('delete/<uuid:pk>/', DeleteAdminUser.as_view()),
    path('activate/<uuid:pk>/', ActivateAdminUser.as_view()),
]

