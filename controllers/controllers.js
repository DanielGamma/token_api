const bcrypt = require("bcryptjs");

const getAuth = async (req, res) => {
    const { email, password } = req.body;
    try {
        if (!email || !password) {
            return res.status(400).send({ code: 400, message: "No email or password provided. Please, send your credentials to get a token." })
        }
        else if (email === "gammatech@gmail.com" && password === "gamma23") {
            const salt = bcrypt.genSaltSync(5);
            const hash = bcrypt.hashSync("GammaTechSchool", salt);
            return res.status(200).send({ code: 200, bearer_token: hash })
        }
        else {
            return res.status(400).send({ code: 400, message: "Wrong email or password. Impersonating a worker of GammaTech School is a crime... Watch out or you'll end up in jail!" })
        }

    } catch (error) {
        return res.status(500).send({ code: 500, message: "An error occurred. Contact your handsome teacher for assistance.", error: error })
    }
}

const checkAuth = (req, res) => {
    const bearer = req.headers.authorization;
    try {
        if (!bearer) {
            return res.status(401).send({ code: 401, message: "No token provided. You can get a token in /auth." })
        }
        else if (!bearer.startsWith("Bearer ")) {
            return res.status(401).send({ code: 401, message: "Token format is not correct. Please, check your syntax." })
        }
        else {
            const token = bearer.split(" ")[1];
            const isAuthenticated = bcrypt.compareSync("GammaTechSchool", token);
            if (!isAuthenticated) {
                return res.status(401).send({ code: 401, message: "Did you think you could fool me?! You shall not pass!" })
            } else {
                return res.status(200).send({ code: 200, message: `Oh, I konw you, you shall pass!` })
            }
        }
    } catch (error) {
        return res.status(500).send({ error: "An error occurred. Contact your handsome teacher for assistance." })
    }
}

module.exports = {
    getAuth,
    checkAuth
}