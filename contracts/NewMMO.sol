// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
// import "@openzeppelin/contracts/token/ERC1155/utils/ERC1155Holder.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "./Soulbound.sol";

// import "./GameItems.sol";

// mint body X
// mint NFT X
// start "Event" X
// disable transfer X

contract NewMMO is Soulbound, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter public eventIds;

    // GameItems bodies;

    event eventCreated(uint256 eventId, address owner);
    event addrWhitelisted(uint256 eventId, address owner);
    event tokenClaimed(uint256 eventId, address owner);

    constructor() ERC1155("") {
        // bodies = new GameItems();
    }

    mapping(uint256 => string) public _eventUris;
    mapping(uint256 => address) public _eventOwner;
    mapping(uint256 => mapping(address => bool)) public _allowedToMintEvent;

    // mapping(address => uint256) public _eventsAttended;

    function uri(uint256 eventId) public view override returns (string memory) {
        return _eventUris[eventId];
    }

    function startEvent(string memory eventUri) public {
        uint256 tempEventId = eventIds.current();
        require(_eventOwner[tempEventId] == address(0));
        _eventOwner[tempEventId] = msg.sender;
        _eventUris[tempEventId] = eventUri;
        eventIds.increment();
        emit eventCreated(tempEventId, msg.sender);
    }

    function mintEvent(uint256 eventId) public {
        require(_eventOwner[eventId] != address(0));
        require(_allowedToMintEvent[eventId][msg.sender] == true);
        // if (!bodies.hasBody(msg.sender)) {
        //     bodies._makeBody(msg.sender);
        // }
        _allowedToMintEvent[eventId][msg.sender] == false;

        // unchecked {
        //     _eventsAttended[msg.sender]++;
        // }
        // if (_eventsAttended[msg.sender] > 1) {
        //     bodies.setTypeBody(1, msg.sender);
        // }
        emit tokenClaimed(eventId, msg.sender);
        _mint(msg.sender, eventId, 1, "");
    }

    function updateWhiteList(uint256 eventId, address whiteList) public {
        // not on whitelist
        require(_allowedToMintEvent[eventId][whiteList] == false);
        // person updating whitelist owns event
        require(_eventOwner[eventId] == msg.sender);
        emit addrWhitelisted(eventId, msg.sender);
        _allowedToMintEvent[eventId][whiteList] = true;
    }

    //https://forum.openzeppelin.com/t/how-do-i-let-a-user-transfer-erc1155-token-from-my-contract-address-to-his-address/12415/8
    function supportsInterface(bytes4 interfaceId)
        public
        view
        virtual
        override(ERC1155)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    // function setTypeUri(uint256 _typeId, string memory _uri) public onlyOwner {
    //     bodies.setTypeUri(_typeId, _uri);
    // }
}
