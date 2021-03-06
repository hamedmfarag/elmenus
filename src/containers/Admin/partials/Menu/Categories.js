import { Accordion, Button, Icon, Message, Divider } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import AddCategoryItem from "../AddCategoryItem";

import CategoryItems from "./CategoryItems";

function CategoryContent(props) {
  const { t } = useTranslation();
  const { data, actions } = props;
  const { category, categoryIndex } = data;

  return (
    <section>
      <Message>
        <Message.Header>
          {t("ADMIN.ADDCATEGORYITEM.DESCRIPTION")}
        </Message.Header>
        <p>{category.description || t("COMMON.MESSAGE.NODATAAVAL")}</p>
      </Message>
      <Divider />
      <AddCategoryItem
        data={{ categoryId: category.id }}
        actions={{
          onAddItem: (item) => actions.onAddItem(categoryIndex, item),
        }}
      />
    </section>
  );
}

export default function Categories(props) {
  const { data, actions } = props;

  return data.map((cat, catIndex) => {
    return {
      key: cat.id,
      title: (
        <Accordion.Title>
          <article className="category-item-header">
            <section>
              <Icon name="dropdown" />
              {cat.name}
            </section>
            <Button.Group position="right">
              <Button
                size="mini"
                positive
                icon="pencil alternate"
                onClick={(e) => {
                  e.stopPropagation();
                  actions.onCategoryEdit(cat);
                }}
              />
              <Button.Or />
              <Button size="mini" color="red" icon="trash alternate" />
            </Button.Group>
          </article>
        </Accordion.Title>
      ),
      content: {
        content: (
          <article>
            <CategoryContent
              data={{ category: cat, categoryIndex: catIndex }}
              actions={{ onAddItem: actions.onAddItem }}
            />
            <CategoryItems data={{ category: cat }} />
          </article>
        ),
      },
    };
  });
}
