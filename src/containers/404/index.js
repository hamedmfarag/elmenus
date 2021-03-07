import { Container, Header } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Container textAlign="center">
      <Header as="h1">404</Header>
      <Link to={process.env.REACT_APP_ROUTE_HOME}>
        {t("COMMON.MESSAGE.BACKHOME")}
      </Link>
    </Container>
  );
}
