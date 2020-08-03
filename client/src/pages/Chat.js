import React, { useState, useEffect, useContext } from "react";
import { Header, Form, Feed, Dimmer, Loader } from "semantic-ui-react";
import { AuthContext } from "../context/auth";
import gql from "graphql-tag";
import { useMutation } from "@apollo/react-hooks";
import { errorTrim } from "../util/errorTrim";
import ChatMessage from "../components/ChatMessage";

function Chat({ subscribeToNewMessages, ...params }) {
  const { user } = useContext(AuthContext);

  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const unsubscribeToNewMessages = subscribeToNewMessages();
    return () => unsubscribeToNewMessages();
  }, [subscribeToNewMessages]);

  const [createMessage, { loading }] = useMutation(CREATE_MESSAGE, {
    onCompleted() {
      setMessage("");
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
  if (!params.data.getMessages)
    return (
      <Dimmer active>
        <Loader size="massive">Loading</Loader>
      </Dimmer>
    );

  return (
    <div>
      <Header as="h1" id="welcome">
        Hey {user.username}
      </Header>
      <div id="chat-box">
        <Feed>
          {params.data.getMessages &&
            params.data.getMessages.map((m) => {
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
