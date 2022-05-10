export class AppRouteModel {
    constructor(
        public method: string,
        public route: string,
        public middleware: string,
        public controller: any,
        public action: string
    ) { }
}