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

    public async getOneCustomer(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const customerId: number = requestDecoded.data.customerId;
        try {
            const getCustomerResult: ResponseModel = await this.customerDA.getOneCustomer(customerId);
            if (getCustomerResult.success) {
                serverResponse.success = true;
                serverResponse.result = getCustomerResult;
                serverResponse.status = 200;
            } else {
                serverResponse.status = 400;
            }
        } catch (error) {
            serverResponse.result = error;
            serverResponse.status = 500;
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async getAllCustomers(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        try {
            const getCustomersResult: ResponseModel = await this.customerDA.getAllCustomes();
            if (getCustomersResult.success) {
                serverResponse.success = true;
                serverResponse.result = getCustomersResult;
                serverResponse.status = 200;
            } else {
                serverResponse.status = 400;
            }
        } catch (error) {
            serverResponse.result = error;
            serverResponse.status = 500;
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async registerCustomer(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        let customer: CustomerEntity = requestDecoded.data;
        const userId: number = requestDecoded.decodedToken.userId;
        customer.userId = userId;
        try {
            const saveCustomerResult: ResponseModel = await this.customerDA.addOneCustomer(customer);
            if (saveCustomerResult.success) {
                serverResponse.success = true;
                serverResponse.result = saveCustomerResult.result;
                serverResponse.status = 200;
            } else {
                serverResponse.status = 400;
            }
        } catch (error) {
            serverResponse.result = error;
            serverResponse.status = 500;
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async deleteCustomer(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const customerId: number = requestDecoded.data.customerId;
        try {
            const deleteCustomerResult: ResponseModel = await this.customerDA.deleteOneCustomer(customerId);
            if (deleteCustomerResult.success) {
                serverResponse.success = true;
                serverResponse.status = 200;
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