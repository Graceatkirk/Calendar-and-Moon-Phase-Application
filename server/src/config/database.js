import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const dbConfig = {
    development: {
        username: process.env.DB_USERNAME, // Database username
        password: process.env.DB_PASSWORD, // Database password
        database: process.env.DB_NAME, // Database name
        host: process.env.DB_HOST, // Database host
        dialect: 'postgres' // Database dialect
    },
    production: {
        use_env_variable: 'DATABASE_URL', // Use environment variable for production
        dialect: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false // Adjust based on your SSL requirements
            }
        }
    }
};

// Create a Sequelize instance using the development configuration
const sequelize = new Sequelize(dbConfig.development.database, dbConfig.development.username, dbConfig.development.password, {
    host: dbConfig.development.host,
    dialect: dbConfig.development.dialect,
    logging: false // Disable logging; default: console.log
});

// Export both the configuration and the sequelize instance
export { dbConfig, sequelize };
