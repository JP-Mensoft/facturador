// App
import { UserController } from "../../controllers/userController";

export const userRoutes = [
    {
        method: 'post',
        route: '/user/access',
        middlewares: 'undefined',
        controller: UserController,
        action: 'userAccess'
    },
    {
        method: 'post',
        route: '/user/register',
        middlewares: 'undefined',
        controller: UserController,
        action: 'registerUser'
    },
    {
        method: 'get',
        route: '/user/checktoken',
        middlewares: 'checkToken',
        controller: UserController,
        action: 'checkUserToken'
    }
]
