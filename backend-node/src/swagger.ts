import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Document RAG API',
      version: '1.0.0',
      description: 'API documentation for Document RAG system',
    },
    servers: [
      {
        url: 'http://localhost:3001',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.ts', './src/models/*.ts'], // 🧠 make sure paths are accurate
};

export const swaggerSpec = swaggerJSDoc(swaggerOptions);
