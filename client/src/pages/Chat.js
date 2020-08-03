import React, { useState, useContext } from "react";
import { Header, Form, Message, Label, Feed } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { errorTrim } from "../util/errorTrim";
import ChatMessage from "../components/ChatMessage";

function Chat() {
  const { user } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE, {
    update(_, { data: { createMessage: message } }) {
      const prevMessages = messages;
      prevMessages.push(message);
      setMessages(prevMessages);
    },
    onError(err) {
      setError(errorTrim(err.graphQLErrors[0].message));
    },
    variables: {
      id: user.id,
      text: message,
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    setError("");
    createMessage();
  };

  console.log(messages);

  return (
    <div>
      <Header as="h1" id="welcome">
        Hey {user.username} {user.id}
      </Header>
      <div id="chat-box">
        <Feed>
          {messages.length > 0 &&
            messages.map((m) => {
              return <ChatMessage key={m.id} message={m} />;
            })}
        </Feed>
      </div>
      <Form
        id="message-input"
        onSubmit={onSubmit}
        noValidate
        className={loading ? "loading" : ""}
      >
        <Form.Input
          icon="keyboard outline"
          iconPosition="left"
          action="Send"
          placeholder="Message"
          name="message"
          type="text"
          value={message}
          error={
            !!error && {
              content: error,
              pointing: "above",
            }
          }
          onChange={(e) => setMessage(e.target.value)}
        />
      </Form>
    </div>
  );
}

const CREATE_MESSAGE = gql`
  mutation createMessage($id: ID!, $text: String!) {
    createMessage(messageInput: { id: $id, text: $text }) {
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

export default Chat;
