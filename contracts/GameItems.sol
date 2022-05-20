// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract GameItems is ERC1155, Ownable {
    uint256 public constant QUEST = 1;
    uint256 public constant APE = 0;

    // mapping (uint256 => string) private _uris;

    string newUri = "";

    constructor() ERC1155("") {
        // _mint(address(this), APE, 10, "");
        // _mint(address(this), QUEST, 10, "");
    }

    // function setTokenUri(uint256 tokenId, string memory _uri) public onlyOwner {
    //     require(bytes(_uris[tokenId]).length == 0, "Not able to set uri twice.");
    //     _uris[tokenId] = _uri;
    // }

    // "https://gateway.pinata.cloud/ipfs/QmWv7QxavXCnJPcrez5o1RNkfGDU1qqWh91GTJeD4X1Z45/Metadata/animeMeta"

    function setBaseUri(string memory _uri) public onlyOwner {
        require(bytes(newUri).length == 0, "Can't set Uri multiple times");
        newUri = _uri;
    }

    function _mintFor(
        address _to,
        uint256 _tokenId,
        uint256 _count,
        bytes memory _data
    ) public onlyOwner {
        _mint(_to, _tokenId, _count, _data);
    }

    function uri(uint256 _tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(newUri, Strings.toString(_tokenId), ".json")
            );
    }
}

// return
//             string(
//                 abi.encodePacked(
//                     "https://gateway.pinata.cloud/ipfs/QmVbNxxmWtgNhQrmuHh82SsH9kUMziYpinfK1JRBnt83a2/",
//                     Strings.toString(_tokenId),
//                     ".json"
//                 )
//             );
