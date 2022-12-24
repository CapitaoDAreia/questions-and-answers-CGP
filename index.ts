import express, { Request, Response } from "express";

const app = express();
const PORT = 4000;

app.set("view engine", "ejs");
app.use(express.static('public'))

app.get("/", (req: Request, res: Response) => {
  res.render("home");
});

app.get("/answer", (req: Request, res: Response)=>{
  res.render("answer")
})

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});
