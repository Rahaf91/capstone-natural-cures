import React from "react";
import ChatComponent from "./ChatComponent";

const userProfile = {
  username: "User1",
  userImage: "https://via.placeholder.com/50",
};

export default function ProfilePage() {
  return (
    <div>
      <h1>Profile Page</h1>
      <ChatComponent userProfile={userProfile} />
    </div>
  );
}
