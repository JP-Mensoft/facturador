// App
import { DataSource } from "typeorm"

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "",
    password: "",
    database: "",
    entities: ["dist/database/entities/*.js"],
    logging: true,
    synchronize: true,
});