require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

// Possible network values
const TEST_NETWORK = "TEST_NETWORK";
const LOCAL_NETWORK = "LOCAL_NETWORK";

// By default network is set to local, change it to TEST_NETWORK to make a switch
const NETWORK = TEST_NETWORK;
const MUMBAI = "POLY_NETWORK";

const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY;
const MUMBAI_PRIVATE_KEY = process.env.MUMBAI_PRIVATE_KEY;

let networks = {};
if (NETWORK == TEST_NETWORK) {
    networks = {
        rinkeby: {
            url: `https://eth-rinkeby.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [`0x${RINKEBY_PRIVATE_KEY}`]
        },
        mumbai: {
            url: `https://polygon-mumbai.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
            accounts: [`0x${MUMBAI_PRIVATE_KEY}`],
            gasprice: 30 * 10 ** 9,
            gas: 150000
        }
        // polygon: {}
    }
}

module.exports = {
    solidity: "0.8.7",
    networks: networks
};