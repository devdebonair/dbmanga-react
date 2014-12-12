var Article = require("../../database/models/ModelArticle");
var Marksman = require("../../scripts/dbmarksman");

module.exports = function(router)
{
    router.route('/news')
    
        .post(function(req, res){
            var article = new Article();
            for(var key in req.body)
            {
                article[key] = req.body[key];
            }
            article.save(function(err, data){
                if(err)
                {
                    req.send(err);
                    return;
                }
                res.json(data);
            });
        });
    
    router.route('/news/:news_id')
        
        .get(function(req, res){
            Article.findById(req.params.news_id, req.query.select, function(err, article){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(article);
            });
        });
};