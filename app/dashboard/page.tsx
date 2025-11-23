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
import MembersList from "@/components/MembersList";  // 👈 追加

export default function Dashboard() {
  const [walletAddress, setWalletAddress] = useState("0x0B968098E8625d63320de5b163DE073574AD7ebF");
  const [isConnected, setIsConnected] = useState(true);

  const {
    vaultInfo,
    tiers,
    loading,
    error,
  } = useBlockchain();

  const handleConnect = () => {
    setIsConnected(true);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-2xl font-bold">Operator Dashboard</h1>
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
                  Logout
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
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Total Revenue
              </CardTitle>
              <DollarSign className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${loading ? "..." : (vaultInfo?.totalTVL || "0")} USDC
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Platform fee: $0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Vault Balance
              </CardTitle>
              <Wallet className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${loading ? "..." : (vaultInfo?.totalTVL || "0")} USDC
              </div>
              <p className="text-xs text-slate-600 mt-1">
                In DeFi: $0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                Active Members
              </CardTitle>
              <Users className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : (vaultInfo?.totalMembers || "0")}
              </div>
              <p className="text-xs text-slate-600 mt-1">
                New this month: 0
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-600">
                DeFi Yield
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-slate-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {loading ? "..." : (vaultInfo?.averageAPY || "0")}% APY
              </div>
              <p className="text-xs text-slate-600 mt-1">
                Not deployed
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="settings" className="space-y-4">
          <TabsList>
            <TabsTrigger value="settings">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </TabsTrigger>
            <TabsTrigger value="members">
              <Users className="h-4 w-4 mr-2" />
              Members
            </TabsTrigger>
            <TabsTrigger value="vault">
              <Wallet className="h-4 w-4 mr-2" />
              Vault
            </TabsTrigger>
          </TabsList>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            {/* Invite URL Manager */}
            <InviteUrlManager />

            {/* Tier Management */}
            <TierManagement />

            {/* Basic Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Settings</CardTitle>
                <CardDescription>
                  Discord integration and DeFi deployment settings
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
                        Connected to BlockDAG Testnet
                      </div>
                      <div className="text-sm text-blue-700">
                        Current data is retrieved in real-time from the blockchain
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="discord-server">Discord Server ID</Label>
                  <Input
                    id="discord-server"
                    placeholder="1234567890123456789"
                    defaultValue="1436272669686235189"
                  />
                </div>

                <Button className="w-full" variant="outline">
                  Save Settings
                </Button>
              </CardContent>
            </Card>

            {/* DeFi Settings */}
            <Card>
              <CardHeader>
                <CardTitle>DeFi Deployment Settings</CardTitle>
                <CardDescription>
                  Auto-deploy vault funds settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Deployment Strategy</Label>
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
                    ⚠️ DeFi integration is under development. Awaiting BlockDAG official DEX/Lending/Staking protocol releases.
                  </div>
                </div>

                <Button className="w-full" variant="outline" disabled>
                  Start DeFi Deployment (In Progress)
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Members Tab */}
          <TabsContent value="members">
            <Card>
              <CardHeader>
                <CardTitle>Active Members</CardTitle>
                <CardDescription>
                  Currently subscribed members
                </CardDescription>
              </CardHeader>
              <CardContent>
                <MembersList />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vault Tab */}
          <TabsContent value="vault">
            <Card>
              <CardHeader>
                <CardTitle>Vault Balance</CardTitle>
                <CardDescription>
                  Operator fund status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-slate-600 mb-1">Available Balance</div>
                    <div className="text-2xl font-bold">
                      ${loading ? "..." : (vaultInfo?.totalTVL || "0")}
                    </div>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-sm text-slate-600 mb-1">In DeFi</div>
                    <div className="text-2xl font-bold">
                      $0
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="withdraw-amount">Withdraw Amount (USDC)</Label>
                  <Input
                    id="withdraw-amount"
                    type="number"
                    placeholder="0.00"
                  />
                </div>

                <Button className="w-full" variant="outline">
                  Withdraw
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}