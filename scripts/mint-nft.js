require("dotenv").config()
const API_URL = "https://eth-rinkeby.alchemyapi.io/v2/Cw7OC6xS8FbLaKUBADpVvlZRT4_IhPPf"
const PUBLIC_KEY = '0x8c2b9Bd235BF5d2eb968c08b9fBac367D3D4a616'
const PRIVATE_KEY = '6a4faac2bc0474cb4086e660646348116afe101c7ed26eaaca583ba1e7197a21'

const { createAlchemyWeb3 } = require("@alch/alchemy-web3")
const web3 = createAlchemyWeb3(API_URL)
const contract = require("../artifacts/contracts/testNFT.sol/testNFT.json")
//console.log(JSON.stringify(contract.abi))

const contractAddress = "0x83D11b60397EB6a2Ac2a4E58334E30739A9fddAc"

const nftContract = new web3.eth.Contract(contract.abi, contractAddress)

async function mintNFT(tokenURI) {
    const nonce = await web3.eth.getTransactionCount(PUBLIC_KEY, "latest") //get latest nonce
  
    //the transaction
    const tx = {
      from: PUBLIC_KEY,
      to: contractAddress,
      nonce: nonce,
      gas: 500000,
      data: nftContract.methods.mintNFT(PUBLIC_KEY, tokenURI).encodeABI(),
    }
  
    const signPromise = web3.eth.accounts.signTransaction(tx, PRIVATE_KEY)
    signPromise
      .then((signedTx) => {
        web3.eth.sendSignedTransaction(
          signedTx.rawTransaction,
          function (err, hash) {
            if (!err) {
              console.log(
                "The hash of your transaction is: ",
                hash,
                "\nCheck Alchemy's Mempool to view the status of your transaction!"
              )
            } else {
              console.log(
                "Something went wrong when submitting your transaction:",
                err
              )
            }
          }
        )
      })
      .catch((err) => {
        console.log(" Promise failed:", err)
      })
  }
  mintNFT(
    "ipfs://QmeNouqrHGBTW8d4jZoPmHhdEr2pSUN3xqQa5hAtWCZyfC"
  )