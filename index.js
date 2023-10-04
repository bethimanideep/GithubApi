const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const YAML = require('yamljs'); // To parse the YAML file
const { connection } = require('./Configs/db');
const router = require('./Routes/github.route');
const app = express();
require('dotenv').config();
app.use(express.json())

const swaggerDocument = YAML.parse(fs.readFileSync('./swagger.yaml', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
