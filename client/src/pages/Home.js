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

  return (
    <div>
      <Button id="button" onClick={handleSettings}>
        Settings
      </Button>
      <Button id="button" onClick={logout}>
        Logout
      </Button>
    </div>
  );
}

export default Home;
