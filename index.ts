import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import connection from "./database/database"; //import previous created connection with DB
import Question from "./models/Questions";
import Answers from "./models/Answers";

const app = express();
const PORT = 4000;

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

app.get("/", (_req: Request, res: Response) => {
  Question.findAll({ raw: true, order: [["id", "DESC"]] }).then((questions) => {
    res.render("home", {
      questions: questions,
    });
  });
});

app.get("/question", (_req: Request, res: Response) => {
  res.render("question");
});

app.get("/question/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  Question.findOne({
    where: { id: id },
  }).then((question) => {
    if (question !== null) {
      Answers.findAll({
        where: { questionId: question.dataValues.id },
        order: [["id", "DESC"]],
      }).then((answers) => {
        res.render("answer", {
          question: question,
          answers: answers,
        });
      });
    } else {
      res.redirect("/");
    }
  });
});

app.post("/savequestion", (req: Request, res: Response) => {
  const title = req.body.questionTitle;
  const description = req.body.questionDescription;
  Question.create({
    title: title,
    description: description,
  }).then(() => {
    res.redirect("/");
  });
});

app.post("/answer", (req: Request, res: Response) => {
  const body = req.body.answerBody;
  const questionId = req.body.respectiveQuestion;

  Answers.create({
    body: body,
    questionId: questionId,
  }).then(() => {
    res.redirect(`/question/${questionId}`);
  });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
