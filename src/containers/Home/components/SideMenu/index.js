import { Menu } from "semantic-ui-react";

export default function SideMenu(props) {
  const { actions, data } = props;
  const { menu, selectedCategory } = data;

  const renderMenuItems = (items) => {
    return items.map((item) => (
      <Menu.Item
        name={item.name}
        active={selectedCategory.id === item.id}
        onClick={() => actions.getSelectedTab(item)}
      />
    ));
  };

  return (
    <Menu fluid vertical tabular>
      {renderMenuItems(menu)}
    </Menu>
  );
}
