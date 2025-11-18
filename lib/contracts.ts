import { ethers } from "ethers";

// Contract addresses
export const CONTRACTS = {
  USDC: process.env.NEXT_PUBLIC_USDC_ADDRESS!,
  FEE_DISTRIBUTOR: process.env.NEXT_PUBLIC_FEE_DISTRIBUTOR_ADDRESS!,
  OPERATOR_VAULT: process.env.NEXT_PUBLIC_OPERATOR_VAULT_ADDRESS!,
  AUTOMATOR: process.env.NEXT_PUBLIC_AUTOMATOR_ADDRESS!,
  NFT: process.env.NEXT_PUBLIC_NFT_ADDRESS!,
  MANAGER: process.env.NEXT_PUBLIC_MANAGER_ADDRESS!,
};

export const TIERED_MANAGER_ADDRESS = process.env.NEXT_PUBLIC_TIERED_MANAGER_ADDRESS!;

// ABIs
export const USDC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function approve(address spender, uint256 amount) returns (bool)",
  "function allowance(address owner, address spender) view returns (uint256)",
];

export const OPERATOR_VAULT_ABI = [
  "function balances(address operator) view returns (uint256)",
  "function inDeFi(address operator) view returns (uint256)",
];

export const SUBSCRIPTION_MANAGER_ABI = [
  "function monthlyPrice() view returns (uint256)",
  "function getAllActiveMembers() view returns (address[])",
];

export const MEMBERSHIP_NFT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
];

export const FEE_DISTRIBUTOR_ABI = [
  "function platformFees(address operator) view returns (uint256)",
];

// TieredSubscriptionManager ABI
export const TIERED_SUBSCRIPTION_MANAGER_ABI = [
  "function getAllTiers() view returns (tuple(string name, uint256 price, uint256 discordRoleId, bool isActive)[])",
  "function getUserSubscription(address user) view returns (uint256 tierId, string tierName, uint256 price, bool isActive, uint256 nextPaymentDue)",
  "function createTier(string name, uint256 price, uint256 discordRoleId) external returns (uint256)",
  "function updateTier(uint256 tierId, string name, uint256 price, uint256 discordRoleId) external",
  "function deactivateTier(uint256 tierId) external",
  "function startSubscription(uint256 tierId) external",
  "function upgradeTier(uint256 newTierId) external",
  "function downgradeTier(uint256 newTierId) external",
  "function cancelSubscription() external",
];

// RPC Provider
export const getProvider = () => {
  return new ethers.JsonRpcProvider(
    process.env.NEXT_PUBLIC_BLOCKDAG_RPC_URL || "http://13.245.135.249:18545"
  );
};