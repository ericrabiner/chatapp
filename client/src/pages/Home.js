import React, { useContext } from "react";
import { Button } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Home() {
  const history = useHistory();
  const { logout } = useContext(AuthContext);

  const handleSettings = () => {
    history.push("/settings");
  };

  const newChat = () => {
    console.log("new chat");
  };

  return (
    <div>
      <Button primary onClick={newChat}>
        New Chat
      </Button>
      <Button primary onClick={handleSettings}>
        Settings
      </Button>
      <Button primary onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;
