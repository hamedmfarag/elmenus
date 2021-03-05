import { useState } from "react";
import { Card, Button, Form, Divider, Loader } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { UserContext } from "../../userContext";

import { signIn } from "../../apis";

export default function SignIn() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e, setUser) => {
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
      setUser({ name: data.username, role: data.role });
      // redirect to admin if there isredirect url
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <UserContext.Consumer>
      {({ setUser }) => (
        <Card>
          <Card.Content header={t("SIGNIN.PAGE.TITLE")} />
          <Card.Content>
            <Form onSubmit={(e) => handleSubmit(e, setUser)}>
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
      )}
    </UserContext.Consumer>
  );
}
