import { Container } from "semantic-ui-react";

import Header from "../../components/common/Header";

export default function PublicLayout(props) {
  return (
    <article>
      <Header />
      <Container>{props.children}</Container>
    </article>
  );
}
