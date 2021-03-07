import { Item, Label, Container } from "semantic-ui-react";

import "./styles.css";

export default function MenuItem(props) {
  const { data } = props;

  return (
    <Item className="menu-item-container">
      <Item.Image size="tiny" src={data.image} />
      <Item.Content>
        <Item.Header as="a">{data.name}</Item.Header>
        <Item.Meta>{data.description}</Item.Meta>
        <Item.Extra>
          <Container textAlign="right">
            <Label size="large">{`${data.price} EGP`}</Label>
          </Container>
        </Item.Extra>
      </Item.Content>
    </Item>
  );
}
