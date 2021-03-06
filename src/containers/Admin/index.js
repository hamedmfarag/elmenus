import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Grid } from "semantic-ui-react";

import AddCategory from "./partials/AddCategory";
import Menu from "./partials/Menu";

import { UserContext } from "../../userContext";
import rolesEnum from "../../resources/rolesEnum";

export default function Admin() {
  const userCTX = useContext(UserContext);
  const history = useHistory();
  const [newCategory, setNewCategory] = useState(null);

  if (userCTX.user && userCTX.user.role !== rolesEnum.admin) {
    history.push(
      `${process.env.REACT_APP_ROUTE_SIGNIN}?redirect=${process.env.REACT_APP_ROUTE_ADMIN}`
    );
  }

  const handleAddNewCategory = (category) => {
    setNewCategory(category);
  };

  return (
    <Grid stackable>
      <Grid.Row>
        <Grid.Column width={4}>
          <AddCategory actions={{ addNewCategory: handleAddNewCategory }} />
        </Grid.Column>
        <Grid.Column width={12}>
          <Menu data={{ newCategory }} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
}
