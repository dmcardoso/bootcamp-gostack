const express = require("express");

const server = express();

server.get("/teste", (request, response) => {
    return response.json({ message: "Hello world" });
});

server.listen(3333);
