import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import './configs/dotenvConfig.js';
import { serverConfig } from "./configs/serverConfig.js";
import contactsRouter from "./routes/contactsRouter.js";
import authRouter from "./routes/authRouter.js";

const app = express();
mongoose.connect(serverConfig.mongoUrl).then(()=>{
  console.log("Database connection successful");
}).catch((err)=>{
  console.log(err);
  process.exit(1)
})
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);
app.use ("/users", authRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});
const {port} = serverConfig;
app.listen(parseInt(port), () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});
