export class CompanyModel {
    constructor(
        public name: string,
        public address: string,
        public cif: string,
        public iban: string
    ) { }
}