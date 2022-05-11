export class ResponseModel {
    constructor(
        public success: boolean = false,
        public result: any = undefined,
        public status: number = 100
    ) { }
}