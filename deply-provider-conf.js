const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');

const provider = new HDWalletProvider(
  'cage draw chicken attitude clap green armor hire session immense liberty scheme', //'twelve words mnemonic',
  'https://rinkeby.infura.io/v3/API_KEY'
);

const web3 = new Web3(provider);
