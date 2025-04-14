// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

contract ChatStorage {
    // Define the structure of a Message
    struct Message {
        address sender;
        uint256 timestamp;
        string content;
    }

    // Array to store all messages
    Message[] private messages;

    // Event to notify when a new message is sent
    event MessageSent(address indexed sender, uint256 timestamp, string content);

    // Function to send a message
    function sendMessage(string calldata _content) external {
        // Push the new message to the messages array
        messages.push(Message(msg.sender, block.timestamp, _content));
        
        // Emit the MessageSent event
        emit MessageSent(msg.sender, block.timestamp, _content);
    }

    // Function to get all messages
    function getMessages() external view returns (Message[] memory) {
        // Return the messages stored in the contract
        return messages;
    }

    // Function to get the total number of messages
    function getMessageCount() external view returns (uint256) {
        // Return the length of the messages array
        return messages.length;
    }

    function getAllMessages() public view returns (Message[] memory) {
    return messages;
}

}
