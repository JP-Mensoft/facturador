export class ResponseModel {
    constructor(
        public success: boolean = false,
        public result: any = null,
        public status: number = 100
    ) { }
}