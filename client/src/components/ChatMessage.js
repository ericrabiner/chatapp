import React from "react";
import { Feed } from "semantic-ui-react";
import moment from "moment";

function ChatMessage({ message }) {
  return (
    <Feed.Event>
      <Feed.Label>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/User_font_awesome.svg/500px-User_font_awesome.svg.png"
          alt="no-img"
        />
      </Feed.Label>
      <Feed.Content>
        <Feed.Summary>
          <Feed.User>{message.user.username}</Feed.User> says
          <Feed.Date>{moment(message.createdAt).fromNow()}</Feed.Date>
        </Feed.Summary>
        <Feed.Extra text>{message.text}</Feed.Extra>
      </Feed.Content>
    </Feed.Event>
  );
}

export default ChatMessage;
