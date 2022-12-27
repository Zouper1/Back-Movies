require("dotenv").config();
const express = require("express");
const cors = require("cors");
const dbConnect = require("./config/mongo");
const cookieParser = require("cookie-parser");
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());
const port = process.env.PORT || 4001;
app.use("/api", require("./routes"));

app.listen(port, () => {
  console.log("🔑 Servidor corriendo http://localhost:" + port);
});

dbConnect();
