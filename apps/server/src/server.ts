import app from "./app";
import { sequelize } from "./db/db";

const PORT = 4000;

export const bootStrap = async () => {
  try {
    await sequelize.authenticate();

    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });

    console.log("Connection has been established successfully.");
  } catch (err) {
    console.error("Connection failed", err);
  }
};

bootStrap();
