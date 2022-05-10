// App
import { appDataSource } from "../database/appDataSource";
import { UsersEntity } from "../database/entities/usersEntity";
// Models
import { AppUserModel } from "../models/appModels/appUserModel";

export class UsersDataAccess {

    private usersEntity = appDataSource.getRepository(UsersEntity);

    constructor() { }

    public getOneUser(userId: number): void {

    }

    public addOneUser(user: AppUserModel): void {

    }

    public setOneUser(user: AppUserModel): void {

    }

    public removeOneUser(user: AppUserModel): void {

    }

}