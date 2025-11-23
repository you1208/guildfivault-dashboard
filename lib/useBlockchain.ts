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

const SUBSCRIPTION_NFT_ABI = [
  "function subscribe(string tierName, uint256 duration) external",
  "function isActive(address user) external view returns (bool)",
  "function userSubscription(address) external view returns (uint256)",
  "event Subscribed(address indexed user, uint256 tokenId, string tierName)"
];

export function useBlockchain() {
  const [vaultInfo, setVaultInfo] = useState<VaultInfo | null>(null);
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const initBlockchain = async () => {
      try {
        const rpcUrl = process.env.NEXT_PUBLIC_BLOCKDAG_RPC_URL || "https://rpc.awakening.bdagscan.com";
        const contractAddress = process.env.NEXT_PUBLIC_SUBSCRIPTION_NFT_ADDRESS;

        // Use mock tiers (since simple contract doesn't store them)
        const mockTiers: Tier[] = [
          {
            id: 1,
            name: "Silver",
            price: "10",
            duration: 30,
            benefits: [
              "Access to exclusive Discord channels",
              "Monthly reports",
              "Community forum access"
            ],
            subscriberCount: 0,
          },
          {
            id: 2,
            name: "Gold",
            price: "25",
            duration: 30,
            benefits: [
              "All Silver benefits",
              "Weekly reports",
              "Dedicated support",
              "Priority event access"
            ],
            subscriberCount: 0,
          },
          {
            id: 3,
            name: "Platinum",
            price: "50",
            duration: 30,
            benefits: [
              "All Gold benefits",
              "Daily reports",
              "1-on-1 consulting",
              "VIP event access",
              "Custom dashboard"
            ],
            subscriberCount: 0,
          },
        ];

        setTiers(mockTiers);

        if (contractAddress) {
          console.log('Initializing contract with address:', contractAddress);
          const provider = new ethers.JsonRpcProvider(rpcUrl);
          const nftContract = new ethers.Contract(contractAddress, SUBSCRIPTION_NFT_ABI, provider);
          setContract(nftContract);
          console.log('Contract initialized successfully');
        } else {
          console.error('NEXT_PUBLIC_SUBSCRIPTION_NFT_ADDRESS is not set');
        }

        const mockVaultInfo: VaultInfo = {
          totalTVL: "0",
          activeSubscriptions: 0,
          totalMembers: 0,
          averageAPY: "0",
        };

        setVaultInfo(mockVaultInfo);
        setLoading(false);
      } catch (err: any) {
        console.error("Blockchain initialization error:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    initBlockchain();
  }, []);

  const createTier = async (
    name: string,
    price: string,
    duration: number,
    benefits: string[]
  ) => {
    try {
      // Mock implementation - just add to local state
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
        message: "Tier created successfully!",
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
      console.log('Subscribe called with tierId:', tierId);
      console.log('Contract state:', contract);
      console.log('Contract address from env:', process.env.NEXT_PUBLIC_SUBSCRIPTION_NFT_ADDRESS);
      
      if (!contract) {
        throw new Error("Contract not initialized");
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const contractWithSigner = contract.connect(signer);

      const tier = tiers.find(t => t.id === tierId);
      if (!tier) {
        throw new Error("Tier not found");
      }

      // Call subscribe function with tierName and duration
      const durationInSeconds = tier.duration * 24 * 60 * 60;
      
      console.log(`Subscribing to ${tier.name} for ${tier.duration} days`);
      
      // Type assertion to call the function
      const tx = await (contractWithSigner as any).subscribe(tier.name, durationInSeconds);
      console.log("Transaction sent:", tx.hash);
      
      await tx.wait();
      console.log("Transaction confirmed!");

      return {
        success: true,
        message: "Subscription successful!",
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