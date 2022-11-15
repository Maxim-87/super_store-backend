import cookieParser from "cookie-parser";
import cors from "cors";
import "dotenv/config";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose, { ConnectOptions } from "mongoose";

import errorMiddlewares from "../middleware/error-middlewares";
import authRouter from "../routes/auth-router";
import productsRouter from "../routes/products-router";
import usersRouter from "../routes/users-router";

// eslint-disable-next-line no-magic-numbers
const PORT = process.env.PORT || 4000;
const DB_URL = `mongodb+srv://ma:Mongodb_2022@cluster0.duzhxff.mongodb.net/?retryWrites=true&w=majority`;

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
  })
);
// block with connect middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);
app.use(errorMiddlewares); // connect error to end

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions); // connect dataBase
  } catch (e) {
    console.log(e);
  }
}

app.listen(PORT, () => console.log(`SERVER STARTED PORT ${PORT}`));

startApp();
