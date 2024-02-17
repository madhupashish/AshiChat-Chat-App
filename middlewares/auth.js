const isLogin = (req, res, next) => {
    try {
        if (req.session.user) {
            return res.redirect('/');
        }
        next();
    } catch (error) {
        console.error('Error in isLogin middleware:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

const isLogout = (req, res, next) => {
    try {
        if (req.session.user) {
            return res.redirect('/dashboard');
        }
        next();
    } catch (error) {
        console.error('Error in isLogout middleware:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    isLogin,
    isLogout
};
