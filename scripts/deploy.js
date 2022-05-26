// deploys the contract and returns the contract address
async function deploy() {
    const EarthMMONFTFactory = await ethers.getContractFactory("NewMMO");
    earthMMONFT = await EarthMMONFTFactory.deploy();
    await earthMMONFT.deployed();

    console.log("GameItem NFT deployed to:", earthMMONFT.address);
    return earthMMONFT.address;
}

// main()
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });
module.exports.deploy = deploy;