import {Router} from "express";

//import {v4: uuidv4} from "uuid";

const accountRouters = Router();

const customers = [];

accountRouters.post("/accounts", (request, response) => {
    const { name , cpf, username } = request.body;

    customers.push({
        cpf,
        name,
        username,
        statements: []
    })

    response.status(201).send();
});