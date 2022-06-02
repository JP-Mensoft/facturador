// App
import { CustomerController } from "../../controllers/customerController";

export const customerRoutes = [
    {
        method: 'get',
        route: '/customer/getone/:customerId',
        middlewares: 'checkToken',
        controller: CustomerController,
        action: 'getOneCustomer'
    },
    {
        method: 'get',
        route: '/customer/getall',
        middlewares: 'checkToken',
        controller: CustomerController,
        action: 'getAllCustomers'
    },
    {
        method: 'post',
        route: '/customer/add',
        middlewares: 'checkToken',
        controller: CustomerController,
        action: 'addCustomer'
    },
    {
        method: 'delete',
        route: '/customer/delete/:customerId',
        middlewares: 'checkToken',
        controller: CustomerController,
        action: 'deleteCustomer'
    }
]