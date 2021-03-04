import { Link } from "react-router-dom";

import "./styles.css";

export default function Header() {
  return (
    <article className="header-container">
      <Link to={process.env.REACT_APP_ROUTE_HOME}>Logo</Link>
      <Link to={process.env.REACT_APP_ROUTE_ADMIN}>Admin</Link>
    </article>
  );
}
