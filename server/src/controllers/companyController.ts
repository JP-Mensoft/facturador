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
        const companyRequest: DecodedModel = req.body;
        try {
            const companyFound = await this.companyDA.getOneCompanyUserId(companyRequest.decodedToken.userId);
            if (companyFound.success) {
                const company: CompanyEntity = companyFound.result;
                serverResponse.success = true;
                serverResponse.result = company;
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

    public async registerUserCompany(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const companyRequest: DecodedModel = req.body;
        const company: CompanyEntity = companyRequest.data;
        company.userId = companyRequest.decodedToken.userId;
        try {
            const saveResult = await this.companyDA.addOneCompany(company);
            if (saveResult.success) {
                serverResponse.success = true;
                serverResponse.result = saveResult.result;
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