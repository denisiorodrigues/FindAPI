import express from "express"

const app = express();

app.get("/", (request, response) => {
    return response.json({message: "Hello FindAPI!!!"});
})

app.listen(3001, () => console.log("Serever is Runnig..."));
