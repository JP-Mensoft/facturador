import { companyRoutes } from "./controllersRoutes/companyRoutes";
import { userRoutes } from "./controllersRoutes/userRoutes";

export const routesIndex = [
    ...userRoutes,
    ...companyRoutes
];