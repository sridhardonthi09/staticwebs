<?php
// Database configuration
$host = 'localhost';
$dbname = 'pricedeals';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// API endpoints for deals
class DealAPI {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    public function getDeals($category = 'all', $store = 'all', $sort = 'newest', $limit = 12, $offset = 0) {
        $query = "SELECT * FROM deals WHERE status = 'active'";
        $params = [];
        
        if ($category !== 'all') {
            $query .= " AND category = :category";
            $params['category'] = $category;
        }
        
        if ($store !== 'all') {
            $query .= " AND store = :store";
            $params['store'] = $store;
        }
        
        // Add sorting
        switch($sort) {
            case 'discount':
                $query .= " ORDER BY discount_percent DESC";
                break;
            case 'price-low':
                $query .= " ORDER BY current_price ASC";
                break;
            case 'price-high':
                $query .= " ORDER BY current_price DESC";
                break;
            default:
                $query .= " ORDER BY created_at DESC";
        }
        
        $query .= " LIMIT :limit OFFSET :offset";
        
        $stmt = $this->pdo->prepare($query);
        
        // Bind parameters
        foreach ($params as $key => $value) {
            $stmt->bindValue($key, $value);
        }
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
        $stmt->bindValue('offset', $offset, PDO::PARAM_INT);
        
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function searchDeals($searchTerm, $limit = 12) {
        $query = "SELECT * FROM deals WHERE status = 'active' AND 
                 (title LIKE :search OR description LIKE :search OR store LIKE :search)
                 ORDER BY created_at DESC LIMIT :limit";
        
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue('search', '%' . $searchTerm . '%');
        $stmt->bindValue('limit', $limit, PDO::PARAM_INT);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getStoreStats() {
        $query = "SELECT store, COUNT(*) as deal_count FROM deals WHERE status = 'active' GROUP BY store";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function getDealById($id) {
        $query = "SELECT * FROM deals WHERE id = :id AND status = 'active'";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue('id', $id);
        $stmt->execute();
        
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
    
    public function incrementDealClick($dealId) {
        $query = "UPDATE deals SET click_count = click_count + 1 WHERE id = :id";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue('id', $dealId);
        $stmt->execute();
    }
    
    public function addToFavorites($userId, $dealId) {
        $query = "INSERT INTO user_favorites (user_id, deal_id, created_at) VALUES (:user_id, :deal_id, NOW())
                 ON DUPLICATE KEY UPDATE created_at = NOW()";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue('user_id', $userId);
        $stmt->bindValue('deal_id', $dealId);
        $stmt->execute();
    }
    
    public function subscribeToNewsletter($email) {
        $query = "INSERT INTO newsletter_subscribers (email, subscribed_at) VALUES (:email, NOW())
                 ON DUPLICATE KEY UPDATE subscribed_at = NOW(), status = 'active'";
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue('email', $email);
        $stmt->execute();
    }
}

// Initialize API
$dealAPI = new DealAPI($pdo);

// Handle API requests
if (isset($_GET['action'])) {
    header('Content-Type: application/json');
    
    switch($_GET['action']) {
        case 'get_deals':
            $category = $_GET['category'] ?? 'all';
            $store = $_GET['store'] ?? 'all';
            $sort = $_GET['sort'] ?? 'newest';
            $limit = (int)($_GET['limit'] ?? 12);
            $offset = (int)($_GET['offset'] ?? 0);
            
            $deals = $dealAPI->getDeals($category, $store, $sort, $limit, $offset);
            echo json_encode(['success' => true, 'deals' => $deals]);
            break;
            
        case 'search_deals':
            $searchTerm = $_GET['q'] ?? '';
            $deals = $dealAPI->searchDeals($searchTerm);
            echo json_encode(['success' => true, 'deals' => $deals]);
            break;
            
        case 'get_store_stats':
            $stats = $dealAPI->getStoreStats();
            echo json_encode(['success' => true, 'stats' => $stats]);
            break;
            
        case 'track_click':
            if (isset($_POST['deal_id'])) {
                $dealAPI->incrementDealClick($_POST['deal_id']);
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Deal ID required']);
            }
            break;
            
        case 'add_favorite':
            if (isset($_POST['user_id']) && isset($_POST['deal_id'])) {
                $dealAPI->addToFavorites($_POST['user_id'], $_POST['deal_id']);
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'User ID and Deal ID required']);
            }
            break;
            
        case 'subscribe':
            if (isset($_POST['email'])) {
                $email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
                if ($email) {
                    $dealAPI->subscribeToNewsletter($email);
                    echo json_encode(['success' => true, 'message' => 'Successfully subscribed!']);
                } else {
                    echo json_encode(['success' => false, 'error' => 'Invalid email address']);
                }
            } else {
                echo json_encode(['success' => false, 'error' => 'Email required']);
            }
            break;
            
        default:
            echo json_encode(['success' => false, 'error' => 'Invalid action']);
    }
    exit;
}

// Sample function to populate database with sample deals (run once)
function populateSampleDeals($pdo) {
    $sampleDeals = [
        [
            'title' => 'Apple iPhone 15 Pro - 128GB',
            'description' => 'Latest iPhone with advanced camera system and A17 Pro chip',
            'store' => 'Amazon',
            'store_icon' => '📦',
            'current_price' => 899.99,
            'original_price' => 999.99,
            'discount_percent' => 10,
            'category' => 'electronics',
            'image_url' => '📱',
            'deal_badge' => 'HOT DEAL',
            'rating' => 4.8,
            'time_left' => '2 days',
            'affiliate_link' => 'https://amazon.com/iphone15pro',
            'status' => 'active'
        ],
        // Add more sample deals...
    ];
    
    $query = "INSERT INTO deals (title, description, store, store_icon, current_price, original_price, 
              discount_percent, category, image_url, deal_badge, rating, time_left, affiliate_link, status, created_at)
              VALUES (:title, :description, :store, :store_icon, :current_price, :original_price, 
              :discount_percent, :category, :image_url, :deal_badge, :rating, :time_left, :affiliate_link, :status, NOW())";
    
    $stmt = $pdo->prepare($query);
    
    foreach ($sampleDeals as $deal) {
        $stmt->execute($deal);
    }
}

// Add these methods to the DealAPI class (insert before the closing brace of the class)
/*
    public function getAllDealsAdmin() {
        $query = "SELECT * FROM deals ORDER BY created_at DESC";
        $stmt = $this->pdo->prepare($query);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function addDeal($dealData) {
        $query = "INSERT INTO deals (title, description, store, category, current_price, original_price, 
                 rating, time_left, affiliate_link, image_url, deal_badge, status) 
                 VALUES (:title, :description, :store, :category, :current_price, :original_price, 
                 :rating, :time_left, :affiliate_link, :image_url, :deal_badge, 'active')";
        
        $stmt = $this->pdo->prepare($query);
        $stmt->bindValue('title', $dealData['title']);
        $stmt->bindValue('description', $dealData['description']);
        $stmt->bindValue('store', $dealData['store']);
        $stmt->bindValue('category', $dealData['category']);
        $stmt->bindValue('current_price', $dealData['current_price']);
        $stmt->bindValue('original_price', $dealData['original_price']);
        $stmt->bindValue('rating', $dealData['rating']);
        $stmt->bindValue('time_left', $dealData['time_left']);
        $stmt->bindValue('affiliate_link', $dealData['affiliate_link']);
        $stmt->bindValue('image_url', $dealData['image_url']);
        $stmt->bindValue('deal_badge', 'HOT DEAL');
        
        return $stmt->execute();
    }
*/

// Uncomment to populate sample data
// populateSampleDeals($pdo);
?>