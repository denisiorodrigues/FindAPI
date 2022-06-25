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

function getBalance(statement) {
    const balance = statement.reduce((acc, operation) => {
        if(operation.type === 'credit') {
            return acc + operation.amount;
        } else {
            return acc - operation.amount;
        }
    }, 0);

    return balance;
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
        statements: []
    });

    return response.status(201).send();
});

app.get("/account", (request, response) => {
    return response.send(custumers);
});

//Configurar o Meddlaware assim, permite que apatir dessa configuração, todas as rotas abaixo irão usar o meddleware
//app.use(verifyIsExistsAccountCPF);

//Configurar o meddlewre dessa forma, permite que somente esse método usae o meddleware
app.get("/statement/", verifyIsExistsAccountCPF, (request, response) => {
    const { customer } = request;

    return response.json(customer.statements);
});


app.post("/deposit", verifyIsExistsAccountCPF, (request, response) => {
    const { description, amount } = request.body;

    const {customer} = request;

    const statementOperation = {
        description,
        amount,
        cread_at: new Date(),
        type: "credit"
    }

    customer.statements.push(statementOperation);

    return response.status(201).send();
});

app.post("/withdraw", verifyIsExistsAccountCPF, (request, response) => {
    const { amount } = request.body;
    const { customer } = request;
    
    const balance = getBalance(customer.statements);

    if(amount > balance){
        return response.status(400).json({error: "Insufucients funds!"});
    }

    const statementOperation = {
        amount,
        cread_at: new Date(),
        type: "debit"
    }

    customer.statements.push(statementOperation);

    return response.status(201).send();
})

app.get("/statement/date", verifyIsExistsAccountCPF, (request, response) => {
    const { customer } = request;
    const { date } = request.query;

    const dateFormat = new Date( date + " 00:00");

    const statement = customer.statements.filter((statement) => statement.cread_at.toDateString() === new Date(dateFormat).toDateString());

    return response.json(statement);
});

app.listen(3333);