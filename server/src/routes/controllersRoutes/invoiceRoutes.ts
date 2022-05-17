import { InvoiceController } from "../../controllers/invoiceController";

export const invoiceRoutes = [
    {
        method: 'post',
        route: '/invoice/register',
        middlewares: 'checkToken',
        controller: InvoiceController,
        action: 'addInvoice'
    },
    {
        method: 'delete',
        route: '/invoice/delete',
        middlewares: 'checkToken',
        controller: InvoiceController,
        action: 'deleteInvoice'
    },
]