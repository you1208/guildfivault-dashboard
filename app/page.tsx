import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, Users, DollarSign, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* ヘッダー */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">GuildFi Vault</h1>
          </div>
          <div className="flex gap-4">
            <Link href="/plans">
              <Button variant="outline">プラン選択</Button>
            </Link>
            <Link href="/dashboard">
              <Button>ダッシュボード</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ヒーローセクション */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Discordコミュニティの<br />
          <span className="text-blue-600">収益化を自動化</span>
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          サブスクリプション決済からロール管理、DeFi運用まで。<br />
          Web3技術で実現する、次世代のコミュニティ運営プラットフォーム。
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/plans">
            <Button size="lg" className="text-lg px-8">
              無料で始める
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="text-lg px-8">
              詳しく見る
            </Button>
          </Link>
        </div>
      </section>

      {/* 特徴セクション */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">主な機能</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <DollarSign className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>自動決済</CardTitle>
              <CardDescription>
                月額サブスクの決済を完全自動化。未払い時は自動でロール剥奪。
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>ロール自動管理</CardTitle>
              <CardDescription>
                NFT保有状況に応じて、Discordロールを自動で付与・剥奪。
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Wallet className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>DeFi自動運用</CardTitle>
              <CardDescription>
                徴収した会費を自動でDeFi運用。追加の利回りを獲得。
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>ガスレス体験</CardTitle>
              <CardDescription>
                Account Abstraction採用。ユーザーはガス代不要。
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* 料金体系 */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">料金体系</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">プラットフォーム手数料</CardTitle>
              <CardDescription className="text-lg">
                会費からの手数料
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="text-4xl font-bold text-blue-600 mb-4">5%</div>
              <p className="text-slate-600">
                会員からの月額会費に対して5%のプラットフォーム手数料。<br />
                残り95%は運営者の金庫へ。
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">成功報酬</CardTitle>
              <CardDescription className="text-lg">
                DeFi運用利益からの手数料
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="text-4xl font-bold text-blue-600 mb-4">10%</div>
              <p className="text-slate-600">
                DeFi自動運用で発生した利益に対して10%の成功報酬。<br />
                残り90%は運営者へ。
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">
            今すぐコミュニティの収益化を始めよう
          </h3>
          <p className="text-xl mb-8 opacity-90">
            セットアップは5分。すぐに自動化された収益システムを構築できます。
          </p>
          <Link href="/plans">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              無料で始める
            </Button>
          </Link>
        </div>
      </section>

      {/* フッター */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>&copy; 2025 GuildFi Vault. Built on BlockDAG.</p>
        </div>
      </footer>
    </div>
  );
}