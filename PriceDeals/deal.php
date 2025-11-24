<?php
include_once 'config.php';
include_once 'api.php';

$dealAPI = new DealAPI($pdo);

if (!isset($_GET['id'])) {
    header('Location: index.php');
    exit;
}

$dealId = (int)$_GET['id'];
$deal = $dealAPI->getDealById($dealId);

if (!$deal) {
    header('Location: index.php');
    exit;
}

// Track deal view
$dealAPI->incrementDealClick($dealId);
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?= htmlspecialchars($deal['title']) ?> - DealHunter</title>
    <link rel="stylesheet" href="style.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        .deal-detail {
            padding: 3rem 0;
            background: white;
        }
        
        .deal-detail-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 3rem;
            max-width: 1000px;
            margin: 0 auto;
            padding: 0 2rem;
        }
        
        .deal-image-large {
            background: #f7fafc;
            border-radius: 12px;
            height: 400px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 6rem;
        }
        
        .deal-info h1 {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #2d3748;
        }
        
        .deal-price-large {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 2rem 0;
        }
        
        .current-price-large {
            font-size: 2.5rem;
            font-weight: 700;
            color: #e53e3e;
        }
        
        .original-price-large {
            font-size: 1.8rem;
            color: #a0aec0;
            text-decoration: line-through;
        }
        
        .deal-cta {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-size: 1.2rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            text-align: center;
        }
        
        .deal-cta:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        @media (max-width: 768px) {
            .deal-detail-container {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header -->
    <header class="header">
        <div class="container">
            <div class="nav">
                <div class="logo">
                    <h1><a href="index.php" style="color: white; text-decoration: none;">💰 DealHunter</a></h1>
                    <span class="tagline">Find the Best Deals Online</span>
                </div>
                <nav class="nav-links">
                    <a href="index.php" class="nav-link">← Back to Deals</a>
                </nav>
            </div>
        </div>
    </header>

    <!-- Deal Detail -->
    <section class="deal-detail">
        <div class="deal-detail-container">
            <div class="deal-image-section">
                <div class="deal-image-large">
                    <?= $deal['image_url'] ?>
                </div>
            </div>
            
            <div class="deal-info">
                <div class="deal-badge" style="display: inline-block; margin-bottom: 1rem;">
                    <?= htmlspecialchars($deal['deal_badge']) ?>
                </div>
                
                <h1><?= htmlspecialchars($deal['title']) ?></h1>
                
                <div class="deal-store" style="margin-bottom: 1.5rem;">
                    <span style="font-size: 1.5rem;"><?= getStoreIcon($deal['store']) ?></span>
                    <span style="font-size: 1.2rem; font-weight: 600;"><?= htmlspecialchars($deal['store']) ?></span>
                </div>
                
                <div class="deal-price-large">
                    <span class="current-price-large"><?= formatPrice($deal['current_price']) ?></span>
                    <span class="original-price-large"><?= formatPrice($deal['original_price']) ?></span>
                    <span class="discount-percent" style="font-size: 1.2rem; padding: 0.5rem 1rem;">
                        <?= formatDiscount($deal['original_price'], $deal['current_price']) ?>% OFF
                    </span>
                </div>
                
                <p style="font-size: 1.1rem; line-height: 1.6; margin-bottom: 2rem; color: #4a5568;">
                    <?= htmlspecialchars($deal['description']) ?>
                </p>
                
                <div class="deal-meta" style="margin-bottom: 2rem; font-size: 1.1rem;">
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Rating:</strong> ⭐ <?= $deal['rating'] ?>/5.0
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Time Left:</strong> ⏰ <?= htmlspecialchars($deal['time_left']) ?>
                    </div>
                    <div style="margin-bottom: 0.5rem;">
                        <strong>Category:</strong> <?= getCategoryIcon($deal['category']) ?> <?= ucfirst($deal['category']) ?>
                    </div>
                    <div>
                        <strong>Deal Views:</strong> 👁️ <?= number_format($deal['click_count']) ?>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-bottom: 2rem;">
                    <a href="<?= htmlspecialchars($deal['affiliate_link'] ?? '#') ?>" 
                       target="_blank" 
                       class="deal-cta"
                       onclick="trackDealClick(<?= $deal['id'] ?>)">
                        🛒 Get This Deal
                    </a>
                    <button class="deal-btn secondary" onclick="saveDeal(<?= $deal['id'] ?>)" style="padding: 1rem 1.5rem; font-size: 1rem;">
                        💝 Save for Later
                    </button>
                </div>
                
                <div style="background: #f7fafc; padding: 1.5rem; border-radius: 12px; border-left: 4px solid #667eea;">
                    <h4 style="margin-bottom: 1rem; color: #2d3748;">💡 Deal Tips:</h4>
                    <ul style="color: #4a5568; line-height: 1.6;">
                        <li>This deal expires in <?= htmlspecialchars($deal['time_left']) ?></li>
                        <li>Check <?= htmlspecialchars($deal['store']) ?> for additional shipping options</li>
                        <li>Consider signing up for store newsletters for exclusive deals</li>
                        <li>Compare prices before purchasing</li>
                    </ul>
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
                        <li><a href="index.php">Hot Deals</a></li>
                        <li><a href="index.php#categories">Categories</a></li>
                        <li><a href="index.php#stores">Partner Stores</a></li>
                    </ul>
                </div>
            </div>
            <div class="footer-bottom">
                <p>&copy; 2025 DealHunter. All rights reserved.</p>
            </div>
        </div>
    </footer>

    <script>
        function trackDealClick(dealId) {
            fetch('api.php?action=track_click', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `deal_id=${dealId}`
            });
        }
        
        function saveDeal(dealId) {
            fetch('api.php?action=add_favorite', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: `user_id=1&deal_id=${dealId}`
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Deal saved to your favorites!');
                    event.target.textContent = '✅ Saved';
                    event.target.style.background = '#48bb78';
                }
            })
            .catch(error => console.error('Error:', error));
        }
    </script>
</body>
</html>