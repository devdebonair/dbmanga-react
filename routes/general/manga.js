module.exports = function(router, passport, manga, user)
{
    router.route('/manga')
    
        .get(function(req, res) {
            res.render('temp/partials/browse-manga', { 
                layout: 'temp/layout',
                user: req.user,
                meta:{ 
                    title: 'Debonair Manga - Read Naruto, One Piece, and Attack on Titan Online for Free', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: 'manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                } 
            });
        });
    
    router.route('/manga/:manga_name')
    
        .get(function(req, res) {
            var name = req.params.manga_name.replace(/_/gi, ' ');

            manga.findOne({ title: name }, '-sources', null, function(err, data){
                if(err)
                {
                    req.redirect(301,'/');
                    return;
                }
                
                res.render('temp/partials/manga', { 
                    layout: 'temp/layout',
                    user: req.user,
                    manga: data,
                    meta:{ 
                        title: 'Debonair Manga - Read ' + data.title + ' Online for Free', 
                        description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                        keywords: data.title + data.author + ', manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                    } 
                });
            });
        });
        
    router.route('/manga/:manga_name/:chapterNumber')
        
        .get(function(req, res){
            var name = req.params.manga_name.replace(/_/gi, ' ');
            manga.findOne({ title: name }, 'id title author', null, function(err, data) {
                if(err)
                {
                    res.send(err);
                    return;
                }

                res.render('temp/partials/reader', { 
                    layout: 'temp/layout',
                    user: req.user,
                    title: data.title,
                    author: data.author,
                    id: data.id, 
                    chapterNumber: req.params.chapterNumber,
                    meta:{ 
                        title: 'Debonair Manga - Read ' + data.title + ' Online for Free', 
                        description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                        keywords: data.title + ', manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                    } 
                });
            });
        });
};