// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

abstract contract Soulbound is ERC1155 {
    error SoulBound();

    /// @notice Function disabled as cannot transfer a soulbound nft
    function safeTransferFrom(
        address,
        address,
        uint256,
        uint256,
        bytes memory
    ) public pure override {
        revert SoulBound();
    }

    /// @notice Function disabled as cannot transfer a soulbound nft
    function setApprovalForAll(address, bool) public pure override {
        revert SoulBound();
    }

    /// @notice Function disabled as cannot transfer a soulbound nft
    function isApprovedForAll(address, address)
        public
        pure
        override
        returns (bool)
    {
        revert SoulBound();
    }

    /// @notice Function disabled as cannot transfer a soulbound nft
    function safeBatchTransferFrom(
        address,
        address,
        uint256[] memory,
        uint256[] memory,
        bytes memory
    ) public pure override {
        revert SoulBound();
    }
}
