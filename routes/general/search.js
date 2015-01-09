module.exports = function(router, passport, manga)
{
    router.route('/search')
    
        .get(function(req, res){
            
            manga.find({ title: { $regex: new RegExp(req.query.q, 'i') } }, 'title coverUrl artist description', function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.render('temp/partials/search.html', { layout: 'temp/layout', results: data });
            });
        });
};