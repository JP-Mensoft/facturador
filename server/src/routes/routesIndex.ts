// App
import { companyRoutes } from "./controllersRoutes/companyRoutes";
import { customerRoutes } from "./controllersRoutes/customerRoutes";
import { userRoutes } from "./controllersRoutes/userRoutes";

export const routesIndex = [
    ...userRoutes,
    ...companyRoutes,
    ...customerRoutes
];