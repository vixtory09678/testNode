exports.login = function(req, res){

    req.checkBody('email', 'Invalid email').notEmpty().isEmail();
    req.sanitizeBody('email').normalizeEmail();
    var errors = req.validationErrors();

    if (errors) {
        res.render('index', {
            title: 'error' + JSON.stringify(errors),
            isLoggedIn: false
        });
        return;
    }

    if (req.body.remember === 'remember') {
        req.session.remember = true;
        req.session.email = req.body.email;
    }

    res.render('index', {
        title: 'Logged in as ' + req.body.email,
        isLoggedIn: true
    });
}

exports.logout = function (req, res) {
    req.session = null;
    res.render('index', {
        title: 'Hello world',
        isLoggedIn: false
    })
}