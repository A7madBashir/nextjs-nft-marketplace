const { Moralis } = require("moralis-v1/node")
const contractAddresses = require("./constants/networkMapping.json")
require("dotenv").config()

let chainId = process.env.chainId || "31337"
let moralisChainId = chainId == "31337" ? "1337" : chainId
const contractAddress = contractAddresses[chainId]["NftMarketplace"]
const serverUrl = process.env.NEXT_PUBLIC_SERVER_URL
const appId = process.env.NEXT_PUBLIC_DAPP_ID
const masterKey = process.env.masterKey
// const web3ApiKey = process.env.web3ApiKey

async function main() {
   console.log("Workking with contract Address ", contractAddress)
   await Moralis.start({
      serverUrl,
      appId,
      masterKey,
   })
   let itemListedOptions = {
      chainId: moralisChainId,
      sync_Historical: true,
      topic: "ItemListed(address,address,uint256,uint256)",
      abi: {
         anonymous: false,
         inputs: [
            {
               indexed: true,
               internalType: "address",
               name: "seller",
               type: "address",
            },
            {
               indexed: true,
               internalType: "address",
               name: "nftAddress",
               type: "address",
            },
            {
               indexed: true,
               internalType: "uint256",
               name: "tokenId",
               type: "uint256",
            },
            {
               indexed: false,
               internalType: "uint256",
               name: "price",
               type: "uint256",
            },
         ],
         name: "ItemListed",
         type: "event",
      },
      address: contractAddress,
      tableName: "ItemListed",
   }
   let itemBoughtOptions = {
      chainId: moralisChainId,
      sync_Historical: true,
      topic: "ItemBought(address,address,uint256,uint256)",
      abi: {
         anonymous: false,
         inputs: [
            {
               indexed: true,
               internalType: "address",
               name: "buyer",
               type: "address",
            },
            {
               indexed: true,
               internalType: "address",
               name: "nftAddress",
               type: "address",
            },
            {
               indexed: true,
               internalType: "uint256",
               name: "tokenId",
               type: "uint256",
            },
            {
               indexed: false,
               internalType: "uint256",
               name: "price",
               type: "uint256",
            },
         ],
         name: "ItemBought",
         type: "event",
      },
      address: contractAddress,
      tableName: "ItemBought",
   }
   let itemCancledOptions = {
      chainId: moralisChainId,
      sync_Historical: true,
      topic: "ItemCanceled(address,address,uint256)",
      abi: {
         anonymous: false,
         inputs: [
            {
               indexed: true,
               internalType: "address",
               name: "sender",
               type: "address",
            },
            {
               indexed: true,
               internalType: "address",
               name: "nftAddress",
               type: "address",
            },
            {
               indexed: true,
               internalType: "uint256",
               name: "tokenId",
               type: "uint256",
            },
         ],
         name: "ItemCanceled",
         type: "event",
      },
      address: contractAddress,
      tableName: "ItemCanceled",
   }
   const listedResponse = await Moralis.Cloud.run(
      "watchContractEvent",
      itemListedOptions,
      { useMasterKey: true }
   )
   const boughtResponse = await Moralis.Cloud.run(
      "watchContractEvent",
      itemBoughtOptions,
      { useMasterKey: true }
   )
   const canceledResponse = await Moralis.Cloud.run(
      "watchContractEvent",
      itemCancledOptions,
      { useMasterKey: true }
   )
   if (
      listedResponse.success &&
      boughtResponse.success &&
      canceledResponse.success
   ) {
      console.log("Succsess!\nDatabase Updated with events!")
   } else {
      console.log("Failed!\nSomething Went Wrong!")
   }
}

main()
   .then(() => process.exit(0))
   .catch((error) => {
      console.error(error)
      process.exit(1)
   })
