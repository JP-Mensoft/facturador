// App
import { appDataSource } from "../database/appDataSource";
import { UsersEntity } from "../database/entities/usersEntity";
import { AppDbResponseModel } from "../models/appModels/appDbResponseModel";
// Models
import { AppUserModel } from "../models/appModels/appUserModel";

export class UsersDataAccess {

    private usersEntity = appDataSource.getRepository(UsersEntity);

    constructor() { }

    public async getOneUser(userId: number) {
        const dbResponse: AppDbResponseModel = {
            status: false,
            result: undefined
        };
        const user = await this.usersEntity.findOne({ where: { userId } });
        if (user != null) {
            dbResponse.status = true;
            dbResponse.result = user;
        };
        return dbResponse;
    }

    public async addOneUser(user: AppUserModel) {

    }

    public async setOneUser(user: AppUserModel) {

    }

    public async removeOneUser(userId: number) {

    }

}