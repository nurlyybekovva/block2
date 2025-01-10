const HDWalletProvider = require("@truffle/hdwallet-provider");
require("dotenv").config();

module.exports = {
  networks: {
    sepolia: {
      provider: () => new HDWalletProvider(process.env.MNEMONIC, `https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`),
      network_id: 11155111,
      gas: 4500000,
      gasPrice: 10000000000,
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};
