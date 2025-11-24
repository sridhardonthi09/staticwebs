// Sample deals data (in a real app, this would come from PHP/API)
let deals = [
    {
        id: 1,
        title: "Apple iPhone 15 Pro - 128GB",
        store: "Amazon",
        storeIcon: "📦",
        currentPrice: 899.99,
        originalPrice: 999.99,
        discount: 10,
        category: "electronics",
        image: "📱",
        description: "Latest iPhone with advanced camera system and A17 Pro chip",
        dealBadge: "HOT DEAL",
        rating: 4.8,
        timeLeft: "2 days"
    },
    {
        id: 2,
        title: "Samsung 65\" 4K Smart TV",
        store: "Best Buy",
        storeIcon: "🛍️",
        currentPrice: 549.99,
        originalPrice: 799.99,
        discount: 31,
        category: "electronics",
        image: "📺",
        description: "Crystal UHD display with smart features and Alexa built-in",
        dealBadge: "FLASH SALE",
        rating: 4.6,
        timeLeft: "6 hours"
    },
    {
        id: 3,
        title: "Nike Air Max Sneakers",
        store: "Target",
        storeIcon: "🎯",
        currentPrice: 79.99,
        originalPrice: 129.99,
        discount: 38,
        category: "fashion",
        image: "👟",
        description: "Comfortable running shoes with air cushioning technology",
        dealBadge: "LIMITED",
        rating: 4.7,
        timeLeft: "1 day"
    },
    {
        id: 4,
        title: "Instant Pot Duo 7-in-1",
        store: "Walmart",
        storeIcon: "🏪",
        currentPrice: 49.99,
        originalPrice: 89.99,
        discount: 44,
        category: "home",
        image: "🍲",
        description: "Multi-functional pressure cooker for quick and easy meals",
        dealBadge: "BESTSELLER",
        rating: 4.9,
        timeLeft: "3 days"
    },
    {
        id: 5,
        title: "Gaming Mechanical Keyboard",
        store: "Newegg",
        storeIcon: "💻",
        currentPrice: 79.99,
        originalPrice: 149.99,
        discount: 47,
        category: "electronics",
        image: "⌨️",
        description: "RGB backlit mechanical keyboard with blue switches",
        dealBadge: "GAMING",
        rating: 4.5,
        timeLeft: "5 hours"
    },
    {
        id: 6,
        title: "Wireless Bluetooth Headphones",
        store: "Amazon",
        storeIcon: "📦",
        currentPrice: 39.99,
        originalPrice: 79.99,
        discount: 50,
        category: "electronics",
        image: "🎧",
        description: "Noise-canceling headphones with 30-hour battery life",
        dealBadge: "50% OFF",
        rating: 4.4,
        timeLeft: "12 hours"
    },
    {
        id: 7,
        title: "Coffee Maker with Grinder",
        store: "Target",
        storeIcon: "🎯",
        currentPrice: 89.99,
        originalPrice: 159.99,
        discount: 44,
        category: "home",
        image: "☕",
        description: "Programmable coffee maker with built-in burr grinder",
        dealBadge: "MORNING DEAL",
        rating: 4.3,
        timeLeft: "8 hours"
    },
    {
        id: 8,
        title: "Fitness Tracker Smartwatch",
        store: "Best Buy",
        storeIcon: "🛍️",
        currentPrice: 129.99,
        originalPrice: 199.99,
        discount: 35,
        category: "sports",
        image: "⌚",
        description: "Heart rate monitor, GPS tracking, and sleep analysis",
        dealBadge: "FITNESS",
        rating: 4.6,
        timeLeft: "1 day"
    },
    {
        id: 9,
        title: "Bestseller Book Collection",
        store: "Amazon",
        storeIcon: "📦",
        currentPrice: 19.99,
        originalPrice: 49.99,
        discount: 60,
        category: "books",
        image: "📚",
        description: "Collection of 5 bestselling novels in various genres",
        dealBadge: "BOOK DEAL",
        rating: 4.8,
        timeLeft: "4 days"
    },
    {
        id: 10,
        title: "Wireless Phone Charger",
        store: "Walmart",
        storeIcon: "🏪",
        currentPrice: 14.99,
        originalPrice: 29.99,
        discount: 50,
        category: "electronics",
        image: "🔋",
        description: "Fast wireless charging pad compatible with all Qi devices",
        dealBadge: "TECH DEAL",
        rating: 4.2,
        timeLeft: "2 days"
    }
];

