# Chat API - Backend para Clon de Chat

API RESTful construida con Node.js, Express y MongoDB para una aplicación de chat en tiempo real.

##  Características

- CRUD completo de usuarios, chats y mensajes
- Autenticación JWT
- Base de datos MongoDB
- Respuestas estandarizadas
- Manejo de errores con middleware
- Variables de entorno
- Estructura modular

##  Requisitos Previos

- Node.js (v14 o superior)
- MongoDB Atlas o local
- npm o yarn

##  Instalación

1. Clonar el repositorio
```
git clone <tp-Nodejs>
cd chat-api
```
2. Instalar dependencias
```
npm install
```
3. Configurar variables de entorno
```
cp .env.example .env
//Editar .env con tus credenciales
```
4. Ejecutar en desarrollo
```
npm run dev
```
5. Ejecutar en producción
```
npm start
```

## Endpoints de la API

### Usuarios (`/api/users`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|----------------|
| POST | `/register` | Registrar usuario | No |
| POST | `/login` | Iniciar sesión | No |
| GET | `/` | Listar todos los usuarios | Sí |
| DELETE | `/:id` | Eliminar usuario | Sí |

### Chats (`/api/chats`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|----------------|
| POST | `/` | Crear nuevo chat | Sí |
| GET | `/` | Listar chats del usuario | Sí |
| GET | `/:id` | Obtener chat por ID | Sí |

### Mensajes (`/api/messages`)

| Método | Endpoint | Descripción | Autenticación |
|--------|----------|-------------|----------------|
| POST | `/` | Enviar mensaje | Sí |
| GET | `/:chatId` | Obtener historial de mensajes | Sí |
## Ejemplos de Uso
Registrar usuario
```JavaScript
POST /api/users/register
Content-Type: application/json

{
  "username": "juanperez",
  "email": "juan@example.com",
  "password": "123456"
}
```
Respuesta 
```JavaScript
{
  "success": true,
  "data": {
    "id": "123...",
    "username": "juanperez",
    "email": "juan@example.com",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  },
  "message": "Usuario creado exitosamente"
}
```


## Conexión con el Frontend (React)

### Configuración base del cliente API

Crea un archivo `src/services/api.js` en tu proyecto React:

```javascript
// api.js
const API_URL = 'https://tu-api.onrender.com/api';

// Función genérica para peticiones
const request = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    },
    ...options
  };
  
  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Error en la petición');
    }
    
    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Servicios de Usuario
export const authService = {
  register: (userData) => request('/users/register', { 
    method: 'POST', 
    body: JSON.stringify(userData) 
  }),
  
  login: (credentials) => request('/users/login', { 
    method: 'POST', 
    body: JSON.stringify(credentials) 
  }),
  
  getUsers: () => request('/users'),
  
  getUserById: (id) => request(`/users/${id}`),
  
  updateUser: (id, userData) => request(`/users/${id}`, { 
    method: 'PUT', 
    body: JSON.stringify(userData) 
  }),
  
  deleteUser: (id) => request(`/users/${id}`, { 
    method: 'DELETE' 
  })
};

// Servicios de Chat
export const chatService = {
  createChat: (chatData) => request('/chats', { 
    method: 'POST', 
    body: JSON.stringify(chatData) 
  }),
  
  getChats: () => request('/chats'),
  
  getChatById: (id) => request(`/chats/${id}`),
  
  updateChat: (id, chatData) => request(`/chats/${id}`, { 
    method: 'PUT', 
    body: JSON.stringify(chatData) 
  }),
  
  deleteChat: (id) => request(`/chats/${id}`, { 
    method: 'DELETE' 
  }),
  
  addParticipant: (chatId, userId) => request(`/chats/${chatId}/participants`, { 
    method: 'POST', 
    body: JSON.stringify({ userId }) 
  }),
  
  removeParticipant: (chatId, userId) => request(`/chats/${chatId}/participants/${userId}`, { 
    method: 'DELETE' 
  })
};

// Servicios de Mensaje
export const messageService = {
  sendMessage: (messageData) => request('/messages', { 
    method: 'POST', 
    body: JSON.stringify(messageData) 
  }),
  
  getMessages: (chatId, page = 1, limit = 50) => 
    request(`/messages/${chatId}?page=${page}&limit=${limit}`),
  
  getMessageById: (chatId, messageId) => 
    request(`/messages/${chatId}/${messageId}`),
  
  updateMessage: (messageId, content) => request(`/messages/${messageId}`, { 
    method: 'PUT', 
    body: JSON.stringify({ content }) 
  }),
  
  deleteMessage: (messageId) => request(`/messages/${messageId}`, { 
    method: 'DELETE' 
  }),
  
  markAsRead: (chatId) => request(`/messages/${chatId}/read`, { 
    method: 'PUT' 
  })
};

export default request;
