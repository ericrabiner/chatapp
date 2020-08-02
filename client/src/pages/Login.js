import React, { useContext, useState } from "react";
import { Button, Form, Message } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Link, useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Login() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(_, { data: { login: userData } }) {
      context.login(userData);
      history.push("/");
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: {
      email,
      password,
    },
  });

  const onSubmit = (event) => {
    event.preventDefault();
    loginUser();
  };

  return (
    <div id="light-container">
      <Form onSubmit={onSubmit} noValidate className={loading ? "loading" : ""}>
        <h1>Login</h1>
        <div>Don't have an account?</div>
        <Link id="link" to="register">
          Create one here
        </Link>
        <Form.Input
          icon="at"
          iconPosition="left"
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
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
        <Button type="submit" primary>
          Submit
        </Button>
      </Form>

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

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export default Login;
