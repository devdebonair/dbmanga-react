module.exports = function(router, passport, manga, user)
{
    router.route('/manga')
    
        .get(function(req, res) {
            res.render('temp/partials/browse-manga', { layout: 'layout' });
        });
    
    router.route('/manga/:manga_name')
    
        .get(function(req, res) {
            var name = req.params.manga_name.replace(/_/gi, ' ');
            manga.find({ title: name }, '-sources', null, function(err, data){
                if(err)
                {
                    req.redirect(301,'/');
                    return;
                }
                res.render('temp/partials/manga', { layout: 'temp/layout', manga: data[0] });
            });
        });
        
    router.route('/manga/:manga_name/:chapterNumber')
        
        .get(function(req, res){
            var name = req.params.manga_name.replace(/_/gi, ' ');
            manga.find({ title: name }, 'id title', null, function(err, data) {
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.render('temp/partials/reader', { layout: 'temp/layout', title: data[0].title, id: data[0].id, chapterNumber: req.params.chapterNumber });
            });
        });
};