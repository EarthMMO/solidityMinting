async function main() {
    const GameItemNFTFactory = await ethers.getContractFactory("GameItems");
    gameitemNFT = await GameItemNFTFactory.deploy();
    await gameitemNFT.deployed();

    console.log("GameItem NFT deployed to:", gameitemNFT.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
