export class UserAccessModel {
    constructor(
        public email: string,
        public password: string
    ) { }
}

export class UserSaveModel {
    constructor(
        public email: string,
        public password: string,
        public verifiedPassword: string,
        public name: string,
        public phone: string
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

