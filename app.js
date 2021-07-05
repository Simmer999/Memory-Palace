if(process.env.MODE_ENV !== 'production') {
    require('dotenv').config()
}

const express = require('express');
const app = express();
const router = express.Router();
const ejs = require('ejs')
const path = require('path')
const expressEjsLayout = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");

//======================================================= passport config
require('./config/passport')(passport)
//======================================================= passport config


//======================================================= Mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.DB, {
    useNewUrlParser: true, 
    useUnifiedTopology : true
})
const db = mongoose.connection
db.on('error', console.log.bind(console, 'connection error'))
db.once('open', (callback) => {
    console.log('Connected to MongoDB through Mongoose.')
})
//======================================================= Mongoose


//========================================================= Route imports.
const booksRoutes = require('./api/routes/books')
const moviesRoutes = require('./api/routes/movies')
const essayRoutes = require('./api/routes/essayCols')
const poemsRoutes = require('./api/routes/poems')
const userRoutes = require('./api/routes/users')

app.use('/', booksRoutes)
app.use('/', moviesRoutes)
app.use('/', essayRoutes)
app.use('/', poemsRoutes)
app.use('/', userRoutes)
//========================================================= Route imports.


app.set('view engine','ejs')
app.set('views', path.join(__dirname, 'views'))


//======================================================= app.use
app.use(expressEjsLayout)
app.use(express.urlencoded({extended : false}))
app.use(flash())
app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}));
app.use(passport.initialize())
app.use(passport.session())
// app.use(methodOverride('_method'))

app.use(express.static(path.join(__dirname, 'public')))
// app.use(morgan('dev'))
// app.use(bodyParser.urlencoded({ extended: true }))
// app.use(bodyParser.json())

app.use((req,res,next)=> {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error  = req.flash('error');
    next();
    })
//======================================================= app.use


//======================================================= Routes from "module.exports = router" files.
app.use('/', require('./api/routes/index'));
app.use('/users',require('./api/routes/users'));
//======================================================= Routes from "module.exports = router" files.


//======================================================= Experimentation
const memoryPalace = process.env.DB

app.get('/', (req, res) => {
    db.find(req.memoryPalace.users)
    .toArray()
    .then(results => {
        res.send('Hello World')
        console.log(req.body)
    })
})

// app.get('/', function (req, res) {
//     res.send('root')
//   })



//======================================================= Experimentation




module.exports = app

// app.listen(5555); 