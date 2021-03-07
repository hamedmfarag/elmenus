import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import update from "immutability-helper";
import {
  Accordion,
  Loader,
  Segment,
  Header,
  Icon,
  Modal,
  Confirm,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import Categories from "./Categories";
import EditCategory from "../EditCategory";

import { getMenuData, deleteCategory } from "../../../../apis";

import "./styles.css";

export default function Menu(props) {
  const { data } = props;
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryDataToEdit, setCategoryDataToEdit] = useState({});
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedCategoryIdToDelete, setSelectedCategoryIdToDelete] = useState(
    {}
  );

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (
      data.newCategory &&
      menu.findIndex((item) => item.id === data.newCategory.id) === -1
    ) {
      setMenu([data.newCategory, ...menu]);
    }
  }, [data, menu]);

  const fetchData = async () => {
    const [data, error] = await getMenuData();
    if (error) {
      toast.error(error);
    } else {
      setMenu(data);
      setIsLoading(false);
    }
  };

  const handleCategoryEdit = (category) => {
    setIsModalOpen(true);
    setCategoryDataToEdit(category);
  };

  const handleCategoryDelete = (category) => {
    setIsConfirmOpen(true);
    setSelectedCategoryIdToDelete(category);
  };

  const handleConfirmCategoryDelete = async () => {
    const [data, error] = await deleteCategory(selectedCategoryIdToDelete.id);

    if (error) {
      toast.error(error);
    } else {
      toast.success(
        t("ADMIN.ADDCATEGORY.DELETED", {
          name: selectedCategoryIdToDelete.name,
        })
      );

      setMenu(menu.filter((item) => item.id !== data.id));
      setIsConfirmOpen(false);
      setSelectedCategoryIdToDelete({});
    }
  };

  const handleAddItem = (catIndex, item) => {
    const updatedMenu = update(menu, {
      [catIndex]: { items: { $unshift: [item] } },
    });
    setMenu(updatedMenu);
  };

  const handleEditedCategory = (editedCategory) => {
    const categoryIndex = menu.findIndex(
      (item) => item.id === editedCategory.id
    );

    const updatedMenu = update(menu, {
      [categoryIndex]: { $set: editedCategory },
    });
    setMenu(updatedMenu);
    setIsModalOpen(false);
  };

  if (isLoading) {
    return <Loader active={isLoading} />;
  }

  if (!isLoading && menu.length === 0) {
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="pdf file outline" />
          {t("COMMON.MESSAGE.NOMENUFOUND")}
        </Header>
      </Segment>
    );
  }

  return (
    <>
      <Header as="h2" color="teal" textAlign="left">
        {t("ADMIN.MENU.TITLE")}
      </Header>
      <Accordion
        defaultActiveIndex={0}
        panels={Categories({
          data: menu,
          actions: {
            onAddItem: handleAddItem,
            onCategoryEdit: handleCategoryEdit,
            onCategoryDelete: handleCategoryDelete,
          },
        })}
        styled
        fluid
      />
      <Modal
        size="mini"
        open={isModalOpen}
        onClose={() => {
          setCategoryDataToEdit({});
          setIsModalOpen(false);
        }}
      >
        <Modal.Header>{categoryDataToEdit.name}</Modal.Header>
        <Modal.Content>
          <EditCategory
            data={categoryDataToEdit}
            actions={{ editCategory: handleEditedCategory }}
          />
        </Modal.Content>
      </Modal>
      <Confirm
        open={isConfirmOpen}
        size="mini"
        content={t("ADMIN.CATEGORY.MESSAGE.DELETE", {
          name: selectedCategoryIdToDelete.name,
        })}
        onCancel={() => {
          setIsConfirmOpen(false);
          setSelectedCategoryIdToDelete({});
        }}
        onConfirm={handleConfirmCategoryDelete}
      />
    </>
  );
}
