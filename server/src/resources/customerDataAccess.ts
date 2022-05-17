// App
import { DbConnection } from "../database/dbConnection";
import { Repository } from "typeorm";
// Models
import { ResponseModel } from "../models/responseModel";
import { CustomerEntity } from "../database/entities/customerEntity";

export class CustomerDataAccess {

    private customerRepository: Repository<CustomerEntity>;

    constructor() {
        this.customerRepository = DbConnection.getRepository(CustomerEntity);
    }

    public async addOneCustomer(newCustomer: CustomerEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const saveResult = await this.customerRepository.save(newCustomer);
            if (saveResult != undefined) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}
