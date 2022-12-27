import { DataTypes } from "sequelize";
import connection from "../database/database";

const Question = connection.define(
  "question",
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {}
);

Question.sync({ force: false })
  .then(() => {
    console.log("Table Question has been created...");
  })
  .catch(() => {
    console.log("Error on Question table creation...");
  });


export default Question