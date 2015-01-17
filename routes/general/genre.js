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
            manga.find({ genres: { $in: [req.params.genre_name.replace(/_/g, ' ')] } }, '-sources', function(err, data){
                if(err)
                {
                    res.send(err);
                    return;
                }
                var selectedGenre = null;
                var availGenres = [{
                    genreName: 'adventure',
                    imageUrl: '/images/dragon-ball.jpg',
                    description: 'Adventure manga is a genre of manga in which a main protagonist journeys on an adventure, an exciting undertaking involving risk and physical danger. This theme forms the basis of the main storyline. Stories are mainly character driven and may have no ulterior motive.'
                },{
                    genreName: 'shounen',
                    imageUrl: '/images/attack-on-titan.jpg',
                    description: 'Shounen manga is typically characterized by high-action, often humorous plots featuring male protagonists. The camaraderie between boys or men on sports teams, fighting squads and the like is often emphasized. Attractive female characters like Bulma from Dragon Ball or Nami from One Piece, with exaggerated features are also common. Main characters may also feature an ongoing desire to better themselves.'
                },{
                    genreName: 'ecchi',
                    imageUrl: '/images/esdeath-ecchi.jpg',
                    description: 'A manga term denoting sexual content that is added into the story mainly for fans of the genre. Although borderline at times, ecchi manga does not usually involve nudity.'
                },{
                    genreName: 'mature',
                    imageUrl: '/images/mature.jpg',
                    description: 'Manga which features nudity and places characters in sexual situations. Themes are targeted towards adults and must be 18 years or older to view.'
                },{
                    genreName: 'shoujo',
                    imageUrl: '/images/the-flower-we-saw.jpg',
                    description: 'Shoujo manga is manga marketed to a female audience roughly between the ages of 10 and 18. Shoujo manga covers many subjects in a variety of narrative and graphic styles, from historical drama to science fiction — often with a strong focus on human and romantic relationships and emotions.'
                },{
                    genreName: 'seinen',
                    imageUrl: '/images/black-lagoon.jpg',
                    description: 'Seinen manga is manga marketed to a male audience aged roughly 17 on into their 40\'s. In Japanese, the word seinen means "young man" or "young men." Seinen manga are distinguished from "hentai", although there is sexual content of a softcore nature in some seinen series.'
                },{
                    genreName: 'romance',
                    imageUrl: '/images/nisekoi.jpg',
                    description: 'Romance manga place their primary focus on the relationship and romantic love between two people, and usually have an "emotionally satisfying and optimistic ending."'
                },{
                    genreName: 'harem',
                    imageUrl: '/images/the-world-god-only-knows.jpg',
                    description: 'Harem is an ambiguously-defined subgenre of anime and manga characterized by a protagonist surrounded, usually amorously, by three or more members of the opposing sex and/or love interests.'
                },{
                    genreName: 'slice_of_life',
                    imageUrl: '/images/nagi-no-asukara.png',
                    description: 'A slice of life story is a category for a story that portrays a "cut-out" sequence of events in a character\'s life. It usually tries to depict the everyday life of ordinary people, sometimes but rarely, with fantasy or science fiction elements involved.'
                }];
                
                for(var i = 0; i < availGenres.length; i++)
                {
                    if(availGenres[i].genreName === req.params.genre_name.toLowerCase())
                    {
                        selectedGenre = availGenres[i];
                    }
                }
                
                if(!selectedGenre)
                {
                    res.send(req.params.genre_name + 'is not a listed genre.');
                    return;
                }
                
                res.render('temp/partials/genre', {
                    layout: false,
                    genreName: selectedGenre.genreName.replace(/_/g, ' '),
                    genreDescription: selectedGenre.description,
                    genreImageUrl: selectedGenre.imageUrl,
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