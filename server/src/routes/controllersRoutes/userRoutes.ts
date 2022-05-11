import { UserController } from "../../controllers/userController";

export const userRoutes = [
    {
        method: 'get',
        route: '/user/saludar',
        middlewares: 'checkToken',
        controller: UserController,
        action: 'saludar'
    },
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
    }
]