import React from "react";
import { Feed } from "semantic-ui-react";
import moment from "moment";

function ChatMessage({ message }) {
  return (
    <Feed.Event>
      <Feed.Label>
        <img src="https://react.semantic-ui.com/images/avatar/small/elliot.jpg" />
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
