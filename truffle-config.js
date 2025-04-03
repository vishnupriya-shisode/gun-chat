module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",  // Localhost
      port: 7545,         // Ganache default port
      network_id: "*",    // Any network
      gas: 6721975,       // Set gas limit
      gasPrice: 20000000000, // Optional gas price in wei
    },
  },

  compilers: {
    solc: {
      version: "0.8.10",  // Exact Solidity version
      settings: {
        optimizer: {
          enabled: true,
          runs: 200,  // Recommended optimization runs
        },
      },
    },
  },

  mocha: {
    // Optional mocha options
  },
};
