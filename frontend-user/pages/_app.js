import { Provider } from "react-redux";
import { wrapper, store } from "../lib/store";
import "../styles/globals.scss";

const MyApp = ({ Component, pageProps }) => {
  return (
    <Component {...pageProps} />
  );
}

export default wrapper.withRedux(MyApp);
