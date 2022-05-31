// App
import { dbConnection } from "../database/dbConnection";
import { EntityManager } from "typeorm";
// Models
import { UserEntity } from "../database/entities/userEntity";
import { CustomerEntity } from "../database/entities/customerEntity";
import { ResponseModel } from "../models/responseModel";
import { UserSetModel } from "../models/userModel";

export class UserDataAccess {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = dbConnection.manager;
    }

    public async getOneUserEmail(email: string) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const userFound = await this.entityManager.findOneBy(UserEntity, { email });
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
            const user = await this.entityManager.findOneBy(UserEntity, { userId });
            if (user != null) {
                dataResponse.success = true;
                dataResponse.result = user;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async registerUser(userData: UserSetModel) {
        let dataResponse: ResponseModel = new ResponseModel();
        let newUser: UserEntity = new UserEntity();
        newUser.email = userData.email;
        newUser.saveHashPassword(userData.newPassword);
        newUser.name = userData.name;
        newUser.phone = userData.phone;
        try {
            const saveResult = await this.entityManager.save(UserEntity, newUser);
            if (saveResult != undefined) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async setUser(userId: number, userData: UserSetModel) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const userFound: ResponseModel = await this.getOneUserId(userId);
            if (userFound.success) {
                let user: UserEntity = userFound.result;
                user.email = userData.email;
                if (userData.newPassword != "") {
                    user.saveHashPassword(userData.newPassword);
                }
                user.name = userData.name;
                user.phone = userData.phone;
                const setResult = await this.entityManager.save(UserEntity, user);
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

    public async deleteOneUser(userId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const deleteResult = await this.entityManager.delete(UserEntity, { userId });
            if (deleteResult.affected != 0) {
                dataResponse.success = true;
                dataResponse.result = deleteResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async updateUserCustomers(userId: number, customer: CustomerEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const userFound: ResponseModel = await this.getOneUserId(userId);
            if (userFound.success) {
                let user: UserEntity = userFound.result;
                let userCustomers: CustomerEntity[] = [];
                if (user.customers != undefined) {
                    userCustomers = user.customers;
                }
                userCustomers.push(customer);
                user.customers = userCustomers;
                const saveResult = await this.entityManager.save(UserEntity, user);
                if (saveResult != undefined) {
                    dataResponse.success = true;
                    dataResponse.result = saveResult;
                }
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}