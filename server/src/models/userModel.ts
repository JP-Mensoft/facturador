export class UserModel {
    constructor(
        public userId?: number,
        public email?: string,
        public password?: string,
        public verificationPassword?: string
    ) { }
}