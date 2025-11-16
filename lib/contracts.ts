export const CONTRACTS = {
  USDC: process.env.NEXT_PUBLIC_USDC_ADDRESS!,
  FEE_DISTRIBUTOR: process.env.NEXT_PUBLIC_FEE_DISTRIBUTOR_ADDRESS!,
  OPERATOR_VAULT: process.env.NEXT_PUBLIC_OPERATOR_VAULT_ADDRESS!,
  AUTOMATOR: process.env.NEXT_PUBLIC_AUTOMATOR_ADDRESS!,
  NFT: process.env.NEXT_PUBLIC_NFT_ADDRESS!,
  MANAGER: process.env.NEXT_PUBLIC_MANAGER_ADDRESS!,
} as const;

// OperatorVault ABI
export const OPERATOR_VAULT_ABI = [
  "function getVaultInfo(address operator) view returns (uint256 available, uint256 inDeFi, uint256 totalDeposited, uint256 totalWithdrawn)",
  "function getTotalBalance(address operator) view returns (uint256)",
  "function withdraw(uint256 amount) external",
];

// SubscriptionManager ABI
export const SUBSCRIPTION_MANAGER_ABI = [
  "function subscriptionPrice() view returns (uint256)",
  "function getSubscriptionStatus(address user) view returns (bool isActive, uint256 nextPaymentDue)",
];

// MembershipNFT ABI
export const MEMBERSHIP_NFT_ABI = [
  "function balanceOf(address owner) view returns (uint256)",
  "function totalSupply() view returns (uint256)",
];

// FeeDistributor ABI
export const FEE_DISTRIBUTOR_ABI = [
  "function totalPlatformFeesCollected() view returns (uint256)",
  "function totalSuccessFeesCollected() view returns (uint256)",
  "function platformFeeRate() view returns (uint256)",
  "function successFeeRate() view returns (uint256)",
];

// MockUSDC ABI
export const USDC_ABI = [
  "function balanceOf(address account) view returns (uint256)",
  "function decimals() view returns (uint8)",
];