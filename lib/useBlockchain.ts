"use client";

import { useState, useEffect } from "react";
import { ethers } from "ethers";

interface VaultInfo {
  totalTVL: string;
  activeSubscriptions: number;
  totalMembers: number;
  averageAPY: string;
}

interface Tier {
  id: number;
  name: string;
  price: string;
  duration: number;
  benefits: string[];
  subscriberCount: number;
}

export function useBlockchain() {
  const [vaultInfo, setVaultInfo] = useState<VaultInfo | null>(null);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // モックデータを使用
    const loadMockData = () => {
      try {
        // モックのVault情報
        const mockVaultInfo: VaultInfo = {
          totalTVL: "125000",
          activeSubscriptions: 342,
          totalMembers: 1250,
          averageAPY: "8.5",
        };

        // モックのティア情報
        const mockTiers: Tier[] = [
          {
            id: 1,
            name: "Bronze",
            price: "10",
            duration: 30,
            benefits: ["基本アクセス", "月次レポート", "コミュニティフォーラム"],
            subscriberCount: 150,
          },
          {
            id: 2,
            name: "Silver",
            price: "25",
            duration: 30,
            benefits: [
              "Bronzeの全特典",
              "週次レポート",
              "優先サポート",
              "限定イベントアクセス",
            ],
            subscriberCount: 120,
          },
          {
            id: 3,
            name: "Gold",
            price: "50",
            duration: 30,
            benefits: [
              "Silverの全特典",
              "日次レポート",
              "1対1コンサルティング",
              "VIPイベントアクセス",
              "カスタムダッシュボード",
            ],
            subscriberCount: 72,
          },
        ];

        setVaultInfo(mockVaultInfo);
        setTiers(mockTiers);
        setLoading(false);
      } catch (err: any) {
        console.error("データ取得エラー:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    loadMockData();

    // 30秒ごとにデータを更新（実際はモックなので変わらない）
    const interval = setInterval(loadMockData, 30000);

    return () => clearInterval(interval);
  }, []);

  const createTier = async (
    name: string,
    price: string,
    duration: number,
    benefits: string[]
  ) => {
    try {
      console.log("Creating tier:", { name, price, duration, benefits });
      
      // モック: 新しいティアを追加
      const newTier: Tier = {
        id: tiers.length + 1,
        name,
        price,
        duration,
        benefits,
        subscriberCount: 0,
      };

      setTiers([...tiers, newTier]);
      
      return {
        success: true,
        message: "ティアが作成されました（モックモード）",
      };
    } catch (err: any) {
      console.error("Tier creation error:", err);
      return {
        success: false,
        message: err.message,
      };
    }
  };

  const subscribe = async (tierId: number) => {
    try {
      console.log("Subscribing to tier:", tierId);
      
      // モック: サブスクライバー数を増やす
      setTiers(
        tiers.map((tier) =>
          tier.id === tierId
            ? { ...tier, subscriberCount: tier.subscriberCount + 1 }
            : tier
        )
      );

      return {
        success: true,
        message: "サブスクリプションが開始されました（モックモード）",
      };
    } catch (err: any) {
      console.error("Subscription error:", err);
      return {
        success: false,
        message: err.message,
      };
    }
  };

  return {
    vaultInfo,
    tiers,
    loading,
    error,
    createTier,
    subscribe,
  };
}