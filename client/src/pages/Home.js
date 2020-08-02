import React, { useContext } from "react";
import { Header } from "semantic-ui-react";
import { AuthContext } from "../context/auth";

function Home() {
  const { user } = useContext(AuthContext);

  console.log(user);

  return (
    <Header as="h1" id="welcome">
      Hey {user.username}
    </Header>
  );
}

export default Home;
