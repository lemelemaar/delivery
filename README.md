# Delivery App
#### Данное приложение написано с использованием Django + DRF + React

## Инструкция по установке и запуску:

### 1. Установите node.js v22.15.0 https://nodejs.org/en/download или:
```
winget install Schniz.fnm

fnm install 22

node -v 

npm -v 
```
### 2. Установите PostgreSQL https://www.postgresql.org/download/

### 3. Клонируйте git репозиторий:
```
git clone https://github.com/lemelemaar/delivery.git
```

### 4. Создайте виртуальное окружение, установите зависимости:
```
cd delivery

python -m venv venv

venv\Scripts\activate

cd backend

pip install -r requirements.txt

cd ../frontend

npm install
```
python manage.py migrate
python manage.py loaddata fixtures/your_model.json
### 5. Создайте базу данных и пользователя, выдайте public права:
```
psql -U postgres

CREATE DATABASE your_db_name;

CREATE USER your_db_user WITH PASSWORD 'your_password';

GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;

GRANT ALL PRIVILEGES ON SCHEMA public TO your_db_user;
```

### 6. Настройте .env файл:
```

CORS_ORIGIN_WHITELIST=http://localhost:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000
NAME_DB=your_db_name
USER_DB=your_db_user
PASSWORD_DB=your_password
HOST_DB=localhost
PORT_DB=5432

```