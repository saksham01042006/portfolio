import { app } from "../server/index";
import { registerRoutes } from "../server/routes";
import { createServer } from "http";

const server = createServer(app);
let routesRegistered = false;

export default async function handler(req: any, res: any) {
    if (!routesRegistered) {
        await registerRoutes(server, app);
        routesRegistered = true;
    }

    app(req, res);
}
