from django.urls import path
from .views import CreateRoomView, GetRoom, JoinRoom, RoomView

urlpatterns = [
    path('room', RoomView.as_view()),
    path('create', CreateRoomView.as_view()),
    path('get-room', GetRoom.as_view()),
    path('join-room', JoinRoom.as_view()),
]
