import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import fileUpload from "express-fileupload";
import mongoose, { ConnectOptions } from "mongoose";

import router from "./router";

const PORT = 4000;
const DB_URL = `mongodb+srv://ma:Mongodb_2022@cluster0.duzhxff.mongodb.net/?retryWrites=true&w=majority`;

export const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "DELETE"],
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.static("static"));
app.use(fileUpload({}));
app.use("/api", router);

async function startApp() {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions);
  } catch (e) {
    console.log(e);
  }
}

app.listen(PORT, () => console.log(`SERVER STARTED PORT ${PORT}`));

startApp();
