import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import {
  Button,
  Form,
  Divider,
  Loader,
  Segment,
  Header,
} from "semantic-ui-react";

import { addCategoryItem } from "../../../../apis";

export default function AddCategoryItem(props) {
  const { actions, data } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);

    const [item, error] = await addCategoryItem(
      data.categoryId,
      e.target.name.value,
      e.target.description.value,
      e.target.price.value
    );

    if (error) {
      toast.error(error);
    } else {
      // send up the data to parent to insert it into the accordion
      actions.onAddItem(item);
      toast.success(t("ADMIN.ADDCATEGORYITEM.SAVED", { name: item.name }));
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h4">{t("ADMIN.ADDCATEGORYITEM.TITLE")}</Header>
      <Segment stacked textAlign="left">
        <Form.Field>
          <label>{t("ADMIN.ADDCATEGORYITEM.NAME")}</label>
          <input
            required
            type="text"
            sign
            name="name"
            placeholder={t("ADMIN.ADDCATEGORYITEM.NAME")}
          />
        </Form.Field>
        <Form.Field>
          <label>{t("ADMIN.ADDCATEGORYITEM.DESCRIPTION")}</label>
          <input
            required
            type="text"
            name="description"
            placeholder={t("ADMIN.ADDCATEGORYITEM.DESCRIPTION")}
          />
        </Form.Field>
        <Form.Field>
          <label>{t("ADMIN.ADDCATEGORYITEM.PRICE")}</label>
          <input
            required
            type="text"
            name="price"
            placeholder={t("ADMIN.ADDCATEGORYITEM.PRICE")}
          />
        </Form.Field>
        <Divider />
        <Button type="submit" disabled={isSubmitting}>
          <Loader active={isLoading} inline size="mini" />{" "}
          {t("COMMON.LABEL.SAVE")}
        </Button>
      </Segment>
    </Form>
  );
}
