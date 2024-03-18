const express = require("express")
const app = express();

const authRouth = require("./routes/auth")

app.use("/api/user",authRouth)
app.listen(5000,()=>console.log("Server Up and running"))