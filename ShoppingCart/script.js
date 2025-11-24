// Weaver's Heritage - Shopping Cart Application JavaScript

// Global variables
let cart = [];
let products = [];
let currentFilter = 'all';
let currentSort = 'name';

// Premium Weaver Products Data
const weaverProducts = [
    // Sarees
    {
        id: 1,
        name: 'Banarasi Silk Saree - Royal Blue',
        category: 'sarees',
        price: 8999.99,
        originalPrice: 12999.99,
        image: '🟦',
        rating: 4.9,
        badge: 'PREMIUM',
        description: 'Handwoven Banarasi silk saree with intricate gold zari work'
    },
    {
        id: 2,
        name: 'Kanjivaram Silk Saree - Traditional',
        category: 'sarees',
        price: 15999.99,
        originalPrice: 19999.99,
        image: '🟨',
        rating: 4.8,
        badge: 'HERITAGE',
        description: 'Pure Kanjivaram silk with traditional temple border design'
    },
    {
        id: 3,
        name: 'Chanderi Cotton Saree - Sky Blue',
        category: 'sarees',
        price: 3499.99,
        originalPrice: 4999.99,
        image: '🟦',
        rating: 4.6,
        badge: 'POPULAR',
        description: 'Lightweight Chanderi cotton with delicate motifs'
    },
    {
        id: 4,
        name: 'Tussar Silk Saree - Golden',
        category: 'sarees',
        price: 6999.99,
        originalPrice: 8999.99,
        image: '🟨',
        rating: 4.7,
        badge: 'ELEGANT',
        description: 'Natural Tussar silk with hand-painted designs'
    },
    
    // Suits & Kurtas
    {
        id: 5,
        name: 'Anarkali Suit Set - Navy Blue',
        category: 'suits',
        price: 4999.99,
        originalPrice: 6999.99,
        image: '👗',
        rating: 4.5,
        badge: 'FESTIVE',
        description: 'Elegant Anarkali suit with embroidered dupatta'
    },
    {
        id: 6,
        name: 'Cotton Kurta Set - White',
        category: 'suits',
        price: 2999.99,
        originalPrice: 3999.99,
        image: '👔',
        rating: 4.4,
        badge: 'COMFORT',
        description: 'Pure cotton kurta with matching bottom and dupatta'
    },
    {
        id: 7,
        name: 'Silk Palazzo Suit - Royal Blue',
        category: 'suits',
        price: 5999.99,
        originalPrice: 7999.99,
        image: '👘',
        rating: 4.6,
        badge: 'DESIGNER',
        description: 'Luxurious silk palazzo suit with mirror work'
    },
    
    // Bedsheets
    {
        id: 8,
        name: 'Egyptian Cotton Bedsheet Set - Blue',
        category: 'bedsheets',
        price: 4999.99,
        originalPrice: 6999.99,
        image: '🛏️',
        rating: 4.8,
        badge: 'LUXURY',
        description: '600 thread count Egyptian cotton with pillowcases'
    },
    {
        id: 9,
        name: 'Silk Bedsheet Set - Navy',
        category: 'bedsheets',
        price: 8999.99,
        originalPrice: 11999.99,
        image: '🟦',
        rating: 4.9,
        badge: 'PREMIUM',
        description: 'Pure mulberry silk bedsheet set with matching pillowcases'
    },
    {
        id: 10,
        name: 'Handloom Cotton Bedsheet - White',
        category: 'bedsheets',
        price: 2999.99,
        originalPrice: 3999.99,
        image: '⬜',
        rating: 4.5,
        badge: 'ORGANIC',
        description: 'Handwoven organic cotton with traditional borders'
    },
    {
        id: 11,
        name: 'Jacquard Bedsheet Set - Royal Blue',
        category: 'bedsheets',
        price: 3999.99,
        originalPrice: 5499.99,
        image: '🟦',
        rating: 4.6,
        badge: 'MODERN',
        description: 'Contemporary jacquard weave with elegant patterns'
    },
    
    // Fabrics
    {
        id: 12,
        name: 'Pure Silk Fabric - Royal Blue',
        category: 'fabrics',
        price: 1999.99,
        originalPrice: 2999.99,
        image: '🧵',
        rating: 4.7,
        badge: 'PURE',
        description: 'Premium silk fabric, 5 meters, perfect for custom tailoring'
    },
    {
        id: 13,
        name: 'Handloom Cotton Fabric - White',
        category: 'fabrics',
        price: 999.99,
        originalPrice: 1499.99,
        image: '🤍',
        rating: 4.4,
        badge: 'NATURAL',
        description: 'Organic handloom cotton, 10 meters, breathable and soft'
    },
    {
        id: 14,
        name: 'Chanderi Fabric - Light Blue',
        category: 'fabrics',
        price: 1499.99,
        originalPrice: 1999.99,
        image: '🟦',
        rating: 4.5,
        badge: 'TRADITIONAL',
        description: 'Authentic Chanderi fabric with zari border, 6 meters'
    },
    
    // Home Textiles
    {
        id: 15,
        name: 'Handwoven Curtain Set - Navy Blue',
        category: 'home-textiles',
        price: 3999.99,
        originalPrice: 5499.99,
        image: '🪟',
        rating: 4.6,
        badge: 'ELEGANT',
        description: 'Premium handwoven curtains with tiebacks, set of 2'
    },
    {
        id: 16,
        name: 'Silk Cushion Covers - Blue Set',
        category: 'home-textiles',
        price: 1999.99,
        originalPrice: 2999.99,
        image: '🪑',
        rating: 4.5,
        badge: 'LUXURY',
        description: 'Pure silk cushion covers with gold borders, set of 4'
    },
    
    // Accessories
    {
        id: 17,
        name: 'Handwoven Silk Scarf - Blue',
        category: 'accessories',
        price: 1499.99,
        originalPrice: 1999.99,
        image: '🧣',
        rating: 4.4,
        badge: 'ARTISAN',
        description: 'Delicate silk scarf with traditional patterns'
    },
    {
        id: 18,
        name: 'Cotton Tote Bag - Natural',
        category: 'accessories',
        price: 799.99,
        originalPrice: 1199.99,
        image: '👜',
        rating: 4.3,
        badge: 'ECO-FRIENDLY',
        description: 'Handwoven cotton tote bag with blue accents'
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    products = [...weaverProducts];
    loadProducts();
    updateCartDisplay();
    
    // Load cart from localStorage if available
    const savedCart = localStorage.getItem('weaversCart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartDisplay();
    }
});

