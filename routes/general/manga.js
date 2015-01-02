module.exports = function(router, passport, manga, user)
{
    router.route('/manga')
    
        .get(function(req, res) {
            res.render('partials/browse-manga', { layout: 'layout' });
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
        
    
};