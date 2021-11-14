const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

function checksExistsUserAccount(request, response, next) {
  const { username } = request.headers;

  const user = users.find( user => user.username === username );

  if(!user) {
    return response.status(404).json( { error: "User not found!"});
  }

  user.request = user;

  return next();

}

app.post('/users', (request, response) => {
  const { name, username } = request.body;

  const user = {
    name : name,
    username: username,
  }

  users.push({
    id: uuidv4(),
    name,
    username,
    todos: [],
  });


  return response.status(201).send(users);
});

app.get('/todos', checksExistsUserAccount ,(request, response) => {
  const { user } = request.headers;

  return response.json(user.todos);
}); 

app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;