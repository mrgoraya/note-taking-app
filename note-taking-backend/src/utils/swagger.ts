import swaggerJSDoc from "swagger-jsdoc";

const swaggerDefinition = {
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
};

const options = {
  swaggerDefinition,
  apis: ["src/controller/NoteController.ts"],
};

export const swaggerSpec = swaggerJSDoc(options);
