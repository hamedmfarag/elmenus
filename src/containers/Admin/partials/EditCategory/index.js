import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import { Button, Form, Divider, Loader } from "semantic-ui-react";

import { editCategory } from "../../../../apis";

export default function EditCategory(props) {
  const { actions, data } = props;
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    if (data && !categoryData.id) {
      setCategoryData(data);
    }
  }, [data, categoryData]);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setCategoryData({ ...categoryData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSubmitting(true);
    const [data, error] = await editCategory(
      categoryData.id,
      categoryData.name,
      categoryData.description
    );
    if (error) {
      toast.error(error);
    } else {
      // send up the data to parent to update it into the accordion
      actions.editCategory(data);
      toast.success(t("ADMIN.ADDCATEGORY.EDITED", { name: data.name }));
    }
    setIsLoading(false);
    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Input
        required
        value={categoryData.name}
        name="name"
        onChange={handleChange}
        label={t("ADMIN.ADDCATEGORY.NAME")}
        placeholder={t("ADMIN.ADDCATEGORY.NAME")}
      />
      <Form.Field
        required
        value={categoryData.description}
        label={t("ADMIN.ADDCATEGORY.DESCRIPTION")}
        name="description"
        onChange={handleChange}
        placeholder={t("ADMIN.ADDCATEGORY.DESCRIPTION")}
        control="textarea"
        rows="3"
      />
      <Divider />
      <Button type="submit" disabled={isSubmitting}>
        {isLoading && <Loader active={isLoading} inline size="mini" />}{" "}
        {t("COMMON.LABEL.SAVE")}
      </Button>
    </Form>
  );
}
