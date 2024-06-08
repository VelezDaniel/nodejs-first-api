import { config } from "dotenv";

config();
export default {
    app: {
        port: process.env.PORT || 3000,
    },
    frontend: {
        url: process.env.FRONTEND_URL,
    },
    jwt: {
        security: process.env.JET_SECRET || "secretPassword"
    },
    mysql: {
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'helartico',
        dbPort: process.env.DB_PORT || 3306
    },
    payment: {
        paypalApi: 'https://api-m.sandbox.paypal.com',
        paypalApiClient: process.env.PAYPAL_API_CLIENT,
        paypalApiKey: process.env.PAYPAL_API_SECRET,
    }
}
