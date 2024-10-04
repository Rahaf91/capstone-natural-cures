import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import styled from "styled-components";

const socket = io("http://localhost:3000"); // Ersetzen Sie dies durch Ihre Server-URL

export default function ChatComponent({ userProfile }) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("message", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const sendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        username: userProfile.username,
        userImage: userProfile.userImage,
        text: message,
      };
      socket.emit("message", newMessage);
      setMessage("");
    }
  };

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map((message, index) => (
          <Message key={index}>
            <UserInfo>
              <UserImage
                src={message.userImage}
                alt={`${message.username}'s avatar`}
              />
              <Username>{message.username}</Username>
            </UserInfo>
            <MessageText>{message.text}</MessageText>
          </Message>
        ))}
      </MessagesContainer>
      <InputContainer>
        <MessageInput
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type your message..."
        />
        <SendButton onClick={sendMessage}>Send</SendButton>
      </InputContainer>
    </ChatContainer>
  );
}

const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  overflow: hidden;
`;

const MessagesContainer = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background-color: #f9f9f9;
`;

const Message = styled.div`
  padding: 0.5rem;
  margin-bottom: 0.5rem;
  background-color: #e1ffc7;
  border-radius: 4px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
`;

const UserImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 0.5rem;
`;

const Username = styled.span`
  font-weight: bold;
`;

const MessageText = styled.div`
  padding: 0.5rem;
  background-color: #e1ffc7;
  border-radius: 4px;
`;

const InputContainer = styled.div`
  display: flex;
  padding: 1rem;
  background-color: #fff;
  border-top: 1px solid #ccc;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 0.5rem;
`;

const SendButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;
