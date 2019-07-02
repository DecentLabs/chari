require("dotenv").config();
const path = require("path");

const HDWalletProvider = require("truffle-hdwallet-provider");

const DEPLOYER_MNEMONIC = process.env.DEPLOYER_MNEMONIC;
const INFURA_API_KEY = process.env.INFURA_API_KEY;

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      port: 8545
    },
    rinkeby: {
      provider: () => new HDWalletProvider(DEPLOYER_MNEMONIC, "https://rinkeby.infura.io/v3/" + INFURA_API_KEY),
      network_id: 4,
      gas: 3000000,
      gasPrice: 10000000000
    },
    mainnet: {
      provider: () => new HDWalletProvider(DEPLOYER_MNEMONIC, "https://mainnet.infura.io/v3/" + INFURA_API_KEY),
      network_id: 1,
      gas: 3000000,
      gasPrice: 10000000000
    }
  }
};
