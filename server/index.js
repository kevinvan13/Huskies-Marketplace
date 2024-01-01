import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./routes/apiRoutes.js";
dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(routes);

app.listen(process.env.PORT, () => {
  console.log("Listening on port", process.env.PORT);
});
