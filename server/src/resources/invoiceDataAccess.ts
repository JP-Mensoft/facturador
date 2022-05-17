// App
import { EntityManager } from "typeorm";
import { dbConnection } from "../database/dbConnection";
// Models
import { InvoiceEntity } from "../database/entities/invoiceEntity";
import { ResponseModel } from "../models/responseModel";

export class InvoiceDataAccess {

    private entityManager: EntityManager;

    constructor() {
        this.entityManager = dbConnection.manager;
    }

    public async getOneInvoice(invoiceId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const invoice = await this.entityManager.findBy(InvoiceEntity, { invoiceId });
            if (invoice != null) {
                dataResponse.success = true;
                dataResponse.result = invoice;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async addInvoice(invoice: InvoiceEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const saveResult = this.entityManager.save(InvoiceEntity, invoice);
            if (saveResult != null) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async setInvoice(invoice: InvoiceEntity) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const saveResult = this.entityManager.save(InvoiceEntity, invoice);
            if (saveResult != null) {
                dataResponse.success = true;
                dataResponse.result = saveResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

    public async deleteInvoice(invoiceId: number) {
        let dataResponse: ResponseModel = new ResponseModel();
        try {
            const deleteResult = await this.entityManager.delete(InvoiceEntity, invoiceId);
            if (deleteResult.affected != 0) {
                dataResponse.success = true;
                dataResponse.result = deleteResult;
            }
        } catch (error) {
            dataResponse.result = error;
        }
        return dataResponse;
    }

}