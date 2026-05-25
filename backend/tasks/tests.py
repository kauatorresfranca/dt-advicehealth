import pytest
from django.contrib.auth import get_user_model
from tasks.models import Task, Category

User = get_user_model()


@pytest.mark.django_db
class TestModels:
    def test_user_creation(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123'
        )
        assert user.email == 'test@test.com'
        assert user.username == 'testuser'

    def test_category_creation(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123'
        )
        category = Category.objects.create(name='Work', owner=user)
        assert category.name == 'Work'
        assert category.owner == user

    def test_task_creation(self):
        user = User.objects.create_user(
            username='testuser',
            email='test@test.com',
            password='testpass123'
        )
        task = Task.objects.create(
            title='Test Task',
            description='Test Description',
            owner=user,
            priority='high'
        )
        assert task.title == 'Test Task'
        assert task.priority == 'high'
        assert task.is_completed is False

    def test_task_shared_with(self):
        user1 = User.objects.create_user(username='user1', email='user1@test.com', password='pass123')
        user2 = User.objects.create_user(username='user2', email='user2@test.com', password='pass123')
        task = Task.objects.create(title='Shared Task', owner=user1)
        task.shared_with.add(user2)
        assert user2 in task.shared_with.all()