-- ===================================================
-- INFINITY TECH MYSQL DATABASE SCHEMA
-- Execute this script in your local MySQL instance (phpMyAdmin, MySQL Workbench, or CLI)
-- ===================================================

CREATE DATABASE IF NOT EXISTS infinity_tech_db;
USE infinity_tech_db;

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  role VARCHAR(100) DEFAULT 'Verified Member',
  avatar VARCHAR(500) DEFAULT 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(100) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  tagline VARCHAR(255),
  category VARCHAR(100) NOT NULL,
  pricing VARCHAR(50) NOT NULL,
  image VARCHAR(500),
  short_desc TEXT,
  full_desc TEXT,
  version VARCHAR(50) DEFAULT '1.0',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. ORDERS TABLE
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(100) PRIMARY KEY,
  user_id INT NOT NULL,
  total_amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) DEFAULT 'Credit Card',
  status VARCHAR(50) DEFAULT 'Completed',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. USER PURCHASES & LICENSES TABLE
CREATE TABLE IF NOT EXISTS user_purchases (
  id VARCHAR(100) PRIMARY KEY,
  user_id INT NOT NULL,
  order_id VARCHAR(100) NOT NULL,
  product_id VARCHAR(100) NOT NULL,
  license_key VARCHAR(255) NOT NULL,
  date_purchased TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
);

-- SEED DEMO USER (Password: DemoPass123!)
INSERT IGNORE INTO users (id, name, email, password, role) 
VALUES (
  1, 
  'Alex Rivera', 
  'alex@infinitytech.io', 
  '$2a$10$e7j41Vl9d5Y8uV2Yq8Z3u.Q4XwXbN3Z2X7X8X9Y0Z1A2B3C4D5E6F', 
  'Senior Tech Lead'
);
