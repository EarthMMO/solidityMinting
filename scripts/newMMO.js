const { ethers } = require("hardhat");
// Example use case: 
// 
//     const addrContr;
//     const addrUser;
//     const addrEvent; 
//     const _uri;
//     await connect(addrEvent) // using the event creator wallet
//     let receipt = await createEvent(addrContr, _uri); // create an event
//     receipt = await receipt.wait();  // waiting for tx to be mined
//     let eventId = receipt.events[0].args[0].value // extract the eventId from the receipt
//     await whiteList(addrContr, addrUser, eventId); // whitelist a user for an event 
//     await connect(addrUser); // using the users wallet
//     await mintEvent(addrContr, eventId); // mint the event NFT (if whitelisted)



class newMMO {

    // createEvent(addrContr, _uri)
    // param addrContr:str = contract address
    // param _uri:str = URI associated w/ the Event
    // uri should point to json file that is formatted for display on opensea
    // https://docs.opensea.io/docs/metadata-standards
    // returns: tx receipt
    // receipt.events[0] contains [id of event created, address that created the event]
    // Allows Event Organizer to create an Event (beginning of minting) - with uri as assoc. metadata
    // Require: this allows the address that created this event to whitelist other addresses
    static async createEvent(addrContr, _uri) {
        const EarthMMONFTFactory = await ethers.getContractFactory("NewMMO");
        const earthMMONFT = await EarthMMONFTFactory.attach(addrContr);
        let receipt = await earthMMONFT.startEvent(_uri);
        return receipt;
    }

    // whiteList(addrContr, _to, eventId)
    // param addrContr:str(address) = contract address
    // param _to:str(address) = account to be whitelisted
    // param eventId:uint256 = event where _to can mint 
    // returns: tx receipt (no return value in receipt)
    // receipt.events[0] contains [id of event, address that was whitelisted]
    // Gives an address permission to mint an NFT for the event
    // Require: Function must be called by same wallet that created the event
    static async whiteList(addrContr, _to, eventId) {
        const EarthMMONFTFactory = await ethers.getContractFactory("NewMMO");
        const earthMMONFT = await EarthMMONFTFactory.attach(addrContr);
        let receipt = await earthMMONFT.updateWhiteList(eventId, _to);
        return receipt;
    }

    // mintEvent(addrContr, eventId)
    // param addrContr:str(address) = contract address
    // param eventId:uint256 = event where _to can mint
    // returns: tx receipt
    // receipt.events[0] contains [id of event, address that minted the NFT]
    // Allows whitelisted user to mint an NFT for an event
    // Require: msg.sender must be whitelisted for event
    static async mintEvent(addrContr, eventId) {
        const EarthMMONFTFactory = await ethers.getContractFactory("NewMMO");
        const earthMMONFT = await EarthMMONFTFactory.attach(addrContr);
        let receipt = await earthMMONFT.mintEvent(eventId);
        return receipt;
    }

}

module.exports = newMMO;