"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  CONTRACTS,
  OPERATOR_VAULT_ABI,
  SUBSCRIPTION_MANAGER_ABI,
  MEMBERSHIP_NFT_ABI,
  FEE_DISTRIBUTOR_ABI,
  USDC_ABI,
} from "./contracts";

export function useBlockchain(operatorAddress?: string) {
  const [data, setData] = useState({
    vaultBalance: "0",
    vaultInDeFi: "0",
    totalRevenue: "0",
    totalMembers: "0",
    subscriptionPrice: "0",
    platformFees: "0",
    isLoading: true,
  });

  useEffect(() => {
    if (!operatorAddress) return;

    const fetchData = async () => {
      try {
        const provider = new ethers.JsonRpcProvider(
          process.env.NEXT_PUBLIC_BLOCKDAG_RPC_URL
        );

        // OperatorVault
        const vault = new ethers.Contract(
          CONTRACTS.OPERATOR_VAULT,
          OPERATOR_VAULT_ABI,
          provider
        );

        // SubscriptionManager
        const manager = new ethers.Contract(
          CONTRACTS.MANAGER,
          SUBSCRIPTION_MANAGER_ABI,
          provider
        );

        // MembershipNFT
        const nft = new ethers.Contract(
          CONTRACTS.NFT,
          MEMBERSHIP_NFT_ABI,
          provider
        );

        // FeeDistributor
        const feeDistributor = new ethers.Contract(
          CONTRACTS.FEE_DISTRIBUTOR,
          FEE_DISTRIBUTOR_ABI,
          provider
        );

        // データ取得
        const [available, inDeFi, totalDeposited] = await vault.getVaultInfo(
          operatorAddress
        );
        const totalSupply = await nft.totalSupply();
        const subPrice = await manager.subscriptionPrice();
        const platformFees = await feeDistributor.totalPlatformFeesCollected();

        setData({
          vaultBalance: ethers.formatUnits(available, 6),
          vaultInDeFi: ethers.formatUnits(inDeFi, 6),
          totalRevenue: ethers.formatUnits(totalDeposited, 6),
          totalMembers: totalSupply.toString(),
          subscriptionPrice: ethers.formatUnits(subPrice, 6),
          platformFees: ethers.formatUnits(platformFees, 6),
          isLoading: false,
        });
      } catch (error) {
        console.error("データ取得エラー:", error);
        setData((prev) => ({ ...prev, isLoading: false }));
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // 30秒ごとに更新

    return () => clearInterval(interval);
  }, [operatorAddress]);

  return data;
}