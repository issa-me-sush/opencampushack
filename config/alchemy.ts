import { AlchemyAccountsUIConfig, createConfig } from "@account-kit/react";
import { sepolia, alchemy, createAlchemyPublicRpcClient } from "@account-kit/infra";
import { QueryClient } from "@tanstack/react-query";
import { defineChain } from 'viem'
import { createPublicClient, http } from 'viem'

// Define the EduChain testnet
export const eduChainTestnet = defineChain({
  id: 656476,
  name: 'EduChain Testnet',
  network: 'educhain-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'ETH',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.open-campus-codex.gelato.digital'],
    },
    public: {
      http: ['https://rpc.open-campus-codex.gelato.digital'],
    },
    alchemy: {
      http: [`https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`],
    }
  },
  blockExplorers: {
    default: {
      name: 'EduChain Explorer',
      url: 'https://opencampus-codex.blockscout.com/',
    },
  },
  testnet: true
})

// Create Alchemy client
const alchemyClient = createAlchemyPublicRpcClient({
  chain: eduChainTestnet,
  transport: alchemy({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
  })
})

// Create fallback client for EduChain
const eduChainClient = createPublicClient({
  chain: eduChainTestnet,
  transport: http(eduChainTestnet.rpcUrls.default.http[0])
})

const uiConfig: AlchemyAccountsUIConfig = {
  illustrationStyle: "outline",
  auth: {
    sections: [
      [{ type: "email" }],
      [
        { type: "passkey" },
        { type: "social", authProviderId: "google", mode: "popup" }
      ],
      [
        {
          type: "external_wallets",
          walletConnect: { projectId: "71c548caa10d661627b474b0f7bd4dd6" }
        }
      ]
    ],
    addPasskeyOnSignup: true,
  },
};

export const config = createConfig({
  transport: alchemy({ 
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY!,
  }),
  chain: eduChainTestnet,
  ssr: true,
  enablePopupOauth: true,
}, uiConfig);

export const queryClient = new QueryClient();