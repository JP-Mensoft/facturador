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
    },
    {
        method: 'get',
        route: '/user/getone',
        middlewares: 'checkToken',
        controller: UserController,
        action: 'getOneUser'
    },
    {
        method: 'put',
        route: '/user/set',
        middlewares: 'checkToken',
        controller: UserController,
        action: 'setUser'
    }
]
