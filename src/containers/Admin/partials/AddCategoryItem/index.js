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


    if (isNaN(Number(e.target.price.value))) {
      toast.warn(t("ADMIN.ADDCATEGORYITEM.PRICE_SHOULDNUMBER"));
    } else {
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
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <>
      <Header as="h4">{t("ADMIN.ADDCATEGORYITEM.TITLE")}</Header>
      <Segment textAlign="left">
        <Form onSubmit={handleSubmit}>
          <Form.Group widths="equal">
            <Form.Input
              fluid
              required
              name="name"
              label={t("ADMIN.ADDCATEGORYITEM.NAME")}
              placeholder={t("ADMIN.ADDCATEGORYITEM.NAME")}
            />
            <Form.Input
              fluid
              required
              name="price"
              label={t("ADMIN.ADDCATEGORYITEM.PRICE")}
              placeholder={t("ADMIN.ADDCATEGORYITEM.PRICE")}
            />
          </Form.Group>
          <Form.Field
            required
            label={t("ADMIN.ADDCATEGORYITEM.DESCRIPTION")}
            name="description"
            placeholder={t("ADMIN.ADDCATEGORYITEM.DESCRIPTION")}
            control="textarea"
            rows="3"
          />
          <Divider />
          <Button type="submit" disabled={isSubmitting}>
            <Loader active={isLoading} inline size="mini" />{" "}
            {t("COMMON.LABEL.SAVE")}
          </Button>
        </Form>
      </Segment>
    </>
  );
}
