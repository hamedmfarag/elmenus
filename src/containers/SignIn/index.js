import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Card, Button, Form, Divider, Loader } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import queryString from "query-string";

import { UserContext } from "../../userContext";

import { signIn } from "../../apis";

export default function SignIn(props) {
  const { route } = props;
  const { t } = useTranslation();
  const history = useHistory();
  const userCTX = useContext(UserContext);

  if (userCTX.user.id) {
    history.push(process.env.REACT_APP_ROUTE_HOME);
  }

  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getRedirectUrl = (search) => {
    let redirectUrl = "";
    if (search) {
      const parsed = queryString.parse(search);
      if (parsed.redirect) {
        redirectUrl = parsed.redirect;
      }
    }
    return redirectUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);

    const [data, error] = await signIn(
      e.target.username.value,
      e.target.password.value
    );

    if (error) {
      toast.error(t("SIGNIN.PAGE.USERORPASSNOTFOUND"));
    } else {
      userCTX.setUser(data);
      history.push(getRedirectUrl(route.location.search));
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <Card>
      <Card.Content header={t("SIGNIN.PAGE.TITLE")} />
      <Card.Content>
        <Form onSubmit={handleSubmit}>
          <Form.Field>
            <label>{t("SIGNIN.PAGE.USERNAME")}</label>
            <input
              required
              type="text"
              name="username"
              placeholder={t("SIGNIN.PAGE.USERNAME")}
            />
          </Form.Field>
          <Form.Field>
            <label>{t("SIGNIN.PAGE.PASSWORD")}</label>
            <input
              required
              type="password"
              name="password"
              placeholder={t("SIGNIN.PAGE.PASSWORD")}
            />
          </Form.Field>
          <Divider />
          <Button type="submit" disabled={isSubmitting}>
            <Loader active={isLoading} inline size="mini" />{" "}
            {t("SIGNIN.PAGE.SIGNIN")}
          </Button>
        </Form>
      </Card.Content>
    </Card>
  );
}
