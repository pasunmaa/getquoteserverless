# Logic to fetch data from different financial information sources

# Data sources

1. Firestore
   - The application uses Firestore as storage to avoid fetching all the data from external services
   - Limitations: 
     - Does not contain the latest values
  
2. Yahoo Finance
   - Limitations: 
     - not official developer API
     - Does not currently work properly

3. Alpha Vantage
   - https://www.alphavantage.co/documentation/
   - https://github.com/zackurben/alphavantage (supports e.g. batch api call)
   - Limitations: 
     - only 5 calls in a minute with a free API key allowed
     - max 500 requests per day
     - does not contain Nordic exchanges assets
  
4. OMXNordic
   - Limitations: 
     - not official developer API
     - contains only Nordic exchange assets


# The logic to use different services

## Scheduled job

The service scheduled (cron) job fetches daily closed values 
    - from Monday to Friday at 23:00 (NYC Stock Exchange and Nasdaq are closed)
    - non-Nordic assets
      - For non-Nordic assets (symbols) from Alpha Vantage
      - API calls are run every 15 seconds to keep frequency within allowed limit
      - It updates daily **closed value**, potential **splits** and **dividends** to Firestore db
    - Nordic assets
      - From firstly from Yahoo Finance
      - In case of Yahoo Finance is failing when from OMXNordic
      - It updates daily **closed value**, ~~potential **splits** and **dividends** ~~to Firestore db

## Realtime access

### Facts
- Alpha Vantage can provide realtime rate but only 5 calls per minute

### Questions
- Can Yahoo API provide several assets value with one API call?
- Can OMXNordic API provide several assets value with one API call?
- Does KL API exist?
- 