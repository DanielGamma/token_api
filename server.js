const express = require("express");
const app = express();

const port = 3000;

const bcrypt = require("bcrypt");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.get("/", async (req, res) => {
    const bearer = req.headers.authorization;
    const { name } = req.body;
    try {
        if (!bearer) {
            return res.status(401).send({ status: "unauthenticated", error: "No token provided. You can get a token in /auth." })
        }
        else if (!bearer.startsWith("Bearer ")) {
            return res.status(401).send({ status: "unauthenticated", error: "Token format is not correct. Please, check your syntax." })
        }
        else {
            const token = bearer.split(" ")[1];
            const isAuthenticated = await bcrypt.compare(name, token);
            if (!isAuthenticated) {
                return res.status(401).send({ status: "unauthenticated", error: "Did you think you could fool me?! You shall not pass!" })
            } else {
                return res.send({ status: "authenticated", message: `Congratulations ${name}!` })
            }
        }
    } catch (error) {
        return res.send({ error: "An error occurred. Contact your handsome teacher for assistance." })
    }
});

app.post("/auth", async (req, res) => {
    const { name } = req.body;
    try {
        if (name) {
            const hash = await bcrypt.hash(name, 5);
            res.send({ token: hash });
        } else {
            res.send({ error: "No name provided. Please, send your name to get a token." })
        }

    } catch (error) {
        res.send({ error: "An error occurred. Contact your handsome teacher for assistance." })
    }

});

app.listen(port, () => {
    console.log(`App listening in port ${port}`);
});

module.exports = app;