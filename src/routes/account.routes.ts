import {Router} from "express";
import {v4 as uuidV4} from "uuid";

const accountRouters = Router();

const customers = [];

accountRouters.post("/", (request, response) => {
    const { name , cpf, username } = request.body;

    customers.push({
        id: uuidV4(),
        cpf,
        name,
        username,
        statements: []
    })

    response.status(201).send();
});

export { accountRouters }