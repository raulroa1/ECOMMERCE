from django.shortcuts import render,redirect
from .Carrito import Carrito
from .models import Product
from django.db import connection

def product_list(request):
    products = Product.objects.all()
    return render(request, 'product_list.html', {'products': products})

def raw_product_list(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM store_product")
        products = cursor.fetchall()
    return render(request, 'raw_product_list.html', {'products': products})
def agregar_p(request,producto_id):
    carrito=carrito(request)
    producto=Product.objects.get(id=producto_id)
    Carrito.agregar(producto)
    return redirect("store:product_list")

def eliminar_p(request,producto_id):
    carrito=carrito(request)
    producto=Product.objects.get(id=producto_id)
    Carrito.eliminar(producto)
    return redirect("store:product_list")

def restar_p(request,producto_id):
    carrito=carrito(request)
    producto=Product.objects.get(id=producto_id)
    Carrito.restar(producto)
    return redirect("store:product_list")

def limpiar_p(request):
    carrito=carrito(request)
    Carrito.limpiar()
    return redirect("store:product_list")
