<?php
// Live Data Integration Example
// This file shows how to integrate with real store APIs

class LiveDealsAPI {
    private $pdo;
    
    public function __construct($pdo) {
        $this->pdo = $pdo;
    }
    
    // Amazon Product Advertising API integration
    public function fetchAmazonDeals($apiKey, $secretKey, $partnerTag) {
        // Amazon Product Advertising API 5.0
        $endpoint = 'https://webservices.amazon.com/paapi5/searchitems';
        
        $payload = [
            'Keywords' => 'deals',
            'SearchIndex' => 'All',
            'ItemCount' => 10,
            'Resources' => [
                'ItemInfo.Title',
                'Offers.Listings.Price',
                'Offers.Listings.SavingBasis',
                'Images.Primary.Large',
                'ItemInfo.Features'
            ],
            'PartnerTag' => $partnerTag,
            'PartnerType' => 'Associates',
            'Marketplace' => 'www.amazon.com'
        ];
        
        $headers = $this->generateAmazonHeaders($payload, $apiKey, $secretKey);
        
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $endpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true,
            CURLOPT_POSTFIELDS => json_encode($payload),
            CURLOPT_HTTPHEADER => $headers,
            CURLOPT_TIMEOUT => 30
        ]);
        
        $response = curl_exec($curl);
        curl_close($curl);
        
        return $this->processAmazonResponse($response);
    }
    
    // Best Buy API integration
    public function fetchBestBuyDeals($apiKey) {
        $endpoint = 'https://api.bestbuy.com/v1/products';
        $params = [
            'apiKey' => $apiKey,
            'format' => 'json',
            'show' => 'name,salePrice,regularPrice,url,image,customerReviewAverage',
            'categoryPath.name' => 'Electronics',
            'onSale' => true,
            'pageSize' => 20
        ];
        
        $url = $endpoint . '?' . http_build_query($params);
        
        $response = file_get_contents($url);
        return $this->processBestBuyResponse($response);
    }
    
    // Target API integration (via RapidAPI)
    public function fetchTargetDeals($rapidApiKey) {
        $endpoint = 'https://target-com.p.rapidapi.com/v2/auto-complete';
        
        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $endpoint,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => [
                'X-RapidAPI-Host: target-com.p.rapidapi.com',
                'X-RapidAPI-Key: ' . $rapidApiKey
            ]
        ]);
        
        $response = curl_exec($curl);
        curl_close($curl);
        
        return $this->processTargetResponse($response);
    }
    
    // Web scraping alternative (use with caution - respect robots.txt)
    public function scrapeDeals($store) {
        switch($store) {
            case 'walmart':
                return $this->scrapeWalmartDeals();
            case 'ebay':
                return $this->scrapeEbayDeals();
            default:
                return [];
        }
    }
    
    private function scrapeWalmartDeals() {
        // Example scraping (simplified - use proper HTML parsing)
        $url = 'https://www.walmart.com/browse/deals';
        $html = file_get_contents($url);
        
        // Use DOMDocument or Simple HTML DOM Parser
        $dom = new DOMDocument();
        @$dom->loadHTML($html);
        
        // Extract deal information
        // This is a simplified example - real implementation needs proper parsing
        $deals = [];
        
        return $deals;
    }
    
    // Process and save deals to database
    public function updateDealsDatabase($deals, $store) {
        $query = "INSERT INTO deals (title, description, store, current_price, original_price, 
                  image_url, affiliate_link, rating, category, deal_badge, status, created_at) 
                  VALUES (:title, :description, :store, :current_price, :original_price, 
                  :image_url, :affiliate_link, :rating, :category, :deal_badge, 'active', NOW())
                  ON DUPLICATE KEY UPDATE 
                  current_price = VALUES(current_price),
                  original_price = VALUES(original_price),
                  updated_at = NOW()";
        
        $stmt = $this->pdo->prepare($query);
        
        foreach ($deals as $deal) {
            $stmt->execute([
                'title' => $deal['title'],
                'description' => $deal['description'] ?? '',
                'store' => $store,
                'current_price' => $deal['current_price'],
                'original_price' => $deal['original_price'],
                'image_url' => $deal['image_url'] ?? '🛍️',
                'affiliate_link' => $deal['affiliate_link'],
                'rating' => $deal['rating'] ?? 4.0,
                'category' => $deal['category'] ?? 'general',
                'deal_badge' => $deal['badge'] ?? 'DEAL'
            ]);
        }
    }
    
    // Automated data fetching (run via cron job)
    public function fetchAllLiveDeals() {
        // Fetch from all configured APIs
        $amazonDeals = $this->fetchAmazonDeals(AMAZON_API_KEY, AMAZON_SECRET, AMAZON_PARTNER_TAG);
        $bestBuyDeals = $this->fetchBestBuyDeals(BESTBUY_API_KEY);
        $targetDeals = $this->fetchTargetDeals(RAPIDAPI_KEY);
        
        // Update database with fresh deals
        $this->updateDealsDatabase($amazonDeals, 'Amazon');
        $this->updateDealsDatabase($bestBuyDeals, 'Best Buy');
        $this->updateDealsDatabase($targetDeals, 'Target');
        
        // Clean up expired deals
        $this->removeExpiredDeals();
        
        return [
            'amazon_count' => count($amazonDeals),
            'bestbuy_count' => count($bestBuyDeals),
            'target_count' => count($targetDeals),
            'updated_at' => date('Y-m-d H:i:s')
        ];
    }
    
    private function removeExpiredDeals() {
        $query = "UPDATE deals SET status = 'expired' WHERE created_at < DATE_SUB(NOW(), INTERVAL 7 DAY)";
        $this->pdo->exec($query);
    }
}

// Configuration (add to config.php)
define('AMAZON_API_KEY', 'your_amazon_api_key');
define('AMAZON_SECRET', 'your_amazon_secret_key');
define('AMAZON_PARTNER_TAG', 'your_amazon_partner_tag');
define('BESTBUY_API_KEY', 'your_bestbuy_api_key');
define('RAPIDAPI_KEY', 'your_rapidapi_key');

// Usage example
$liveDealsAPI = new LiveDealsAPI($pdo);
$result = $liveDealsAPI->fetchAllLiveDeals();
echo json_encode($result);
?>