import express, { Request, Response } from "express";

const app = express();
const PORT = 4000;

//Setting EJS as view engine
app.set("view engine", "ejs");

app.get("/", (req: Request, res: Response) => {
  res.render("index");
});

app.get("/home", (req: Request, res: Response) => {
  res.render("home");
});

app.get("/users/:nome/:sobrenome", (req: Request, res: Response) => {
  const variables = {
    nome: req.params.nome ?? "sem nome" ,
    sobrenome: req.params.sobrenome ?? "sem sobrenome",
    showErrorMessage: true
  }

  res.render("others/users", {...variables, cargo: "Dev Jr"});
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
