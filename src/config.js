import { config } from "dotenv";

config();
export default {
    app: {
        port: process.env.DB_PORT || 4000,
    },
    jwt: {
        security: process.env.JET_SECRET || "secretPassword"
    },
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'helartico'
    }
}