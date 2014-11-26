module.exports = {
    
    env: {
        port: process.env.PORT
    },
    
    database: {
        connection: 'mongodb://catalyst:kiddollars@dbh84.mongolab.com:27847/debonair-manga',
        user: 'catalyst',
        password: 'kiddollars'
    },
    
    session: {
        secret: 'mySecret'
    }
};