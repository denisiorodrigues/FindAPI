import express from "express";
import { accountRouters } from "./routes/account.routes";

const app = express();

app.use(express.json());
app.use("/accounts", accountRouters);

app.listen(3001, () => console.log("Serever is Runnig..."));