// Product management functions
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = filterAndSortProducts();
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="loading">
                <span>No products found matching your criteria</span>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class=\"product-card\" data-category=\"${product.category}\" data-id=\"${product.id}\">\n            <div class=\"product-image\">\n                ${product.image}\n                <div class=\"product-badge\">${product.badge}</div>\n            </div>\n            <div class=\"product-info\">\n                <div class=\"product-category\">${getCategoryName(product.category)}</div>\n                <h3 class=\"product-name\">${product.name}</h3>\n                <div class=\"product-rating\">\n                    <span class=\"stars\">${generateStars(product.rating)}</span>\n                    <span class=\"rating-text\">${product.rating}</span>\n                </div>\n                <div class=\"product-price\">\n                    <span class=\"current-price\">₹${product.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>\n                    ${product.originalPrice ? `<span class=\"original-price\">₹${product.originalPrice.toLocaleString('en-IN', {minimumFractionDigits: 2})}</span>` : ''}\n                </div>\n                <button class=\"add-to-cart\" onclick=\"addToCart(${product.id})\">\n                    🛒 Add to Cart\n                </button>\n            </div>\n        </div>
    `).join('');
}

function filterAndSortProducts() {
    let filtered = products;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filtered = filtered.filter(product => product.category === currentFilter);
    }
    
    // Apply search filter
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    if (searchTerm) {
        filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            getCategoryName(product.category).toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply sorting
    switch (currentSort) {
        case 'price-low':
            filtered.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filtered.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'popularity':
            filtered.sort((a, b) => {
                const popularityScore = (product) => product.rating * 1000 + (product.originalPrice - product.price);
                return popularityScore(b) - popularityScore(a);
            });
            break;
        default:
            filtered.sort((a, b) => a.name.localeCompare(b.name));
    }
    
    return filtered;
}

// Filter and sort functions
function filterByCategory(category) {
    currentFilter = category;
    
    // Update filter button states
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    loadProducts();
}

function sortProducts() {
    currentSort = document.getElementById('sortSelect').value;
    loadProducts();
}

function searchProducts() {
    loadProducts();
}

// Cart management functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartDisplay();
    saveCartToStorage();
    showAddToCartFeedback();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartDisplay();
    saveCartToStorage();
}

function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        removeFromCart(productId);
    } else {
        updateCartDisplay();
        saveCartToStorage();
    }
}

function updateCartDisplay() {
    const cartCount = document.querySelector('.cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class=\"empty-cart\">\n                <div class=\"empty-icon\">🛒</div>\n                <p>Your cart is empty</p>\n                <p>Discover our beautiful collection!</p>\n            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class=\"cart-item\">\n                <div class=\"cart-item-image\">${item.image}</div>\n                <div class=\"cart-item-info\">\n                    <div class=\"cart-item-name\">${item.name}</div>\n                    <div class=\"cart-item-price\">₹${item.price.toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>\n                    <div class=\"quantity-controls\">\n                        <button class=\"quantity-btn\" onclick=\"updateQuantity(${item.id}, -1)\">-</button>\n                        <span class=\"quantity\">${item.quantity}</span>\n                        <button class=\"quantity-btn\" onclick=\"updateQuantity(${item.id}, 1)\">+</button>\n                    </div>\n                </div>\n                <button class=\"remove-item\" onclick=\"removeFromCart(${item.id})\">🗑️</button>\n            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
    
    // Update totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 99; // Free shipping over ₹999
    cartSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    document.getElementById('cartShipping').textContent = shipping === 0 ? 'Free' : `₹${shipping}`;
    cartTotal.textContent = `₹${(subtotal + shipping).toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
}

