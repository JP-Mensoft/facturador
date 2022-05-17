// App
import { Request, Response } from 'express';
import { ConceptDataAccess } from "../resources/conceptDataAccess";
import { InvoiceDataAccess } from "../resources/invoiceDataAccess";
// Models
import { ResponseModel } from '../models/responseModel';
import { DecodedModel } from '../models/decodedModel';
import { InvoiceReqModel } from '../models/invoiceReqModel';
import { InvoiceEntity } from '../database/entities/invoiceEntity';

export class InvoiceController {

    private conceptDA: ConceptDataAccess;
    private invoiceDA: InvoiceDataAccess;

    constructor() {
        this.conceptDA = new ConceptDataAccess();
        this.invoiceDA = new InvoiceDataAccess();
    }

    public async addInvoice(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const invoiceRequest: InvoiceReqModel = requestDecoded.data;
        const user: number = requestDecoded.decodedToken.user;
        let newInvoice: InvoiceEntity = invoiceRequest.invoice;
        newInvoice.user = user;
        try {
            const savedResult = await this.invoiceDA.addInvoice(newInvoice);
            if (savedResult.success) {
                let savedInvoice: InvoiceEntity = savedResult.result;
                let saveSuccess: boolean = true;
                for await (const concept of invoiceRequest.concepts) {
                    concept.invoice = savedInvoice.invoiceId;
                    const saveConceptResult = await this.conceptDA.addConcept(concept);
                    if (!saveConceptResult.success) {
                        saveSuccess = false;
                    }
                }
                if (saveSuccess) {
                    serverResponse.success = true;
                    serverResponse.result = await this.invoiceDA.getOneInvoice(savedInvoice.invoiceId);
                    serverResponse.status = 200;
                } else {
                    serverResponse.status = 400;
                }
            }
        } catch (error) {
            serverResponse.status = 500;
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async deleteInvoice(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const invoiceId: number = requestDecoded.data.invoiceId;
        try {
            const deleteInvoiceResult: ResponseModel = await this.invoiceDA.deleteInvoice(invoiceId);
            if (deleteInvoiceResult.success) {
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