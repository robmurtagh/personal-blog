import type { AppProps } from 'next/app'
import "../styles/globals.css";

/**
 * A custom app component which wraps every page initialisation
 * https://nextjs.org/docs/advanced-features/custom-app
 */
export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
