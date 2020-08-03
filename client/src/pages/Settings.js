import React, { useContext, useState } from "react";
import {
  Button,
  Form,
  Message,
  Image,
  Label,
  Grid,
  Menu,
  Segment,
} from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../context/auth";
import UpdateProfile from "./UpdateProfile";
import UpdatePassword from "./UpdatePassword";

function MenuSwitch({ item }) {
  return (
    <div>
      {(() => {
        switch (item) {
          case "userprofile":
            return <UpdateProfile />;
          case "password":
            return <UpdatePassword />;
          default:
            return null;
        }
      })()}
    </div>
  );
}

function Settings() {
  const history = useHistory();
  const [activeItem, setActiveItem] = useState("userprofile");

  return (
    <div id="light-container">
      <Grid id="settings-menu">
        <Grid.Column width={4}>
          <Menu fluid vertical tabular id="settings-menu">
            <Menu.Item
              name="User Profile"
              active={activeItem === "userprofile"}
              onClick={() => setActiveItem("userprofile")}
            />
            <Menu.Item
              name="Password"
              active={activeItem === "password"}
              onClick={() => setActiveItem("password")}
            />
            <Menu.Item
              name="Go Back"
              active={activeItem === "goback"}
              onClick={() => history.push("/home")}
            />
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          <Segment>
            <MenuSwitch item={activeItem} />
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default Settings;
