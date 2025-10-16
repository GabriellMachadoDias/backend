const { MongoClient } = require('mongodb');

const url = "mongodb+srv://gabriel%20dias:<Palavr0%21>@cluster0.d8scaks.mongodb.net/";

const client = new MongoClient(url);

async function conectarDb() {
    await client.connect();
    return client.db("agenda");
}

module.exports = { conectarDb };
