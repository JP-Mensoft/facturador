export class PdfInvoiceModel {

    constructor() { }

    public generateDocumentStructure(): any {
        return {
            pageSize: "A4",
            pageOrientation: "portrait",
            pageMargins: [20, 20, 20, 20],
            content: [
                { text: 'Factura 0', style: 'header' }
            ]
        }
    }

}