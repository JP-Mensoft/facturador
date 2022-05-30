// App
import { Request, Response } from 'express';
import { UserDataAccess } from '../resources/userDataAccess';
// Models
import { UserEntity } from '../database/entities/userEntity';
import { ResponseModel } from '../models/responseModel';
import { DecodedModel } from '../models/decodedModel';
import { UserAccessModel, UserSaveModel, UserSetModel } from '../models/userModel';

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

    public async setUser(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const userData: UserSetModel = requestDecoded.data;
        const userId: number = requestDecoded.decodedToken.userId;
        if (userData.newPassword === userData.reNewPassword) {
            try {
                const changedUser: ResponseModel = await this.userDA.setUser(userId, userData);
                if (changedUser.success) {
                    serverResponse.success = true;
                    serverResponse.result = changedUser.result;
                    serverResponse.status = 200;
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

    public async registerUser(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: UserSaveModel = req.body;
        if (requestDecoded.password === requestDecoded.verifiedPassword) {
            try {
                const saveResult: ResponseModel = await this.userDA.addUser(requestDecoded);
                if (saveResult.success) {
                    serverResponse.success = true;
                    serverResponse.result = saveResult.result;
                    serverResponse.status = 200;
                } else {
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

    public async checkUserToken(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        serverResponse.success = true;
        serverResponse.status = 200;
        return res.status(serverResponse.status).json(serverResponse);
    }

}