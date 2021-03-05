import { useEffect, useState } from "react";
import { Grid, Loader, Segment, Header, Icon, Item } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";

import SideMenu from "./components/SideMenu";
import MenuItem from "./components/MenuItem";

import { getMenuData } from "../../apis";

export default function Home() {
  const { t } = useTranslation();
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [data, error] = await getMenuData();
    if (error) {
      toast.error(error);
    } else {
      setMenu(data);
      // get first item as default selection
      setSelectedCategory(data[0]);
      setIsLoading(false);
    }
  };

  const handleSelectedTab = (item) => {
    setSelectedCategory(item);
  };

  const renderMenu = () => {
    const category = menu.find((item) => item.id === selectedCategory.id);

    if (category && category.items && category.items.length > 0) {
      return (
        <Item.Group>
          {category.items.map((item) => (
            <MenuItem key={item.id} data={item} />
          ))}
        </Item.Group>
      );
    }
    return (
      <Segment placeholder>
        <Header icon>
          <Icon name="pdf file outline" />
          {t("HOME.PAGE.NOMENUITEMSFOUND")}
        </Header>
      </Segment>
    );
  };

  const renderContent = () => {
    if (isLoading) {
      return <Loader active={isLoading} />;
    }

    if (!isLoading && menu.length === 0) {
      return (
        <Segment placeholder>
          <Header icon>
            <Icon name="pdf file outline" />
            {t("HOME.PAGE.NOMENUFOUND")}
          </Header>
        </Segment>
      );
    }

    return (
      <Grid stackable>
        <Grid.Row>
          <Grid.Column width={4}>
            <SideMenu
              data={{
                menu,
                selectedCategory,
              }}
              actions={{ getSelectedTab: handleSelectedTab }}
            />
          </Grid.Column>
          <Grid.Column width={12}>{renderMenu()}</Grid.Column>
        </Grid.Row>
      </Grid>
    );
  };

  return renderContent();
}
