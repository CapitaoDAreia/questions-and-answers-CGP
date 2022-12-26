import express, { Request, Response } from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = 4000;

app.set("view engine", "ejs"); //set EJS as view engine
app.use(express.static("public")); //deliver static files
app.use(bodyParser.urlencoded({ extended: false })); //translates received data in a JS structure
app.use(bodyParser.json()); //allows to read form data received as JSON

app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

app.get("/question", (req: Request, res: Response) => {
  res.render("question");
});

app.post("/savequestion", (req: Request, res: Response) => {
  const title = req.body.questionTitle;
  const description = req.body.questionDescription;

  res.send(`${title} ${description}`);
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
