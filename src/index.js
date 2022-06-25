const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

const custumers = [];

app.post("/account", (request, response) => {
    const {cpf, name } = request.body;

    const customerAleryExists = custumers.some((customer) => customer.cpf === cpf);

    if(customerAleryExists){
        return response.status(400).json({ error: "Customer already Exists!" });
    }

    custumers.push({
        cpf,
        name,
        id: uuidv4(),
        statments: []
    });

    return response.status(201).send();
});

app.get("/account", (request, response) => {
    return response.send(custumers);
});

app.get("/statement/:cpf", (request, response) => {
    const {cpf} = request.params;

    const customer = custumers.find(customer => customer.cpf === cpf);
    
    if(!customer) {
        return response.status(400).json({ error: "Custumer not found!" })
    }

    return response.json(customer.statments);
});

app.listen(3333)