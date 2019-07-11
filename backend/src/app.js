/////////////// ENV ////////////////////

const dotenv = require('dotenv');
const path = require('path');
const assert = require('assert');

const env = process.env.NODE_ENV || "dev"; // se não passar nada é "dev"
assert.ok(env === "prod" || env === "dev", 'invalid "env". Select "dev" or "prod"');

dotenv.config({
    path: path.join(__dirname, '../config', `.${env}.env`) // Define as variaveis de ambiente
});

//////////////////////////////////////

const express = require('express');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

const allowCors = require('./util/cors');

const indexRouter = require('./controllers/indexController');
const userRouter = require('./controllers/userController');
const authRouter = require('./controllers/authController');
const newsRouter = require('./controllers/newsController');

const app = express();

app.use(allowCors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(expressValidator());
app.use(express.static(path.join(__dirname, 'views')));

app.use(indexRouter);

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', newsRouter);

app.listen(process.env.PORT, () => {
    console.log(`backend running on port: ${process.env.PORT}`);
})

module.exports = app;
