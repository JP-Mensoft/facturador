// App
import { dbConnection } from "./database/dbConnection";
import { Server } from "./app/server";

// Launch DB & Server

dbConnection.initialize().then(() => {
    new Server();
}, () => {
    console.log("Failed connection to database.");
});

