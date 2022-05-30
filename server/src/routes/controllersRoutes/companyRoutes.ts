// App
import { CompanyController } from "../../controllers/companyController";

export const companyRoutes = [
    {
        method: 'get',
        route: '/company/usercompany',
        middlewares: 'checkToken',
        controller: CompanyController,
        action: 'getUserCompany'
    },
    {
        method: 'post',
        route: '/company/set',
        middlewares: 'checkToken',
        controller: CompanyController,
        action: 'setUserCompany'
    }
]