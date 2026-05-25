# TaskMaster - Sistema de Gerenciamento de Tarefas

Sistema completo de To-Do List com Django REST Framework e React, desenvolvido como teste prático para vaga de Desenvolvedor Python Back-end.

## 🚀 Tecnologias Utilizadas

### Backend
- Python 3.11
- Django 6.0
- Django REST Framework
- PostgreSQL (produção) / SQLite (desenvolvimento)
- JWT para autenticação
- pytest para testes

### Frontend
- React 18
- TypeScript
- Axios
- React Router DOM

### DevOps
- Docker & Docker Compose
- GitHub Actions (CI/CD)
- Selenium (testes E2E)

## 📋 Funcionalidades

- ✅ Autenticação de usuários (registro e login com JWT)
- ✅ CRUD completo de tarefas
- ✅ Categorias personalizadas
- ✅ Compartilhamento de tarefas entre usuários
- ✅ Filtros por status, prioridade e categoria
- ✅ Busca de tarefas
- ✅ Paginação
- ✅ Marcação de tarefas como concluídas

## 🏗️ Arquitetura e Decisões de Design

### SOLID
- **Single Responsibility**: Cada serializer valida apenas seu modelo; views delegam lógica de negócio
- **Open/Closed**: ViewSets extensíveis sem modificar código base
- **Liskov Substitution**: Herança de ModelViewSet mantém contratos
- **Interface Segregation**: Mixins específicos para permissões
- **Dependency Inversion**: Uso de abstrações do DRF

### DRY (Don't Repeat Yourself)
- Validações centralizadas nos serializers
- Componentes React reutilizáveis (TaskCard, FilterBar, TaskModal)
- API service com interceptor JWT único

### KISS (Keep It Simple, Stupid)
- Django REST Framework ao invés de APIs customizadas
- django-filter para filtros declarativos
- JWT nativo do DRF

## 🐳 Como Rodar com Docker

```bash
# Clone o repositório
git clone <seu-repo>
cd todo-app

# Suba os containers
docker compose up --build

# Acesse
# Frontend: http://localhost:3000
# Backend: http://localhost:8000
# Admin: http://localhost:8000/admin
```

## 💻 Como Rodar Localmente (sem Docker)

### Backend

```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac

pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

### Frontend

```bash
cd frontend
npm install
npm start
```

## 🧪 Testes

### Backend (pytest)

```bash
cd backend
pytest -v
```

Cobertura:
- Models (User, Task, Category)
- API endpoints (autenticação, CRUD)
- Filtros e permissões

### Frontend (Selenium)

```bash
# Terminal 1: Backend rodando
cd backend
python manage.py runserver

# Terminal 2: Frontend rodando
cd frontend
npm start

# Terminal 3: Rodar testes
cd frontend
npm test -- tests/e2e.test.js
```

## 🔄 CI/CD

GitHub Actions configurado para:
- ✅ Rodar pytest automaticamente em cada push
- ✅ Build do frontend
- ✅ Validação de código

## 📁 Estrutura do Projeto