import React, { useState } from "react";
import { useWindowWidth } from "@react-hook/window-size";
import { Grid, Menu, Segment } from "semantic-ui-react";
import { useHistory } from "react-router-dom";
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
  const width = useWindowWidth();
  const [activeItem, setActiveItem] = useState("userprofile");

  return (
    <div id="light-container">
      {width > 1200 && (
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
      )}

      {width <= 1200 && (
        <>
          <Segment>
            <MenuSwitch item={activeItem} />
          </Segment>
          <Menu attached="bottom" tabular>
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
        </>
      )}
    </div>
  );
}

export default Settings;
