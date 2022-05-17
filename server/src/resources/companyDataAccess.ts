// App
import { Repository } from "typeorm";
import { DbConnection } from "../database/dbConnection";
// Models
import { CompanyEntity } from "../database/entities/companyEntity";
import { ResponseModel } from "../models/responseModel";

export class CompanyDataAccess {

    private companyRepository: Repository<CompanyEntity>;

    constructor() {
        this.companyRepository = DbConnection.getRepository(CompanyEntity);
    }

    public async getOneCompanyUserId(userId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const companyFound = await this.companyRepository.findOne({ where: { userId } });
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
            const saveResult = await this.companyRepository.save(newCompany);
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
                const setResult = await this.companyRepository.save(company);
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

    public async removeOneCompanyUserId(userId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const removeResult = await this.companyRepository.delete(userId);
            if (removeResult.affected != 0) {
                dataResponse.success = true;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}
