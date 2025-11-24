# 🛒 DealHunter - Price Deals Website

A comprehensive full-stack web application that aggregates and displays the latest price deals from multiple online stores including Amazon, Best Buy, Target, and Walmart.

## ✨ Features

### 🏠 Frontend Features
- **Modern Responsive Design** - Works perfectly on all devices
- **Real-time Deal Search** - Find deals instantly with smart search
- **Advanced Filtering** - Filter by store, category, price range, and discount percentage
- **Interactive Animations** - Smooth hover effects and loading animations
- **Deal Categories** - Electronics, Clothing, Home & Garden, Books, Sports, Toys
- **Store Integration** - Amazon, Best Buy, Target, Walmart, eBay support
- **Individual Deal Pages** - Detailed view for each deal with full information
- **Favorites System** - Save deals for later viewing
- **Newsletter Subscription** - Stay updated with latest deals

### ⚡ Backend Features
- **PHP Backend** - Object-oriented API architecture
- **MySQL Database** - Comprehensive schema for deals, users, and analytics
- **RESTful API** - Clean endpoints for all data operations
- **Deal Management** - Full CRUD operations for deals
- **Analytics Tracking** - Track deal views and user interactions
- **Admin Panel** - Complete management interface for deals and analytics

### 📊 Admin Features
- **Deal Management** - Add, edit, delete, and manage all deals
- **Analytics Dashboard** - View total deals, active deals, views, and average discounts
- **Store Statistics** - Track performance across different stores
- **User Activity** - Monitor user favorites and click patterns

## 🏗️ Technical Architecture

### Frontend Stack
- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with flexbox, grid, and animations
- **JavaScript (ES6+)** - Interactive functionality and API integration
- **Responsive Design** - Mobile-first approach with CSS Grid and Flexbox

### Backend Stack
- **PHP 7.4+** - Server-side logic and API endpoints
- **MySQL 8.0+** - Relational database with optimized queries
- **PDO** - Secure database interactions with prepared statements
- **Object-Oriented Design** - Clean, maintainable code architecture

### Database Schema
- **deals** - Core deal information and metadata
- **users** - User accounts and preferences  
- **user_favorites** - User's saved deals
- **analytics** - Tracking and statistics
- **newsletter_subscribers** - Email subscription management
- **coupons** - Additional discount codes and promotions

## 🚀 Installation & Setup

### Prerequisites
- **PHP 7.4+** with PDO MySQL extension
- **MySQL 8.0+** or MariaDB 10.3+
- **Web Server** (Apache/Nginx) or local development environment

### Local Development Setup

1. **Clone or Download** the project files to your web server directory
2. **Import Database Schema**
   ```sql
   mysql -u your_username -p your_password < database.sql
   ```
3. **Configure Database Connection**
   Edit `config.php` with your database credentials:
   ```php
   $host = 'localhost';
   $dbname = 'pricedeals';
   $username = 'your_username';
   $password = 'your_password';
   ```
4. **Set Up Virtual Host** (Apache example)
   ```apache
   <VirtualHost *:80>
       DocumentRoot "/path/to/PriceDeals"
       ServerName dealshunter.local
   </VirtualHost>
   ```
5. **Access the Application**
   - Main Site: `http://localhost/PriceDeals/` or your configured domain
   - Admin Panel: `http://localhost/PriceDeals/admin.php`

### Production Deployment

1. **Upload Files** to your web hosting server
2. **Create Database** using cPanel/phpMyAdmin or command line
3. **Import Schema** using the provided `database.sql` file
4. **Update Configuration** in `config.php` with production database credentials
5. **Set Proper Permissions** on files and directories
6. **Configure SSL** for secure connections (recommended)

## 📁 File Structure

```
PriceDeals/
├── index.php              # Main homepage with deals display
├── deal.php              # Individual deal detail page  
├── admin.php             # Admin panel for deal management
├── api.php               # Backend API with all endpoints
├── config.php            # Database configuration
├── style.css             # Complete responsive styling
├── script.js             # Frontend JavaScript functionality
├── database.sql          # MySQL database schema and sample data
└── README.md            # This documentation file
```

## 🔧 Configuration

### Database Configuration (`config.php`)
```php
// Database settings
$host = 'localhost';          // Database host
$dbname = 'pricedeals';      // Database name  
$username = 'root';          // Database username
$password = '';              // Database password

// Helper functions for formatting
function formatPrice($price) { ... }
function formatDiscount($original, $current) { ... }
function getStoreIcon($store) { ... }
function getCategoryIcon($category) { ... }
```

### API Endpoints
- `GET api.php?action=get_deals` - Fetch all active deals
- `GET api.php?action=search_deals&q=term` - Search deals
- `POST api.php?action=track_click` - Track deal clicks
- `POST api.php?action=add_favorite` - Add deal to favorites
- `POST api.php?action=subscribe` - Newsletter subscription

## 🎨 Customization

### Adding New Stores
1. Update the store icons in `config.php`:
   ```php
   function getStoreIcon($store) {
       $icons = [
           'Your Store' => '🛍️',
           // Add more stores
       ];
       return $icons[$store] ?? '🏪';
   }
   ```
2. Add store option in admin form (`admin.php`)
3. Update any store-specific styling in `style.css`

### Adding New Categories  
1. Update category icons in `config.php`
2. Add category filters in the main navigation
3. Update admin form with new category options

### Styling Customization
- **Colors**: Update CSS custom properties in `style.css`
- **Fonts**: Change font imports and font-family declarations
- **Layout**: Modify CSS Grid and Flexbox properties
- **Animations**: Update keyframes and transition properties

## 📊 Database Schema Overview

### Main Tables
- **deals**: Core deal information (title, prices, store, category, etc.)
- **users**: User accounts and authentication
- **user_favorites**: Many-to-many relationship for saved deals
- **analytics**: Detailed tracking of user interactions
- **newsletter_subscribers**: Email marketing integration

### Key Relationships
- Users can have multiple favorite deals
- Deals belong to stores and categories
- Analytics track user interactions with deals
- Newsletter system manages email subscriptions

## 🛡️ Security Features

- **Prepared Statements**: All database queries use PDO prepared statements
- **Input Validation**: Server-side validation for all user inputs
- **XSS Protection**: HTML escaping for all dynamic content
- **CSRF Protection**: Can be easily added for form submissions
- **SQL Injection Prevention**: PDO with parameter binding

## 🚀 Performance Optimizations

- **Database Indexing**: Optimized queries with proper indexes
- **CSS/JS Minification**: Ready for production optimization
- **Image Optimization**: Emoji icons for fast loading
- **Caching Headers**: Can be configured at server level
- **CDN Ready**: Static assets can be easily moved to CDN

## 🔮 Future Enhancements

### Planned Features
- **User Authentication**: Full registration and login system
- **Price Tracking**: Alert users when prices drop
- **Deal Notifications**: Push notifications for new deals
- **Social Sharing**: Share deals on social media
- **Mobile App**: React Native or Flutter mobile application
- **API Rate Limiting**: Protect against abuse
- **Advanced Analytics**: Detailed reporting and insights

### Integration Possibilities
- **Real Store APIs**: Connect to actual store APIs for live data
- **Payment Processing**: Stripe/PayPal integration for direct purchases
- **Email Marketing**: Mailchimp/SendGrid integration
- **Social Login**: OAuth with Google/Facebook/Twitter
- **Search Engine**: Elasticsearch for advanced search capabilities

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🎯 Support

For support, email your-email@example.com or create an issue in the repository.

---

**Built with ❤️ for deal hunters everywhere!** 🛒✨