// App
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import { Environment } from '../app/environment';
// Models
import { ResponseModel } from '../models/responseModel';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers["token"];
    if (token != undefined) {
        jwt.verify(token, Environment.jwtKey, (error: any, decoded: any) => {
            if (error) {
                const resp: ResponseModel = {
                    status: false,
                    result: error
                }
                return res.status(401).json(resp);
            } else {
                req.body = decoded;
                next();
            }
        })
    } else {
        const resp: ResponseModel = {
            status: false,
            result: "Invalid token."
        }
        return res.status(401).json(resp);
    }
};

