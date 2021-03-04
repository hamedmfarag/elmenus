import Header from "../../components/common/Header";

export default function PrivateLayout(props) {
  return (
    <article>
      <Header />
      {props.children}
    </article>
  );
}
