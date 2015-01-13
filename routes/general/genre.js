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
            manga.find({ genres: { $elemMatch: [req.params.genre_name] } }, '-sources', function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.render('temp/partials/genre', {
                    layout: 'temp/layout',
                    user: req.user,
                    results: data,
                    meta:{ 
                        title: 'Debonair Manga - Read ' + data.title + ' Online for Free', 
                        description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                        keywords: data.title + ', manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                    }
                });
            });
        });
};