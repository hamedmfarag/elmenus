import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import update from "immutability-helper";
import {
  Accordion,
  Loader,
  Segment,
  Header,
  Icon,
  Button,
  Label,
  Message,
  Divider,
} from "semantic-ui-react";
import { useTranslation } from "react-i18next";

import AddCategoryItem from "../AddCategoryItem";

import { getMenuData } from "../../../../apis";

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

  const prepareAccordionData = () => {
    return menu.map((cat, catIndex) => {
      return {
        key: cat.id,
        title: cat.name,
        content: {
          content: (
            <div>
              <div>
                FOOORM (Cat. Name, Cat. Description)
                <Divider />
                <AddCategoryItem
                  data={{ categoryId: cat.id }}
                  actions={{
                    onAddItem: (item) => handleAddItem(catIndex, item),
                  }}
                />
              </div>
              <Accordion.Accordion
                panels={cat.items.map((item) => ({
                  key: item.id,
                  title: (
                    <Accordion.Title>
                      <Icon name="dropdown" />
                      {item.name}
                      <Button.Group position="right">
                        <Button size="mini">Edit</Button>
                        <Button.Or />
                        <Button size="mini" color="red">
                          Delete
                        </Button>
                      </Button.Group>
                    </Accordion.Title>
                  ),
                  content: {
                    content: (
                      <div>
                        <Message>
                          <Message.Header>Description</Message.Header>
                          <p>{item.description}</p>
                        </Message>
                        <Label size="large">{`${item.price} EGP`}</Label>
                      </div>
                    ),
                  },
                }))}
              ></Accordion.Accordion>
            </div>
          ),
        },
      };
    });
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
    <Accordion
      defaultActiveIndex={0}
      panels={prepareAccordionData()}
      styled
      fluid
    />
  );
}
