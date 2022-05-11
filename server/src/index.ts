// App
import { DbConnection } from "./database/dbConnection";
import { Server } from "./app/server";

// Launch DB & Server

DbConnection.initialize().then(() => {
    new Server();
}, () => {
    console.log("Failed connection to database.");
});

