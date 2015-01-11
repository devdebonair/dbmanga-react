var User = require("../../database/models/ModelUser");

module.exports = function(router)
{
    router.route('/users')
        
        .get(function(req, res){
            
            User.find(function(err, users){
                
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(users);
            });
        })
        
        .post(function(req, res){
            
            console.log(req.body);
            
            var user = new User(req.body);
            
            user.save( function(err){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json({ message: 'Success', user: user });
            });
        });
        
    router.route('/users/:user_id')
    
        .get(function(req, res){

            User.findById( req.params.user_id, function(err, user){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(user);
            });
        })
        
        .put(function(req, res){
            
            User.findByIdAndUpdate( req.params.user_id, req.body, function(err, user){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json( { message: 'Successful.', user: user } );
            });
        })
        
        .delete(function(req, res){
            
            User.remove( { _id: req.params.user_id }, function(err, user) {
			    if (err)
			    {
				    res.send(err);
				    return;
			    }
			    res.json({ message: 'Successful.' });
		    });
        });
};