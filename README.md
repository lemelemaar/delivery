# Delivery App
#### Данное приложение написано с использованием Django + DRF + React

## Инструкция по установке и запуску:

### 1. Скачайте и установите python v3.12 https://www.python.org/downloads/release/python-3120/

### 2. Скачайте и установите node.js v22.15.0 https://nodejs.org/en/download или:
```commandline
winget install Schniz.fnm

fnm install 22

node -v 

npm -v 
```
### 3. Скачайте и установите PostgreSQL https://www.postgresql.org/download/

### 4. Клонируйте git репозиторий:
```commandline
git clone https://github.com/lemelemaar/delivery.git
```

### 5. Создайте виртуальное окружение, установите зависимости:
```commandline
cd delivery

python -m venv venv

venv\Scripts\activate

cd backend

pip install -r requirements.txt

cd ../frontend

npm install
```

### 6. Создайте базу данных и пользователя, выдайте public права:
```
psql -U postgres

CREATE DATABASE your_db_name;

CREATE USER your_db_user WITH PASSWORD 'your_password';

GRANT ALL PRIVILEGES ON DATABASE your_db_name TO your_db_user;

GRANT ALL PRIVILEGES ON SCHEMA public TO your_db_user;

ALTER DATABASE your_db_name OWNER TO your_db_user;
```

### 7. Настройте backend/.env:
```
CORS_ORIGIN_WHITELIST=http://localhost:3000
CSRF_TRUSTED_ORIGINS=http://localhost:3000
NAME_DB=your_db_name
USER_DB=your_db_user
PASSWORD_DB=your_password
HOST_DB=localhost
PORT_DB=5432
```

### 8. Выполните миграции, выгрузите содержимое справочников:
```commandline
cd ../backend

python manage.py migrate

python manage.py loaddatautf8 fixtures/initial_data.json
```

### 9. Запустите django и react сервер:
- django
```
cd backend 

python manage.py runserver
```
- react
```
cd frontend

npm start
```
