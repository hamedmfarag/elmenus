import { Accordion, Button, Icon, Message, Label } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export default function CategoryItems(props) {
  const { t } = useTranslation();
  const { data } = props;
  const { category } = data;

  return (
    <Accordion.Accordion
      panels={category.items.map((item) => ({
        key: item.id,
        title: (
          <Accordion.Title>
            <article className="category-item-header">
              <section>
                <Icon name="dropdown" />
                {item.name}
              </section>
              <Button.Group position="right">
                <Button size="mini" positive icon="pencil alternate" />
                <Button.Or />
                <Button size="mini" color="red" icon="trash alternate" />
              </Button.Group>
            </article>
          </Accordion.Title>
        ),
        content: {
          content: (
            <article className="category-item-content">
              <Message>
                <Message.Header>
                  {t("ADMIN.ADDCATEGORYITEM.DESCRIPTION")}
                </Message.Header>
                <p>{item.description}</p>
              </Message>
              <section className="category-item-content__actions">
                <Label color="orange" size="large">{`${item.price} EGP`}</Label>
              </section>
            </article>
          ),
        },
      }))}
    ></Accordion.Accordion>
  );
}
