"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Users, ArrowLeft } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* ヘッダー */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              ホームへ戻る
            </Button>
          </Link>
        </div>
      </header>

      {/* メインコンテンツ */}
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">GuildFi Vaultへようこそ</h1>
          <p className="text-xl text-slate-600">
            あなたはどちらのユーザーですか？
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
          {/* 運営者 */}
          <Link href="/signup/operator">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-500">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-10 w-10 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">サロン運営者</CardTitle>
                <CardDescription className="text-base mt-2">
                  コミュニティを収益化したい方
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>複数の料金プランを設定</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Discord自動管理</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>DeFi運用で追加収益</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>暗号資産の知識不要</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" size="lg">
                  運営者として登録
                </Button>
              </CardContent>
            </Card>
          </Link>

          {/* 会員 */}
          <Link href="/signup/member">
            <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-500">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl">サロン会員</CardTitle>
                <CardDescription className="text-base mt-2">
                  コミュニティに参加したい方
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>好きなプランを選択</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>ガス代不要（完全無料）</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>Discordで自動ロール付与</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>いつでもアップグレード可能</span>
                  </li>
                </ul>
                <Button className="w-full mt-6" size="lg" variant="outline">
                  会員として登録
                </Button>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* デモモードバッジ */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full">
            <span className="text-2xl">🎬</span>
            <span className="font-medium text-amber-900">デモモード</span>
          </div>
          <p className="text-sm text-slate-600 mt-2">
            Google認証でウォレットが自動生成されます
          </p>
        </div>
      </div>
    </div>
  );
}