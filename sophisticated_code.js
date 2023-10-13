/*
* Filename: sophisticated_code.js
* Description: This code demonstrates a sophisticated and elaborate implementation of a messaging system.
*/

// Import required modules
const fs = require('fs');
const moment = require('moment');

// Define message class
class Message {
  constructor(sender, receiver, content) {
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
    this.timestamp = moment().format('YYYY-MM-DD HH:mm:ss');
  }

  logMessage() {
    console.log(`[${this.timestamp}] ${this.sender} -> ${this.receiver}: ${this.content}`);
  }
}

// Define user class
class User {
  constructor(name) {
    this.name = name;
    this.messages = [];
  }

  sendMessage(receiver, content) {
    const message = new Message(this.name, receiver, content);
    message.logMessage();
    receiver.receiveMessage(message);
  }

  receiveMessage(message) {
    this.messages.push(message);
  }

  displayMessages() {
    console.log(`Messages for user: ${this.name}`);
    for (const message of this.messages) {
      console.log(`[${message.timestamp}] ${message.sender} -> ${message.receiver}: ${message.content}`);
    }
  }
}

// Create users
const user1 = new User("Alice");
const user2 = new User("Bob");

// Send messages
user1.sendMessage(user2, "Hi Bob! How are you?");
user2.sendMessage(user1, "Hello Alice! I'm doing great.");

// Display messages for both users
user1.displayMessages();
user2.displayMessages();

// Export message logs to a file
const logs = `${user1.name} messages:\n${user1.messages.map(m => `[${m.timestamp}] ${m.sender} -> ${m.receiver}: ${m.content}`).join('\n')}\n\n${user2.name} messages:\n${user2.messages.map(m => `[${m.timestamp}] ${m.sender} -> ${m.receiver}: ${m.content}`).join('\n')}`;

fs.writeFileSync('message_logs.txt', logs);

console.log("Message logs exported to 'message_logs.txt' file.");