export class ConceptModel {
    constructor(
        public concept: string,
        public amount: number,
        public invoiceId?: number
    ) { }
}