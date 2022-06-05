import { ConceptModel } from "./conceptModel";
import { CustomerModel } from "./customerModel";

export class InvoiceModel {
    constructor(
        public date: Date,
        public remarks: string,
        public collected: boolean,
        public taxableIncome: number,
        public totalAmount: number,
        public concepts: ConceptModel[],
        public customerId: any,
        public collectionDate?: Date,
        public invoiceId?: number
    ) { }
}
