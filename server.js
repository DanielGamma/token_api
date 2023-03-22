const express = require("express");
const app = express();

const port = 3000;

const bcryptjs = require("bcryptjs");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const { getAuth, checkAuth } = require("./controllers/controllers.js");

app.get("/", checkAuth);

app.post("/auth", getAuth);

app.listen(port, () => {
    console.log(`App listening in port ${port}`);
});

module.exports = app;