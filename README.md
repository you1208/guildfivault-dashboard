# GuildFi Vault

A gasless B2B SaaS dApp that automates Discord membership management with subscription payments and DeFi yield generation. Built on BlockDAG for the BlockDAG Buildathon 2025.

![Solidity](https://img.shields.io/badge/Solidity-0.8.28-363636)
![Hardhat](https://img.shields.io/badge/Hardhat-Latest-yellow)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Discord.js](https://img.shields.io/badge/Discord.js-14-5865F2)
![BlockDAG](https://img.shields.io/badge/BlockDAG-Testnet-orange)

## 🎯 Overview

**GuildFi Vault** is a complete B2B SaaS solution that enables Discord community operators to:

1. **Automate Subscription Payments** - Monthly USDC payments with automatic member management
2. **Earn DeFi Yields** - Automatically invest collected fees in DEX, Lending, and Staking protocols
3. **Zero Manual Work** - Discord roles automatically granted/revoked based on NFT ownership
4. **Gasless UX** - Account Abstraction (ERC-4337) eliminates gas fees for users

## 💰 Revenue Model

### For Platform (Us)
- **5% Platform Fee** - From each subscription payment
- **10% Success Fee** - From DeFi-generated profits

### For Community Operators
- **95% of Subscriptions** - Deposited to operator's vault
- **90% of DeFi Profits** - Additional yield from automated investing

### Example Flow:
```
User pays $10 → Platform: $0.50 (5%) | Operator: $9.50 (95%)
                 ↓
        $9.50 invested in DeFi → Earns $0.50 profit
                 ↓
        Platform: $0.05 (10%) | Operator: $0.45 (90%)
                 ↓
        Operator Total: $9.95 ($9.50 + $0.45)
```

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────────┐
│              GuildFi Vault - Full System                │
└─────────────────────────────────────────────────────────┘

👤 Member (End User)
  ├─ Pays $10/month (USDC)
  ├─ Receives Soulbound NFT (membership proof)
  └─ Discord role auto-granted

⛓️ Smart Contracts (BlockDAG Testnet)
  ├─ SubscriptionManager  - Payment processing
  ├─ FeeDistributor       - 5% platform + 10% success fee
  ├─ OperatorVault        - Operator's fund management
  ├─ AutomatorContract    - DeFi automation (DEX/Lending/Staking)
  ├─ MembershipNFT        - Soulbound membership tokens
  └─ SimplePaymaster      - Gas sponsorship (ERC-4337)

🤖 Discord Bot
  ├─ Monitors NFT ownership (30-second intervals)
  ├─ Auto-grants "Member" role when NFT minted
  └─ Auto-revokes role when NFT burned

🌐 Frontend (Operator Dashboard)
  ├─ Real-time vault balance
  ├─ Member management
  ├─ DeFi strategy configuration
  └─ Discord integration setup
```

## 🚀 Key Features

### 1. Automated Subscription Management
- Monthly USDC payments
- Automatic NFT minting on payment
- Automatic NFT burning on cancellation/failure
- Discord role sync every 30 seconds

### 2. Account Abstraction (ERC-4337)
- Paymaster covers all gas fees
- Users only need USDC (no BDAG required)
- Web2-like UX for crypto-novice users

### 3. DeFi Auto-Investing
- **DEX (30%)** - Swap USDC for BDAG
- **Lending (50%)** - Earn interest on USDC
- **Staking (20%)** - Stake BDAG for rewards
- Platform earns 10% of generated profits

### 4. Discord Integration
- Bot monitors blockchain 24/7
- Role management fully automated
- No manual intervention needed

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn
- Hardhat
- Discord Bot Token

### Setup

1. Clone the repository
```bash
git clone https://github.com/you1208/AA-Discord-Subscription-Automator.git
cd AA-Discord-Subscription-Automator
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables

Create `.env` file:
```env
# Blockchain
PRIVATE_KEY=your_private_key_without_0x
BLOCKDAG_RPC_URL=http://13.245.135.249:18545

# Deployed Contracts (BlockDAG Testnet)
USDC_ADDRESS=0x6895435c85d42878445eCA0Ad4C026e7fEF797e4
GUILDFIVAULT_FEE_DISTRIBUTOR=0xbc9ebd5a5c6e2b37dE2ddfcf27a98672e369b5fb
GUILDFIVAULT_OPERATOR_VAULT=0xB6f67BF9FeB7519177E872578B4796283E47C08D
GUILDFIVAULT_AUTOMATOR=0x9F2fBdB55EB42658d05E448EbFC4a8791351B9F9
GUILDFIVAULT_NFT=0xD536bb6427B1C6763D6fFB95B172CCa009f6EDA4
GUILDFIVAULT_MANAGER=0x01273126f62B3B71Bb0Df009b94bBD2A3468bC46

# Discord Bot
DISCORD_BOT_TOKEN=your_bot_token_here
DISCORD_GUILD_ID=your_server_id_here
DISCORD_MEMBER_ROLE_ID=your_role_id_here

# Test User Mapping
TEST_DISCORD_USER_ID=your_discord_user_id
TEST_WALLET_ADDRESS=your_wallet_address
```

4. Compile contracts
```bash
npx hardhat compile
```

5. Deploy (if needed)
```bash
npx hardhat run scripts/deploy-guildfivault-step2.ts --network blockdag_testnet
```

6. Run Discord Bot
```bash
npm run bot
```

## 🧪 Testing

### Test Full Subscription Flow
```bash
npx hardhat run scripts/test-guildfivault.ts --network blockdag_testnet
```

### Test Subscription Start
```bash
npx hardhat run scripts/start-subscription.ts --network blockdag_testnet
```

### Test Subscription Cancel
```bash
npx hardhat run scripts/cancel-guildfivault-subscription.ts --network blockdag_testnet
```

## 📋 Deployed Contracts (BlockDAG Testnet)

| Contract | Address | Purpose |
|----------|---------|---------|
| MockUSDC | `0x6895...f797e4` | Test payment token |
| FeeDistributor | `0xbc9e...9b5fb` | 5% + 10% fee management |
| OperatorVault | `0xB6f6...C08D` | Operator fund storage |
| AutomatorContract | `0x9F2f...1B9F9` | DeFi automation |
| MembershipNFT | `0xD536...EDA4` | Soulbound membership tokens |
| SubscriptionManager | `0x0127...bC46` | Payment processing |

## 🎯 Use Cases

1. **Discord Communities & DAOs**
   - Premium membership tiers
   - Automated access control

2. **Online Learning Platforms**
   - Course subscriptions
   - Automatic enrollment/expiration

3. **Content Creators**
   - Fan clubs
   - Exclusive content access

4. **Gaming Communities**
   - Clan memberships
   - Tournament eligibility

## 🔗 Related Repositories

- [guildfivault-dashboard](https://github.com/you1208/guildfivault-dashboard) - Operator Frontend (Next.js)

## 🛠️ Tech Stack

### Smart Contracts
- Solidity 0.8.28
- Hardhat
- OpenZeppelin Contracts
- ERC-4337 (Account Abstraction)
- ERC-721 (NFT)
- ERC-20 (USDC)

### Discord Bot
- Node.js + TypeScript
- discord.js v14
- ethers.js v6
- 30-second polling

### Blockchain
- BlockDAG Testnet
- EVM Compatible

## 📊 Project Structure
```
discord-subscription-dapp/
├── contracts/
│   ├── FeeDistributor.sol          # 5% + 10% fee logic
│   ├── OperatorVault.sol           # Operator fund management
│   ├── AutomatorContract.sol       # DeFi automation
│   ├── SubscriptionManager.sol     # Payment processing
│   ├── MembershipNFT.sol          # Soulbound NFTs
│   ├── SimplePaymaster.sol        # Gas sponsorship
│   └── MockUSDC.sol               # Test token
├── scripts/
│   ├── deploy-guildfivault-step*.ts
│   ├── test-guildfivault.ts
│   ├── start-subscription.ts
│   └── cancel-guildfivault-subscription.ts
├── bot/
│   ├── index.ts                   # Bot entry point
│   └── blockchain-monitor.ts      # NFT monitoring
└── test/
```

## 💡 How It Works

### For Members:

1. Member approves USDC spending
2. Calls `startSubscription()`
3. $10 USDC deducted → $0.50 platform fee, $9.50 to operator vault
4. Soulbound NFT minted
5. Discord Bot detects NFT → Grants "Member" role
6. After 30 days, monthly payment processed
7. If payment fails → NFT burned → Role revoked

### For Operators:

1. Deploy dashboard (or use hosted version)
2. Configure Discord server + role
3. Set subscription price
4. Funds automatically deposited to vault
5. Optional: Enable DeFi auto-investing
6. Withdraw anytime from available balance

## 🔒 Security

- ✅ Soulbound NFTs (non-transferable)
- ✅ Account Abstraction (gasless)
- ✅ Automated role management
- ✅ On-chain fee transparency
- ✅ Tested on BlockDAG Testnet

## 🎉 Built for BlockDAG Buildathon 2025

**Category:** DeFi Speedway

**Features:**
- ✅ Account Abstraction (Paymaster)
- ✅ Advanced Financial Protocol (Subscription + DeFi)
- ✅ Streaming Payments (Monthly auto-deduction)

## 📄 License

MIT License

## 👨‍💻 Author

Built by [you1208](https://github.com/you1208)

---

**Built with ❤️ on BlockDAG**