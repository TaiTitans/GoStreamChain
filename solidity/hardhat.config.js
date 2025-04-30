require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  networks:{
    sepolia:{
      url: "https://sepolia.infura.io/v3/33433b6cc174485b9bf91cf6bac58349",
      accounts: [process.env.PRIVATE_KEY_SEPOLIA],
    }
  }
};
