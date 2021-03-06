import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import update from "immutability-helper";
import { Accordion, Loader, Segment, Header, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import Categories from "./Categories";

import { getMenuData } from "../../../../apis";

import "./styles.css";

export default function Menu(props) {
  const { data } = props;
  const { t } = useTranslation();

  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  const handleAddItem = (catIndex, item) => {
    const updatedMenu = update(menu, {
      [catIndex]: { items: { $unshift: [item] } },
    });
    setMenu(updatedMenu);
  };
  //e.stopPropagation()

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
          actions: { onAddItem: handleAddItem },
        })}
        styled
        fluid
      />
    </>
  );
}
