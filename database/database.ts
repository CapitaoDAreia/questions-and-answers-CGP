import { Sequelize } from "sequelize";

const connection = new Sequelize("perguntas_e_respostas", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
});

export default connection;
