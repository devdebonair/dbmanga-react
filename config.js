module.exports = {
    
    env: {
        port: process.env.PORT || 3000
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
    },

    favicons: {
        "/apple-icon-57x57.png": __dirname + '/public/images/favicon/apple-icon-57x57.png',    
        "/apple-icon-60x60.png": __dirname + '/public/images/favicon/apple-icon-60x60.png',    
        "/apple-icon-72x72.png": __dirname + '/public/images/favicon/apple-icon-72x72.png',    
        "/apple-icon-76x76.png": __dirname + '/public/images/favicon/apple-icon-76x76.png',    
        "/apple-icon-114x114.png": __dirname + '/public/images/favicon/apple-icon-114x114.png',  
        "/apple-icon-120x120.png": __dirname + '/public/images/favicon/apple-icon-120x120.png',  
        "/apple-icon-144x144.png": __dirname + '/public/images/favicon/apple-icon-144x144.png',  
        "/apple-icon-152x152.png": __dirname + '/public/images/favicon/apple-icon-152x152.png',  
        "/apple-icon-180x180.png": __dirname + '/public/images/favicon/apple-icon-180x180.png',  
        "/android-icon-192x192.png": __dirname + '/public/images/favicon/android-icon-192x192.png',    
        "/favicon-32x32.png": __dirname + '/public/images/favicon/favicon-32x32.png',   
        "/favicon-96x96.png": __dirname + '/public/images/favicon/favicon-96x96.png',   
        "/favicon-16x16.png": __dirname + '/public/images/favicon/favicon-16x16.png',   
        "/ms-icon-144x144.png": __dirname + '/public/images/favicon/ms-icon-144x144.png'     
    }
};