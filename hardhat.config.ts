import { HardhatUserConfig } from 'hardhat/config';
import '@nomicfoundation/hardhat-toolbox';

require('dotenv').config();

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
  },
  defaultNetwork: "dev",
  networks: {
    dev: {
      url: process.env.RPC_URL || "",
      accounts:
        process.env.WALLET_KEY !== undefined ? [process.env.WALLET_KEY] : [],
    },
    // for testnet
    'base-goerli': {
      url: 'https://base-goerli.public.blastapi.io',
      accounts: [process.env.WALLET_KEY as string],
    },
    // for local dev environment
    'local': {
      url: 'http://localhost:8545',
      accounts: [process.env.WALLET_KEY as string],
    },
  },
  etherscan: {
    apiKey: {
     // Basescan doesn't require an API key, however
     // Hardhat still expects an arbitrary string to be provided.
     "base-goerli": "PLACEHOLDER_STRING"
    },
    customChains: [
      {
        network: "base-goerli",
        chainId: 84531,
        urls: {
         apiURL: "https://api-goerli.basescan.org/api",
         browserURL: "https://goerli.basescan.org"
        }
      }
    ]
  },
};

export default config;