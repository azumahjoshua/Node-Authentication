const express = require("express")
const app = express();
const dotenv = require('dotenv')
const mongoose = require("mongoose")

dotenv.config();

// connect to DB
mongoose.connect(process.env.DB_CONNECT)
const authRouth = require("./routes/auth")


app.use("/api/user",authRouth)
app.listen(5000,()=>console.log("Server Up and running"))

// GDNjrR2QcoAZvhM9