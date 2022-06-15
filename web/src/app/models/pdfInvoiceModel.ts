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
                { text: 'Factura Nº ' + this.invoice!.invoiceId + " - " + new Date(this.invoice!.date).toLocaleDateString(), style: 'title' },
                { text: '\n\nDatos Empresa & Cliente', style: 'header' },
                {
                    style: 'table',
                    table: {
                        body: [
                            ['Empresa', 'Contacto', 'Cliente'],
                            [
                                {
                                    stack: [
                                        {
                                            ul: [
                                                this.company!.name,
                                                "CIF: " + this.company!.cif,
                                                this.company!.address
                                            ]
                                        }
                                    ]
                                },
                                {
                                    stack: [!
                                        {
                                            ul: [
                                                this.user!.name,
                                                "Email: " + this.user!.email,
                                                "Teléfono: " + this.user!.phone
                                            ]
                                        }
                                    ]
                                },
                                {
                                    stack: [
                                        {
                                            ul: [
                                                this.invoice!.customerId.name,
                                                "CIF: " + this.invoice!.customerId.cif,
                                                "Email: " + this.invoice!.customerId.email,
                                                "Teléfono: " + this.invoice!.customerId.phone,
                                                this.invoice!.customerId.address
                                            ]
                                        }
                                    ]
                                },
                            ]
                        ]
                    }
                },
                { text: '\n\nConceptos', style: 'header' },
                this.generateConceptsString(),
                { text: '\n\nImporte', style: 'header' },
                'IVA: ' + this.invoice!.taxableIncome + "%",
                { text: 'TOTAL: ' + this.invoice!.totalAmount + "€", style: 'subheader' },
                { text: '\n\nCobro', style: 'header' },
                { text: this.company!.iban, style: 'subheader' }
            ],
            styles: {
                title: {
                    fontSize: 14,
                    bold: true,
                    color: "darkcyan"
                },
                header: {
                    fontSize: 12,
                    bold: true,
                    color: "cadetblue"
                },
                subheader: {
                    fontSize: 12,
                    bold: true,
                },
                table: {
                    margin: [0, 5, 0, 15]
                }
            },
            defaultStyle: {
                fontSize: 10
            }
        }

    }

    public generateConceptsString(): string {
        let conceptsString: string = "";
        this.invoice!.concepts.forEach(concept => {
            const conceptSubstring: string = concept.concept + ": " + String(concept.amount) + "€" + "\n";
            conceptsString += conceptSubstring;
        });
        return conceptsString;
    }

}