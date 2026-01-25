import swaggerJsdoc from 'swagger-jsdoc';
import { OpenAPIV3 } from 'openapi-types';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'toDoList API',
      version: '1.0.0',
      description: 'API REST para gestión de tareas con autenticación JWT',
      contact: {
        name: 'Jon Blanco Martín',
        email: 'jblancom06@educantabria.es',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Servidor de desarrollo',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce el token JWT (sin "Bearer")',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Juan Pérez' },
            email: { type: 'string', example: 'juan@example.com' },
          },
        },
        Task: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            user_id: { type: 'integer', example: 1 },
            title: { type: 'string', example: 'Completar proyecto' },
            description: { type: 'string', example: 'Terminar la documentación' },
            status: { 
              type: 'string', 
              enum: ['pending', 'in_progress', 'done'], 
              example: 'pending' 
            },
            created_at: { type: 'string', format: 'date-time' },
            updated_at: { type: 'string', format: 'date-time' },
          },
        },
        TaskCreate: {
          type: 'object',
          required: ['title'],
          properties: {
            title: { type: 'string', example: 'Nueva tarea' },
            description: { type: 'string', example: 'Descripción de la tarea' },
            status: { 
              type: 'string', 
              enum: ['pending', 'in_progress', 'done'], 
              example: 'pending' 
            },
          },
        },
        TaskUpdate: {
          type: 'object',
          properties: {
            title: { type: 'string', example: 'Tarea actualizada' },
            description: { type: 'string', example: 'Nueva descripción' },
            status: { 
              type: 'string', 
              enum: ['pending', 'in_progress', 'done'] 
            },
          },
        },
        UserRegister: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Juan Pérez' },
            email: { type: 'string', example: 'juan@example.com' },
            password: { type: 'string', example: 'password123', minLength: 6 },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: { type: 'string', example: 'juan@example.com' },
            password: { type: 'string', example: 'password123' },
          },
        },
        AuthResponse: {
          type: 'object',
          properties: {
            message: { type: 'string', example: 'Login exitoso' },
            token: { type: 'string', example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' },
            user: { $ref: '#/components/schemas/User' },
          },
        },
        Error: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Mensaje de error' },
          },
        },
        TaskStats: {
          type: 'object',
          properties: {
            total: { type: 'integer', example: 10 },
            pending: { type: 'integer', example: 3 },
            in_progress: { type: 'integer', example: 5 },
            done: { type: 'integer', example: 2 },
          },
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'], // Ajusta si tus rutas son TS
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
