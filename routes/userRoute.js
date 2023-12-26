/* ----- A-Importing Dependencies ----- */

const express = require('express');
const user_route = express();  // 1.1 => user_route is an instance of express()
const bodyParser = require('body-parser'); // 1.2 => To parse incoming request bodies.

// 1.1 => Setting up a session secret

const session = require('express-session');
const { SESSION_SECRET } = process.env;
user_route.use(session({ secret: SESSION_SECRET, resave: true, saveUninitialized: true }));


/* ----- B-Setting Up Body Parser ----- */

user_route.use(bodyParser.json())
// 2.1 => To handle links and urls & answer accordingly to client.
user_route.use(bodyParser.urlencoded({ extended: true }))


/* ----- C-Setting the View Engine and Views Directory ----- */

// 3.1 => Configure the view engine for the "user_route" application to be EJS.
user_route.set('view engine', 'ejs');
user_route.set('views', './views')

/* ----- D-Setting up the Multer Disk Storage ----- */

const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 4.1 => Destination directory where files are present using "__dirname" for absolute path.
        cb(null, path.join(__dirname, '../public/userImages'))  // error === null
    },
    filename: function (req, file, cb) {
        const fname = Date.now() + '-' + file.originalname;
        cb(null, fname);
    }
});

// 4.12 => How uploaded files will be handled in storage config. 
const upload = multer({ storage: storage });

/* ----- E-Routes ----- */

const userController = require('../controllers/userController')
const auth = require('../middlewares/auth')

// 5.1 => User Registeration Routes
user_route.get('/register', auth.isLogout, userController.registerLoad)
user_route.post('/register', upload.single('image'), userController.register)

// 5.2 => User login,logout Routes
user_route.get('/', auth.isLogout, userController.loadLogin);
user_route.post('/', userController.login);
user_route.get('/logout',auth.isLogin, userController.logout);

// 5.3 => User Dashboard Route
user_route.get('/dashboard', auth.isLogin,userController.loadDashboard);

// 5.4 => If no route matches

user_route.get('*', function (req, res) {
    res.redirect('/');
})

module.exports = user_route;