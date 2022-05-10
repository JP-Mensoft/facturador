// App
import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken"
import { appEnvironment } from '../environment/appEnvironment';
// Models
import { GeneralResponseModel } from '../models/responseModels/generalResponseModel';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    const token: any = req.headers["token"];
    if (token != undefined) {
        jwt.verify(token, appEnvironment.jwtKey, (error: any, decoded: any) => {
            if (error) {
                const resp: GeneralResponseModel = {
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
        const resp: GeneralResponseModel = {
            status: false,
            result: "Invalid token."
        }
        return res.status(401).json(resp);
    }
};

