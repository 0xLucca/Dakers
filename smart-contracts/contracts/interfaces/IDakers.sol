// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

interface IDakers {
    function lensHubAddress() external view returns (address);

    function treasury() external view returns (address);

    function fee() external view returns (uint256);
}
