# GuildFi Vault Dashboard

Operator dashboard for GuildFi Vault - A B2B SaaS dApp that automates Discord membership management with subscription payments and DeFi yield generation.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind](https://img.shields.io/badge/Tailwind-CSS-38bdf8)
![ethers.js](https://img.shields.io/badge/ethers.js-6-blue)

## 🎯 Overview

This dashboard allows Discord community operators to:

- 💰 **Manage Subscriptions** - Set monthly pricing and view revenue
- 👥 **Track Members** - Monitor active subscribers in real-time
- 💵 **View Vault Balance** - Check available funds and DeFi positions
- 📊 **Real-time Data** - Live blockchain data updated every 30 seconds
- 🔧 **Discord Integration** - Configure server and role settings

## 🚀 Features

### For Community Operators

- ✅ **Real-time Dashboard** - Live data from BlockDAG blockchain
- ✅ **Subscription Management** - Set monthly fees, view active members
- ✅ **Vault Management** - Monitor balance, withdraw funds
- ✅ **Discord Integration** - Auto-configure server and role IDs
- ✅ **DeFi Strategy** - View allocation (DEX 30%, Lending 50%, Staking 20%)
- ✅ **Revenue Tracking** - Total revenue minus platform fees (5%)

### Technical Features

- ⚡ **Next.js 15** - Latest App Router
- 🎨 **shadcn/ui** - Beautiful UI components
- 🔗 **ethers.js v6** - Blockchain integration
- 📊 **Real-time Updates** - Data refreshes every 30 seconds
- 🎯 **TypeScript** - Type-safe development

## 📦 Installation

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository
```bash
git clone https://github.com/you1208/guildfivault-dashboard.git
cd guildfivault-dashboard
```

2. Install dependencies
```bash
npm install
```

3. Configure environment variables
```bash
cp .env.example .env.local
```

Edit `.env.local` with your deployed contract addresses:
```env
# BlockDAG Testnet
NEXT_PUBLIC_BLOCKDAG_RPC_URL=http://13.245.135.249:18545
NEXT_PUBLIC_CHAIN_ID=7923

# GuildFi Vault Contracts (use your deployed addresses)
NEXT_PUBLIC_USDC_ADDRESS=0x...
NEXT_PUBLIC_FEE_DISTRIBUTOR_ADDRESS=0x...
NEXT_PUBLIC_OPERATOR_VAULT_ADDRESS=0x...
NEXT_PUBLIC_AUTOMATOR_ADDRESS=0x...
NEXT_PUBLIC_NFT_ADDRESS=0x...
NEXT_PUBLIC_MANAGER_ADDRESS=0x...
```

4. Run development server
```bash
npm run dev
```

Open http://localhost:3000

## 🏗️ Architecture
```
┌─────────────────────────────────────────────────────┐
│           GuildFi Vault Dashboard                   │
└─────────────────────────────────────────────────────┘

📱 Frontend (Next.js)
  ├─ Landing Page       - Marketing & features
  ├─ Dashboard          - Operator management
  └─ Real-time Updates  - 30-second polling

⛓️ Blockchain Integration (ethers.js)
  ├─ OperatorVault      - Balance & withdrawals
  ├─ SubscriptionManager - Pricing & members
  ├─ MembershipNFT      - Active member count
  └─ FeeDistributor     - Platform fees

🎨 UI Components (shadcn/ui)
  ├─ Cards              - Statistics display
  ├─ Tabs               - Settings, Members, Vault
  └─ Forms              - Configuration inputs
```

## 📊 Dashboard Pages

### Landing Page (`/`)

- Hero section with value proposition
- Feature showcase (4 main features)
- Pricing breakdown (5% platform fee + 10% success fee)
- Call-to-action

### Operator Dashboard (`/dashboard`)

**Statistics Cards:**
- Total Revenue (minus platform fees)
- Vault Balance (available + in DeFi)
- Active Members
- DeFi APY

**Tabs:**
1. **Settings** - Subscription price, Discord config, DeFi strategy
2. **Members** - Active subscriber list with status
3. **Vault** - Balance breakdown, withdrawal interface

## 🔗 Related Repositories

- [AA-Discord-Subscription-Automator](https://github.com/you1208/AA-Discord-Subscription-Automator) - Smart contracts & Discord Bot

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Blockchain:** ethers.js v6
- **Network:** BlockDAG Testnet

## 📝 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_BLOCKDAG_RPC_URL` | BlockDAG RPC endpoint |
| `NEXT_PUBLIC_CHAIN_ID` | Chain ID (7923) |
| `NEXT_PUBLIC_USDC_ADDRESS` | MockUSDC contract |
| `NEXT_PUBLIC_FEE_DISTRIBUTOR_ADDRESS` | Fee distribution contract |
| `NEXT_PUBLIC_OPERATOR_VAULT_ADDRESS` | Operator vault contract |
| `NEXT_PUBLIC_AUTOMATOR_ADDRESS` | DeFi automation contract |
| `NEXT_PUBLIC_NFT_ADDRESS` | Membership NFT contract |
| `NEXT_PUBLIC_MANAGER_ADDRESS` | Subscription manager contract |

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

## 🔒 Security

- ✅ Environment variables never committed (`.env*` in `.gitignore`)
- ✅ Only public RPC endpoints exposed
- ✅ Contract addresses are public (safe to expose)
- ✅ No private keys in frontend

## 📄 License

MIT License

## 👨‍💻 Author

Built by [you1208](https://github.com/you1208)

## 🎉 Built for BlockDAG Buildathon 2025

This project is part of **GuildFi Vault** - a complete B2B SaaS solution for Discord community monetization with blockchain automation.

---

**Built with ❤️ on BlockDAG**