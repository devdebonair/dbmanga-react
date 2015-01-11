module.exports = function(router, passport, manga, user)
{
    router.route('/genres')
    
        .get(function(req, res) {
            res.render('partials/genres', {
                layout: 'layout',
                user: req.user
            });
        });
        
    router.route('/genres/:genre_name')
    
        .get(function(req, res){
            res.render('partials/home', {
                layout: 'layout',
                user: req.user
            });
        });
};