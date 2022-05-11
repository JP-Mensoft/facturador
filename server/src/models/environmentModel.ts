export class EnvironmentModel {
    constructor(
        public serverIP: string,
        public serverPort: number,
        public jwtKey: string
    ) { }
}