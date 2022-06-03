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

    public async getOneUserCompany(userId: number) {
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

    public async addOneCompany(userId: number, companyData: CompanyEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            companyData.userId = userId;
            const saveResult = await this.entityManager.save(CompanyEntity, companyData);
            if (saveResult != undefined) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async setOneCompany(companyData: CompanyEntity, companyFound: CompanyEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            companyFound.name = companyData.name;
            companyFound.iban = companyData.iban;
            companyFound.cif = companyData.cif;
            companyFound.address = companyData.address;
            const setResult = await this.entityManager.save(CompanyEntity, companyFound);
            if (setResult != undefined) {
                dataResponse.success = true;
                dataResponse.result = setResult;
            }

        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}
