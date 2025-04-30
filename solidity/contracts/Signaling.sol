// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Signaling {
    event MessageSent(
        string roomID,
        string clientID,
        string content,
        uint256 timestamp
    );
    
    function sendMessage(string memory roomID, string memory clientID, string memory content) public {
        emit MessageSent(roomID, clientID, content, block.timestamp);
    }
}