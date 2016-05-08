var express = require('express');
var router = express.Router();
var ejs = require('ejs');
var session = require('express-session');

router.get('/', function(req, res) {
	res.render('user/edit', {
		req : req,
		error : null
	});
});

router.post('/', function(req, res, next) {

	var sqlFind = "select * from users ";
	var body = req.body;
	var sqlNewPassword = "update users set password=? where email=?," [body.password, body.email];
	//var sqlUserId = "select last_insert_id() as user_id";;
	req.getConnection(function(err, connection){
		if(err){
	         next(err);
	}
	var query = connection.query(sqlFind, [body.password], function(err, results) {
	    if(err) throw err;
	    console.log("query");
	    if(body.password==password) {
	        var query = connection.query(sqlNewPassword, [req.body.password], function(err, results) {
	            if(err) throw err;
	            console.log("update password");
	                connection.end();
	                });
	        }
	});
	});
});
module.exports = router;