// Cart sidebar functions
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

// Checkout functions
function proceedToCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.add('open');
    updateOrderSummary();
}

function closeCheckout() {
    const checkoutModal = document.getElementById('checkoutModal');
    checkoutModal.classList.remove('open');
}

function updateOrderSummary() {
    const orderItems = document.getElementById('orderItems');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderShipping = document.getElementById('orderShipping');
    const orderTax = document.getElementById('orderTax');
    const orderTotal = document.getElementById('orderTotal');
    
    // Update order items
    orderItems.innerHTML = cart.map(item => `
        <div class=\"order-item\">\n            <div>\n                <div class=\"order-item-name\">${item.name}</div>\n                <div class=\"order-item-quantity\">Qty: ${item.quantity}</div>\n            </div>\n            <div class=\"order-item-price\">₹${(item.price * item.quantity).toLocaleString('en-IN', {minimumFractionDigits: 2})}</div>\n        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 999 ? 0 : 99; // Free shipping over ₹999
    const tax = subtotal * 0.18; // 18% GST in India
    const total = subtotal + shipping + tax;
    
    orderSubtotal.textContent = `₹${subtotal.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    orderShipping.textContent = shipping === 0 ? 'Free' : `₹${shipping}`;
    orderTax.textContent = `₹${tax.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
    orderTotal.textContent = `₹${total.toLocaleString('en-IN', {minimumFractionDigits: 2})}`;
}

function placeOrder() {
    const form = document.getElementById('checkoutForm');
    
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }
    
    // Simulate order processing
    const orderId = 'WH' + Date.now().toString().slice(-8);
    
    // Clear cart
    cart = [];
    updateCartDisplay();
    saveCartToStorage();
    
    // Close checkout modal
    closeCheckout();
    
    // Show success modal
    showOrderSuccess(orderId);
}

function showOrderSuccess(orderId) {
    const successModal = document.getElementById('successModal');
    document.getElementById('orderId').textContent = orderId;
    successModal.classList.add('open');
}

function closeSuccess() {
    const successModal = document.getElementById('successModal');
    successModal.classList.remove('open');
    
    // Close cart sidebar
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.remove('open');
}

// Utility functions
function getCategoryName(category) {
    const names = {
        'sarees': 'Sarees',
        'suits': 'Suits & Kurtas',
        'bedsheets': 'Bedsheets',
        'fabrics': 'Fabrics',
        'home-textiles': 'Home Textiles',
        'accessories': 'Accessories'
    };
    return names[category] || category;
}

function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '⭐'.repeat(fullStars);
    if (hasHalfStar) stars += '⭐';
    return stars;
}

function showAddToCartFeedback() {
    // Enhanced feedback with Indian rupee animation
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    cartIcon.style.background = 'rgba(217, 119, 6, 0.3)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
        cartIcon.style.background = 'rgba(255, 255, 255, 0.15)';
    }, 300);
}

function saveCartToStorage() {
    localStorage.setItem('weaversCart', JSON.stringify(cart));
}

// Event listeners for modal close on outside click
document.addEventListener('click', function(event) {
    const checkoutModal = document.getElementById('checkoutModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === checkoutModal) {
        closeCheckout();
    }
    
    if (event.target === successModal) {
        closeSuccess();
    }
});

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        const cartSidebar = document.getElementById('cartSidebar');
        const checkoutModal = document.getElementById('checkoutModal');
        const successModal = document.getElementById('successModal');
        
        if (cartSidebar.classList.contains('open')) {
            toggleCart();
        } else if (checkoutModal.classList.contains('open')) {
            closeCheckout();
        } else if (successModal.classList.contains('open')) {
            closeSuccess();
        }
    }
});

// Search functionality with debouncing
let searchTimeout;
document.getElementById('searchInput').addEventListener('input', function() {
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
        searchProducts();
    }, 300);
});

// Smooth scroll for navigation links
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

// Newsletter subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('.newsletter-form input');
    const email = emailInput.value;
    
    if (email && email.includes('@')) {
        alert('Thank you for subscribing to Weaver\'s Heritage newsletter!');
        emailInput.value = '';
    } else {
        alert('Please enter a valid email address');
    }
}

// Add newsletter subscription event listener
document.addEventListener('DOMContentLoaded', function() {
    const newsletterBtn = document.querySelector('.newsletter-form button');
    if (newsletterBtn) {
        newsletterBtn.addEventListener('click', subscribeNewsletter);
    }
});

// Add scroll animations for better user experience
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
setTimeout(() => {
    document.querySelectorAll('.product-card, .category-card, .trust-item').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}, 100);

// Performance optimization: Lazy load product images
function lazyLoadImages() {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                // In a real app, you'd load actual images here
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('.product-image').forEach(img => {
        imageObserver.observe(img);
    });
}

// Call lazy loading after products are loaded
setTimeout(lazyLoadImages, 500);