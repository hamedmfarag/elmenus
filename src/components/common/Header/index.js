import { useContext } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button, Container, Menu, Icon, Label } from "semantic-ui-react";

import { UserContext } from "../../../userContext";

import "./styles.css";

export default function Header() {
  const { t } = useTranslation();
  const history = useHistory();
  const userCTX = useContext(UserContext);

  return (
    <Menu size="large">
      <Container>
        <Menu.Item
          as="a"
          active
          onClick={() => {
            history.push(process.env.REACT_APP_ROUTE_HOME);
          }}
        >
          <img
            alt="Logo"
            src="https://s3-eu-west-1.amazonaws.com/elmenusv5-stg/Normal/dc5b2d99-2580-11e8-add5-0242ac110011.jpg"
          />
        </Menu.Item>

        <Menu.Item position="right">
          <Button
            onClick={() => history.push(process.env.REACT_APP_ROUTE_ADMIN)}
          >
            Admin
          </Button>
          {userCTX.user.id && (
            <Label basic>
              <Icon name="user" />
              {t("HEADER.COMPONENT.WELCOME")}
              {userCTX.user.name}
            </Label>
          )}
        </Menu.Item>
      </Container>
    </Menu>
  );
}
