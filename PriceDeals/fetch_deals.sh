#!/bin/bash
# Cron job script to fetch live deals data
# Run this script every hour: 0 * * * * /path/to/fetch_deals.sh

# Set the path to your PHP executable
PHP_PATH="/usr/bin/php"

# Set the path to your project
PROJECT_PATH="/Users/donthirisridharreddy/Documents/AI/Python/FinalProjects/PriceDeals"

# Log file path
LOG_FILE="$PROJECT_PATH/logs/deals_fetch.log"

# Create logs directory if it doesn't exist
mkdir -p "$PROJECT_PATH/logs"

# Log start time
echo "$(date): Starting deals fetch..." >> $LOG_FILE

# Run the PHP script to fetch deals
$PHP_PATH $PROJECT_PATH/fetch_deals_cron.php >> $LOG_FILE 2>&1

# Log completion
echo "$(date): Deals fetch completed." >> $LOG_FILE
echo "----------------------------------------" >> $LOG_FILE