
module.exports = {
  
    // Useful with RESTful APIs.  Allows you to either send json response or html
    // var rendering = require('./util/rendering');
    // rendering.render(req, res, data);
    render: function(req, res, data) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");

        if(/application\/json/.test(req.get('accept'))) {
            res.json(data);
        } else {
            res.render('data/basic', {
                data: data
            });
        }
    }
}
