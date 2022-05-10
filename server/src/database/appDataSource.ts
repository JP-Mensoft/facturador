// App
import { DataSource } from "typeorm"

export const appDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "facturadordb",
    entities: ["dist/database/entities/*.js"],
    logging: false,
    synchronize: true,
});