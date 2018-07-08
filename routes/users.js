var express =  require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/client');
var db = mongoose.connection;
db.on('error', function(msg) {
    console.log("Mongoose: Unable to connect ot database")
})

db.once('open', function(){
    console.log("Mongoose connected to users database")
})

var UserInfo = require('../models/users')

router.get('/userinfo/auth/:email', function(req, res) {
  var body = req.body
  console.log(req.body)
  UserInfo.findOne({"email" : req.params.email }, function(err, userinfo) {
    if (err) {
      console.log('Could not Load UserName')
    } else {
      res.json(userinfo)
    }
  })
})
router.get('/userinfo/session/:id', function(req, res) {
  var body = req.body
  console.log(req.body)
  UserInfo.findOne({"_id" : req.params.id }, function(err, userinfo) {
    if (err) {
      console.log('Could not Load UserName')
    } else {
      res.json(userinfo)
      console.log(userinfo)
    }
  })
})
router.get('/userinfo/:id', function(req, res) {
  var body = req.body
  console.log(req.params.uid)
  UserInfo.findOne({"_id" : req.params.id }, function(err, userinfo) {
    if (err) {
      console.log('Could not Load UserName')
    } else {
      res.json(userinfo)
      console.log(userinfo)
    }
  })
})

router.post('/userinfo/signup', function(req, res) {
  console.log(req.body)
  var userinfo = new UserInfo(req.body)
  userinfo.save(function(err, result) {
      if(err){res.status(404)
      } else {
  res.status(201).send('found')
      }
  })
})

router.get('/userinfo/list', function(req, res) {
  UserInfo.find({}).exec(function(err, posts){
  if (err) {
      console.log("Unable to load posts")
  } else {
      res.json(posts)
  }
  })
})
router.put('/userinfo/addphoto/:id', function(req, res) {
  var id = req.params.id
  var body = req.body
  console.log(id)
  console.log(body)
  UserInfo.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, doj) {
      if(err) {res.json(err)
      } else {
          res.status(201).send('Successfully updated"')
      }
  })
})

module.exports = router;
