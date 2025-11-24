-- Database schema for DealHunter website

CREATE DATABASE IF NOT EXISTS pricedeals;
USE pricedeals;

-- Deals table
CREATE TABLE IF NOT EXISTS deals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    store VARCHAR(100) NOT NULL,
    store_icon VARCHAR(10),
    current_price DECIMAL(10, 2) NOT NULL,
    original_price DECIMAL(10, 2) NOT NULL,
    discount_percent INT GENERATED ALWAYS AS (ROUND(((original_price - current_price) / original_price) * 100)) STORED,
    category ENUM('electronics', 'fashion', 'home', 'sports', 'books', 'toys', 'beauty', 'automotive') NOT NULL,
    image_url VARCHAR(500),
    deal_badge VARCHAR(50),
    rating DECIMAL(2, 1),
    time_left VARCHAR(50),
    affiliate_link VARCHAR(500),
    click_count INT DEFAULT 0,
    status ENUM('active', 'expired', 'disabled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NULL,
    
    INDEX idx_category (category),
    INDEX idx_store (store),
    INDEX idx_status (status),
    INDEX idx_created (created_at),
    INDEX idx_price (current_price),
    INDEX idx_discount (discount_percent)
);

-- Users table (for favorites and preferences)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100),
    password_hash VARCHAR(255),
    preferences JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    
    INDEX idx_email (email)
);

-- User favorites table
CREATE TABLE IF NOT EXISTS user_favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    deal_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, deal_id),
    INDEX idx_user (user_id),
    INDEX idx_deal (deal_id)
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    status ENUM('active', 'unsubscribed') DEFAULT 'active',
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    unsubscribed_at TIMESTAMP NULL,
    
    INDEX idx_email (email),
    INDEX idx_status (status)
);

-- Price alerts table
CREATE TABLE IF NOT EXISTS price_alerts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    product_name VARCHAR(255) NOT NULL,
    target_price DECIMAL(10, 2) NOT NULL,
    current_price DECIMAL(10, 2),
    store VARCHAR(100),
    product_url VARCHAR(500),
    status ENUM('active', 'triggered', 'disabled') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    triggered_at TIMESTAMP NULL,
    
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user (user_id),
    INDEX idx_status (status)
);

-- Deal categories table
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(10),
    description TEXT,
    parent_id INT NULL,
    sort_order INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL,
    INDEX idx_parent (parent_id),
    INDEX idx_active (is_active)
);

-- Stores table
CREATE TABLE IF NOT EXISTS stores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    icon VARCHAR(10),
    logo_url VARCHAR(500),
    website_url VARCHAR(255),
    affiliate_program VARCHAR(100),
    commission_rate DECIMAL(5, 2),
    is_active BOOLEAN DEFAULT TRUE,
    api_config JSON,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_active (is_active),
    INDEX idx_name (name)
);

-- Deal clicks tracking
CREATE TABLE IF NOT EXISTS deal_clicks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    deal_id INT NOT NULL,
    user_id INT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    referrer VARCHAR(500),
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (deal_id) REFERENCES deals(id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    INDEX idx_deal (deal_id),
    INDEX idx_user (user_id),
    INDEX idx_clicked (clicked_at)
);

-- Coupon codes table
CREATE TABLE IF NOT EXISTS coupons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    store_id INT NOT NULL,
    discount_type ENUM('percentage', 'fixed', 'free_shipping') NOT NULL,
    discount_value DECIMAL(10, 2),
    minimum_purchase DECIMAL(10, 2),
    usage_count INT DEFAULT 0,
    max_usage INT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verified_at TIMESTAMP NULL,
    expires_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE,
    INDEX idx_store (store_id),
    INDEX idx_code (code),
    INDEX idx_expires (expires_at)
);

-- Insert sample data

-- Categories
INSERT INTO categories (name, slug, icon, description) VALUES
('Electronics', 'electronics', '📱', 'Smartphones, laptops, gadgets and tech accessories'),
('Fashion', 'fashion', '👕', 'Clothing, shoes, accessories and jewelry'),
('Home & Garden', 'home', '🏠', 'Home decor, furniture, kitchen appliances and garden tools'),
('Sports & Outdoors', 'sports', '⚽', 'Fitness equipment, outdoor gear and sports accessories'),
('Books & Media', 'books', '📚', 'Books, movies, music and educational content'),
('Toys & Games', 'toys', '🎮', 'Kids toys, board games and gaming accessories'),
('Beauty & Health', 'beauty', '💄', 'Skincare, makeup, health supplements and wellness products'),
('Automotive', 'automotive', '🚗', 'Car accessories, tools and automotive parts');

