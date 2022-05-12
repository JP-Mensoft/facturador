// App
import { Request, Response } from 'express';
import { CompanyDataAccess } from '../resources/companyDataAccess';
// Models
import { ResponseModel } from '../models/responseModel';

export class CompanyController {

    private companyDA: CompanyDataAccess;

    constructor() {
        this.companyDA = new CompanyDataAccess();
    }



}