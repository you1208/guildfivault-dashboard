"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Check, Wallet } from "lucide-react";
import Link from "next/link";
import { ethers } from "ethers";
import { TIERED_MANAGER_ADDRESS, TIERED_SUBSCRIPTION_MANAGER_ABI, USDC_ABI, CONTRACTS } from "@/lib/contracts";
import { useWallet } from "@/lib/useWallet";

interface Tier {
  id: number;
  name: string;
  price: string;
  priceRaw: bigint;
  features: string[];
  icon: string;
}

export default function PlansPage() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [currentTier, setCurrentTier] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  const { address, isConnected, signer, connect } = useWallet();

  useEffect(() => {
    loadTiers();
  }, [address]);

  const loadTiers = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_BLOCKDAG_RPC_URL
      );

      const manager = new ethers.Contract(
        TIERED_MANAGER_ADDRESS,
        TIERED_SUBSCRIPTION_MANAGER_ABI,
        provider
      );

      // 全プランを取得
      const allTiers = await manager.getAllTiers();

      // 現在のサブスクを取得（接続されている場合）
      if (address) {
        try {
          const userSub = await manager.getUserSubscription(address);
          setCurrentTier(Number(userSub.tierId));
        } catch (error) {
          console.log("サブスクなし");
          setCurrentTier(0);
        }
      }

      // プランデータを整形
      const tiersData: Tier[] = allTiers.map((tier: any, index: number) => {
        const tierName = tier.name;
        return {
          id: index + 1,
          name: tierName,
          price: ethers.formatUnits(tier.price, 6),
          priceRaw: tier.price,
          icon: tierName === "Bronze" ? "🥉" : tierName === "Silver" ? "🥈" : "🥇",
          features:
            tierName === "Bronze"
              ? ["基本的なコミュニティアクセス", "月次ニュースレター", "Discord Bronzeロール"]
              : tierName === "Silver"
              ? ["全てのBronze特典", "限定チャンネルアクセス", "週次Q&A参加", "Discord Silverロール"]
              : ["全てのSilver特典", "個別相談会（月1回）", "優先サポート", "Discord Goldロール"],
        };
      });

      setTiers(tiersData);
      setIsLoading(false);
    } catch (error) {
      console.error("プラン取得エラー:", error);
      setIsLoading(false);
    }
  };

  const handleConnect = async () => {
    try {
      await connect();
    } catch (error) {
      console.error("接続エラー:", error);
    }
  };

  const handleSubscribe = async (tierId: number) => {
    if (!isConnected || !signer) {
      alert("先にウォレットを接続してください");
      return;
    }

    setIsProcessing(true);
    try {
      const tier = tiers.find((t) => t.id === tierId);
      if (!tier) throw new Error("プランが見つかりません");

      // USDC承認
      const usdc = new ethers.Contract(CONTRACTS.USDC, USDC_ABI, signer);
      const approveTx = await usdc.approve(TIERED_MANAGER_ADDRESS, tier.priceRaw);
      
      alert("USDC承認中...");
      await approveTx.wait();

      // サブスク開始
      const manager = new ethers.Contract(
        TIERED_MANAGER_ADDRESS,
        TIERED_SUBSCRIPTION_MANAGER_ABI,
        signer
      );

      const startTx = await manager.startSubscription(tierId);
      alert("サブスク開始中...");
      await startTx.wait();

      alert("✅ サブスク開始完了！");
      
      // データを再読み込み
      await loadTiers();
    } catch (error: any) {
      console.error("エラー:", error);
      alert(`エラー: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpgrade = async (tierId: number) => {
  if (!isConnected || !signer) {
    alert("先にウォレットを接続してください");
    return;
  }

  setIsProcessing(true);
  try {
    const newTier = tiers.find((t) => t.id === tierId);
    const oldTier = tiers.find((t) => t.id === currentTier);
    
    if (!newTier || !oldTier) throw new Error("プランが見つかりません");

    // BigInt型で計算
    const priceDiff = BigInt(newTier.priceRaw.toString()) - BigInt(oldTier.priceRaw.toString());

    // 差額チェック
    if (priceDiff <= BigInt(0)) {
      throw new Error("アップグレードには高いプランを選択してください");
    }

    // USDC承認（差額のみ）
    const usdc = new ethers.Contract(CONTRACTS.USDC, USDC_ABI, signer);
    const approveTx = await usdc.approve(TIERED_MANAGER_ADDRESS, priceDiff);
    
    alert(`差額 $${ethers.formatUnits(priceDiff, 6)} を承認中...`);
    await approveTx.wait();

    // アップグレード
    const manager = new ethers.Contract(
      TIERED_MANAGER_ADDRESS,
      TIERED_SUBSCRIPTION_MANAGER_ABI,
      signer
    );

    const upgradeTx = await manager.upgradeTier(tierId);
    alert("アップグレード中...");
    await upgradeTx.wait();

    alert("✅ アップグレード完了！");
    
    await loadTiers();
  } catch (error: any) {
    console.error("エラー:", error);
    alert(`エラー: ${error.message}`);
  } finally {
    setIsProcessing(false);
  }
};

  const handleDowngrade = async (tierId: number) => {
    if (!isConnected || !signer) {
      alert("先にウォレットを接続してください");
      return;
    }

    const confirmed = confirm(
      "ダウングレードは次回決済日から適用されます。続行しますか？"
    );
    
    if (!confirmed) return;

    setIsProcessing(true);
    try {
      const manager = new ethers.Contract(
        TIERED_MANAGER_ADDRESS,
        TIERED_SUBSCRIPTION_MANAGER_ABI,
        signer
      );

      const downgradeTx = await manager.downgradeTier(tierId);
      alert("ダウングレード中...");
      await downgradeTx.wait();

      alert("✅ ダウングレード完了！次回決済から新料金が適用されます。");
      
      await loadTiers();
    } catch (error: any) {
      console.error("エラー:", error);
      alert(`エラー: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-lg">読み込み中...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* ヘッダー */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ホームへ戻る
            </Button>
          </Link>
          <h1 className="text-2xl font-bold">プラン選択</h1>
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="text-sm text-slate-600">
                {address?.slice(0, 6)}...{address?.slice(-4)}
              </div>
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            </div>
          ) : (
            <Button onClick={handleConnect}>
              <Wallet className="h-4 w-4 mr-2" />
              ウォレット接続
            </Button>
          )}
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">あなたに最適なプランを選択</h2>
          <p className="text-lg text-slate-600">
            すべてのプランで5%のプラットフォーム手数料が適用されます
          </p>
        </div>

        {/* プランカード */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => {
            const isCurrent = tier.id === currentTier;
            const isUpgrade = tier.id > currentTier;
            const isDowngrade = tier.id < currentTier && currentTier > 0;

            return (
              <Card
                key={tier.id}
                className={`relative ${
                  isCurrent
                    ? "border-blue-500 border-2 shadow-lg"
                    : tier.name === "Silver"
                    ? "border-blue-300 shadow-md"
                    : ""
                }`}
              >
                {isCurrent && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                      現在のプラン
                    </span>
                  </div>
                )}

                {tier.name === "Silver" && !isCurrent && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
                      人気
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="text-6xl mb-4">{tier.icon}</div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-5xl font-bold">${tier.price}</span>
                    <span className="text-slate-600">/月</span>
                  </div>
                  <CardDescription className="mt-2">
                    運営者受取: ${(parseFloat(tier.price) * 0.95).toFixed(2)}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {tier.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {isCurrent ? (
                    <Button className="w-full" variant="outline" disabled>
                      現在のプラン
                    </Button>
                  ) : !isConnected ? (
                    <Button className="w-full" onClick={handleConnect}>
                      <Wallet className="h-4 w-4 mr-2" />
                      ウォレット接続
                    </Button>
                  ) : currentTier === 0 ? (
                    <Button
                      className="w-full"
                      onClick={() => handleSubscribe(tier.id)}
                      disabled={isProcessing}
                    >
                      このプランで始める
                    </Button>
                  ) : isUpgrade ? (
                    <Button
                      className="w-full"
                      onClick={() => handleUpgrade(tier.id)}
                      disabled={isProcessing}
                    >
                      アップグレード
                    </Button>
                  ) : (
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={() => handleDowngrade(tier.id)}
                      disabled={isProcessing}
                    >
                      ダウングレード
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* 注意事項 */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 プラン変更について</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>
                • <strong>アップグレード：</strong> 差額をお支払いいただき、即座に新プランが適用されます
              </p>
              <p>
                • <strong>ダウングレード：</strong> 次回の決済日から新プランの料金が適用されます（返金なし）
              </p>
              <p>
                • <strong>キャンセル：</strong> いつでもキャンセル可能です（日割り返金なし）
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}