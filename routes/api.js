var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

//DB connect setting 

// Mongoose Schema definition
var Schema = mongoose.Schema;
var Users_login_Schema = new Schema({
    name: String
});

// Mongoose Model definition
var Users_login = mongoose.model('Users', Users_login_Schema);


router.get('/', function(req, res) {
  res.json({ message: '歡迎進入! welcome to our api!' }); 
});

// on routes that end in /users
// ----------------------------------------------------
router.route('/users')

  // 用postman POST http://localhost:3000/users
  .post(function(req, res) {
    var users = new Users_login();    // create a new instance of the Users_login model
    users.name = req.body.name;  // set the users name (comes from the request)
    console.log(users)
    users.save(function(err) {
      if (err)
        res.send(err);

      res.json({ message: 'Users_login created!' });
    });

    
  })

  .get(function(req, res) {
    Users_login.find(function(err, users) {
      if (err)
        res.send(err);

      res.json(users);
    });
  });

// on routes that end in /users/:user_id
// ----------------------------------------------------
router.route('/users/:user_id')

  .get(function(req, res) {
    Users_login.findById(req.params.user_id, function(err, bear) {
      if (err)
        res.send(err);
      res.json(bear);
    });
  })

  .put(function(req, res) {
    Users_login.findById(req.params.user_id, function(err, bear) {

      if (err)
        res.send(err);

      users.name = req.body.name;
      users.save(function(err) {
        if (err)
          res.send(err);

        res.json({ message: 'Users_login updated!' });
      });

    });
  })

  // delete the bear with this id
  .delete(function(req, res) {
    Users_login.remove({
      _id: req.params.user_id
    }, function(err, bear) {
      if (err)
        res.send(err);

      res.json({ message: 'Successfully deleted' });
    });
  });




module.exports = router;
