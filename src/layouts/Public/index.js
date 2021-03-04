import Header from "../../components/common/Header";

export default function PublicLayout(props) {
  return (
    <article>
      <Header />
      {props.children}
    </article>
  );
}
