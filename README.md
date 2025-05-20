# TeamFlow - https://teamflow-frontend.onrender.com/
# NodeJS + Express - Backend
# React - Frontend

## Шумахер Марк. ИКБО-20-22.

## Структура проекта

Проект состоит из двух основных частей:
- **backend** - серверная часть на Node.js + Express
- **frontend** - клиентская часть (React-приложение)

### Backend структура
```
server/
├── controllers/ # Контроллеры для обработки запросов
│ ├── authController.js # Аутентификация (регистрация, логин)
│ ├── chatController.js # Управление чатами
│ └── messageController.js # Работа с сообщениями
│
├── middleware/ # Промежуточное ПО
│ ├── authMiddleware.js # Проверка JWT-токена
│ └── roleMiddleware.js # Проверка прав доступа
│
├── models/ # Модели данных
│ └── Message.js # Работа с сообщениями
│
├── routes/ # Маршруты API
│ ├── authRoutes.js # Маршруты аутентификации
│ ├── chatRoutes.js # Маршруты чатов
│ └── messageRoutes.js # Маршруты сообщений
│
├── db.js # Настройка подключения к БД
├── app.js # Основной файл приложения
└── package.json # Зависимости и скрипты
```

## Установка и запуск

### Backend

1. Установите зависимости:
```bash
npm install
```
2. Создайте файл .env в корне серверной части:
```bash
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```
3. Запустите сервер:
```bash
npm start
```
Сервер будет доступен по адресу: http://localhost:5000

## API Endpoints

### Аутентификация
| Эндпоинт | Метод | Описание |
|----------|--------|-------------|
| `/api/auth/register` | POST | Регистрация нового пользователя | 
| `/api/auth/login` | POST | Вход в систему | 
### Чаты
| Эндпоинт | Метод | Описание |
|----------|--------|-------------|
| `/api/chats/create` | POST | Создание нового чата |
| `/api/chats` | GET | Получение списка чатов пользователя |
| `/api/chats/:chatId/users` | GET | Получение участников чата |
| `/api/chats/add-user` | POST | Добавление пользователя в чат |
| `/:chatId/assign-role` | POST | Назначение пользователя администратором в чате |
| `/:chatId/assign-position-tag` | POST | Назначение тега на пользователя в чате |
| `/:chatId/revoke-admin/:userId` | POST | Снятие админки с пользователя |
| `/api/chats/:chatId` | DELETE | Удаление чата |
| `/:chatId/users/:userId` | DELETE | Удаление пользователя из чата |
### Сообщения
| Эндпоинт | Метод | Описание |
|----------|--------|-------------|
| `/api/messages/send` | POST | Отправить сообщение |
| `/api/messages/:chatId` | GET | Получить историю сообщений |

## Особенности реализации
1. Аутентификация: JWT-токены с 24-часовым сроком действия
2. База данных: PostgreSQL с таблицами:
- Пользователи (users)
- Чаты (chats)
- Участники чатов (chat_users)
- Сообщения (messages)
3. WebSocket: Реализован чат в реальном времени через Socket.io
4. Ролевая система: участник/администратор. Администраторы чатов могут управлять участниками
5. Сохраняется история сообщений
6. Реализована система тегов, что актуально для чатов с сотрудниками
