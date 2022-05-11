export class RouteModel {
    constructor(
        public method: string,
        public route: string,
        public middlewares: string,
        public controller: any,
        public action: string
    ) { }
}