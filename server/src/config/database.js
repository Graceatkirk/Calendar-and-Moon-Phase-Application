// src/config/database.js
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import defineUser from '../models/user.js'; // Import the User model

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

// Initialize the User model
const User = defineUser(sequelize); // Call the function to define User with the Sequelize instance

// Export both the sequelize instance and the User model
export { dbConfig, sequelize, User };
