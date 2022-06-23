const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

const costumers = [];

app.post("/account", (request, response) => {
    const {cpf, name } = request.body;
    const id = uuidv4();

    costumers.push({
        cpf,
        name,
        id,
        statments: []
    });

    return response.status(201).send();
});

app.get("/account", (request, response) => {
    return response.send(costumers);
});

app.listen(3333)