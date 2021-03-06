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
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import Categories from "./Categories";
import EditCategory from "../EditCategory";

import { getMenuData } from "../../../../apis";

import "./styles.css";

export default function Menu(props) {
  const { data } = props;
  const { t } = useTranslation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryDataToEdit, setCategoryDataToEdit] = useState({});

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
    </>
  );
}
