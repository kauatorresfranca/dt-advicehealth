import requests

# 1. Registrar usuário
response = requests.post('http://localhost:8000/api/auth/register/', json={
    'username': 'teste',
    'email': 'teste@test.com',
    'password': 'senha123'
})
print('Register:', response.status_code, response.json())

# 2. Fazer login e pegar token
response = requests.post('http://localhost:8000/api/auth/token/', json={
    'email': 'teste@test.com',
    'password': 'senha123'
})
token_data = response.json()
print('Login:', response.status_code, token_data)

token = token_data.get('access')
headers = {'Authorization': f'Bearer {token}'}

# 3. Criar categoria
response = requests.post('http://localhost:8000/api/categories/', json={
    'name': 'Trabalho'
}, headers=headers)
print('Category:', response.status_code, response.json())
category_id = response.json().get('id')

# 4. Criar tarefa
response = requests.post('http://localhost:8000/api/tasks/', json={
    'title': 'Terminar o projeto',
    'description': 'Finalizar Django + React',
    'priority': 'high',
    'category': category_id
}, headers=headers)
print('Task:', response.status_code, response.json())

# 5. Listar tarefas
response = requests.get('http://localhost:8000/api/tasks/', headers=headers)
print('Tasks:', response.status_code, response.json())