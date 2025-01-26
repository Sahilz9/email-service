import express from "express";
const router = express.Router();


import sendGridRoute from "./sengridService.routes.js"



const defaultRoutes = [
    {
        path: "/email",
        route: sendGridRoute,
    },
]

defaultRoutes.forEach((route) => {
    router.use(route.path, route.route);
});

export default router;
