const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const YAML = require('yamljs'); // To parse the YAML file
const { connection } = require('./Configs/db');
const router = require('./Routes/github.route');
const specs = require("./swagger");
const app = express();
require('dotenv').config();
app.use(express.json())
app.use(cors());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use('/',router)
app.get('/',(req,res)=>{
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
