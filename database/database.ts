import { Sequelize } from "sequelize";

//DB name, DB user, DB password, obj config with DB host and language
const connection = new Sequelize("perguntas_e_respostas", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
});

export default connection;
