import pytest
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
from rest_framework import status
from tasks.models import Task

User = get_user_model()


@pytest.mark.django_db
class TestTaskAPI:
    def setup_method(self):
        self.client = APIClient()
        self.user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123'
        )

    def test_register_user(self):
        data = {'username': 'newuser', 'email': 'newuser@test.com', 'password': 'newpass123'}
        response = self.client.post('/api/auth/register/', data)
        assert response.status_code == status.HTTP_201_CREATED

    def test_login_user(self):
        data = {'email': 'test@test.com', 'password': 'testpass123'}
        response = self.client.post('/api/auth/token/', data)
        assert response.status_code == status.HTTP_200_OK
        assert 'access' in response.data

    def test_create_task_authenticated(self):
        self.client.force_authenticate(user=self.user)
        data = {'title': 'New Task', 'priority': 'medium'}
        response = self.client.post('/api/tasks/', data)
        assert response.status_code == status.HTTP_201_CREATED

    def test_create_task_unauthenticated(self):
        response = self.client.post('/api/tasks/', {'title': 'Task'})
        assert response.status_code == status.HTTP_401_UNAUTHORIZED

    def test_list_tasks(self):
        self.client.force_authenticate(user=self.user)
        Task.objects.create(title='Task 1', owner=self.user)
        Task.objects.create(title='Task 2', owner=self.user)
        response = self.client.get('/api/tasks/')
        assert response.data['count'] == 2

    def test_filter_completed_tasks(self):
        self.client.force_authenticate(user=self.user)
        Task.objects.create(title='Done', owner=self.user, is_completed=True)
        Task.objects.create(title='Pending', owner=self.user, is_completed=False)
        response = self.client.get('/api/tasks/?is_completed=true')
        assert response.data['count'] == 1