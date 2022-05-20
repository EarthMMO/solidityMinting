const { ethers } = require("hardhat");

async function mint(addrContr, addrRec, _tokenId, numToMint) {
    const GameItemNFTFactory = await ethers.getContractFactory("GameItems");
    const GameItem = await GameItemNFTFactory.attach(addrContr);
    let receipt = await GameItem._mintFor(addrRec, _tokenId, numToMint, 0x00);
    // console.log(receipt);

}

async function setUri(addrContr, _uri) {
    const GameItemNFTFactory = await ethers.getContractFactory("GameItems");
    const GameItem = await GameItemNFTFactory.attach(addrContr);

    if (length(await GameItem.newUri) == 0) {
        await GameItem.setBaseUri(_uri);
    }
}

export {
    setUri,
    mint
};