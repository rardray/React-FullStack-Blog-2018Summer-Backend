var express =  require('express');
var router = express.Router();
var mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/client');
var db = mongoose.connection;
db.on('error', function(msg) {
    console.log("Mongoose: Unable to connect ot database")
})

db.once('open', function(){
    console.log("Mongoose connected to client database")
})

//var Posts = require('../models/client')
var models = require('../models/client'),
Posts = models.Posts,
Comments = models.Comments

router.get('/posts/list', function(req, res) {
    Posts.find({}).sort('-rawDate').exec(function(err, posts){
    if (err) {
        console.log("Unable to load posts")
    } else {
        res.json(posts)
    }
    })
})

router.post('/posts/add', function(req, res) {
    console.log(req.body)
    var post = new Posts(req.body)
    post.save(function(err, result) {
        if(err){res.status(404)
        } else {
    res.status(201).send('Post Added')
        }
    })
})
router.get('/posts/recent/:id', function(req, res) {
    Posts.find({"uid" : req.params.id}).sort('-rawDate').limit(5).exec(function(err, posts) {
      if(err) {
        console.log('error')
      } else {
        res.json(posts)
        console.log(posts)
      }
    })
  })
router.delete('/posts/delete/:id', function(req, res) {
    var id = req.params.id
    console.log(id)
    Posts.findByIdAndRemove((req.params.id) , function(err, docs) {
        if(err) { res.json(err)
        } else {
            res.status(201).send('Successfully deleted')
            console.log("post " + id + " successfully deleted")
        }
    })
})
router.put('/posts/comment/:id', function(req, res) {
    var id = req.params.id
    var body = req.body
    console.log(id)
    console.log(body)
    Posts.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, doj) {
        if(err) {res.json(err)
        } else {
            res.status(201).send('Successfully updated"')
        }
    })
})
router.put('/posts/edit/:id', function(req, res) {
    var id = req.params.id
    var body = req.body
    console.log(id)
    console.log(body)
    Posts.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, doj) {
        if(err) {res.json(err)
        } else {
            res.status(201).send('Successfully updated"')
        }
    })
})
router.get('/comments/edit/:id', function(req, res) {
    var id = req.params.id
    console.log(id)
    Posts.findOne({'comments._id' : id}, function(err, posts){
        if (err) {
            console.log("Error getting books from libray")
        } else {
            res.json(posts)
        }
        })
    })

module.exports = router;