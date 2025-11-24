<?php
// Database configuration
$host = 'localhost';
$dbname = 'pricedeals';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch(PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Helper functions
function formatPrice($price) {
    return '$' . number_format($price, 2);
}

function formatDiscount($original, $current) {
    if ($original <= 0) return 0;
    return round((($original - $current) / $original) * 100);
}

function getStoreIcon($store) {
    $icons = [
        'Amazon' => '📦',
        'Best Buy' => '🛍️',
        'Target' => '🎯',
        'Walmart' => '🏪',
        'Newegg' => '💻',
        'Home Depot' => '🔨',
        'Macy\'s' => '🛒',
        'eBay' => '💰'
    ];
    return $icons[$store] ?? '🛍️';
}

function getCategoryIcon($category) {
    $icons = [
        'electronics' => '📱',
        'fashion' => '👕',
        'home' => '🏠',
        'sports' => '⚽',
        'books' => '📚',
        'toys' => '🎮',
        'beauty' => '💄',
        'automotive' => '🚗'
    ];
    return $icons[$category] ?? '🛍️';
}

function timeAgo($datetime) {
    $time = time() - strtotime($datetime);
    
    if ($time < 60) return 'just now';
    if ($time < 3600) return floor($time/60) . ' minutes ago';
    if ($time < 86400) return floor($time/3600) . ' hours ago';
    if ($time < 2592000) return floor($time/86400) . ' days ago';
    return date('M j, Y', strtotime($datetime));
}
?>