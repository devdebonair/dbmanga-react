module.exports = function(router, passport, manga, user)
{
    // router.route('/manga')
    
    //     .get(function(req, res) {
    //         res.render('partials/manga', { 
    //             layout: 'layout',
    //             //user: req.user,
    //             meta:{ 
    //                 title: 'Debonair Manga - Read Naruto, One Piece, and Attack on Titan Online for Free', 
    //                 description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
    //                 keywords: 'manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
    //             } 
    //         });
    //     });
    
    router.route('/manga/:manga_name')
    
        .get(function(req, res) {
            var name = req.params.manga_name.replace(/_/gi, ' ').toLowerCase();
            manga.findOne({ title: name }, '-chapters.pages', null, function(err, data){

                if(err)
                {
                    req.redirect(301,'/');
                    return;
                }
                
                res.render('partials/manga', { 
                    layout: 'layout',
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
    
    router.route('/reader')
        .get(function(req, res) {
            
            res.render('partials/reader', { 
                layout: 'layout',
                meta:{ 
                    title: 'Debonair Manga - Read Online for Free', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: ''
                }
            });
        });
    
    router.route('/browse')
        .get(function(req, res) {
            
            res.render('partials/browse', { 
                layout: 'layout',
                meta:{ 
                    title: 'Debonair Manga - Read Online for Free', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: ''
                }
            });
        });
    // router.route('/manga/:manga_name/:chapterNumber')
        
    //     .get(function(req, res){
    //         var name = req.params.manga_name.replace(/_/gi, ' ');
    //         console.log(name);
    //         console.log(req.headers);
    //         manga.findOne({ title: name }, 'id title author coverUrl', null, function(err, data) {
    //             if(err)
    //             {
    //                 res.send(err);
    //                 return;
    //             }

    //             res.render('partials/reader', { 
    //                 layout: 'layout',
    //                 user: req.user,
    //                 title: data.title,
    //                 author: data.author,
    //                 id: data.id, 
    //                 coverUrl: data.coverUrl,
    //                 chapterNumber: req.params.chapterNumber,
    //                 meta:{ 
    //                     title: 'Debonair Manga - Read ' + data.title + ' Online for Free', 
    //                     description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
    //                     keywords: data.title + ', manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
    //                 } 
    //             });
    //         });
    //     });
};