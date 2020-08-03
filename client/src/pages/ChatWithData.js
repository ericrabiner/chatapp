import React from "react";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import Chat from "./Chat";

function ChatWithData() {
  const { subscribeToMore, ...result } = useQuery(GET_MESSAGES);

  return (
    <Chat
      {...result}
      subscribeToNewMessages={() =>
        subscribeToMore({
          document: NEW_MESSAGE,
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData.data) return prev;
            const newMessage = subscriptionData.data.newMessage;
            return Object.assign({}, prev, {
              getMessages: [newMessage, ...prev.getMessages],
            });
          },
        })
      }
    />
  );
}

const GET_MESSAGES = gql`
  query getMessages {
    getMessages {
      id
      text
      user {
        id
        email
        username
        createdAt
      }
      createdAt
    }
  }
`;

const NEW_MESSAGE = gql`
  subscription {
    newMessage {
      id
      text
      user {
        id
        email
        username
        createdAt
      }
      createdAt
    }
  }
`;
export default ChatWithData;
