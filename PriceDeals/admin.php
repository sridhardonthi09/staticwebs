<?php
include_once 'config.php';
include_once 'api.php';

$dealAPI = new DealAPI($pdo);

// Handle form submissions
if ($_POST) {
    if (isset($_POST['action'])) {
        switch ($_POST['action']) {
            case 'add_deal':
                $result = $dealAPI->addDeal($_POST);
                break;
            case 'update_deal':
                $result = $dealAPI->updateDeal($_POST['id'], $_POST);
                break;
            case 'delete_deal':
                $result = $dealAPI->deleteDeal($_POST['id']);
                break;
        }
    }
}

// Get all deals for admin view
$allDeals = $dealAPI->getAllDealsAdmin();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Panel - DealHunter</title>
    <link rel="stylesheet" href="style.css">
    <style>
        .admin-container {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 2rem;
        }
        
        .admin-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 2rem;
            padding: 2rem;
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .admin-tabs {
            display: flex;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .tab-button {
            padding: 1rem 2rem;
            background: white;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .tab-button.active {
            background: #667eea;
            color: white;
            border-color: #667eea;
        }
        
        .tab-content {
            display: none;
            background: white;
            padding: 2rem;
            border-radius: 12px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .tab-content.active {
            display: block;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
        }
        
        .form-group input,
        .form-group select,
        .form-group textarea {
            width: 100%;
            padding: 0.75rem;
            border: 2px solid #e2e8f0;
            border-radius: 8px;
            font-size: 1rem;
        }
        
        .form-group textarea {
            min-height: 100px;
            resize: vertical;
        }
        
        .form-row {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1rem;
        }
        
        .deals-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 2rem;
        }
        
        .deals-table th,
        .deals-table td {
            padding: 1rem;
            text-align: left;
            border-bottom: 1px solid #e2e8f0;
        }
        
        .deals-table th {
            background: #f7fafc;
            font-weight: 600;
        }
        
        .status-badge {
            padding: 0.25rem 0.75rem;
            border-radius: 20px;
            font-size: 0.875rem;
            font-weight: 500;
        }
        
        .status-active {
            background: #c6f6d5;
            color: #22543d;
        }
        
        .status-inactive {
            background: #fed7d7;
            color: #742a2a;
        }
        
        .btn-small {
            padding: 0.5rem 1rem;
            font-size: 0.875rem;
            margin-right: 0.5rem;
        }
    </style>
</head>
<body>
    <div class="admin-container">
        <div class="admin-header">
            <div>
                <h1>🔧 Admin Panel</h1>
                <p>Manage deals, stores, and analytics</p>
            </div>
            <a href="index.php" class="deal-btn primary">← Back to Site</a>
        </div>
        
        <div class="admin-tabs">
            <button class="tab-button active" onclick="switchTab('deals')">📦 Deals</button>
            <button class="tab-button" onclick="switchTab('add-deal')">➕ Add Deal</button>
            <button class="tab-button" onclick="switchTab('analytics')">📊 Analytics</button>
        </div>
        
        <!-- Deals Tab -->
        <div id="deals" class="tab-content active">
            <h2>All Deals</h2>
            <table class="deals-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Store</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Status</th>
                        <th>Views</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <?php foreach ($allDeals as $deal): ?>
                    <tr>
                        <td><?= $deal['id'] ?></td>
                        <td><?= htmlspecialchars(substr($deal['title'], 0, 50)) ?>...</td>
                        <td><?= htmlspecialchars($deal['store']) ?></td>
                        <td><?= formatPrice($deal['current_price']) ?></td>
                        <td><?= formatDiscount($deal['original_price'], $deal['current_price']) ?>%</td>
                        <td>
                            <span class="status-badge <?= $deal['status'] === 'active' ? 'status-active' : 'status-inactive' ?>">
                                <?= ucfirst($deal['status']) ?>
                            </span>
                        </td>
                        <td><?= number_format($deal['click_count']) ?></td>
                        <td>
                            <a href="deal.php?id=<?= $deal['id'] ?>" class="deal-btn primary btn-small">View</a>
                            <button class="deal-btn secondary btn-small" onclick="editDeal(<?= $deal['id'] ?>)">Edit</button>
                            <button class="deal-btn btn-small" style="background: #f56565; color: white;" onclick="deleteDeal(<?= $deal['id'] ?>)">Delete</button>
                        </td>
                    </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        
        <!-- Add Deal Tab -->
        <div id="add-deal" class="tab-content">
            <h2>Add New Deal</h2>
            <form method="POST" action="">
                <input type="hidden" name="action" value="add_deal">
                
                <div class="form-group">
                    <label for="title">Deal Title</label>
                    <input type="text" id="title" name="title" required>
                </div>
                
                <div class="form-group">
                    <label for="description">Description</label>
                    <textarea id="description" name="description" required></textarea>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="store">Store</label>
                        <select id="store" name="store" required>
                            <option value="">Select Store</option>
                            <option value="Amazon">Amazon</option>
                            <option value="Best Buy">Best Buy</option>
                            <option value="Target">Target</option>
                            <option value="Walmart">Walmart</option>
                            <option value="eBay">eBay</option>
                        </select>
                    </div>
                    
                    <div class="form-group">
                        <label for="category">Category</label>
                        <select id="category" name="category" required>
                            <option value="">Select Category</option>
                            <option value="electronics">Electronics</option>
                            <option value="clothing">Clothing</option>
                            <option value="home">Home & Garden</option>
                            <option value="books">Books</option>
                            <option value="sports">Sports</option>
                            <option value="toys">Toys</option>
                        </select>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="current_price">Current Price ($)</label>
                        <input type="number" id="current_price" name="current_price" step="0.01" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="original_price">Original Price ($)</label>
                        <input type="number" id="original_price" name="original_price" step="0.01" required>
                    </div>
                </div>
                
                <div class="form-row">
                    <div class="form-group">
                        <label for="rating">Rating (1-5)</label>
                        <input type="number" id="rating" name="rating" min="1" max="5" step="0.1" required>
                    </div>
                    
                    <div class="form-group">
                        <label for="time_left">Time Left</label>
                        <input type="text" id="time_left" name="time_left" placeholder="e.g., 2 days left" required>
                    </div>
                </div>
                
                <div class="form-group">
                    <label for="affiliate_link">Affiliate Link</label>
                    <input type="url" id="affiliate_link" name="affiliate_link" required>
                </div>
                
                <div class="form-group">
                    <label for="image_url">Image Emoji/Icon</label>
                    <input type="text" id="image_url" name="image_url" placeholder="e.g., 📱, 💻, 👕" required>
                </div>
                
                <button type="submit" class="deal-btn primary" style="width: 100%; padding: 1rem; font-size: 1.1rem;">
                    🚀 Add Deal
                </button>
            </form>
        </div>
        
        <!-- Analytics Tab -->
        <div id="analytics" class="tab-content">
            <h2>Analytics Dashboard</h2>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
                <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 2rem; border-radius: 12px;">
                    <h3>Total Deals</h3>
                    <p style="font-size: 2.5rem; margin: 0;"><?= count($allDeals) ?></p>
                </div>
                <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); color: white; padding: 2rem; border-radius: 12px;">
                    <h3>Active Deals</h3>
                    <p style="font-size: 2.5rem; margin: 0;"><?= count(array_filter($allDeals, fn($d) => $d['status'] === 'active')) ?></p>
                </div>
                <div style="background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%); color: white; padding: 2rem; border-radius: 12px;">
                    <h3>Total Views</h3>
                    <p style="font-size: 2.5rem; margin: 0;"><?= number_format(array_sum(array_column($allDeals, 'click_count'))) ?></p>
                </div>
                <div style="background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%); color: white; padding: 2rem; border-radius: 12px;">
                    <h3>Avg. Discount</h3>
                    <p style="font-size: 2.5rem; margin: 0;">
                        <?php 
                        $avgDiscount = array_sum(array_map(fn($d) => formatDiscount($d['original_price'], $d['current_price']), $allDeals)) / count($allDeals);
                        echo round($avgDiscount) . '%';
                        ?>
                    </p>
                </div>
            </div>
        </div>
    </div>

    <script>
        function switchTab(tabName) {
            // Hide all tab contents
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.classList.remove('active');
            });
            
            // Remove active class from all tab buttons
            document.querySelectorAll('.tab-button').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected tab content
            document.getElementById(tabName).classList.add('active');
            
            // Add active class to clicked button
            event.target.classList.add('active');
        }
        
        function editDeal(dealId) {
            // You can implement edit functionality here
            alert('Edit functionality would be implemented here for deal ID: ' + dealId);
        }
        
        function deleteDeal(dealId) {
            if (confirm('Are you sure you want to delete this deal?')) {
                fetch('api.php?action=delete_deal', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: `deal_id=${dealId}`
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        location.reload();
                    } else {
                        alert('Error deleting deal');
                    }
                });
            }
        }
    </script>
</body>
</html>