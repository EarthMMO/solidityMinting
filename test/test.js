const { expect } = require("chai");
const { ethers } = require("hardhat");
const { isTypedArray } = require("util/types");

describe("GameItems", function () {

    let gameitemNFT;
    let receipt;

    beforeEach(async () => {
        const GameItemNFTFactory = await ethers.getContractFactory("GameItems");
        gameitemNFT = await GameItemNFTFactory.deploy();
        receipt = await gameitemNFT.deployed();
        console.log(receipt.deployTransaction.hash);
    });

    it("needs uri", async () => {
        uri = await gameitemNFT.uri(0);
        await expect(uri).to.equal("https://gateway.pinata.cloud/ipfs/QmVbNxxmWtgNhQrmuHh82SsH9kUMziYpinfK1JRBnt83a2/0.json")
    }
    )
});
