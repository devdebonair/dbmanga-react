'use strict';

var Ajax = function(){};

Ajax.prototype = {
    
    ajax: function(options)
    {
        var url         = options.url || '';
        var method      = options.method || 'GET';
        var contentType = options.contentType || 'application/json';
        var callback    = options.callback || function(err, data){console.log({error: err, data: data})};
        var data        = options.data || {};
        
        switch (method.toLocaleLowerCase()) {
            case 'get':
                this.get(url, callback);
                break;
                
            case 'post':
                this.post(url, contentType, data, callback);
                break;
            
            case 'delete':
                this.post(url, callback);
                break;
                
            case 'put':
                this.put(url, contentType, data, callback);
                break;
                
            default:
                this.get(url, callback);
                break;
        }
    },
    
    get: function(url, callback)
    {
        this._request(url, 'GET', '', null, callback);
    },
    
    post: function(url, contentType, data, callback)
    {
        this._request(url, 'PUT', contentType, data, callback);    
    },
    
    delete: function(url, callback)
    {
        this._request(url, 'DELETE', '', null, callback);    
    },
    
    put: function(url, contentType, data, callback)
    {
        this._request(url, 'PUT', contentType, data, callback);
    },
    
    _request: function(url, method, contentType, data, callback)
    {
        var request = XMLHttpRequest();
        request.open(method, url, true);
        request.setRequestHeader('Content-type', contentType);
        
        request.onload = function()
        {
            if(request.status >= 200 && request.status < 400)
            {
                var data = JSON.parse(request.responseText);
                return callback(null, data);
            }
            return callback({ error: request.responseText }, null);
        };
        
        request.onerror = function()
        {
            return callback({error: 'Error connecting to server.'}, null);
        };
        
        request.send(data);
    }
};

module.exports = Ajax;