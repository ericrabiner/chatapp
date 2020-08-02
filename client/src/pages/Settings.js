import React, { useContext, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Settings() {
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
        <Button id="button" type="submit">
          Save
        </Button>
        {success && (
          <Segment inverted color="green">
            User successfully updated.
          </Segment>
        )}
      </Form>

      <Link id="link" to="/home">
        Go back
      </Link>

      {Object.keys(errors).length > 0 && (
        <div className="ui error message">
          <ul className="list">
            {Object.values(errors).map((value) => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
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
