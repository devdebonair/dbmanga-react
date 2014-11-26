module.exports = function(router, passport, manga, user)
{
    router.route('/manga')
    
        .get(function(req, res) {
            res.render('partials/browse-manga', { layout: 'layout' });
        });
    
    router.route('/manga/:manga_name')
    
        .get(function(req, res) {
            var title = req.params.manga_name.replace(/-/g,' ');
            manga.findOne({ title: title }).select('-sources').exec(function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.render('partials/manga', { layout: 'layout', manga: data });
            });
        });
        
    
};