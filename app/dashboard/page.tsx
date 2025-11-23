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

            {/* 既存: 基本設定 */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Settings</CardTitle>
                <CardDescription>
                  Discord integration and DeFi deployment settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Discord Bot招待URL */}
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="space-y-3">
                    <div className="font-medium text-blue-900 mb-1 flex items-center gap-2">
                      <span>🤖</span>
                      Step 1: Add Discord Bot to Your Server
                    </div>
                    <div className="text-sm text-blue-700 mb-3">
                      Click the button below to invite the GuildFi Vault Bot to your Discord server. 
                      This bot will automatically manage member roles based on their subscriptions.
                    </div>
                    
                      href={`https://discord.com/api/oauth2/authorize?client_id=${process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID || 'YOUR_CLIENT_ID'}&permissions=268435456&scope=bot`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button className="w-full bg-[#5865F2] hover:bg-[#4752C4]">
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 71 55" fill="none">
                          <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" fill="currentColor"/>
                        </svg>
                        Add Bot to Discord Server
                      </Button>
                    </a>
                    <div className="text-xs text-blue-600 mt-2">
                      ⚠️ Important: After adding the bot, make sure the "GuildFi Vault" role is positioned above your tier roles (Silver, Gold, Platinum) in Server Settings → Roles.
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      ℹ
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-green-900 mb-1">
                        Step 2: Enter Your Discord Server ID
                      </div>
                      <div className="text-sm text-green-700 mb-3">
                        Find your Server ID: Server Settings → Widget → Copy Server ID
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

                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="h-5 w-5 bg-amber-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5">
                      ℹ
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-amber-900 mb-1">
                        Connected to BlockDAG Testnet
                      </div>
                      <div className="text-sm text-amber-700">
                        Current data is retrieved in real-time from the blockchain
                      </div>
                    </div>
                  </div>
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