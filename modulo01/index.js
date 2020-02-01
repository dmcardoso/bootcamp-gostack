const express = require("express");

const server = express();

server.use(express.json());

const users = ["Diego", "Cláudio", "Victor"];

server.use((request, response, next) => {
    console.time("Request");

    console.log(`Método ${request.method}; URL: ${request.url};`);

    next();

    console.timeEnd("Request");
});

function checkUserExists(request, response, next) {
    if (!request.body.name) {
        return response.status(400).json({ error: "User name is required" });
    }

    return next();
}

function checkUserInArray(request, response, next) {
    const user = users[request.params.id];

    if (!user) {
        return response.status(400).json({ error: "User does not exists" });
    }

    request.user = user;

    return next();
}

server.get("/users", (request, response) => {
    return response.json(users);
});

server.get("/users/:id", checkUserInArray, (request, response) => {
    return response.json(request.user);
});

server.post("/users", checkUserExists, (request, response) => {
    const { name } = request.body;
    users.push(name);
    return response.json(users);
});

server.put(
    "/users/:id",
    checkUserInArray,
    checkUserExists,
    (request, response) => {
        const { id } = request.params;
        const { name } = request.body;
        users[id] = name;

        return response.json(users);
    }
);

server.delete("/users/:id", checkUserInArray, (request, response) => {
    const { id } = request.params;
    users.splice(id, 1);

    return response.send();
});

server.listen(3333);
