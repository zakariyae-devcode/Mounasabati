from django.urls import path

from  .views import RegisterView,UserDetailView,UserUpdateView,ChangePasswordView,EmailResetView,ForgotPasswordView,LogoutView,AdminDeleteUserView,AdminUpdateUserRoleView,UserView

urlpatterns = [
    
    path("register/", RegisterView.as_view(), name="register-view"),
    path("user/", UserDetailView.as_view(), name="user-details-view"),
    path("user/update/", UserUpdateView.as_view(), name="user-update-view"),
    path("user/change-password/", ChangePasswordView.as_view(), name="change-password-view"),
    path("user/email-reset/", EmailResetView.as_view(), name="email_reset"),
    path("user/forgot-password/", ForgotPasswordView.as_view(), name="forgot-password-view"),
    path("user/logout/", LogoutView.as_view(), name="logout-view"),
    path("admin/delete-user/<str:user_cin>/", AdminDeleteUserView.as_view(), name="delete-user-view"),
    path("admin/update-role/<str:user_cin>/",AdminUpdateUserRoleView.as_view(),name="update-role-view"),
    path("admin/user/",UserView.as_view(),name="users-view")
]