// 1. Importar framework
const express = require ("express");

//2. Criar uma instnacia da aplicação
const app = express();

//Criar um middleware
app.get('/', (req, res) => {
    res.send("Olá");
})

//3. Iniciar a aplicação
app.listen(6000, ()=>{
    console.log("App está on!");
});