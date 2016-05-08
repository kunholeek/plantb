var express = require('express');
var router = express.Router();
 
 router.get('/', function(req, res) {
    res.render('user_registreren/registreren', {req: req, error : null});
 });

router.post('/', function(req, res, next) {
   var email = req.body.email;
   var password = req.body.password;
   var name = req.body.name;

   req.getConnection(function(err, connection) {
      if(err){
         next(err);
      }

      connection.query('SELECT * FROM users', function(err, rows, fields){
         
          if(err){ return next(err); }
          var check = 0;
          for(var i=0; i<rows.length;i++){
                
                if(rows[i].email == email){
                  check = 1;
                }
              }
         
          
          if(email == "" || password == "" || name == "" ){
             var data = {
                 req: req,
                 error: "회원정보를 입력하세요"
             }
             res.render('user_registreren/registreren', data);
          }else if(check==1) {
              var data = {
                     req: req,
                     error: "중복된 이메일입니다"
                 }
                 res.render('user_registreren/registreren', data);
          }else{
             connection.query('INSERT INTO users (email, password, name) VALUES (?)', [[email, password, name]]);
             res.redirect('/index');
                
          }
       
         
       });
   });
});

module.exports = router;