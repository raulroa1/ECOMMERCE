from django.urls import path
from . import views

urlpatterns = [
    path('', views.product_list, name='product_list'),
    path('raw/', views.raw_product_list, name='raw_product_list'),
    path('agregar/<int:producto_id>/', views.agregar_p, name='agregar_p'),
    path('eliminar/<int:producto_id>/', views.eliminar_p, name='eliminar_p'),
    path('restar/<int:producto_id>/', views.restar_p, name='restar_p'),
    path('limpiar/', views.limpiar_p, name='limpiar_p'),
]