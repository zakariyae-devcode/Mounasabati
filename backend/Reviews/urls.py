from django.urls import path
from .views import CreateReviewView,DeleteReviewView,DeleteReviewAdminView,ServiceReviewLisView

urlpatterns=[

  
  path("create-review-view/",CreateReviewView.as_view(),name="create-review-view"),
  path("list-review-service-view/<int:id>",ServiceReviewLisView.as_view(),name="list-review-service-view"),
  path("delete-review-view/<int:id>",DeleteReviewView.as_view(),name="delete-review-view"),
  path("delelte-review-admin-view/<int:id>",DeleteReviewAdminView.as_view(),name="delete-review-view")
]