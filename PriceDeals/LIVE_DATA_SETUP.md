# 🔥 Live Deals Data Integration Guide

## 📊 **Current Status**
Your website currently uses **sample data** stored in MySQL. Here's how to get **live deals data**:

---

## 🛒 **Option 1: Official Store APIs (Recommended)**

### **Amazon Product Advertising API**
- **Cost**: Free with Amazon Associates account
- **Requirements**: Amazon Associates Partner account
- **Data**: Real-time prices, ratings, availability
- **Setup**:
  1. Join [Amazon Associates Program](https://affiliate-program.amazon.com/)
  2. Apply for [Product Advertising API](https://webservices.amazon.com/paapi5/documentation/)
  3. Get API credentials (Access Key, Secret Key, Partner Tag)

### **Best Buy API**
- **Cost**: Free
- **Requirements**: Developer account
- **Data**: Products, prices, availability, reviews
- **Setup**:
  1. Register at [Best Buy Developer Portal](https://developer.bestbuy.com/)
  2. Create API key
  3. Review rate limits (5 requests/second)

### **eBay API**
- **Cost**: Free tier available
- **Requirements**: eBay Developer account
- **Data**: Auctions, Buy It Now, completed listings
- **Setup**:
  1. Register at [eBay Developers Program](https://developer.ebay.com/)
  2. Create application and get API keys

### **Walmart API**
- **Cost**: Free
- **Requirements**: Walmart Developer account
- **Data**: Products, prices, availability
- **Setup**:
  1. Apply at [Walmart Developer Portal](https://developer.walmart.com/)
  2. Get approved for API access

---

## 🔧 **Option 2: Third-Party Deal Aggregators**

### **RapidAPI Marketplace**
- **Cost**: Varies ($0-$100/month)
- **Features**: Multiple store APIs in one place
- **Popular APIs**:
  - Target Scraper API
  - Walmart Product API
  - Amazon Product Search

### **ScrapeOwl / ScrapingBee**
- **Cost**: $29-$99/month
- **Features**: Managed web scraping
- **Benefits**: Handles anti-bot protection

---

## 🕷️ **Option 3: Web Scraping (Use Carefully)**

### **Legal Considerations**
- ✅ Check robots.txt files
- ✅ Respect rate limits
- ✅ Don't overload servers
- ❌ Avoid scraping if ToS prohibits

### **Tools for Scraping**
- **Python**: BeautifulSoup, Scrapy, Selenium
- **PHP**: Simple HTML DOM Parser, Goutte
- **Node.js**: Puppeteer, Cheerio

---

## ⚡ **Implementation Steps**

### **Step 1: Choose Your Data Sources**
```bash
# Free options (start here):
✅ Best Buy API (free)
✅ eBay API (free tier)
✅ Web scraping (limited)

# Paid/Approval required:
🔒 Amazon API (requires Associates approval)
🔒 Walmart API (requires approval)
🔒 Target via RapidAPI ($)
```

### **Step 2: Set Up API Credentials**
Add to your `config.php`:
```php
// API Configuration
define('BESTBUY_API_KEY', 'your_api_key_here');
define('RAPIDAPI_KEY', 'your_rapidapi_key_here');
define('AMAZON_ACCESS_KEY', 'your_amazon_key');
define('AMAZON_SECRET_KEY', 'your_amazon_secret');
define('AMAZON_PARTNER_TAG', 'your_partner_tag');
```

### **Step 3: Set Up Automated Fetching**
```bash
# Add to your server's crontab:
# Fetch deals every hour
0 * * * * /path/to/your/fetch_deals.sh

# Or every 30 minutes for more frequent updates
*/30 * * * * /path/to/your/fetch_deals.sh
```

### **Step 4: Test the Integration**
```bash
# Make the script executable
chmod +x fetch_deals.sh

# Test manually
./fetch_deals.sh

# Check logs
tail -f logs/deals_fetch.log
```

---

## 📈 **Quick Start with Best Buy API**

Since Best Buy API is free and doesn't require approval, start here:

### **1. Get API Key**
1. Go to [Best Buy Developer Portal](https://developer.bestbuy.com/)
2. Register and create an API key
3. Add it to your `config.php`

### **2. Test the Integration**
```php
// Add this to test_bestbuy.php
require_once 'config.php';
require_once 'live_deals_integration.php';

$liveAPI = new LiveDealsAPI($pdo);
$deals = $liveAPI->fetchBestBuyDeals(BESTBUY_API_KEY);

echo "Found " . count($deals) . " deals from Best Buy\n";
print_r($deals);
```

### **3. Run the Test**
```bash
php test_bestbuy.php
```

---

## 🎯 **Recommended Starting Plan**

### **Phase 1: Free APIs (Week 1)**
- ✅ Best Buy API integration
- ✅ eBay API integration  
- ✅ Basic web scraping for 1-2 stores

### **Phase 2: Expand (Week 2-3)**
- 🔒 Apply for Amazon Associates + API
- 🔒 Apply for Walmart API access
- 💰 Consider RapidAPI for Target

### **Phase 3: Scale (Month 2+)**
- 🚀 Add more data sources
- 📊 Implement deal quality scoring
- 🤖 Add price tracking and alerts
- 📧 Email notifications for price drops

---

## ⚠️ **Important Notes**

### **Rate Limits**
- Amazon: 1 request/second (associate level)
- Best Buy: 5 requests/second
- eBay: Varies by access level
- **Always respect rate limits!**

### **Data Quality**
- Validate all incoming data
- Handle API failures gracefully
- Implement fallback to cached data
- Monitor for price/availability changes

### **Legal Compliance**
- Review each store's Terms of Service
- Get proper affiliate approval where required
- Respect robots.txt for scraping
- Consider data privacy regulations

---

## 🚀 **Next Steps**

1. **Choose 1-2 free APIs** to start with (Best Buy + eBay recommended)
2. **Get API credentials** and add to config
3. **Test integration** with sample requests
4. **Set up cron job** for automated fetching
5. **Monitor and optimize** data quality

Want me to help you set up any specific API integration? I can walk you through the Best Buy API setup first since it's the easiest to get started with! 🎯