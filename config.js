module.exports = {
    
    env: {
        port: process.env.PORT
    },
    
    database: {
        connectionString: 'mongodb://catalyst:kiddollars@dbh84.mongolab.com:27847/debonair-manga',
        user: 'catalyst',
        password: 'kiddollars'
    },
    
    session: {
        secret: 'mySecret'
    },
    
    mailchimp: {
        apiKey: '25839724454b981f21579504c8ae5e99-us10'
    }
};