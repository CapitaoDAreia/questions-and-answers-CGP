import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import connection from "./database/database"; //import previous created connection with DB
import Question from "./models/Questions";

const app = express();
const PORT = 4000;

const QuestionInstance = new Question(); //instances the Question model to create or connect the respective talbe into the DB

connection //use connection with DB, that returns a promise
  .authenticate()
  .then(() => {
    console.log("Database successfully connected...");
  })
  .catch((error: any) => {
    console.log("Some error occurred...");
  });

app.set("view engine", "ejs"); //set EJS as view engine
app.use(express.static("public")); //deliver static files

app.use(bodyParser.urlencoded({ extended: false })); //translates received data in a JS structure
app.use(bodyParser.json()); //allows to read form data received as JSON

app.get("/", (req: Request, res: Response) => {
  Question.findAll({ raw: true, order: [
    ['id', 'DESC']
  ] }).then((questions) => {
    res.render("home", {
      questions: questions
    });
  });
  
});

app.get("/question", (req: Request, res: Response) => {
  res.render("question");
});

app.post("/savequestion", (req: Request, res: Response) => {
  const title = req.body.questionTitle;
  const description = req.body.questionDescription;
  Question.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
    console.log(res.statusCode);
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
