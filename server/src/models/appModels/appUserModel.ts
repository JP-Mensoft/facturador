export class AppUserModel {
    constructor(
        public userId?: number,
        public email?: string,
        public password?: string,
        public verificationPassword?: string
    ) { }
}