import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import {
  Button,
  Form,
  Divider,
  Loader,
  Header,
  Segment,
} from "semantic-ui-react";

import { addCategory } from "../../../../apis";

export default function AddCategory(props) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);

    const [data, error] = await addCategory(
      e.target.name.value,
      e.target.description.value
    );

    if (error) {
      toast.error(error);
    } else {
      // send up the data to parent to insert it into the accordion
      toast.success(t("ADMIN.ADDCATEGORY.SAVED", { name: data.name }));
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Header as="h2" color="teal" textAlign="center">
        {t("ADMIN.ADDCATEGORY.TITLE")}
      </Header>
      <Segment stacked textAlign="left">
        <Form.Field>
          <label>{t("ADMIN.ADDCATEGORY.NAME")}</label>
          <input
            required
            type="text"
            sign
            name="name"
            placeholder={t("ADMIN.ADDCATEGORY.NAME")}
          />
        </Form.Field>
        <Form.Field>
          <label>{t("ADMIN.ADDCATEGORY.DESCRIPTION")}</label>
          <input
            required
            type="text"
            name="description"
            placeholder={t("ADMIN.ADDCATEGORY.DESCRIPTION")}
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
