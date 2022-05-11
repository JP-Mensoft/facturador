// App
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import { Environment } from '../app/environment';
// Models
import { ResponseModel } from '../models/responseModel';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    let serverResponse: ResponseModel = new ResponseModel();
    const token: any = req.headers["token"];
    if (token != undefined) {
        jwt.verify(token, Environment.jwtKey, (error: any, decoded: any) => {
            if (error) {
                serverResponse.result = error;
                serverResponse.status = 401;
                return res.status(serverResponse.status).json(serverResponse);
            } else {
                req.body = decoded;
                next();
            }
        });
    } else {
        serverResponse.result = "Invalid token.";
        serverResponse.status = 401;
        return res.status(serverResponse.status).json(serverResponse);
    }
}