// Current filters
let currentCategory = 'all';
let currentStore = 'all';
let currentSort = 'newest';

// DOM Elements
const dealsContainer = document.getElementById('dealsContainer');
const filterTabs = document.querySelectorAll('.filter-tab');
const storeFilter = document.getElementById('storeFilter');
const sortFilter = document.getElementById('sortFilter');
const searchInput = document.getElementById('searchInput');
const loadMoreBtn = document.querySelector('.load-more-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderDeals();
    setupEventListeners();
    updateDealCounts();
});

// Setup event listeners
function setupEventListeners() {
    // Category filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            currentCategory = this.dataset.category;
            updateActiveTab(this);
            renderDeals();
        });
    });

    // Store filter
    storeFilter.addEventListener('change', function() {
        currentStore = this.value;
        renderDeals();
    });

    // Sort filter
    sortFilter.addEventListener('change', function() {
        currentSort = this.value;
        renderDeals();
    });

    // Search functionality
    searchInput.addEventListener('input', function() {
        renderDeals();
    });

    // Load more deals
    loadMoreBtn.addEventListener('click', function() {
        loadMoreDeals();
    });

    // Newsletter subscription
    const subscribeBtn = document.querySelector('.subscribe-btn');
    subscribeBtn.addEventListener('click', function() {
        const email = document.querySelector('.email-input').value;
        if (email) {
            alert('Thank you for subscribing! We\'ll send you the best deals daily.');
            document.querySelector('.email-input').value = '';
        }
    });
}

// Update active tab
function updateActiveTab(activeTab) {
    filterTabs.forEach(tab => tab.classList.remove('active'));
    activeTab.classList.add('active');
}

// Filter deals based on current filters
function filterDeals() {
    let filteredDeals = [...deals];
    
    // Filter by category
    if (currentCategory !== 'all') {
        filteredDeals = filteredDeals.filter(deal => deal.category === currentCategory);
    }
    
    // Filter by store
    if (currentStore !== 'all') {
        filteredDeals = filteredDeals.filter(deal => deal.store.toLowerCase() === currentStore);
    }
    
    // Filter by search term
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        filteredDeals = filteredDeals.filter(deal => 
            deal.title.toLowerCase().includes(searchTerm) ||
            deal.description.toLowerCase().includes(searchTerm) ||
            deal.store.toLowerCase().includes(searchTerm)
        );
    }
    
    // Sort deals
    filteredDeals.sort((a, b) => {
        switch (currentSort) {
            case 'discount':
                return b.discount - a.discount;
            case 'price-low':
                return a.currentPrice - b.currentPrice;
            case 'price-high':
                return b.currentPrice - a.currentPrice;
            case 'newest':
            default:
                return b.id - a.id;
        }
    });
    
    return filteredDeals;
}