-- Stores
INSERT INTO stores (name, slug, icon, website_url, is_active) VALUES
('Amazon', 'amazon', '📦', 'https://amazon.com', TRUE),
('Best Buy', 'bestbuy', '🛍️', 'https://bestbuy.com', TRUE),
('Target', 'target', '🎯', 'https://target.com', TRUE),
('Walmart', 'walmart', '🏪', 'https://walmart.com', TRUE),
('Newegg', 'newegg', '💻', 'https://newegg.com', TRUE),
('Home Depot', 'homedepot', '🔨', 'https://homedepot.com', TRUE),
('Macy''s', 'macys', '🛒', 'https://macys.com', TRUE),
('eBay', 'ebay', '💰', 'https://ebay.com', TRUE);

-- Sample deals
INSERT INTO deals (title, description, store, store_icon, current_price, original_price, category, image_url, deal_badge, rating, time_left, affiliate_link, status) VALUES
('Apple iPhone 15 Pro - 128GB', 'Latest iPhone with advanced camera system and A17 Pro chip', 'Amazon', '📦', 899.99, 999.99, 'electronics', '📱', 'HOT DEAL', 4.8, '2 days', 'https://amazon.com/iphone15pro', 'active'),
('Samsung 65" 4K Smart TV', 'Crystal UHD display with smart features and Alexa built-in', 'Best Buy', '🛍️', 549.99, 799.99, 'electronics', '📺', 'FLASH SALE', 4.6, '6 hours', 'https://bestbuy.com/samsung-tv', 'active'),
('Nike Air Max Sneakers', 'Comfortable running shoes with air cushioning technology', 'Target', '🎯', 79.99, 129.99, 'fashion', '👟', 'LIMITED', 4.7, '1 day', 'https://target.com/nike-shoes', 'active'),
('Instant Pot Duo 7-in-1', 'Multi-functional pressure cooker for quick and easy meals', 'Walmart', '🏪', 49.99, 89.99, 'home', '🍲', 'BESTSELLER', 4.9, '3 days', 'https://walmart.com/instant-pot', 'active'),
('Gaming Mechanical Keyboard', 'RGB backlit mechanical keyboard with blue switches', 'Newegg', '💻', 79.99, 149.99, 'electronics', '⌨️', 'GAMING', 4.5, '5 hours', 'https://newegg.com/gaming-keyboard', 'active'),
('Wireless Bluetooth Headphones', 'Noise-canceling headphones with 30-hour battery life', 'Amazon', '📦', 39.99, 79.99, 'electronics', '🎧', '50% OFF', 4.4, '12 hours', 'https://amazon.com/bluetooth-headphones', 'active'),
('Coffee Maker with Grinder', 'Programmable coffee maker with built-in burr grinder', 'Target', '🎯', 89.99, 159.99, 'home', '☕', 'MORNING DEAL', 4.3, '8 hours', 'https://target.com/coffee-maker', 'active'),
('Fitness Tracker Smartwatch', 'Heart rate monitor, GPS tracking, and sleep analysis', 'Best Buy', '🛍️', 129.99, 199.99, 'sports', '⌚', 'FITNESS', 4.6, '1 day', 'https://bestbuy.com/fitness-tracker', 'active'),
('Bestseller Book Collection', 'Collection of 5 bestselling novels in various genres', 'Amazon', '📦', 19.99, 49.99, 'books', '📚', 'BOOK DEAL', 4.8, '4 days', 'https://amazon.com/book-collection', 'active'),
('Wireless Phone Charger', 'Fast wireless charging pad compatible with all Qi devices', 'Walmart', '🏪', 14.99, 29.99, 'electronics', '🔋', 'TECH DEAL', 4.2, '2 days', 'https://walmart.com/wireless-charger', 'active'),
('Winter Jacket - Waterproof', 'Insulated winter jacket with waterproof exterior', 'Target', '🎯', 59.99, 119.99, 'fashion', '🧥', 'WINTER SALE', 4.5, '1 week', 'https://target.com/winter-jacket', 'active'),
('Robot Vacuum Cleaner', 'Smart robot vacuum with app control and mapping', 'Best Buy', '🛍️', 199.99, 349.99, 'home', '🤖', 'SMART HOME', 4.4, '3 days', 'https://bestbuy.com/robot-vacuum', 'active');