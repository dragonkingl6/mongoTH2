require('./models/db');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');

const taskController = require('./controller/taskController');
const { log } = require('console');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set('views', path.join(__dirname, '/views/'));

app.engine('hbs',exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/'
}))

app.set('view engine', 'hbs');
app.listen(8080, () => {
    console.log('ket noi thanh cong')
})
app.use('/', taskController);