/*
 * Create and export configuration variables
 *
 */

// Container for all environments
var environments = {};

// Staging (default) environment
environments.staging = {
  httpPort: 3000,
  httpsPort: 3001,
  envName: 'staging',
  hashingSecret: 'thisIsASecret',
  maxChecks: 5,
  btcPriceCheck_1: 'https://api.coindesk.com/v1/bpi/currentprice.json',
  btcPriceCheck_2: 'https://blockchain.info/ticker',
  btcPriceCheck_3: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
};

// Production environment
environments.production = {
  httpPort: 5000,
  httpsPort: 5001,
  envName: 'production',
  hashingSecret: 'thisIsAlsoASecret',
  maxChecks: 10,
  btcPriceCheck_1: 'https://api.coindesk.com/v1/bpi/currentprice.json',
  btcPriceCheck_2: 'https://blockchain.info/ticker',
  btcPriceCheck_3: 'https://api.coinbase.com/v2/prices/spot?currency=USD',
};

// Determine which environment was passed as a command-line argument
var currentEnvironment = typeof(process.env.NODE_ENV) == 'string' ? process.env.NODE_ENV.toLowerCase() : '';

// Check that the current environment is one of the environments above, if not default to staging
var environmentToExport = typeof(environments[currentEnvironment]) == 'object' ? environments[currentEnvironment] : environments.staging;

// Export the module
module.exports = environmentToExport;