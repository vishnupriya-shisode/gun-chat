// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChatStorage {
    string public message;

    event MessageUpdated(address indexed sender, string newMessage);

    function sendMessage(string calldata _message) external {
        message = _message;
        emit MessageUpdated(msg.sender, _message);
    }

    function getMessage() external view returns (string memory) {
        return message;
    }
}