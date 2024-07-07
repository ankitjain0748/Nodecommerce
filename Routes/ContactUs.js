const router = require('express').Router();

const conactc= require("../Controller/ContactController")

router.post("/", conactc.contact);


module.exports = router