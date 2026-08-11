import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

// MySQL Configuration parameters
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_USER = process.env.DB_USER || 'root';
const DB_PASSWORD = process.env.DB_PASSWORD || '';
const DB_NAME = process.env.DB_NAME || 'digiro_db';
const DB_PORT = process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306;

let pool = null;
let isConnectedToMySQL = false;

// Fallback in-memory store if local MySQL server is not active
export const memoryStore = {
  users: [
    {
      id: 1,
      name: 'Alex Rivera',
      email: 'alex@digiro.io',
      password: '$2a$10$e7j41Vl9d5Y8uV2Yq8Z3u.Q4XwXbN3Z2X7X8X9Y0Z1A2B3C4D5E6F',
      role: 'Senior Tech Lead',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    },
  ],
  orders: [],
  purchases: [],
  contactMessages: [],
};

export async function initDatabaseConnection() {
  try {
    pool = mysql.createPool({
      host: DB_HOST,
      user: DB_USER,
      password: DB_PASSWORD,
      database: DB_NAME,
      port: DB_PORT,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const connection = await pool.getConnection();
    console.log(`[MySQL] Successfully connected to MySQL Database '${DB_NAME}' on ${DB_HOST}:${DB_PORT}`);

    // Auto-migrate schema columns for Google Auth if missing
    try {
      await connection.query("ALTER TABLE users ADD COLUMN google_id VARCHAR(255) UNIQUE");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE users ADD COLUMN profile_image VARCHAR(500)");
    } catch (e) {}
    try {
      await connection.query("ALTER TABLE users ADD COLUMN auth_provider VARCHAR(50) DEFAULT 'email'");
    } catch (e) {}

    // Auto-create contact_messages table if missing
    try {
      await connection.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          phone VARCHAR(50),
          company VARCHAR(255),
          service VARCHAR(100),
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } catch (e) {}

    connection.release();
    isConnectedToMySQL = true;
    return true;
  } catch (err) {
    console.warn(`[MySQL Notice] Could not connect to local MySQL server (${err.message}). Defaulting to persistent In-Memory Storage.`);
    isConnectedToMySQL = false;
    return false;
  }
}

export function getPool() {
  return pool;
}

export function getMySQLStatus() {
  return {
    connected: isConnectedToMySQL,
    database: DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
  };
}
