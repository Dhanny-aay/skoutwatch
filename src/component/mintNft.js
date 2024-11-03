import axios from "axios";

// API key for authentication (replace with your actual key)
const API_KEY = process.env.REACT_APP_UNDERDOG_API_KEY;

// Project ID from Underdog (this is the project under which the NFT is minted)
const PROJECT_ID = process.env.REACT_APP_PROJECT_ID;




// Endpoint URL for minting NFT
const MINT_NFT_URL = `https://api.underdogprotocol.com/v2/projects/${PROJECT_ID}/nfts`;

// Function to mint NFT
async function mintNFT(recipientAddress, metadataUrl) {
  try {
    const response = await axios.post(
      MINT_NFT_URL,
      {
        metadata: metadataUrl, // URL pointing to your NFT metadata (hosted on IPFS or other server)
        walletAddress: recipientAddress, // Recipient wallet address for the NFT
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("NFT minted:", response.data);
  } catch (error) {
    console.error(
      "Error minting NFT:",
      error.response ? error.response.data : error.message
    );
  }
}

// Example usage:
const recipientWallet = "recipient-wallet-address"; // Wallet address where the NFT will be sent
const metadataUrl = "https://ipfs.io/ipfs/your-ipfs-hash"; // URL where NFT metadata is stor   ed

mintNFT(recipientWallet, metadataUrl);
