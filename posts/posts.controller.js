const express = require('express');
const router = express.Router();
const postService = require('./post.service');
const authorize = require('helpers/authorize');
const Role = require('helpers/role');

posts = [];

// routes
router.post('/posts', authorize(Role.Admin), createNewPost); // admin only
router.put('/posts/:id', authorize(Role.Admin), updatePost); // admin only
router.delete('/posts/:id', authorize(Role.Admin), deletePost); // admin only
router.get('/posts', authorize(), getPosts);       // all authenticated login
module.exports = router;


function getPosts(req, res, next){
  console.log(req.query);
  postService.getPosts(req.query)
      .then(posts => res.json(posts))
      .catch(err => next(err));
}

function createNewPost(req, res, next) {
  postService.createNewPost(req.body)
      .then(post => post ? res.json({message: "post created successfully", data: post})
          : res.status(400).json({message: "Bad Request"}))
      .catch(err => next(err));

}

function updatePost(req, res, next) {
  console.log(req.params);
  postService.updatePost({id: req.params.id, ...req.body})
      .then(post => post ? res.json({message: "post updated successfully", data: post})
          : res.status(400).json({message: "Bad Request"}))
      .catch(err => next(err));

}

function deletePost(req, res, next) {
  postService.deletePost({id: req.params.id})
      .then(post => post ? res.json({message: "post deleted successfully"})
          : res.status(400).json({message: "Bad Request"}))
      .catch(err => next(err));

}