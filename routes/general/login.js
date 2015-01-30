module.exports = function(router, passport)
{
    router.route('/login')
        
        .get(function(req, res){
            if(req.isAuthenticated())
            {
                res.redirect(301, '/');
                return;
            }
            res.render('partials/login', { 
                layout: false,
                meta:{ 
                    title: 'Debonair Manga - Read Naruto, One Piece, and Attack on Titan Online for Free', 
                    description: 'Read Naruto, One Piece, Attack on Titan and many more manga on the best manga reading platform for free.',
                    keywords: 'manga, reader, free, naruto, debonair, one, piece, bleach, titan, responsive, online'
                }
            });
        })
        
        .post(passport.authenticate('local-login-user', {
            successRedirect: '/',
            failureRedirect: '/login'
        }));
        
    router.route('/logout')
    
        .get(function(req, res){
            req.session.destroy();
            res.redirect(301, '/login');
        });
};