// App
import { Request, Response } from 'express';
import { ConceptDataAccess } from "../resources/conceptDataAccess";
import { InvoiceDataAccess } from "../resources/invoiceDataAccess";
// Models
import { ResponseModel } from '../models/responseModel';
import { DecodedModel } from '../models/decodedModel';
import { InvoiceEntity } from '../database/entities/invoiceEntity';

export class InvoiceController {

    private conceptDA: ConceptDataAccess;
    private invoiceDA: InvoiceDataAccess;

    constructor() {
        this.conceptDA = new ConceptDataAccess();
        this.invoiceDA = new InvoiceDataAccess();
    }

    public getOneInvoice(req: Request, res: Response) {

    }

    public getAllInvoices(req: Request, res: Response) {

    }

    public async addInvoice(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const requestDecoded: DecodedModel = req.body;
        const invoiceData: InvoiceEntity = requestDecoded.data;
        const userId: number = requestDecoded.decodedToken.userId;
        let newInvoice: InvoiceEntity = new InvoiceEntity();
        newInvoice.userId = userId;
        newInvoice.collected = invoiceData.collected;
        newInvoice.customerId = invoiceData.customerId;
        newInvoice.date = invoiceData.date;
        newInvoice.remarks = invoiceData.remarks;
        newInvoice.taxableIncome = invoiceData.taxableIncome;
        newInvoice.totalAmount = invoiceData.totalAmount;
        newInvoice.userId = userId;
        try {
            const savedResult = await this.invoiceDA.addInvoice(newInvoice);
            if (savedResult.success) {
                let savedInvoice: InvoiceEntity = savedResult.result;
                let saveSuccess: boolean = true;
                for await (const concept of invoiceData.concepts) {
                    concept.invoiceId = savedInvoice.invoiceId;
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
            } else {
                serverResponse.status = 400;
            }
        } catch (error) {
            serverResponse.status = 500;
        }
        return res.status(serverResponse.status).json(serverResponse);
    }

    public async deleteInvoice(req: Request, res: Response) {
        let serverResponse: ResponseModel = new ResponseModel();
        const invoiceId: number = Number(req.params.invoiceId);
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