import {ConnectionOptions} from "typeorm";

/**
 * Данные для соединения с БД
 */
export const connectionOptions : ConnectionOptions  = {
    type: "mongodb",
    host: "127.0.0.1",
    port: 27017,
    // username: "root",
    // password: "",
    database: "test",
    logging: {
        logQueries: true,
        logFailedQueryError: true,
    },
    entities: [
        __dirname + "/../Models/*.js"
    ],
    autoSchemaSync: true
};