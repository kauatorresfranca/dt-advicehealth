# 📋 TaskMaster - Sistema de Gerenciamento de Tarefas

Sistema completo de To-Do List com Django REST Framework e React TypeScript, desenvolvido como teste prático para vaga de **Desenvolvedor Python (Back-end)** na Advice Health.

---

## 🚀 Tecnologias Utilizadas

### Backend
- **Python 3.11** com Django 6.0
- **Django REST Framework** para API RESTful
- **JWT (Simple JWT)** para autenticação
- **PostgreSQL** (produção) / **SQLite** (desenvolvimento)
- **django-filter** para filtros declarativos
- **pytest** para testes unitários

### Frontend
- **React 18** com **TypeScript**
- **React Router DOM** para navegação
- **Axios** para requisições HTTP
- **CSS Modules** para estilização

### DevOps
- **Docker & Docker Compose** para containerização
- **GitHub Actions** para CI/CD
- **Selenium WebDriver** para testes E2E

---

## ✨ Funcionalidades Implementadas

- ✅ **Autenticação completa**: Registro e login com JWT
- ✅ **CRUD de tarefas**: Criar, listar, editar, deletar
- ✅ **Categorias**: Organizar tarefas por categorias personalizadas
- ✅ **Compartilhamento**: Compartilhar tarefas com outros usuários
- ✅ **Filtros avançados**: Por status, prioridade, categoria
- ✅ **Busca**: Pesquisar tarefas por título/descrição
- ✅ **Paginação**: Listagem paginada de tarefas
- ✅ **Toggle de status**: Marcar tarefas como concluídas/pendentes

---

## 🏗️ Arquitetura e Decisões de Design

### Princípios SOLID

**Single Responsibility Principle (SRP)**
- Cada serializer valida apenas seu modelo específico
- Views delegam lógica de negócio para services/serializers
- Componentes React com responsabilidade única (TaskCard, FilterBar, TaskModal)

**Open/Closed Principle (OCP)**
- ViewSets extensíveis através de actions customizadas
- Componentes React composíveis sem modificação

**Liskov Substitution Principle (LSP)**
- Herança de `ModelViewSet` mantém contratos da API
- Componentes React substituíveis via props

**Interface Segregation Principle (ISP)**
- Mixins específicos para permissões (`IsAuthenticated`)
- Props específicas por componente

**Dependency Inversion Principle (DIP)**
- Uso de abstrações do DRF (serializers, viewsets)
- API service com interceptor centralizado

### DRY (Don't Repeat Yourself)

- Validações centralizadas nos serializers
- Componentes React reutilizáveis em múltiplas páginas
- Serviço de API único com configuração de autenticação
- Funções utilitárias (`auth.ts`) evitam duplicação

### KISS (Keep It Simple, Stupid)

- Django REST Framework ao invés de APIs REST customizadas
- `django-filter` para filtros declarativos
- JWT nativo do DRF (`djangorestframework-simplejwt`)
- CSS Modules ao invés de bibliotecas complexas

---

## 🐳 Como Rodar com Docker

```bash
# Clone o repositório
git clone <seu-repositorio-url>
cd todo-app

# Suba os containers
docker compose up --build

# Acesse:
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000/api
# Django Admin: http://localhost:8000/admin
```

Para criar um superusuário no Docker:

```bash
docker compose exec backend python manage.py createsuperuser
```

---

## 💻 Como Rodar Localmente (Sem Docker)

### Backend

```bash
cd backend

# Criar ambiente virtual
python -m venv venv

# Ativar ambiente virtual
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# Instalar dependências
pip install -r requirements.txt

# Rodar migrações
python manage.py migrate

# Criar superusuário
python manage.py createsuperuser

# Rodar servidor
python manage.py runserver
```

**Backend estará em:** http://localhost:8000

### Frontend

```bash
cd frontend

# Instalar dependências
npm install

# Rodar servidor de desenvolvimento
npm start
```

**Frontend estará em:** http://localhost:3000

---

## 🧪 Testes

### Backend - pytest

```bash
cd backend
pytest -v
```

**Cobertura de testes:**
- ✅ Models (User, Task, Category)
- ✅ API Endpoints (autenticação, CRUD)
- ✅ Filtros e permissões
- ✅ Validações de serializers

**Resultado:** 10/10 testes passando

### Frontend - Selenium

```bash
# Terminal 1: Backend rodando
cd backend
python manage.py runserver

# Terminal 2: Frontend rodando
cd frontend
npm start

# Terminal 3: Rodar testes E2E
cd frontend
npm run test:e2e
```

**Resultado:** 3/3 testes passando

---

## 🔄 CI/CD

GitHub Actions configurado em `.github/workflows/ci.yml`:

- ✅ Roda pytest automaticamente em cada push
- ✅ Roda testes Selenium
- ✅ Build do frontend
- ✅ Validação em Python 3.11 e Node.js 18

---

## 📁 Estrutura do Projeto
todo-app/
├── backend/
│   ├── config/              # Configurações Django
│   │   ├── settings.py      # Settings com SOLID principles
│   │   └── urls.py          # Rotas principais
│   ├── tasks/               # App de tarefas
│   │   ├── models.py        # Models: Task, Category
│   │   ├── serializers.py   # Serializers com validações (DRY)
│   │   ├── views.py         # ViewSets com filtros
│   │   ├── tests.py         # Testes de models
│   │   └── test_api.py      # Testes de API
│   ├── users/               # App de usuários
│   │   ├── models.py        # User customizado
│   │   ├── serializers.py   # Serializers de auth
│   │   └── views.py         # Views de registro
│   ├── manage.py
│   ├── requirements.txt
│   ├── pytest.ini           # Configuração pytest
│   └── Dockerfile
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/      # Componentes reutilizáveis (SRP)
│   │   │   ├── FilterBar.tsx
│   │   │   ├── TaskCard.tsx
│   │   │   └── TaskModal.tsx
│   │   ├── pages/           # Páginas principais
│   │   │   ├── Login.tsx
│   │   │   ├── Register.tsx
│   │   │   └── Dashboard.tsx
│   │   ├── services/        # API service (DRY)
│   │   │   └── api.ts
│   │   ├── types/           # TypeScript interfaces
│   │   │   └── index.ts
│   │   ├── utils/           # Funções auxiliares
│   │   │   └── auth.ts
│   │   └── App.tsx
│   ├── tests/
│   │   └── e2e.test.js      # Testes Selenium
│   ├── package.json
│   ├── jest.config.js
│   └── Dockerfile
├── .github/
│   └── workflows/
│       └── ci.yml           # GitHub Actions CI/CD
├── docker-compose.yml       # Orquestração de containers
└── README.md