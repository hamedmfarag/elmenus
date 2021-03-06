import { Item, Label, Container } from "semantic-ui-react";

export default function MenuItem(props) {
  const { data } = props;

  return (
    <Item>
      <Item.Image size="tiny" circular src={data.image} />
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
