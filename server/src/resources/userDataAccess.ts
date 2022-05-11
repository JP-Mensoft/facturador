// App
import { DbConnection } from "../database/dbConnection";
// Models
import { UserEntity } from "../database/entities/userEntity";
import { ResponseModel } from "../models/responseModel";
import { SaveUserModel, SetUserModel } from "../models/userDataModel";

export class UserDataAccess {

    private userEntity = DbConnection.getRepository(UserEntity);

    constructor() { }

    public async getOneUserEmail(email: string) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const userFound = await this.userEntity.findOne({ where: { email } });
            if (userFound != null) {
                dataResponse.success = true;
                dataResponse.result = userFound;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async getOneUserId(userId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const user = await this.userEntity.findOne({ where: { userId } });
            if (user != null) {
                dataResponse.success = true;
                dataResponse.result = user;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async addOneUser(userData: SaveUserModel) {
        let dataResponse: ResponseModel = new ResponseModel();
        let newUser: UserEntity = new UserEntity();
        newUser.email = userData.email;
        newUser.saveHashPassword(userData.password);
        try {
            const saveResult = await this.userEntity.save(newUser);
            if (saveResult != undefined) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async setOneUser(userData: SetUserModel) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const userFound: ResponseModel = await this.getOneUserId(userData.userId);
            if (userFound.success) {
                let user: UserEntity = userFound.result;
                user.email = userData.email;
                user.saveHashPassword(userData.password);
                const setResult = await this.userEntity.save(user);
                if (setResult != undefined) {
                    dataResponse.success = true;
                    dataResponse.result = setResult;
                }
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async removeOneUser(userId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const removeResult = await this.userEntity.delete(userId);
            if (removeResult.affected != 0) {
                dataResponse.success = true;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}