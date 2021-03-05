import { Link } from "react-router-dom";

import { UserContext } from "../../../userContext";

import "./styles.css";

export default function Header() {
  return (
    <UserContext.Consumer>
      {({ user }) => (
        <article className="header-container">
          <Link to={process.env.REACT_APP_ROUTE_HOME}>Logo</Link>
          <Link to={process.env.REACT_APP_ROUTE_ADMIN}>Admin</Link>
          {JSON.stringify(user)}
        </article>
      )}
    </UserContext.Consumer>
  );
}
