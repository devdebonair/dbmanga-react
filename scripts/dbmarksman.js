function Marksman(object)
{
    this.charset = 'UTF-8';
}

Marksman.prototype = {
    
    toHtml: function(object)
    {
        if(!object)
        {
            return new Error('Object not specified.');
        }

        var innerHead = '';
        var innerBody = '';
        
        innerHead += '<meta name="charset"' + 'content="' + this.charset + '">';        
        innerHead += '<title>' + object.title + '</title>';
        innerHead += '<meta name="description"' + 'content="' + object.summary + '">';
        innerHead += '<meta name="keywords"' + 'content="' + object.keywords + '">';
        innerHead += '<meta name="author"' + 'content="' + object.author + '">';
        
//============================ Links ===========================================
        //Replace the links in the markup
        var links = object.markup.match(/\$\/link:(\d*)\/\$/gi);
        
        if(links)
        {
            links = links.map(function(link){
                return link.replace('$/link:', '').replace('/$','');
            });
            for(var i = 0; i < links.length; i++)
            {
                var anchorObject = null;
                for(var j = 0; j < object.links.length; j++)
                {
                    if(links[i] === object.links[j].id)
                    {
                        anchorObject = object.links[j];
                    }
                }
                if(!anchorObject)
                {
                    continue;
                }
                var url = anchorObject.url;
                var text = anchorObject.text;
                var anchor = '<a href="'+ url +'" target="_blank">'+ text +'</a>';
                object.markup = object.markup.replace('$/link:' + links[i] + '/$', anchor);
            }
        }
        
//============================ Images ==========================================    
        //Replace all images in markup
        var images = object.markup.match(/\$\/image:(\d*)\/\$/gi);
        if(images)
        {
            images = images.map(function(image){
                return image.replace('$/image:','').replace('/$','');
            });
            for(var i = 0; i < images.length; i++)
            {
                var image = null;
                
                //Find image by id
                for(var j = 0; j < object.media.images.length; j++)
                {
                    if(images[i] === object.media.images[j].id)
                    {
                        image = object.media.images[j];
                    }
                }
                if(!image)
                {
                    continue;
                }
                var imageUrl = image.url;
                var imageText = image.text;
                var imgTag = '<img src="' + imageUrl + '" alt="' +imageText + '" style="display:block"/>';
                object.markup = object.markup.replace('$/image:' + images[i] + '/$', imgTag);
            }
        }
        
        var paragraphs = object.markup.match(/(.*?)\$\/break\/\$/gi);
        var newBody = '';
        for(var i = 0; i < paragraphs.length; i++)
        {
            newBody += '<p>' + paragraphs[i].replace('$/break/$', '</p>');
        }
        innerBody = newBody;
        
        var head = '<head>' + innerHead + '</head>';
        var body = '<body>' + innerBody + '</body>';
        var DOM = '<DOCTYPE html>' + '<html>' + head + body + '</html>';

        return DOM;
    },
    
    toDiv: function(object)
    {
        if(!object)
        {
            return new Error('Object not specified.');
        }

        var innerBody = '';
        
        //============================ Links ===========================================
        //Replace the links in the markup
        var links = object.markup.match(/\$\/link:(\d*)\/\$/gi);
        
        if(links)
        {
            links = links.map(function(link){
                return link.replace('$/link:', '').replace('/$','');
            });
            for(var i = 0; i < links.length; i++)
            {
                var anchorObject = null;
                for(var j = 0; j < object.links.length; j++)
                {
                    if(links[i] === object.links[j].id)
                    {
                        anchorObject = object.links[j];
                    }
                }
                if(!anchorObject)
                {
                    continue;
                }
                var url = anchorObject.url;
                var text = anchorObject.text;
                var anchor = '<a href="'+ url +'" target="_blank">'+ text +'</a>';
                object.markup = object.markup.replace('$/link:' + links[i] + '/$', anchor);
            }
        }
        
//============================ Images ==========================================    
        //Replace all images in markup
        var images = object.markup.match(/\$\/image:(\d*)\/\$/gi);
        if(images)
        {
            images = images.map(function(image){
                return image.replace('$/image:','').replace('/$','');
            });
            for(var i = 0; i < images.length; i++)
            {
                var image = null;
                
                //Find image by id
                for(var j = 0; j < object.media.images.length; j++)
                {
                    if(images[i] === object.media.images[j].id)
                    {
                        image = object.media.images[j];
                    }
                }
                if(!image)
                {
                    continue;
                }
                var imageUrl = image.url;
                var imageText = image.text;
                var imgTag = '<img src="' + imageUrl + '" alt="' +imageText + '" style="display:block; margin-left: auto; margin-right: auto"/>';
                object.markup = object.markup.replace('$/image:' + images[i] + '/$', imgTag);
            }
        }
        
        var paragraphs = object.markup.match(/(.*?)\$\/break\/\$/gi);
        var newBody = '';
        for(var i = 0; i < paragraphs.length; i++)
        {
            newBody += '<p>' + paragraphs[i].replace('$/break/$', '</p>');
        }
        innerBody = newBody;
        return innerBody;
    },
    
    getContent: function(object)
    {
        return object.markup.replace(/\$.*\$/gi, '');
    }
};

module.exports = Marksman;