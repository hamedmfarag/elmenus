import { Card, Button, Form, Divider } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export default function SignIn() {
  const { t } = useTranslation();

  return (
    <Card>
      <Card.Content header={t("SIGNIN.PAGE.TITLE")} />
      <Card.Content>
        <Form>
          <Form.Field>
            <label>{t("SIGNIN.PAGE.USERNAME")}</label>
            <input placeholder={t("SIGNIN.PAGE.USERNAME")} />
          </Form.Field>
          <Form.Field>
            <label>{t("SIGNIN.PAGE.PASSWORD")}</label>
            <input type="password" placeholder={t("SIGNIN.PAGE.PASSWORD")} />
          </Form.Field>
          <Divider />
          <Button type="submit">{t("SIGNIN.PAGE.SIGNIN")}</Button>
        </Form>
      </Card.Content>
    </Card>
  );
}
