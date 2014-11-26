module.exports = function(router, passport)
{
    router.route('/login')
        
        .get(function( req, res ){
            if(req.isAuthenticated())
            {
                res.redirect('/admin/dashboard');
                return;
            }
            res.render('admin/login', { layout: false });
        })
        
        .post(passport.authenticate('local-login-admin', {
            successRedirect: '/admin/dashboard',
            failureRedirect: '/admin'
        }));
};