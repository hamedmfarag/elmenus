import { useContext } from "react";
import { useHistory } from "react-router-dom";

import AddCategory from "./partials/AddCategory";

import { UserContext } from "../../userContext";
import rolesEnum from "../../resources/rolesEnum";

export default function Admin() {
  const userCTX = useContext(UserContext);
  const history = useHistory();

  if (userCTX.user && userCTX.user.role !== rolesEnum.admin) {
    history.push(
      `${process.env.REACT_APP_ROUTE_SIGNIN}?redirect=${process.env.REACT_APP_ROUTE_ADMIN}`
    );
  }

  return (
    <>
      <AddCategory />
    </>
  );
}
