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

}
