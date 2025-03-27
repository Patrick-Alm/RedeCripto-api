import { Network } from 'alchemy-sdk';

export const NETWORKS = {
	ethereum: Network.ETH_MAINNET,
	ethereumSepolia: Network.ETH_SEPOLIA,
	zkSync: Network.ZKSYNC_MAINNET,
	optimism: Network.OPT_MAINNET,
	optimismSepolia: Network.OPT_SEPOLIA,
	base: Network.BASE_MAINNET,
	baseSepolia: Network.BASE_SEPOLIA,
	scroll: Network.SCROLL_MAINNET,
	scrollSepolia: Network.SCROLL_SEPOLIA,
	bnb: Network.BNB_MAINNET,
	bnbTestnet: Network.BNB_TESTNET,
} as Record<string, Network>;

export type SupportedNetwork = keyof typeof NETWORKS;

export const Tokens = ['ETH', 'BTC', 'USDC', 'SOL', 'BNB', 'OP'];
