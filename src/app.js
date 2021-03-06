const express = require("express");
const cors = require("cors");

const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, url, techs } = request.body;
  

  const id =  uuid();

  const repository = { 
    id,  
    title,
    url,
    techs, 
    likes: 0
  };

  
  repositories.push(repository);

  return response.json(repository);
});


app.put("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repIndex = repositories.findIndex(repository => repository.id === id)
  if (repIndex < 0)
  {
    return response.status(400).json({error : "Repository not found"});
  }
  const {title, url, techs } = request.body;
 // const techsArray = techs.split(",");
  const repository = {
    id, 
    title,
    url,
    techs, 
    likes: repositories[repIndex].likes ,
  }
  repositories[repIndex] = repository;

  return response.json( repository );
});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repIndex = repositories.findIndex(repository => repository.id === id);
  if (repIndex < 0)
  {
    return response.status(400).json({error : "Repository not found"});
  }
  repositories.splice(repIndex, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;
  const repIndex = repositories.findIndex(repository => repository.id === id);
  if (repIndex < 0)
  {
    return response.status(400).json({error : "Repository not found"});
  }
  repositories[repIndex].likes = repositories[repIndex].likes + 1
  return response.json(repositories[repIndex]);
});

module.exports = app;