// Render deals to the DOM
function renderDeals() {
    const filteredDeals = filterDeals();
    
    if (filteredDeals.length === 0) {
        dealsContainer.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: #718096;">
                <h3>No deals found</h3>
                <p>Try adjusting your filters or search terms.</p>
            </div>
        `;
        return;
    }
    
    const dealsHTML = filteredDeals.map(deal => createDealCard(deal)).join('');
    dealsContainer.innerHTML = dealsHTML;
    
    // Add click event listeners to deal buttons
    addDealEventListeners();
}

// Create individual deal card HTML
function createDealCard(deal) {
    const discountPercent = Math.round(((deal.originalPrice - deal.currentPrice) / deal.originalPrice) * 100);
    
    return `
        <div class="deal-card" data-deal-id="${deal.id}">
            <div class="deal-badge">${deal.dealBadge}</div>
            <div class="deal-image">
                ${deal.image}
            </div>
            <div class="deal-content">
                <h4 class="deal-title">${deal.title}</h4>
                <div class="deal-store">
                    <span>${deal.storeIcon}</span>
                    <span>${deal.store}</span>
                </div>
                <div class="deal-prices">
                    <span class="current-price">$${deal.currentPrice}</span>
                    <span class="original-price">$${deal.originalPrice}</span>
                    <span class="discount-percent">${discountPercent}% OFF</span>
                </div>
                <p class="deal-description">${deal.description}</p>
                <div class="deal-meta">
                    <span>⭐ ${deal.rating}</span>
                    <span>⏰ ${deal.timeLeft} left</span>
                </div>
                <div class="deal-actions">
                    <a href="#" class="deal-btn primary" onclick="viewDeal(${deal.id})">View Deal</a>
                    <button class="deal-btn secondary" onclick="saveDeal(${deal.id})">💝 Save</button>
                </div>
            </div>
        </div>
    `;
}

// Add event listeners to deal cards
function addDealEventListeners() {
    const dealCards = document.querySelectorAll('.deal-card');
    dealCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// View deal function
function viewDeal(dealId) {
    const deal = deals.find(d => d.id === dealId);
    if (deal) {
        // In a real app, this would redirect to the store
        alert(`Redirecting to ${deal.store} for ${deal.title}...`);
        
        // Track the click (in real app, send to analytics)
        console.log(`Deal clicked: ${deal.title} from ${deal.store}`);
    }
}

// Save deal function
function saveDeal(dealId) {
    const deal = deals.find(d => d.id === dealId);
    if (deal) {
        // In a real app, this would save to user's favorites
        alert(`${deal.title} saved to your favorites!`);
        
        // Visual feedback
        const saveBtn = event.target;
        const originalText = saveBtn.textContent;
        saveBtn.textContent = '✅ Saved';
        saveBtn.style.background = '#48bb78';
        
        setTimeout(() => {
            saveBtn.textContent = originalText;
            saveBtn.style.background = '';
        }, 2000);
    }
}

// Load more deals function
function loadMoreDeals() {
    // In a real app, this would make an API call to get more deals
    const newDeals = [
        {
            id: deals.length + 1,
            title: "Bluetooth Speaker with RGB Lights",
            store: "Amazon",
            storeIcon: "📦",
            currentPrice: 29.99,
            originalPrice: 59.99,
            discount: 50,
            category: "electronics",
            image: "🔊",
            description: "Portable speaker with colorful LED lights and bass boost",
            dealBadge: "NEW",
            rating: 4.3,
            timeLeft: "6 hours"
        },
        {
            id: deals.length + 2,
            title: "Organic Cotton Bedsheet Set",
            store: "Target",
            storeIcon: "🎯",
            currentPrice: 34.99,
            originalPrice: 69.99,
            discount: 50,
            category: "home",
            image: "🛏️",
            description: "Soft, breathable bedsheets made from 100% organic cotton",
            dealBadge: "COMFORT",
            rating: 4.7,
            timeLeft: "2 days"
        }
    ];
    
    deals.push(...newDeals);
    renderDeals();
    
    // Show loading animation briefly
    loadMoreBtn.textContent = 'Loading...';
    setTimeout(() => {
        loadMoreBtn.textContent = 'Load More Deals';
    }, 1000);
}

// Update deal counts for stores
function updateDealCounts() {
    const storeCounts = {};
    deals.forEach(deal => {
        storeCounts[deal.store] = (storeCounts[deal.store] || 0) + 1;
    });
    
    // Update store cards with actual counts
    const storeCards = document.querySelectorAll('.store-card');
    storeCards.forEach(card => {
        const storeName = card.querySelector('h4').textContent;
        const countElement = card.querySelector('.deal-count');
        const count = storeCounts[storeName] || 0;
        countElement.textContent = `${count.toLocaleString()} deals`;
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Auto-refresh deals every 5 minutes (in real app)
setInterval(() => {
    console.log('Refreshing deals...');
    // In real app, this would fetch new deals from the server
}, 300000);

// Add some interactive features
document.addEventListener('DOMContentLoaded', function() {
    // Add typing animation to search placeholder
    const searchInput = document.getElementById('searchInput');
    const placeholders = ['Search for electronics...', 'Find fashion deals...', 'Discover home goods...', 'Browse book deals...'];
    let placeholderIndex = 0;
    
    setInterval(() => {
        searchInput.placeholder = placeholders[placeholderIndex];
        placeholderIndex = (placeholderIndex + 1) % placeholders.length;
    }, 3000);
    
    // Add countdown timers (simulated)
    setInterval(() => {
        const timeElements = document.querySelectorAll('.deal-card');
        timeElements.forEach(card => {
            // In real app, this would update actual countdown timers
        });
    }, 1000);
});