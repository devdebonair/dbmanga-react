module.exports = function(router)
{
    router.get('/dashboard', isLoggedIn, function(req, res){
        res.render('admin/dashboard', { layout: false, admin: JSON.stringify(req.user) });
    });
};


function isLoggedIn(req, res, next)
{
    if(req.isAuthenticated())
    {
        next();
        return;
    }
    res.redirect(301, '/admin');
}