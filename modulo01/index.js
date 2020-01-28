const express = require("express");

const server = express();

server.use(express.json());

const users = ["Diego", "Cláudio", "Victor"];

server.get("/users", (request, response) => {
    return response.json(users);
});

server.get("/users/:id", (request, response) => {
    const { id } = request.params;
    return response.json(users[id]);
});

server.post("/users", (request, response) => {
    const { name } = request.body;
    users.push(name);
    return response.json(users);
});

server.put("/users/:id", (request, response) => {
    const { id } = request.params;
    const { name } = request.body;
    users[id] = name;

    return response.json(users);
});

server.delete("/users/:id", (request, response) => {
    const { id } = request.params;
    users.splice(id, 1);

    return response.send();
});

server.listen(3333);
