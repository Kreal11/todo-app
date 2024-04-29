import express, { NextFunction, Request, Response } from "express";
import logger from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

const formatsLogger: string =
  app.get("env") === "development" ? "dev" : "short";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/test", (req, res) => {
  return res.status(200).json({ message: "Api is working" });
});

// app.use((req, res) => {
//   res.status(404).json({ message: "Not found" });
// });

interface CustomError extends Error {
  status?: number;
  message: string;
}

// app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
//   const { status = 500, message = "Server error" } = err;
//   res.status(status).json({ message, err });
// });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
