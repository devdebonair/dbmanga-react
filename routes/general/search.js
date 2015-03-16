module.exports = function(router, passport, manga)
{
    router.route('/search')
    
        .get(function(req, res){
            
            manga.find({ title: { $regex: new RegExp('^' + req.query.q, 'i') } }, 'title coverUrl artist description genres', { sort: { 'views.currentWeek': -1 } }, function(err, data){
                if(err)
                {
                    res.status(404).json(err);
                    return;
                }
                res.json(data);
            });
        });
};