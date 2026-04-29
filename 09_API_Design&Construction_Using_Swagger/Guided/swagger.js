import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Film API",
      version: "1.0.0",
      description: "api sederhana buat simpen file pribadi",
    },
  },
  apis: ["app.js"],
};

const specs = swaggerJsdoc(options);

export { specs, swaggerUi };
