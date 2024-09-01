const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");

router.post("/", async (req, res) => {
    const { username, password } = req.body;
    const user = await Users.findOne({ where: { username: username } });
    if (user) { res.json({ error: "User Already Exists" }); }
    else {
        bcrypt.hash(password, 10).then((hash) => {
            Users.create({
                username: username,
                password: hash,
            }).then((user) => {
                res.json(user.id);
            });
        });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username } });

    if (!user) {
        res.json({ error: "User Doesn't Exist" })
    } else {
        bcrypt.compare(password, user.password).then(async (match) => {
            if (!match) {
                res.json({ error: "Wrong Username And Password Combination" });
            } else {
                res.json(
                    user.id
                );
            }
        });
    }
});


module.exports = router;