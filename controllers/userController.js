/* ----- A-Importing Dependencies ----- */

const User = require('../databases/userModel');
const bcrypt = require('bcrypt');

/* ----- B-Register Page Rendering ----- */

const registerPageRender = async (req, res) => {
    try {
        return res.render('register');
    } catch (error) {
        console.log(error.message);
    }
}

/* ----- C-Registering a New User ----- */

const registerUser = async (req, res) => {
    try {
        const passwordHash = await bcrypt.hash(req.body.password, 10);
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            image: 'userImages/' + req.file.filename,
            password: passwordHash
        });
        await user.save();
        return res.render('dashboard', { message: 'Registration Successful' });
    } catch (error) {
        console.log(error.message);
    }
}

/* ----- D-Login User ----- */
const loginPageRender = async (req, res) => {
    try {
        return res.render('login');
    } catch (error) {
        console.log(error.message)
    }
}

const loginUser = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        console.log('Login attempt with email:', email);

        const userData = await User.findOne({ email: email });
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password);
            console.log('Password match result:', passwordMatch);

            if (passwordMatch) {
                req.session.user = userData; // Set user data in session
                return res.redirect('/dashboard'); // Return the response and exit the function
            } else {
                console.log('Password incorrect');
                return res.render('login', { message: "Email or password incorrect" }); // Return the response and exit the function
            }
        } else {
            console.log('Email not found');
            return res.render('login', { message: "Email or password incorrect" }); // Return the response and exit the function
        }
    } catch (error) {
        console.log('Error in login:', error.message);
    }
};

/* ----- E-Logout User ----- */
const logoutUser = async (req, res) => {
    try {
        req.session.destroy();
        return res.redirect('/');
    } catch (error) {
        console.log(error.message)
    }
}

/* ----- F-User Dashboard ----- */
const dashboardPageRender = async (req, res) => {
    try {
        return res.render('dashboard', { user: req.session.user })
    } catch (error) {
        console.log(error.message)
    }
}


/* ----- X-Exporting Functions ----- */

module.exports = {
    registerPageRender,
    registerUser,
    loginPageRender,
    loginUser,
    logoutUser,
    dashboardPageRender
}
