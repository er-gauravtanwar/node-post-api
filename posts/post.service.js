const config = require('config.json');
const jwt = require('jsonwebtoken');
const Role = require('helpers/role');
const { v4: uuidv4 } = require('uuid');

// posts hardcoded for simplicity, store in a db for production applications
const posts = [
  { id: 1, name: 'health tips', content: 'Do exercise daily'}
];

module.exports = {
  createNewPost,
  updatePost,
  deletePost,
  getPosts
};


async  function getPosts({page, size}) {
  console.log(page);
  console.log(size);
  page = page == null || typeof page == "undefined"? 1: page;
  size = size == null || typeof size == "undefined"? 10: size;

  return posts.slice((((page - 1) * size)), ((page * size) + 1));
}

async function createNewPost({name, content}){

  if(content && content.length < 255){
    const newPost = {id: uuidv4(), name: name, content: content};
    posts.push(newPost);
    return newPost;
  }
  else {
    throw {"message": "content length invalid"}
  }

}

async function updatePost({id, name, content}) {
  if(content && content.length < 255){
    const postToUpdate = posts.find(post => post.id == id);
    if(postToUpdate){
      postToUpdate.content = content;
      postToUpdate.name = name;
    }
    else {
      throw {"message": "Invalid post id for update"}
    }
    return postToUpdate;
  }
  else {
    throw {"message": "content length invalid"}
  }
}

async function deletePost({id}) {
  console.log(id);
  const postToDelete = posts.find(post => post.id == id);
  console.log(postToDelete);
  if(postToDelete){
    const index = posts.indexOf(postToDelete);
    if (index > -1) {
      posts.splice(index, 1);
    }
    return postToDelete;
  }
  else {
    throw {"message": "invalid post id for delete"}
  }

}