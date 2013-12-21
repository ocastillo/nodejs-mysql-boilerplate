module.exports = function(Bookshelf) {
    
    Bookshelf.mysqlAuth = Bookshelf.initialize({
        client: 'mysql',
        connection: {
            host     : 'localhost',
            user     : 'your_username',
            password : 'your_password',
            database : 'your_db_name'
        }
        // , debug: true
    });
}
