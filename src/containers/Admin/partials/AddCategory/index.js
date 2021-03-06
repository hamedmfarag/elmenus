import React, { useState } from "react";
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
  const { actions } = props;
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
      actions.addNewCategory(data);
      toast.success(t("ADMIN.ADDCATEGORY.SAVED", { name: data.name }));
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <>
      <Header as="h2" color="teal" textAlign="left">
        {t("ADMIN.ADDCATEGORY.TITLE")}
      </Header>
      <Segment textAlign="left">
        <Form onSubmit={handleSubmit}>
          <Form.Input
            required
            name="name"
            label={t("ADMIN.ADDCATEGORY.NAME")}
            placeholder={t("ADMIN.ADDCATEGORY.NAME")}
          />
          <Form.Field
            required
            label={t("ADMIN.ADDCATEGORY.DESCRIPTION")}
            name="description"
            placeholder={t("ADMIN.ADDCATEGORY.DESCRIPTION")}
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
