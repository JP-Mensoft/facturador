export class CompanyModel {
    constructor(
        public name: string,
        public logoURL: string,
        public address: string,
        public cif: string,
        public iban: string
    ) { }
}