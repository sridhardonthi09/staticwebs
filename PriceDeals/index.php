<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DealHunter - Best Price Deals Online</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <?php
    // Include database connection and API
    include_once 'config.php';
    include_once 'api.php';
    
    // Get current page parameters
    $category = $_GET['category'] ?? 'all';
    $store = $_GET['store'] ?? 'all';
    $sort = $_GET['sort'] ?? 'newest';
    $search = $_GET['search'] ?? '';
    
    // Get deals from database
    $dealAPI = new DealAPI($pdo);
    $deals = $dealAPI->getDeals($category, $store, $sort, 12, 0);
    $storeStats = $dealAPI->getStoreStats();
    ?>
    
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="nav">
                <div class="logo">
                    <h1>💰 DealHunter</h1>
                    <span class="tagline">Find the Best Deals Online</span>
                </div>
                <nav class="nav-links">
                    <a href="#deals" class="nav-link">Hot Deals</a>
                    <a href="#categories" class="nav-link">Categories</a>
                    <a href="#stores" class="nav-link">Stores</a>
                    <a href="#alerts" class="nav-link">Price Alerts</a>
                </nav>
                <div class="search-container">
                    <input type="text" id="searchInput" placeholder="Search for deals..." class="search-input">
                    <button class="search-btn">🔍</button>
                </div>
            </div>
        </div>
    </header>

    <!-- Hero Section -->
    <section class="hero">
        <div class="container">
            <div class="hero-content">
                <h2>Discover Amazing Deals</h2>
                <p>Save money with the latest price drops from Amazon, Best Buy, Target, Walmart, and more!</p>
                <div class="hero-stats">
                    <div class="stat">
                        <span class="stat-number">50K+</span>
                        <span class="stat-label">Active Deals</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">$2M+</span>
                        <span class="stat-label">Total Savings</span>
                    </div>
                    <div class="stat">
                        <span class="stat-number">15+</span>
                        <span class="stat-label">Partner Stores</span>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Filters Section -->
    <section class="filters">
        <div class="container">
            <div class="filter-tabs">
                <button class="filter-tab active" data-category="all">All Deals</button>
                <button class="filter-tab" data-category="electronics">Electronics</button>
                <button class="filter-tab" data-category="fashion">Fashion</button>
                <button class="filter-tab" data-category="home">Home & Garden</button>
                <button class="filter-tab" data-category="sports">Sports</button>
                <button class="filter-tab" data-category="books">Books</button>
            </div>
            <div class="filter-options">
                <select class="filter-select" id="storeFilter">
                    <option value="all">All Stores</option>
                    <option value="amazon">Amazon</option>
                    <option value="bestbuy">Best Buy</option>
                    <option value="target">Target</option>
                    <option value="walmart">Walmart</option>
                    <option value="newegg">Newegg</option>
                </select>
                <select class="filter-select" id="sortFilter">
                    <option value="newest">Newest First</option>
                    <option value="discount">Best Discount</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                </select>
            </div>
        </div>
    </section>

    <!-- Deals Grid -->
    <section class="deals-section" id="deals">
        <div class="container">
            <h3>🔥 Hot Deals Right Now</h3>
            <div class="deals-grid" id="dealsContainer">
                <?php if (!empty($deals)): ?>
                    <?php foreach ($deals as $deal): ?>
                        <div class="deal-card" data-deal-id="<?= $deal['id'] ?>">
                            <div class="deal-badge"><?= htmlspecialchars($deal['deal_badge']) ?></div>
                            <div class="deal-image">
                                <?= $deal['image_url'] ?>
                            </div>
                            <div class="deal-content">
                                <h4 class="deal-title"><?= htmlspecialchars($deal['title']) ?></h4>
                                <div class="deal-store">
                                    <span><?= getStoreIcon($deal['store']) ?></span>
                                    <span><?= htmlspecialchars($deal['store']) ?></span>
                                </div>
                                <div class="deal-prices">
                                    <span class="current-price"><?= formatPrice($deal['current_price']) ?></span>
                                    <span class="original-price"><?= formatPrice($deal['original_price']) ?></span>
                                    <span class="discount-percent"><?= formatDiscount($deal['original_price'], $deal['current_price']) ?>% OFF</span>
                                </div>
                                <p class="deal-description"><?= htmlspecialchars(substr($deal['description'], 0, 100)) ?>...</p>
                                <div class="deal-meta">
                                    <span>⭐ <?= $deal['rating'] ?></span>
                                    <span>⏰ <?= htmlspecialchars($deal['time_left']) ?> left</span>
                                </div>
                                <div class="deal-actions">
                                    <a href="deal.php?id=<?= $deal['id'] ?>" class="deal-btn primary">View Deal</a>
                                    <button class="deal-btn secondary" onclick="saveDeal(<?= $deal['id'] ?>)">💝 Save</button>
                                </div>
                            </div>
                        </div>
                    <?php endforeach; ?>
                <?php else: ?>
                    <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #718096;">
                        <h3>No deals found</h3>
                        <p>Try adjusting your filters or search terms.</p>
                    </div>
                <?php endif; ?>
            </div>
            <div class="load-more">
                <button class="load-more-btn" onclick="loadMoreDeals()">Load More Deals</button>
            </div>
        </div>
    </section>

    <!-- Store Partners -->
    <section class="stores-section" id="stores">
        <div class="container">
            <h3>Our Partner Stores</h3>
            <div class="stores-grid">
                <?php 
                $defaultStores = [
                    ['name' => 'Amazon', 'icon' => '📦'],
                    ['name' => 'Best Buy', 'icon' => '🛍️'],
                    ['name' => 'Target', 'icon' => '🎯'],
                    ['name' => 'Walmart', 'icon' => '🏪'],
                    ['name' => 'Newegg', 'icon' => '💻'],
                    ['name' => 'Home Depot', 'icon' => '🏠']
                ];
                
                foreach ($defaultStores as $store):
                    $dealCount = 0;
                    foreach ($storeStats as $stat) {
                        if ($stat['store'] === $store['name']) {
                            $dealCount = $stat['deal_count'];
                            break;
                        }
                    }
                ?>
                    <div class="store-card">
                        <div class="store-logo"><?= $store['icon'] ?></div>
                        <h4><?= htmlspecialchars($store['name']) ?></h4>
                        <span class="deal-count"><?= number_format($dealCount) ?> deals</span>
                    </div>
                <?php endforeach; ?>
            </div>
        </div>
    </section>

    <!-- Newsletter Signup -->
    <section class="newsletter">
        <div class="container">
            <div class="newsletter-content">
                <h3>Never Miss a Deal!</h3>
                <p>Get the best deals delivered to your inbox daily</p>
                <div class="newsletter-form">
                    <input type="email" placeholder="Enter your email" class="email-input">
                    <button class="subscribe-btn">Subscribe</button>
                </div>
            </div>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="container">
            <div class="footer-content">
                <div class="footer-section">
                    <h4>DealHunter</h4>
                    <p>Your trusted source for the best online deals and discounts.</p>
                </div>
                <div class="footer-section">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><a href="#deals">Hot Deals</a></li>
                        <li><a href="#categories">Categories</a></li>
                        <li><a href="#stores">Partner Stores</a></li>
                        <li><a href="#alerts">Price Alerts</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Categories</h4>
                    <ul>
                        <li><a href="#">Electronics</a></li>
                        <li><a href="#">Fashion</a></li>
                        <li><a href="#">Home & Garden</a></li>
                        <li><a href="#">Sports & Outdoors</a></li>
                    </ul>
                </div>
                <div class="footer-section">
                    <h4>Connect</h4>
                    <ul>
                        <li><a href="#">Facebook</a></li>
                        <li><a href="#">Twitter</a></li>
                        <li><a href="#">Instagram</a></li>
                        <li><a href="#">Newsletter</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 DealHunter. All rights reserved. | Privacy Policy | Terms of Service</p>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
    <script>
        // PHP data for JavaScript
        window.phpData = {
            currentCategory: '<?= htmlspecialchars($category) ?>',
            currentStore: '<?= htmlspecialchars($store) ?>',
            currentSort: '<?= htmlspecialchars($sort) ?>',
            searchTerm: '<?= htmlspecialchars($search) ?>',
            totalDeals: <?= count($deals) ?>
        };
        
        // Override JavaScript functions to use PHP API
        function loadMoreDeals() {
            fetch('api.php?action=get_deals&offset=' + document.querySelectorAll('.deal-card').length)
                .then(response => response.json())
                .then(data => {
                    if (data.success && data.deals.length > 0) {
                        // Add new deals to the grid
                        const dealsContainer = document.getElementById('dealsContainer');
                        data.deals.forEach(deal => {
                            dealsContainer.innerHTML += createDealCardFromPHP(deal);
                        });
                    }
                })
                .catch(error => console.error('Error:', error));
        }
        
        function saveDeal(dealId) {
            // In a real app, this would require user authentication
            fetch('api.php?action=add_favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `user_id=1&deal_id=${dealId}` // Demo user ID
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Deal saved to your favorites!');
                }
            })
            .catch(error => console.error('Error:', error));
        }
        
        function subscribeToNewsletter() {
            const email = document.querySelector('.email-input').value;
            if (!email) return;
            
            fetch('api.php?action=subscribe', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `email=${encodeURIComponent(email)}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Thank you for subscribing!');
                    document.querySelector('.email-input').value = '';
                } else {
                    alert('Error: ' + data.error);
                }
            })
            .catch(error => console.error('Error:', error));
        }
        
        // Update subscribe button
        document.addEventListener('DOMContentLoaded', function() {
            const subscribeBtn = document.querySelector('.subscribe-btn');
            subscribeBtn.onclick = subscribeToNewsletter;
        });
    </script>
</body>
</html>