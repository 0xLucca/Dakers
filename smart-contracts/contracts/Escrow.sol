// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "./interfaces/IDakers.sol";
import "./interfaces/ILensHub.sol";

contract Escrow {
    address public influencer;

    address public brand;
    address public arbiter;

    string public content;
    uint256 public postNumber;

    IDakers public dakers;
    ILensHub public lensHub;

    enum State {
        AWAITING_CONTENT,
        AWAITING_APPROVAL,
        DISPUTED,
        CONTENT_ACCEPTED,
        COMPLETED,
        REFUNDED
    }

    State public currentState;

    constructor(
        address _influencer,
        address _brand,
        address _arbiter
    ) payable {
        influencer = _influencer;
        brand = _brand;
        arbiter = _arbiter;
        dakers = IDakers(msg.sender);
        lensHub = ILensHub(dakers.lensHubAddress());
    }

    modifier onlyInfluencer() {
        require(msg.sender == influencer, "Only influencer can call this.");
        _;
    }

    modifier onlyBrand() {
        require(msg.sender == influencer, "Only influencer can call this.");
        _;
    }

    modifier onlyArbiter() {
        require(msg.sender == arbiter, "Only arbiter can call this.");
        _;
    }

    modifier inState(State expectedState) {
        require(currentState == expectedState, "Invalid state.");
        _;
    }

    function uploadContent(string memory _URL)
        public
        onlyInfluencer
        inState(State.AWAITING_CONTENT)
        inState(State.AWAITING_APPROVAL)
    {
        content = _URL;
        currentState = State.AWAITING_APPROVAL;
    }

    function acceptContent() public onlyBrand inState(State.AWAITING_APPROVAL) {
        currentState = State.CONTENT_ACCEPTED;
    }

    function uploadPost(uint256 _influencerId, uint256 _postNumber)
        public
        onlyInfluencer
    {
        postNumber = _postNumber;
        // Check if the lens content of the influencer's post is the same as the uploaded content.
        bool correctContent = (keccak256(
            abi.encodePacked(lensHub.getContentURI(_influencerId, _postNumber))
        ) == keccak256(abi.encodePacked(content)));
        // If it is, then the influencer has uploaded the correct content.
        if (correctContent) {
            uint256 dakersFee = (address(this).balance * dakers.fee()) / 100; //TODO Revisar
            payable(dakers.treasury()).transfer(dakersFee);
            payable(influencer).transfer(address(this).balance);
            currentState = State.COMPLETED;
        } else {
            payable(brand).transfer(address(this).balance);
            currentState = State.REFUNDED;
        }
    }

    function dispute() public {
        require(
            msg.sender == influencer || msg.sender == brand,
            "Only influencer or brand can call this."
        );
        currentState = State.DISPUTED;
    }

    function refundBrand() public onlyArbiter inState(State.DISPUTED) {
        payable(brand).transfer(address(this).balance);
        currentState = State.REFUNDED;
    }

    function refundInfluencer() public onlyArbiter inState(State.DISPUTED) {
        uint256 dakersFee = (address(this).balance * dakers.fee()) / 100; //TODO Revisar
        payable(dakers.treasury()).transfer(dakersFee);
        payable(influencer).transfer(address(this).balance);
        currentState = State.REFUNDED;
    }
}
