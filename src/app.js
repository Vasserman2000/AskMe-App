const path = require('path')
const hbs = require('hbs')
const express = require('express')
const userRouter = require('../src/routes/user')
const indexRouter = require('../src/routes/index')
const surveyRouter = require('../src/routes/survey')
const adminRouter = require('../src/routes/admin')
const questionRouter = require('../src/routes/question')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
require('./db/mongoose')

const app = express()

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/views/partials');

app.set('view engine', 'hbs');
hbs.registerHelper('toJSON', (object) => {
    return JSON.stringify(object)
})
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json())
app.use(cookieParser())
app.use([surveyRouter, adminRouter, indexRouter, userRouter, questionRouter])




module.exports = app;