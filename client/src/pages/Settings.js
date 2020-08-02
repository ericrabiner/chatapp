import React, { useContext, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Settings() {
  const history = useHistory();
  const { user, login } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  const [username, setUsername] = useState(user.username);
  const [newEmail, setNewEmail] = useState(user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [updateUser, { loading }] = useMutation(UPDATE_USER, {
    update(_, { data: { updateUser: userData } }) {
      login(userData);
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted: () => {
      setErrors({});
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    },
    variables: {
      username,
      newEmail,
      oldEmail: user.email,
      oldPassword,
      newPassword,
      confirmNewPassword,
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    updateUser();
  };

  return (
    <div id="light-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Update User</h1>
        <Form.Input
          icon="user"
          iconPosition="left"
          label="Username"
          placeholder="Username"
          name="username"
          type="text"
          value={username}
          error={errors && errors.username ? true : false}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Form.Input
          icon="at"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="email"
          value={newEmail}
          error={errors && errors.newEmail ? true : false}
          onChange={(e) => setNewEmail(e.target.value)}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          label="Old Password"
          placeholder="Old Password"
          name="password"
          type="password"
          value={oldPassword}
          error={errors && errors.oldPassword ? true : false}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          label="New Password"
          placeholder="New Password"
          name="password"
          type="password"
          value={newPassword}
          error={errors && errors.newPassword ? true : false}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          label="Confirm New Password"
          placeholder="Confirm New Password"
          name="confirmPassword"
          type="password"
          value={confirmNewPassword}
          error={errors && errors.confirmNewPassword ? true : false}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <Button onClick={() => history.push("/home")}>Cancel</Button>
        <Button primary type="submit">
          Save
        </Button>
      </Form>

      {success && (
        <Message id="message" positive>
          User successfully updated.
        </Message>
      )}

      {Object.keys(errors).length > 0 && (
        <Message id="message" negative>
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </Message>
      )}
    </div>
  );
}

const UPDATE_USER = gql`
  mutation updateUser(
    $username: String!
    $oldEmail: String!
    $newEmail: String!
    $oldPassword: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    updateUser(
      updateUserInput: {
        username: $username
        oldEmail: $oldEmail
        newEmail: $newEmail
        oldPassword: $oldPassword
        newPassword: $newPassword
        confirmNewPassword: $confirmNewPassword
      }
    ) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Settings;
