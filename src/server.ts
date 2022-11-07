import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import routes from "./routes";

const app: express.Application = express();

app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.use("/", routes);

app.get("/", (req: Request, res: Response) => {
	res.status(200).send("Welecome to Yassin's Storefront backend");
});

app.listen(PORT, () => {
	console.log(`server is running on http://localhost:${PORT}`);
});

export default app;
