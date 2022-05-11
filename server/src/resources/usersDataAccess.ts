// App
import { DbConnection } from "../database/dbConnection";
import { UsersEntity } from "../database/entities/usersEntity";
// Models
import { ResponseModel } from "../models/responseModel";
import { UserModel } from "../models/userModel";

export class UsersDataAccess {

    private usersEntity = DbConnection.getRepository(UsersEntity);

    constructor() { }

    public async getOneUser(userId: number) {
        const dbResponse: ResponseModel = {
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

    public async addOneUser(user: UserModel) {

    }

    public async setOneUser(user: UserModel) {

    }

    public async removeOneUser(userId: number) {

    }

}