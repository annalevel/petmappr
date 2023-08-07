import { PropsWithChildren } from "react";
import Header from "./Header";
import Footer from "./Footer";

export default function Layout(props: PropsWithChildren) {
  return (
    <>
      <Header />
      <div id="content-wrapper">
        {props.children}
      </div>
      <Footer />
    </>
  );
}
