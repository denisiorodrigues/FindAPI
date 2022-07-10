import express from "express"

const app = express();

app.use(express.json());

app.get("/", (request, response) => {
    return response.json({message: "Hello FindAPI!!!"});
})

app.post("/accounts", (request, response) => {
    const { name } = request.body;

    return response.json({"name" : name});
})

app.listen(3001, () => console.log("Serever is Runnig..."));
