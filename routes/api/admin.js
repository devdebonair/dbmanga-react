var Admin = require("../../database/models/ModelAdmin");

module.exports = function(router)
{
    router.route('/admin')
        
        .get( function(req, res){
            
            Admin.find(function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(admin);
            });
        })
        
        .post( function(req, res){
            
            var admin = new Admin();
            
            console.log(admin);
            
            for(var object in req.body)
            {
                admin[object] = req.body[object];
            }
            
            admin.save(function(err){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.send(admin);
            });
        });
        
    router.route('/admin/:admin_id')
    
        .get(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(admin);
            });
        })
        
        .delete(function(req, res){
            
            Admin.remove( { _id: req.params.admin_id }, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(admin);
            });
        });
        
    router.route('/admin/:admin_id/notifications')
        
        .get(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(admin.notifications);
            });
        })
        
        .post(function(req, res){

            Admin.findByIdAndUpdate( req.params.admin_id, { $push: { notifications: req.body } }, 
                function(err, admin){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(admin.notifications);
                });
        });
        
    router.route('/admin/:admin_id/notifications/:notification_id')
        
        .get(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                var notification = admin.notifications.id(req.params.notification_id);
                res.json(notification);
            });
        })
        
        .delete(function(req, res){
            
            Admin.findByIdAndUpdate( req.params.admin_id, { $pull: { notifications: { _id: req.params.notification_id } } }, 
                function(err, admin){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(admin.notifications);
                });
        });

    router.route('/admin/:admin_id/events')
        
        .get(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(admin.events);
            });
        })
        
        .post(function(req, res){
            
            Admin.findByIdAndUpdate( req.params.admin_id, { $push: { events: req.body } },
                function(err, admin){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(admin.events);
                });
        });
        
    router.route('/admin/:admin_id/events/:event_id')
        
        .get(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                var event = admin.events.id(req.params.event_id);
                res.json(event);
            });
        })
        
        .put(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                var event = admin.events.id(req.params.event_id);
                
                for( var key in req.body )
                {
                    if(event[key])
                    {
                        event[key] = req.body[key];
                    }
                }
                
                admin.save(function(err, admin){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(admin.events);
                });
            });
        })
        
        .delete(function(req, res){
            
            Admin.findByIdAndUpdate( req.params.admin_id, { $pull: { events: { _id: req.params.event_id } } },
                function(err, admin){
                    if(err, admin)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(admin.events);
                });
        });
        
    router.route('/admin/:admin_id/todos')
        
        .get(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                res.json(admin.todos);
            });
        })
        
        .post(function(req, res){
            
            Admin.findByIdAndUpdate( req.params.admin_id, { $push: { todos: req.body } },
                function(err, admin){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(admin.todos);
                });
        });
        
    router.route('/admin/:admin_id/todos/:todo_id')
        
        .get(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                var todo = admin.todos.id(req.params.todo_id);
                res.json(todo);
            })
        })
        
        .put(function(req, res){
            
            Admin.findById( req.params.admin_id, function(err, admin){
                if(err)
                {
                    res.send(err);
                    return;
                }
                
                var todo = admin.todos.id(req.params.todo_id);
                
                for( var key in req.body )
                {
                    if(todo[key])
                    {
                        todo[key] = req.body[key];
                    }
                }
                
                admin.save(function(err, admin){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(admin.todos);
                });
            });
        })
        
        .delete(function(req, res){
            
            Admin.findByIdAndUpdate( req.params.admin_id, { $pull: { todos: { _id: req.params.todo_id } } },
                function(err, admin){
                    if(err)
                    {
                        res.send(err);
                        return;
                    }
                    res.json(admin.todos);
                });
        });
};