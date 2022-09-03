import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"
import Header from "../components/Header"
import Head from "next/head"
import { NotificationProvider } from "web3uikit"

const APP_ID = process.env.NEXT_PUBLIC_DAPP_ID
const SERVER_URL = process.env.NEXT_PUBLIC_SERVER_URL

function MyApp({ Component, pageProps }) {
   return (
      <div>
         <Head>
            <title>NFT MarketPlace</title>
            <meta name="description" content="NFT MarketPlace" />
         </Head>
         <MoralisProvider serverUrl={SERVER_URL} appId={APP_ID}>
            <NotificationProvider>
               <Header />
               <Component {...pageProps} />
            </NotificationProvider>
         </MoralisProvider>
      </div>
   )
}

export default MyApp
