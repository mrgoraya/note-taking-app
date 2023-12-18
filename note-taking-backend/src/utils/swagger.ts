import swaggerJSDoc, { Options, SwaggerDefinition } from "swagger-jsdoc";

const swaggerDefinition: SwaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Notes API",
    version: "1.0.0",
    description: "A simple API for managing notes",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Development server",
    },
  ],
  components: {
    schemas: {
      Note: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          title: {
            type: "string",
          },
          description: {
            type: "string",
          },
          created_at: {
            type: "string",
            format: "date-time",
          },
          updated_at: {
            type: "string",
            format: "date-time",
          },
        },
      },
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          password: {
            type: "string",
          },
          isAdmin: {
            type: "boolean",
          },
        },
      },
      UserWithOutPassword: {
        type: "object",
        properties: {
          id: {
            type: "string",
          },
          name: {
            type: "string",
          },
          email: {
            type: "string",
          },
          isAdmin: {
            type: "boolean",
          },
        },
      },
    },
  },
};

const options: Options = {
  swaggerDefinition,
  apis: [
    "src/controller/AuthController.ts",
    "src/controller/UserController.ts",
    "src/controller/NoteController.ts",
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
