require("dotenv").config();

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-web3");

module.exports = {
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.g.alchemy.com/v2/${process.env.TEST_ALCHEMY_KEY}`,
        blockNumber: 14605885,
        chainId: 31337,
      },
      accounts: {
        mnemonic:
          process.env.TEST_MNEMONIC ||
          "test test test test test test test test test test test junk",
        accountsBalance: "10000000000000000000000000",
      },
      timeout: 2000000,
      gas: 12000000,
      blockGasLimit: 0x1fffffffffffff,
      allowUnlimitedContractSize: true,
    },
  },
};
