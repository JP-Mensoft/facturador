export class DecodedModel {
    constructor(
        public data: any,
        public decodedToken: DecodedTokenModel
    ) { }
}

export class DecodedTokenModel {
    constructor(
        public userId: number
    ) { }
}