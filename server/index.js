require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const router = require("./router/index");
const errorMiddleware = require("./middleware/error-middleware");
const path = require("path");
const fileUpload = require("express-fileupload");

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());
app.use(cors({
  credentials: true,
  origin: process.env.CLIENT_URL
}));
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use("/api", router);
app.use(errorMiddleware);

const start = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    console.log(error);
  }
};
start();
