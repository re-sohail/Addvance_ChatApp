const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(morgan("dev"));
require("dotenv").config();
const { connectDB } = require("./db/db.config");
const PORT = process.env.PORT;
const authApi = require("./routes/auth.route");

app.use(express.json());

app.use("/api", authApi);

connectDB()
  .then(() => {
    console.log("DB Connect Successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(() => {
    console.log("DB not Connect Successfully");
  });
