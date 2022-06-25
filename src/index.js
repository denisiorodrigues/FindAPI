const express = require("express");
const {v4: uuidv4} = require("uuid");

const app = express();

app.use(express.json());

const custumers = [];

//Middleware
function verifyIsExistsAccountCPF(request, response, netx){
    const {cpf} = request.headers;

    const customer = custumers.find(customer => customer.cpf === cpf);
    
    if(!customer) {
        return response.status(400).json({ error: "Custumer not found!" })
    }

    request.customer = customer;

    netx();
}

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

//Configurar o Meddlaware assim, permite que apatir dessa configuração, todas as rotas abaixo irão usar o meddleware
app.use(verifyIsExistsAccountCPF);

//Configurar o meddlewre dessa forma, permite que somente esse método usae o meddleware
app.get("/statement/", verifyIsExistsAccountCPF, (request, response) => {
    const { customer } = request;
    
    return response.json(customer.statments);
});

app.listen(3333);