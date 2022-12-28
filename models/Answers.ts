import { DataTypes } from "sequelize";
import connection from "../database/database";

const Answers = connection.define("answers", {
  body: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Answers.sync({ force: false });

export default Answers;
