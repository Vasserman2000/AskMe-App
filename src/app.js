const path = require('path')
const hbs = require('hbs')
const express = require('express')
const userRouter = require('../src/routes/user')
const indexRouter = require('../src/routes/index')
const surveyRouter = require('../src/routes/survey')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('./db/mongoose')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(cookieParser())
app.use(userRouter)
app.use(indexRouter)
app.use(surveyRouter)




module.exports = app;