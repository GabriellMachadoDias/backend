const express = require('express');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yaml');
const fs = require('fs');

//Carrega o arquivo swagger
const file = fs.readFileSync('./swagger.yaml', 'utf8');

//Valida o arquivo swagger
const sawaggerDoc = YAML.parse(file);

const router = express.Router();

router.use("/", swaggerUi.serve);

router.get("/", swaggerUi.setup(sawaggerDoc));

module.exports = router;