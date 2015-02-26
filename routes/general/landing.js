module.exports = function(router)
{
    router.route('/landing')
    
        .get(function(req, res){
            res.render('landing', {
                layout: false
            });
        });
};