module.exports = function(router, passport, manga, user)
{
    router.route('/')
    
        .get(function(req, res){
            res.render('temp/partials/home', { layout: 'temp/layout' });
        });
};