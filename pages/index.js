import { useMoralisQuery } from "react-moralis"
import NftBox from "../components/NftBox"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"
export default function Home() {
   const { isWeb3Enabled } = useMoralis()
   const {
      data: listedNfts,
      isFetching: fetchingListedNfts,
      fetch: reFetch,
   } = useMoralisQuery("ActiveItem", (query) =>
      query.limit(10).descending("tokenId")
   )
   return (
      <div className="container mx-auto ">
         <h1 className="py-4 px-4 font-bold text-2xl">Recently Listed</h1>
         <div className="flex flex-wrap m-5 p-5">
            {isWeb3Enabled ? (
               fetchingListedNfts ? (
                  <div>Loading..</div>
               ) : (
                  listedNfts.map((nft) => {
                     console.log(nft.attributes)
                     const {
                        price,
                        nftAddress,
                        tokenId,
                        marketplaceAddress,
                        seller,
                     } = nft.attributes
                     return (
                        <NftBox
                           price={price}
                           nftAddress={nftAddress}
                           tokenId={tokenId}
                           marketplaceAddress={marketplaceAddress}
                           seller={seller}
                           reFetch={reFetch}
                           key={`${nftAddress}${tokenId}`}
                        />
                     )
                  })
               )
            ) : (
               <h1>Please Connect Wallet</h1>
            )}
         </div>
      </div>
   )
}
