import { ConceptModel } from "./conceptModel";

export class InvoiceModel {
    constructor(
        public date: Date,
        public invoiceNumber: number,
        public orderNumber: number,
        public remarks: string,
        public collected: boolean,
        public collectionDate: Date,
        public taxableIncome: number,
        public totalAmount: number,
        public concepts: ConceptModel[],
        public customerId: number,
        public invoiceId?: number
    ) { }
}


