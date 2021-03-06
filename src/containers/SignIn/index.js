import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import {
  Button,
  Form,
  Divider,
  Loader,
  Header,
  Segment,
} from "semantic-ui-react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // if user already logged in, redirect the user to home page
  if (userCTX.user.id) {
    history.push(process.env.REACT_APP_ROUTE_HOME);
  }

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
      toast.error(error);
    } else {
      userCTX.setUser(data);
      history.push(getRedirectUrl(route.location.search));
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <>
      <Header as="h2" color="teal" textAlign="center">
        {t("SIGNIN.PAGE.WELCOMEMESSAGE")}
      </Header>
      <Segment textAlign="left">
        <Form onSubmit={handleSubmit}>
          <Form.Input
            required
            name="username"
            label={t("SIGNIN.PAGE.USERNAME")}
            placeholder={t("SIGNIN.PAGE.USERNAME")}
          />
          <Form.Input
            required
            type="password"
            name="password"
            label={t("SIGNIN.PAGE.PASSWORD")}
            placeholder={t("SIGNIN.PAGE.PASSWORD")}
          />
          <Divider />
          <Button type="submit" disabled={isSubmitting}>
            <Loader active={isLoading} inline size="mini" />{" "}
            {t("SIGNIN.PAGE.SIGNIN")}
          </Button>
        </Form>
      </Segment>
    </>
  );
}
