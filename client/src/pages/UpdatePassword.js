import React, { useContext, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { AuthContext } from "../context/auth";

function UpdatePassword() {
  const { user, login } = useContext(AuthContext);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [updatePassword, { loading }] = useMutation(UPDATE_PASSWORD, {
    update(_, { data: { updatePassword: userData } }) {
      login(userData);
    },
    onError(err) {
      console.log(err);
      //   setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    onCompleted: () => {
      setErrors({});
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2000);
    },
    variables: {
      id: user.id,
      oldPassword,
      newPassword,
      confirmNewPassword,
    },
  });

  const onSubmit = (event) => {
    console.log({
      id: user.id,
      oldPassword,
      newPassword,
      confirmNewPassword,
    });
    event.preventDefault();
    updatePassword();
  };

  const handleForgotPassword = () => {
    setErrors({ forgotPass: "Too fucking bad.", ...errors });
  };

  return (
    <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
      <h1>Update Password</h1>
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
      <Button primary type="submit">
        Save
      </Button>
      <div id="forgot-password" onClick={handleForgotPassword}>
        Forgot password?
      </div>

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
    </Form>
  );
}

const UPDATE_PASSWORD = gql`
  mutation updatePassword(
    $id: ID!
    $oldPassword: String!
    $newPassword: String!
    $confirmNewPassword: String!
  ) {
    updatePassword(
      updatePasswordInput: {
        id: $id
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

export default UpdatePassword;
