// App
import { CustomerController } from "../../controllers/customerController";

export const customerRoutes = [
    {
        method: 'post',
        route: '/customer/getone',
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
        route: '/customer/register',
        middlewares: 'checkToken',
        controller: CustomerController,
        action: 'registerCustomer'
    },
    {
        method: 'delete',
        route: '/customer/delete',
        middlewares: 'checkToken',
        controller: CustomerController,
        action: 'deleteCustomer'
    }
]