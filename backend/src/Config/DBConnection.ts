import {ConnectionOptions} from "typeorm";

/**
 * Данные для соединения с БД
 */
export const connectionOptions : ConnectionOptions  = {
    type: "mongodb",
    host: "localhost",
    port: 27017,
    database: "test",
    entities: [
        __dirname + "/../Models/*.js"
    ],
    autoSchemaSync: true
};