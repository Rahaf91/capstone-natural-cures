import React from "react";
import Chat from "../components/Chat";

const userProfile = {
  username: "User1",
  userImage: "https://via.placeholder.com/50",
};

export default function ChatPage() {
  return (
    <div>
      <h1>Chat Page</h1>
      <Chat userProfile={userProfile} />
    </div>
  );
}
