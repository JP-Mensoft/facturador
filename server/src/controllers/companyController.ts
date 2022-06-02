// App
import { Request, Response } from 'express';
import { CompanyDataAccess } from '../resources/companyDataAccess';
// Models
import { ResponseModel } from '../models/responseModel';
import { CompanyEntity } from '../database/entities/companyEntity';
import { DecodedModel } from '../models/decodedModel';

export class CompanyController {

    private companyDA: CompanyDataAccess;

    constructor() {
        this.companyDA = new CompanyDataAccess();
    }

    public async getUserCompany(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        try {
            const companyFound: ResponseModel = await this.companyDA.getOneUserCompany(requestDecoded.decodedToken.userId);
            if (companyFound.success) {
                serverResponse.success = true;
                serverResponse.result = companyFound.result;
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

    public async setUserCompany(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const companyData: CompanyEntity = requestDecoded.data;
        const userId: number = requestDecoded.decodedToken.userId;
        try {
            let setResult: ResponseModel;
            const companyFound: ResponseModel = await this.companyDA.getOneUserCompany(userId);
            if (companyFound.success) {
                setResult = await this.companyDA.setOneCompany(companyData, companyFound.result);
            } else {
                setResult = await this.companyDA.addOneCompany(userId, companyData);
            }
            if (setResult.success) {
                serverResponse.success = true;
                serverResponse.result = setResult.result;
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