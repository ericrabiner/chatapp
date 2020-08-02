import React, { useContext, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Register() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, { data: { register: userData } }) {
      context.login(userData);
      history.push("/home");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: { username, email, password, confirmPassword },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    addUser();
  };

  return (
    <div id="light-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Register</h1>
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
          value={email}
          error={errors && errors.email ? true : false}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          label="Password"
          placeholder="Password"
          name="password"
          type="password"
          value={password}
          error={errors && errors.password ? true : false}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Form.Input
          icon="lock"
          iconPosition="left"
          label="Confirm Password"
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          value={confirmPassword}
          error={errors && errors.confirmPassword ? true : false}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <Button id="button" type="submit">
          Register
        </Button>
      </Form>

      <Link id="link" to="/">
        Sign In Instead
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

const REGISTER_USER = gql`
  mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      registerInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
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

export default Register;
