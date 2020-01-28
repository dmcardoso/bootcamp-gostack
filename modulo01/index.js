const express = require("express");

const server = express();

const users = ["Diego", "Cláudio", "Victor"];

server.get("/teste", (request, response) => {
    const nome = request.query.nome;
    return response.json({ message: `Hello ${nome}` });
});

server.get("/users/:id", (request, response) => {
    const { id } = request.params;
    return response.json(users[id]);
});

server.listen(3333);
