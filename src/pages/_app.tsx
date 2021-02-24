import { ChagellendProvider } from '../contexts/ChagellendContext';
import '../styles/global.css';

function MyApp({ Component, pageProps }) {
  return (
    <ChagellendProvider>
      <Component {...pageProps} />
    </ChagellendProvider>
  )}
export default MyApp
