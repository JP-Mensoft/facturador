export class UserIdModel {
    constructor(
        public userId: number,
    ) { }
}

export class SaveUserModel {
    constructor(
        public email: string,
        public password: string
    ) { }
}

export class SetUserModel {
    constructor(
        public userId: number,
        public email: string,
        public password: string
    ) { }
}

