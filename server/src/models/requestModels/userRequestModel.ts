export class userRequestModel {
    constructor(public email: string, public password: string, public verificationPassword?: string) { }
}