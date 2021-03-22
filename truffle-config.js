const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync('.secret_energi_testnet').toString().trim();

module.exports = {
  networks: {
    testnet: {
      provider: () =>
          new HDWalletProvider({
            mnemonic: {
              phrase: mnemonic
            },
            providerOrUrl: 'https://nodeapi.test.energi.network', // 'http://172.31.77.180:49796/',
            derivationPath: "m/44'/49797'/0'/0/"
          }),
      network_id: '49797',
      from: '0xc7E95959c72B7574DDe42237445327fF8E937bEB', // = accounts[0] from mnemonic
      gas: 40000000, // gas limit used for deploy.
      websockets: true, //Used for the confirmations listener or to hear events using .on or .once
    }
  },
  compilers: {
    solc: {
      version: '0.8.2',    // Fetch exact version from solc-bin (default: truffle's version)
       settings: {          // See the solidity docs for advice about optimization and evmVersion
       optimizer: {
          enabled: false,
          runs: 200
        },
       evmVersion: 'istanbul'
       }
    }
  }
};
