var Manga = require("../../database/models/ModelManga");

module.exports = function(router)
{
    router.route('/manga')
        
        .post(function(req, res){

            var manga = new Manga();
            
            for( var key in req.body )
            {
                manga[key] = req.body[key];
            }
            
            manga.save(function(err, manga){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(manga);
            });
        });
    
    router.route('/manga/directory')
    
        .get(function(req, res) {
            Manga.find(null, 'title id', function(err, data){
                if(err)
                {
                    req.send(err);
                    return;
                }
                res.json(data);
            });
        });
        
    router.route('/manga/:manga_id')
        
        .get(function(req, res){
            console.log(req.query.select);
            Manga.findById( req.params.manga_id, req.query.select, function(err, manga){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(manga);
            });
        })
        
        .put(function(req, res){
            
            Manga.findByIdAndUpdate( req.params.manga_id, req.body, function(err, manga){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(manga);
            });
        })
        
        .delete(function(req, res){
            
            Manga.findByIdAndRemove( req.params.manga_id, function(err, manga){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(manga);
            });
        });
        
    router.route('/manga/:manga_id/likes')
    
        .put(function(req, res){
            Manga.findByIdAndUpdate(req.params.manga_id, { $inc: { likes: 1 }}, function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(data.likes);
            })
        })
        
        .delete(function(req, res){
            Manga.findByIdAndUpdate(req.params.manga_id, { $inc: { likes: -1 }}, function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(data.likes);
            })
        });
        
    router.route('/manga/:manga_id/dislikes')
    
        .put(function(req, res){
            Manga.findByIdAndUpdate(req.params.manga_id, { $inc: { dislikes: 1 }}, function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(data.likes);
            });
        })
        
        .delete(function(req, res){
            Manga.findByIdAndUpdate(req.params.manga_id, { $inc: { dislikes: -1 }}, function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(data.likes);
            });
        });
        
        
    router.route('/manga/:manga_id/chapters')
        
        .get(function(req, res){
            var fields = req.query.select.split(' ');
            var select = '';
            for(var i = 0; i < fields.length; i++)
            {
                if(fields[i].charAt(0) === '-')
                {
                    select += '-';
                }
                select += 'chapters.' + fields[i] + ' ';
            }
            
            Manga.findById(req.params.manga_id, select, function(err, manga){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(manga.chapters);
            });
        })
        
        .post(function(req, res){
            
            Manga.findByIdAndUpdate( req.params.manga_id, { $push: { chapters: req.body } },
                function(err, manga){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(manga);
                });
        });
        
    router.route('/manga/:manga_id/chapters/:chapter_number')
        
        .get(function(req, res) {
            
            Manga.findById( req.params.manga_id, function(err, manga) {
                if(err)
                {
                    res.send(err);
                    return;
                }
                
                var chapterToReturn = null;
                
                for( var i = 0; i < manga.chapters.length; i++ )
                {
                    if(manga.chapters[i].number === parseInt(req.params.chapter_number) )
                    {
                        chapterToReturn = manga.chapters[i];
                    }
                }
                
                if(!chapterToReturn)
                {
                    res.send({ error: "Chapter " + req.params.chapter_number +
                                        ' is not available.'});
                    return;
                }

                res.json(chapterToReturn.pages);
            });    
        })
        
        .delete(function(req, res) {
            
            Manga.findByIdAndUpdate(req.params.manga_id, { $pull: { chapters: { number: req.params.chapter_number }} },
                function(err, manga) {
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(manga);
                });
        });
    
    router.route('/manga/popular/:limit')
    
        .get(function(req, res) {
            
            Manga.findPopular(req.params.limit, function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(data);
            });
        });
        
    router.route('/manga/trending/:limit')
    
        .get(function(req, res) {
            
            Manga.findTrending(req.params.limit, function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(data);
            });
        });
        
    router.route('/manga/updated/:limit')
    
        .get(function(req, res) {
            
            Manga.findUpdated(req.params.limit, function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(data);
            });
        });
        
};