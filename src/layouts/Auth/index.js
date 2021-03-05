import { Grid } from "semantic-ui-react";

export default function AuthLayout(props) {
  return (
    <Grid textAlign="center" style={{ height: "100vh" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>{props.children}</Grid.Column>
    </Grid>
  );
}
