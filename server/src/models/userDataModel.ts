export class UserIdModel {
    constructor(
        public userId: number,
    ) { }
}

export class AccessUserModel {
    constructor(
        public email: string,
        public password: string
    ) { }
}

export class SaveUserModel {
    constructor(
        public email: string,
        public password: string,
        public verifiedPassword: string,
        public name: string,
        public phone: string
    ) { }
}

export class SetUserModel {
    constructor(
        public userId: number,
        public email: string,
        public password: string,
        public name: string,
        public phone: string
    ) { }
}

export class SetUserRecoveryCodeModel {
    constructor(
        public userId: number,
        public recoveryCode: string
    ) { }
}
