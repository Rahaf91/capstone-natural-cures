import GlobalStyle from "../styles";
import remedies from "../assets/remedies.json";

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} remedies={remedies} />
    </>
  );
}
