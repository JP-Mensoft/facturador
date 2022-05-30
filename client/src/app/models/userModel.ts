export class UserAccessModel {
    constructor(
        public email: string,
        public password: string
    ) { }
}

export class UserSetModel {
    constructor(
        public email: string,
        public name: string,
        public phone: string,
        public newPassword: string,
        public reNewPassword: string
    ) { }
}

