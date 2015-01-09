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
                res.render('temp/partials/search.html', { 
                    layout: 'temp/layout', 
                    results: data,
                    meta:{ 
                        title: 'Debonair Manga - Read Manga Online for Free', 
                        description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                        keywords: 'manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                    } 
                });
            });
        });
};