// App
import { DbConnection } from "../database/dbConnection";
import { Repository } from "typeorm";
// Models
import { UserEntity } from "../database/entities/userEntity";
import { CustomerEntity } from "../database/entities/customerEntity";
import { ResponseModel } from "../models/responseModel";
import { UserSaveModel, UserSetModel } from "../models/userModel";

export class UserDataAccess {

    private userRepository: Repository<UserEntity>;

    constructor() {
        this.userRepository = DbConnection.getRepository(UserEntity);
    }

    public async getOneUserEmail(email: string) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const userFound = await this.userRepository.findOne({ where: { email } });
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
            const user = await this.userRepository.findOne({ where: { userId } });
            if (user != null) {
                dataResponse.success = true;
                dataResponse.result = user;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async addOneUser(userData: UserSaveModel) {
        let dataResponse: ResponseModel = new ResponseModel();
        let newUser: UserEntity = new UserEntity();
        newUser.email = userData.email;
        newUser.saveHashPassword(userData.password);
        newUser.name = userData.name;
        newUser.phone = userData.phone;
        try {
            const saveResult = await this.userRepository.save(newUser);
            if (saveResult != undefined) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async setOneUser(userData: UserSetModel) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const userFound: ResponseModel = await this.getOneUserId(userData.userId);
            if (userFound.success) {
                let user: UserEntity = userFound.result;
                user.email = userData.email;
                user.saveHashPassword(userData.password);
                user.name = userData.name;
                user.phone = userData.phone;
                const setResult = await this.userRepository.save(user);
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
            const removeResult = await this.userRepository.delete(userId);
            if (removeResult.affected != 0) {
                dataResponse.success = true;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    // Repasar
    public async updateUserCustomers(userId: number, customer: CustomerEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const userFound: ResponseModel = await this.getOneUserId(userId);
            if (userFound.success) {
                const user: UserEntity = userFound.result;
                let userCustomers: CustomerEntity[] = [];
                if (user.customers != undefined) {
                    userCustomers = user.customers;
                }
                userCustomers.push(customer);
                user.customers = userCustomers;
                const updatedCustomers: ResponseModel = await this.setOneUser(user);
                if (updatedCustomers.success) {
                    dataResponse.success = true;
                    dataResponse.result = updatedCustomers.result;
                }
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}