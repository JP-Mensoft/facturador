import { ConceptEntity } from "../database/entities/conceptEntity";
import { InvoiceEntity } from "../database/entities/invoiceEntity";

export class InvoiceReqModel {
    constructor(
        public invoice: InvoiceEntity,
        public concepts: ConceptEntity[]
    ) { }
}