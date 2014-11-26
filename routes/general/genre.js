module.exports = function(router, passport, manga, user)
{
    router.route('/genres/:genre_name')
    
        .get(function(req, res){
            res.render('partials/home', {layout: 'layout'});
        });
};