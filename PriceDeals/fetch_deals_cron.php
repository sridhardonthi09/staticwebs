<?php
// Cron job script to fetch live deals
// This script should be run periodically (every hour) to update deals

require_once 'config.php';
require_once 'live_deals_integration.php';

try {
    $liveDealsAPI = new LiveDealsAPI($pdo);
    
    echo "Starting deals fetch at " . date('Y-m-d H:i:s') . "\n";
    
    // Fetch deals from all sources
    $result = $liveDealsAPI->fetchAllLiveDeals();
    
    echo "Deals fetch completed:\n";
    echo "- Amazon deals: " . $result['amazon_count'] . "\n";
    echo "- Best Buy deals: " . $result['bestbuy_count'] . "\n";
    echo "- Target deals: " . $result['target_count'] . "\n";
    echo "- Updated at: " . $result['updated_at'] . "\n";
    
} catch (Exception $e) {
    echo "Error fetching deals: " . $e->getMessage() . "\n";
    error_log("Deals fetch error: " . $e->getMessage());
}
?>