// SPDX-License-Identifier: MIT
pragma solidity >0.4.23 <0.9.0;

import "./Escrow.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Dakers is Ownable {
    address public arbiter;
    address public treasury;
    address public lensHubAddress;
    Escrow[] public escrows;
    uint256 public fee;

    mapping(address => uint256) public brandAcceptedProposals;
    mapping(address => uint256) public brandCompletedProposals;
    mapping(address => uint256) public brandWonDisputedProposals;
    mapping(address => uint256) public brandLostDisputedProposals;

    mapping(address => uint256) public influencerAcceptedProposals;
    mapping(address => uint256) public influencerCompletedProposals;
    mapping(address => uint256) public influencerWonDisputedProposals;
    mapping(address => uint256) public influencerLostDisputedProposals;

    constructor(
        address _lensHubAddress,
        address _treasury,
        address _arbiter
    ) {
        lensHubAddress = _lensHubAddress;
        treasury = _treasury;
        arbiter = _arbiter;
    }

    function setArbiter(address _arbiter) public onlyOwner {
        arbiter = _arbiter;
    }

    function setFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function setTreasury(address _treasury) public onlyOwner {
        treasury = _treasury;
    }

    function createEscrow(address _influencer) public payable {
        require(msg.value > 0, "Must send ETH to create escrow.");
        Escrow escrow = new Escrow{value: msg.value}(
            _influencer,
            msg.sender,
            arbiter
        );
        escrows.push(escrow);
    }

    function getEscrows() external view returns (Escrow[] memory _escrows) {
        _escrows = new Escrow[](escrows.length);
        uint count;
        for (uint i = 0; i < escrows.length; i++) {
            _escrows[count] = escrows[i];
            count++;
        }
    }
}
