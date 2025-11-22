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
  RefreshCw,
  LogOut
} from "lucide-react";
import Link from "next/link";
import { useBlockchain } from "@/lib/useBlockchain";
import TierManagement from "@/components/TierManagement";
import InviteUrlManager from "@/components/InviteUrlManager";

export default function Dashboard() {
  // テスト用のウォレットアドレス（本番ではMetaMask等から取得）
  const [walletAddress, setWalletAddress] = useState("0x0B968098E8625d63320de5b163DE073574AD7ebF");
  const [isConnected, setIsConnected] = useState(true);

  // ブロックチェーンからデータ取得
  const {
    vaultInfo,
    tiers,
    loading,
    error,
  } = useBlockchain();

  const handleConnect = () => {
    // TODO: MetaMask連携
    setIsConnected(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
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
            {loading && (
              <RefreshCw className="h-4 w-4 animate-spin text-slate-400" />
            )}
          </div>
          <div className="flex items-center gap-4">
            {isConnected ? (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  ログアウト
                </Button>
                <div className="flex items-center gap-2">
                  <div className="text-sm text-slate-600">
                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                  </div>
                  <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                </div>
              </>
            ) : (
              <Button onClick={handleConnect}>
                <Wallet className="h-4 w-4 mr-2" />
                ウォレット接続
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* 統計カード */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                総収入
              </CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${loading ? "..." : (vaultInfo?.totalTVL || "0")} USDC
              </div>
              <p className="text-xs text-slate-600 mt-1">
                プラットフォーム手数料 $0
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
                ${loading ? "..." : (vaultInfo?.totalTVL || "0")} USDC
              </div>
              <p className="text-xs text-slate-600 mt-1">
                DeFi運用中: $0
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
                {loading ? "..." : (vaultInfo?.totalMembers || "0")}人
              </div>
              <p className="text-xs text-slate-600 mt-1">
                今月の新規 0人
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
              <div className="text-2xl font-bold">
                {loading ? "..." : (vaultInfo?.averageAPY || "0")}% APY
              </div>
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
            {/* 新規追加: 招待URL管理 */}
            <InviteUrlManager />

            {/* 新規追加: ティア管理 */}
            <TierManagement />

            {/* 既存: 基本設定 */}
            <Card>
              <CardHeader>
                <CardTitle>基本設定</CardTitle>
                <CardDescription>
                  Discord連携とDeFi運用の設定
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      ℹ
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
                  <Label htmlFor="discord-server">Discord サーバー ID</Label>
                  <Input
                    id="discord-server"
                    placeholder="1234567890123456789"
                    defaultValue="1436272669686235189"
                  />
                </div>

                <Button className="w-full" variant="outline">
                  設定を保存
                </Button>
              </CardContent>
            </Card>

            {/* DeFi運用設定 */}
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
                  {!vaultInfo || vaultInfo.totalMembers === 0 ? (
                    <div className="text-center py-8 text-slate-600">
                      まだアクティブな会員がいません
                    </div>
                  ) : (
                    <div className="text-center py-8 text-slate-600">
                      {vaultInfo.totalMembers}人の会員が登録中
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
                  運営者資金の状況
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-slate-600 mb-1">利用可能残高</div>
                    <div className="text-2xl font-bold">
                      ${loading ? "..." : (vaultInfo?.totalTVL || "0")}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-slate-600 mb-1">DeFi運用中</div>
                    <div className="text-2xl font-bold">
                      $0
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">出金額 (USDC)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.00"
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