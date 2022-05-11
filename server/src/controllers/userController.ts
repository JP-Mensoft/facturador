// App
import { Request, Response } from 'express';
import { UserDataAccess } from '../resources/userDataAccess';
// Models
import { UserEntity } from '../database/entities/userEntity';
import { ResponseModel } from '../models/responseModel';
import { AccessUserModel, SaveUserModel } from '../models/userDataModel';

export class UserController {

    private userDA: UserDataAccess;

    constructor() {
        this.userDA = new UserDataAccess();
    }

    public async userAccess(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const userRequest: AccessUserModel = req.body;
        try {
            const userFound = await this.userDA.getOneUserEmail(userRequest.email);
            if (userFound.success) {
                const user: UserEntity = userFound.result;
                if (user.checkPassword(userRequest.password)) {
                    serverResponse.success = true;
                    serverResponse.result = {
                        user,
                        token: user.generateSesionToken()
                    };
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
        const userRequest: SaveUserModel = req.body;
        if (userRequest.password === userRequest.verifiedPassword) {
            try {
                const saveResult = await this.userDA.addOneUser(userRequest);
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

    public async saludar(req: Request, res: Response) {
        return res.status(200).json({ Saludo: "Hola." });
    }

}