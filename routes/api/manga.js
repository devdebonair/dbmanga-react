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
            var selectedFields = '';
            if(req.query.select)
            {
                selectedFields = req.query.select;
            }
            Manga.findById( req.params.manga_id, selectedFields, function(err, manga){
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
        
    router.route('/manga/:manga_id/sources')
        
        .get(function(req, res) {
            
            Manga.findById( req.params.manga_id, function(err, manga){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(manga.sources);
            });
        })
        
        .post(function(req, res){
            
            Manga.findByIdAndUpdate( req.params.manga_id, { $push: { source: req.body } },
                function(err, manga){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(manga.sources);
                });
        });
        
    router.route('/manga/:manga_id/sources/:source_name/chapters')
        
        .get(function(req, res){
            var selectedFields = "";
            if(req.query.select)
            {
                var requestedFields = req.query.select.split(' ');
                for(var i = 0; i < requestedFields.length; i++)
                {
                    var rawField = requestedFields[i];
                    var finalField = 'sources.' + 'chapters.' + rawField;
                    
                    if(rawField.indexOf('-') === 0)
                    {
                        finalField = '-sources.' + req.params.source_name + '.' + rawField.replace('-','');
                    }
                    selectedFields += finalField + ' ';
                }
            }
            Manga.findById(req.params.manga_id, selectedFields, function(err, manga){
                if(err)
                {
                    res.send(err);
                    return;
                }
                
                res.json(manga.sources[0].chapters);
            });
        })
        
        .post(function(req, res){
            
            Manga.findById( req.params.manga_id, function(err, manga){
                if(err)
                {
                    res.send(err);
                    return;
                }
                
                var scanOrigin = null;
                
                for( var i = 0; i < manga.sources.length; i++ )
                {
                    if(manga.sources[i].scanOrigin === req.params.source_name)
                    {
                        scanOrigin = manga.sources[i].chapters;
                        break;
                    }
                }
                scanOrigin.chapters.push(req.body);
                
                manga.save(function(err, manga){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(scanOrigin);
                });
            });
        });
        
    router.route('/manga/:manga_id/sources/:source_name/chapters/:chapter_number')
        
        .get(function(req, res) {
            
            Manga.findById( req.params.manga_id, function(err, manga) {
                if(err)
                {
                    res.send(err);
                    return;
                }
                
                var chapters = null;
                
                for( var i = 0; i < manga.sources.length; i++ )
                {
                    if(manga.sources[i].scanOrigin.toLowerCase() === req.params.source_name.toLowerCase())
                    {
                        chapters = manga.sources[i].chapters;
                        break;
                    }
                }
                
                if(chapters === null)
                {
                    res.send({ error: 'Must specify scan origin.'});
                    return;
                }
                
                var chapterToReturn = null;
                
                for( var i = 0; i < chapters.length; i++ )
                {
                    if(chapters[i].number === parseInt(req.params.chapter_number) )
                    {
                        chapterToReturn = chapters[i];
                    }
                }
                
                if(chapterToReturn === null)
                {
                    res.send({ error: "Chapter " + req.params.chapter_number +
                                        ' is not available.'});
                    return;
                }

                res.json(chapterToReturn.pages);
            });    
        })
        
        .delete(function(req, res) {
            
            Manga.findById(req.params.manga_id, function(err, manga) {
                if(err)
                {
                    res.send(err);
                    return;
                }
                
                var chapters = null;
                
                for( var i = 0; i < manga.sources.length; i++ )
                {
                    if(manga.sources[i].scanOrigin === req.params.source_name)
                    {
                        chapters = manga.sources[i].chapters;
                        break;
                    }
                }
                
                var isDeleted = false;
                for( var i = 0; i < chapters.length; i++ )
                {
                    if(chapters[i].number === parseInt(req.params.chapter_number))
                    {
                        var itemRemoved = chapters.splice(i,1);
                        
                        if(itemRemoved.length === 1)
                        {
                           isDeleted = true; 
                        }
                        break;
                    }
                }
                
                if(!isDeleted)
                {
                    res.send({ error: 'Could not delete chapter.' });
                    return;
                }
                
                manga.save(function(err, manga){
                    if(err)
                    {
                        res.send({ error: 'Could not delete chapter' });
                        return;
                    }
                    res.json({ message: 'Success.'});
                });
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