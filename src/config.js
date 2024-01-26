import { config } from "dotenv";

config();
export default {
    app: {
        port: process.env.PORT || 4000,
    },
    jwt: {
        security: process.env.JET_SECRET || "secretPassword"
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        user: process.env.MYSQL_USER || 'root',
        password: process.env.MYSQL_PASS || '',
        database: process.env.MYSQL_DB || 'helartico'
    }
}