// App
import { Request, Response } from 'express';
import { CustomerDataAccess } from '../resources/customerDataAccess';
import { UserDataAccess } from '../resources/userDataAccess';
// Models
import { ResponseModel } from '../models/responseModel';
import { DecodedModel } from '../models/decodedModel';
import { CustomerEntity } from '../database/entities/customerEntity';

export class CustomerController {

    private customerDA: CustomerDataAccess;
    private userDA: UserDataAccess;

    constructor() {
        this.customerDA = new CustomerDataAccess();
        this.userDA = new UserDataAccess();
    }

    public async registerCustomer(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const customerRequest: DecodedModel = req.body;
        const customer: CustomerEntity = customerRequest.data;
        const userId: number = customerRequest.decodedToken.userId;
        try {
            const saveCustomerResult: ResponseModel = await this.customerDA.addOneCustomer(customer);
            if (saveCustomerResult.success) {
                const updateUserCustomersResult: ResponseModel = await this.userDA.updateUserCustomers(userId, saveCustomerResult.result);
                if (updateUserCustomersResult.success) {
                    serverResponse.success = true;
                    serverResponse.result = updateUserCustomersResult.result;
                    serverResponse.status = 200;
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

}