from django.urls import path, re_path
from . import views

app_name = 'accounts'

urlpatterns = [
    re_path('^signup/$', views.signup_view, name='signup'),
    re_path('^login/$', views.login_view, name='login'),
    re_path('^logout/$', views.logout_view, name='logout'),
]