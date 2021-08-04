# Post Endpoints

Node.js Role Based Post APIs

- Run "cd <project-directory> && npm install"
- Run "npm start" to start local server
- Server will be running on http://localhost:4000
- Can import postman collection for API calls into Postman

- /login- POST - {"username": "user", "password":"pass"}
- /posts - POST - {"name": "name of post", "content": "bla-bla"}
- /posts?page=1&size=10 - GET - return  10 posts
- /posts/<id> - DELETE - delete a post
- /posts/<id> - PUT - {"name": "updated name", "content": "test"} 

NOTE:- For simplicity using in-memory dictionary data structure instead of DB.