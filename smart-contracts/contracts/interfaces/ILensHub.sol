// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

interface ILensHub {
    function getContentURI(uint256 profileId, uint256 pubId)
        external
        view
        returns (string memory);
}
