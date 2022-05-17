// App
import { EntityManager } from "typeorm";
import { dbConnection } from "../database/dbConnection";
// Models
import { CompanyEntity } from "../database/entities/companyEntity";
import { ResponseModel } from "../models/responseModel";

export class CompanyDataAccess {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = dbConnection.manager;
    }

    public async getOneCompanyUserId(userId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const companyFound = await this.entityManager.findOneBy(CompanyEntity, { userId });
            if (companyFound != null) {
                dataResponse.success = true;
                dataResponse.result = companyFound;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async addOneCompany(newCompany: CompanyEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const saveResult = await this.entityManager.save(CompanyEntity, newCompany);
            if (saveResult != undefined) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async setOneCompany(newCompany: CompanyEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const companyFound: ResponseModel = await this.getOneCompanyUserId(newCompany.companyId);
            if (companyFound.success) {
                let company: CompanyEntity = companyFound.result;
                const setResult = await this.entityManager.save(CompanyEntity, company);
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

    public async deleteOneCompanyUserId(userId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const removeResult = await this.entityManager.delete(CompanyEntity, { userId });
            if (removeResult.affected != 0) {
                dataResponse.success = true;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}
