// App
import { dbConnection } from "../database/dbConnection";
import { EntityManager } from "typeorm";
// Models
import { ResponseModel } from "../models/responseModel";
import { CustomerEntity } from "../database/entities/customerEntity";

export class CustomerDataAccess {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = dbConnection.manager;
    }

    public async getOneCustomer(customerId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const customerFound = await this.entityManager.findOneBy(CustomerEntity, { customerId });
            if (customerFound != null) {
                dataResponse.success = true;
                dataResponse.result = customerFound;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async getAllCustomes() {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const customersFound = await this.entityManager.find(CustomerEntity);
            if (customersFound != null) {
                dataResponse.success = true;
                dataResponse.result = customersFound;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async addOneCustomer(newCustomer: CustomerEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const saveResult = await this.entityManager.save(CustomerEntity, newCustomer);
            if (saveResult != null) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async deleteOneCustomer(customerId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const deleteResult = await this.entityManager.delete(CustomerEntity, { customerId });
            if (deleteResult.affected != 0) {
                dataResponse.success = true;
                dataResponse.result = deleteResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}
