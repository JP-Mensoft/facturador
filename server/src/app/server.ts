// Server
import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
// App
import { routesIndex } from "../routes/routesIndex";
import { Environment } from "./environment";
// Middlewares
import { checkToken } from "../middlewares/checkToken";
// Models
import { RouteModel } from "../models/routeModel";

export class Server {

    private server: Application;

    constructor() {
        this.server = express();
        this.configureServer();
        this.configureRoutes();
        this.configureServerURL();
        this.bootServer();
    }

    public configureServer(): void {
        this.server.use(cors());
        this.server.use(morgan("dev"));
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
    }

    public configureRoutes(): void {
        routesIndex.forEach((route: RouteModel) => {
            switch (route.middlewares) {
                case "undefined":
                    (this.server as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
                        (new (route.controller as any))[route.action](req, res, next);
                    });
                    break;
                case "checkToken":
                    (this.server as any)[route.method](route.route, checkToken, (req: Request, res: Response, next: Function) => {
                        (new (route.controller as any))[route.action](req, res, next);
                    });
                    break;
                default:
                    break;
            }
        });
    }

    public configureServerURL(): void {
        this.server.set("port", Environment.serverPort);
        this.server.set("ip", Environment.serverIP);
    }

    public bootServer(): void {
        const port: number = this.server.get("port");
        const ip: string = this.server.get("ip");
        this.server.listen(port, ip, () => {
            console.log("Server ON - URL: http://" + ip + ":" + port);
        });
    }

}