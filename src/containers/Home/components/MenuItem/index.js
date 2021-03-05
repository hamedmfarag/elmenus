import { Item, Label, Container } from "semantic-ui-react";

export default function MenuItem(props) {
  const { data } = props;

  return (
    <Item>
      <Item.Image
        size="tiny"
        circular
        src="https://w7.pngwing.com/pngs/815/308/png-transparent-sushi-japanese-cuisine-euclidean-vecteur-square-sushi-food-logo-happy-birthday-vector-images.png"
      />
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
