import { Router } from 'express';

const routes = new Router();

routes.get('/', (request, response, next) => {
    return response.json({
        message: 'Hello world',
    });
});

export default routes;
