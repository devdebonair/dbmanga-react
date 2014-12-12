var Article = require("../../database/models/ModelArticle");
var Marksman = require("../../scripts/dbmarksman");

module.exports = function(router)
{
    router.route('/news')
        
        .get(function(req, res){
            res.redirect(301, '/');
        });
        
    router.route('/news/:news_id')
    
        .get(function(req, res){
            Article.findById(req.params.news_id, req.query.select, function(err, article){
                if(err)
                {
                    res.send(err);
                    return;
                }
                var marksman = new Marksman();
                var html = marksman.toDiv(article);
                res.render('partials/news', { article: html, articleObject: article });
            });
        });
};