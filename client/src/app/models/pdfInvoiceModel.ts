import { CompanyModel } from "./companyModel";
import { InvoiceModel } from "./invoiceModel";
import { UserSetModel } from "./userModel";

export class PdfInvoiceModel {

    constructor(
        private invoice?: InvoiceModel,
        private company?: CompanyModel,
        private user?: UserSetModel
    ) { }

    public generateDocumentStructure(): any {
        return {
            pageSize: "A4",
            pageOrientation: "portrait",
            pageMargins: [60, 40, 40, 40],
            content: [
                { text: 'Factura ' + this.invoice.invoiceId, style: 'header' },
                {
                    text: '\nEmpresa: ',
                    style: 'subheader'
                },
                this.company.name,
                this.company.cif,
                this.company.address,
                {
                    text: '\nContacto: ',
                    style: 'subheader'
                },
                this.user.email,
                this.user.phone,
                this.user.name,
                {
                    text: '\nCliente: ',
                    style: 'subheader'
                },
                this.invoice.customerId.name,
                this.invoice.customerId.cif,
                this.invoice.customerId.address,
                {
                    text: '\nContacto Cliente: ',
                    style: 'subheader'
                },
                this.invoice.customerId.name,
                this.invoice.customerId.contact,
                this.invoice.customerId.email,
                this.invoice.customerId.phone,
                this.invoice.customerId.address,
                {
                    text: '\nConceptos: ',
                    style: 'subheader'
                },
                this.generateConceptsString(),
                "IVA: " + this.invoice.taxableIncome + "%",
                "Total: " + this.invoice.totalAmount,
                {
                    text: '\nPago: ',
                    style: 'subheader'
                },
                this.company.iban
            ],
            styles: {
                header: {
                    fontSize: 20,
                    bold: true
                },
                subheader: {
                    fontSize: 15,
                    bold: true
                }
            }
        }

    }

    public generateConceptsString(): string {
        let conceptsString: string = "";
        this.invoice.concepts.forEach(concept => {
            const conceptSubstring: string = concept.concept + ": " + String(concept.amount) + "€" + "\n";
            conceptsString += conceptSubstring;
        });
        return conceptsString;
    }

}