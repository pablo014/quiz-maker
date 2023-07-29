require('dotenv').config();

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.MONGO_URL;
db.quiz = require("./quiz.model.js")(mongoose);

module.exports = db;