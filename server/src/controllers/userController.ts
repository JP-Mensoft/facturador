// App
import { Request, Response } from 'express';
import { UserDataAccess } from '../resources/userDataAccess';
// Models
import { UserEntity } from '../database/entities/userEntity';
import { ResponseModel } from '../models/responseModel';
import { DecodedModel } from '../models/decodedModel';
import { UserAccessModel, UserSetModel } from '../models/userModel';

export class UserController {

    private userDA: UserDataAccess;

    constructor() {
        this.userDA = new UserDataAccess();
    }

    public async getOneUser(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const userId: number = requestDecoded.decodedToken.userId;
        try {
            const userFound: ResponseModel = await this.userDA.getOneUserId(userId);
            if (userFound.success) {
                serverResponse.success = true;
                serverResponse.result = userFound.result;
                serverResponse.status = 200;
            }
        } catch (error) {
            serverResponse.result = error;
            serverResponse.status = 500;
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async addUser(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: UserSetModel = req.body;
        if (requestDecoded.newPassword === requestDecoded.reNewPassword) {
            try {
                const saveResult: ResponseModel = await this.userDA.addUser(requestDecoded);
                const userSave: UserEntity = saveResult.result;
                if (saveResult.success) {
                    serverResponse.success = true;
                    serverResponse.result = userSave.generateSesionToken();
                    serverResponse.status = 200;
                } else {
                    serverResponse.result = saveResult.result;
                    serverResponse.status = 400;
                }
            } catch (error) {
                serverResponse.result = error;
                serverResponse.status = 500;
            }
        } else {
            serverResponse.status = 400;
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async setUser(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const userData: UserSetModel = requestDecoded.data;
        const userId: number = requestDecoded.decodedToken.userId;
        if (userData.newPassword === userData.reNewPassword) {
            try {
                const setResult: ResponseModel = await this.userDA.setUser(userId, userData);
                if (setResult.success) {
                    serverResponse.success = true;
                    serverResponse.result = setResult.result;
                    serverResponse.status = 200;
                } else {
                    serverResponse.result = setResult.result;
                    serverResponse.status = 400;
                }
            } catch (error) {
                serverResponse.result = error;
                serverResponse.status = 500;
            }
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async userAccess(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: UserAccessModel = req.body;
        try {
            const userFound: ResponseModel = await this.userDA.getOneUserEmail(requestDecoded.email);
            if (userFound.success) {
                const user: UserEntity = userFound.result;
                if (user.checkPassword(requestDecoded.password)) {
                    serverResponse.success = true;
                    serverResponse.result = user.generateSesionToken();
                    serverResponse.status = 200;
                } else {
                    serverResponse.status = 401;
                }
            } else {
                serverResponse.status = 400;
            }
        } catch (error) {
            serverResponse.result = error;
            serverResponse.status = 500;
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async checkUserToken(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        serverResponse.success = true;
        serverResponse.status = 200;
        return res.status(serverResponse.status).json(serverResponse);
    }

}