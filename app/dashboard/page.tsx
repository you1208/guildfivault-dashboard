"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Wallet, 
  Users, 
  DollarSign, 
  Settings, 
  TrendingUp,
  ArrowLeft,
  RefreshCw
} from "lucide-react";
import Link from "next/link";
import { useBlockchain } from "@/lib/useBlockchain";

export default function Dashboard() {
  // テスト用のウォレットアドレス（本番ではMetaMask等から取得）
  const [walletAddress, setWalletAddress] = useState("0x0B968098E8625d63320de5b163DE073574AD7ebF");
  const [isConnected, setIsConnected] = useState(true);

  // ブロックチェーンからデータ取得
  const {
    vaultBalance,
    vaultInDeFi,
    totalRevenue,
    totalMembers,
    subscriptionPrice,
    platformFees,
    isLoading,
  } = useBlockchain(isConnected ? walletAddress : undefined);

  const handleConnect = () => {
    // TODO: MetaMask連携
    setIsConnected(true);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ヘッダー */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                ホームへ戻る
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">運営者ダッシュボード</h1>
            {isLoading && (
              <RefreshCw className="h-4 w-4 animate-spin text-slate-400" />
            )}
          </div>
          {isConnected ? (
            <div className="flex items-center gap-2">
              <div className="text-sm text-slate-600">
                {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
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

      <div className="container mx-auto px-4 py-8">
        {/* 統計カード */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                総売上
              </CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${isLoading ? "..." : totalRevenue} USDC
              </div>
              <p className="text-xs text-slate-600 mt-1">
                プラットフォーム手数料: ${isLoading ? "..." : platformFees}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                金庫残高
              </CardTitle>
              <Wallet className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${isLoading ? "..." : vaultBalance} USDC
              </div>
              <p className="text-xs text-slate-600 mt-1">
                DeFi運用中: ${isLoading ? "..." : vaultInDeFi}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                アクティブ会員
              </CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? "..." : totalMembers}人
              </div>
              <p className="text-xs text-slate-600 mt-1">
                今月の新規: {totalMembers}人
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                DeFi利回り
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">0% APY</div>
              <p className="text-xs text-slate-600 mt-1">
                運用なし
              </p>
            </CardContent>
          </Card>
        </div>

        {/* タブ */}
        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              設定
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="h-4 w-4 mr-2" />
              会員管理
            </TabsTrigger>
            <TabsTrigger value="vault">
              <Wallet className="h-4 w-4 mr-2" />
              金庫管理
            </TabsTrigger>
          </TabsList>

          {/* 設定タブ */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>サブスクリプション設定</CardTitle>
                <CardDescription>
                  月額料金とDiscord連携を設定します
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="price">月額料金 (USDC)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={subscriptionPrice}
                    disabled
                    placeholder="10"
                  />
                  <p className="text-sm text-slate-600">
                    プラットフォーム手数料5%を除いた${(parseFloat(subscriptionPrice || "0") * 0.95).toFixed(2)}が金庫に入金されます
                  </p>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      ✓
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-blue-900 mb-1">
                        BlockDAG Testnetに接続中
                      </div>
                      <div className="text-sm text-blue-700">
                        現在のデータはリアルタイムでブロックチェーンから取得しています
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discord-server">Discord サーバーID</Label>
                  <Input
                    id="discord-server"
                    placeholder="1234567890123456789"
                    defaultValue="1436272669686235189"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discord-role">会員ロールID</Label>
                  <Input
                    id="discord-role"
                    placeholder="9876543210987654321"
                    defaultValue="1436488924829716631"
                  />
                </div>

                <Button className="w-full" variant="outline">
                  設定を保存
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>DeFi運用設定</CardTitle>
                <CardDescription>
                  金庫の資金を自動運用する設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>運用戦略</Label>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-slate-600">DEX</div>
                      <div className="text-2xl font-bold">30%</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-slate-600">Lending</div>
                      <div className="text-2xl font-bold">50%</div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="text-sm text-slate-600">Staking</div>
                      <div className="text-2xl font-bold">20%</div>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="text-sm text-amber-800">
                    ⚠️ DeFi統合は開発中です。BlockDAG公式のDEX/Lending/Stakingプロトコルのリリース待ちです。
                  </div>
                </div>

                <Button className="w-full" variant="outline" disabled>
                  DeFi運用を開始（準備中）
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 会員管理タブ */}
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>アクティブ会員</CardTitle>
                <CardDescription>
                  現在サブスク中の会員一覧
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {totalMembers === "0" ? (
                    <div className="text-center py-8 text-slate-600">
                      まだアクティブな会員がいません
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <div className="font-medium">you8749</div>
                        <div className="text-sm text-slate-600">
                          次回決済: 2025/12/16
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          アクティブ
                        </span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          NFT保有
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 金庫管理タブ */}
          <TabsContent value="vault">
            <Card>
              <CardHeader>
                <CardTitle>金庫残高</CardTitle>
                <CardDescription>
                  運営者金庫の状態
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-slate-600 mb-1">利用可能残高</div>
                    <div className="text-2xl font-bold">
                      ${isLoading ? "..." : vaultBalance}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-slate-600 mb-1">DeFi運用中</div>
                    <div className="text-2xl font-bold">
                      ${isLoading ? "..." : vaultInDeFi}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">出金額 (USDC)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.00"
                    max={vaultBalance}
                  />
                </div>

                <Button className="w-full" variant="outline">
                  出金
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}