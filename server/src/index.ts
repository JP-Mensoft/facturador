// App
import { appDataSource } from "./database/appDataSource";
import { AppServer } from "./appServer";

// Launch DB & Server

appDataSource.initialize().then(() => {
    new AppServer();
}, () => {
    console.log("Failed connection to database.");
});

