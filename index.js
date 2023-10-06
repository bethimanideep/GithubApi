const express = require('express');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc=require('swagger-jsdoc')
const cors = require('cors');
const YAML = require('yamljs'); // To parse the YAML file
const { connection } = require('./Configs/db');
const router = require('./Routes/github.route');
const app = express();
require('dotenv').config();
app.use(express.json())
app.use(cors());
const CSS_URL =
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Library API",
            version: "1.0.0",
            description: "A simple Express Library API",
            termsOfService: "http://example.com/terms/",
            contact: {
                name: "API Support",
                url: "http://www.exmaple.com/support",
                email: "support@example.com",
            },
        },
        servers: [
            {
                url: "http://localhost:8000",
                description: "My API Documentation",
            },
        ],
    },
    // This is to call all the file
    apis: ["Routes/github.route.js"],
};

const specs = swaggerJsDoc(options);
// app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

app.use(
    "/api-docs",
    swaggerUI.serve,
    swaggerUI.setup(specs, { customCssUrl: CSS_URL })
);

app.use('/', router)
app.get('/', (req, res) => {
    res.json('Backend Running')
})

app.listen(process.env.PORT || 8000, async () => {
    try {
        await connection
        console.log("connected to db");
        console.log(`server running at ${process.env.PORT || 8080}`);
    } catch (error) {
        console.log(error);
    }
});
