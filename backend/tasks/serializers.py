from rest_framework import serializers
from .models import Task, Category
from django.contrib.auth import get_user_model

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'owner']
        read_only_fields = ['owner']


class TaskSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    owner_email = serializers.CharField(source='owner.email', read_only=True)
    shared_with_emails = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = [
            'id', 'title', 'description', 'is_completed', 'priority',
            'due_date', 'created_at', 'updated_at', 'owner', 'owner_email',
            'category', 'category_name', 'shared_with', 'shared_with_emails'
        ]
        read_only_fields = ['owner', 'created_at', 'updated_at']

    def get_shared_with_emails(self, obj):
        return [user.email for user in obj.shared_with.all()]

    def validate_title(self, value):
        if not value or len(value.strip()) == 0:
            raise serializers.ValidationError('O título não pode estar vazio.')
        return value