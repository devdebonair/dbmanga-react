module.exports = function(router, passport, Manga, User)
{
    router.route('/signup')
        
        .get(function(req, res){
            if(req.user)
            {
                res.redirect(301, '/');
                return;
            }
            res.render('partials/signup', { 
                layout: false,
                meta:{ 
                    title: 'Debonair Manga - Read Naruto, One Piece, and Attack on Titan Online for Free', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: 'manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                }
            });
        })
        
        .post(function(req, res){
            
            var user = new User(req.body);
            user.save(function(err, user){
                if(err)
                {
                    res.redirect(301, '/signup');
                    return;
                }
                req.login(user, function(err){
                    if(err)
                    {
                        res.redirect(301, '/login');
                    }
                });
                res.redirect(301, '/');
            });
        });
};