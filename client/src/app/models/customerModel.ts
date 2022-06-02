export class CustomerModel {
    constructor(
        public name: string,
        public email: string,
        public contact: string,
        public phone: string,
        public address: string,
        public cif: string,
        public remarks: string,
        public customerId?: number
    ) { }
}