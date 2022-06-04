import { InvoiceController } from "../../controllers/invoiceController";

export const invoiceRoutes = [
    {
        method: 'get',
        route: '/invoice/getone/:invoiceId',
        middlewares: 'checkToken',
        controller: InvoiceController,
        action: 'getOneInvoice'
    },
    {
        method: 'get',
        route: '/invoice/getall',
        middlewares: 'checkToken',
        controller: InvoiceController,
        action: 'getAllInvoices'
    },
    {
        method: 'post',
        route: '/invoice/add',
        middlewares: 'checkToken',
        controller: InvoiceController,
        action: 'addInvoice'
    },
    {
        method: 'delete',
        route: '/invoice/delete/:invoiceId',
        middlewares: 'checkToken',
        controller: InvoiceController,
        action: 'deleteInvoice'
    },
    {
        method: 'get',
        route: '/invoice/setcollected/:invoiceId',
        middlewares: 'checkToken',
        controller: InvoiceController,
        action: 'setCollectedInvoice'
    }
]