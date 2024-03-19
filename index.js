const express = require("express");
const app = express();
const dotenv = require('dotenv');
const mongoose = require("mongoose");
const authRoute = require("./routes/auth"); // Corrected variable name

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT) 
app.use(express.json());

app.use("/api/user", authRoute); // Corrected route variable name
app.listen(5000, () => console.log("Server Up and running"));

// GDNjrR2QcoAZvhM9