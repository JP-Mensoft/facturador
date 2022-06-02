// App
import { Request, Response } from 'express';
import { CustomerDataAccess } from '../resources/customerDataAccess';
// Models
import { ResponseModel } from '../models/responseModel';
import { DecodedModel } from '../models/decodedModel';
import { CustomerEntity } from '../database/entities/customerEntity';

export class CustomerController {

    private customerDA: CustomerDataAccess;

    constructor() {
        this.customerDA = new CustomerDataAccess();
    }

    public async getOneCustomer(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const customerId: number = Number(req.params.customerId);
        try {
            const getCustomerResult: ResponseModel = await this.customerDA.getOneCustomer(customerId);
            if (getCustomerResult.success) {
                serverResponse.success = true;
                serverResponse.result = getCustomerResult.result;
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
        const requestDecoded: DecodedModel = req.body;
        const userId: number = requestDecoded.decodedToken.userId;
        try {
            const getCustomersResult: ResponseModel = await this.customerDA.getAllCustomers(userId);
            if (getCustomersResult.success) {
                serverResponse.success = true;
                serverResponse.result = getCustomersResult.result;
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

    public async addCustomer(req: Request, res: Response) {
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
        const customerId: number = Number(req.params.customerId);
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