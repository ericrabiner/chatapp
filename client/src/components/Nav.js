import React, { useState, useContext } from "react";
import { Menu } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../context/auth";

function Nav() {
  const history = useHistory();
  const { logout } = useContext(AuthContext);
  const [activeItem, setActiveItem] = useState("chat");

  const handleMenu = (option) => {
    setActiveItem(option);
    history.push(`/${option}`);
  };

  return (
    <Menu pointing secondary inverted>
      <Menu.Item
        name="chat"
        active={activeItem === "chat"}
        onClick={() => handleMenu("chat")}
      />

      <Menu.Menu position="right">
        <Menu.Item
          name="settings"
          active={activeItem === "settings"}
          onClick={() => handleMenu("settings")}
        />
        <Menu.Item
          name="logout"
          active={activeItem === "logout"}
          onClick={logout}
        />
      </Menu.Menu>
    </Menu>
  );
}

export default Nav;
