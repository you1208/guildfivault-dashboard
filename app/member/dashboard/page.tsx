"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Crown, 
  Calendar, 
  CheckCircle, 
  Users, 
  LogOut,
  ExternalLink,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function MemberDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [daysRemaining, setDaysRemaining] = useState<number>(0);

  useEffect(() => {
    // ユーザー情報を取得
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/signup/member");
      return;
    }

    const userData = JSON.parse(userStr);
    
    // サブスクリプションがない場合
    if (!userData.subscription) {
      router.push("/plans");
      return;
    }

    setUser(userData);

    // 残り日数を計算
    const endDate = new Date(userData.subscription.endDate);
    const today = new Date();
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysRemaining(diffDays);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push("/");
  };

  if (!user) {
    return null;
  }

  const { subscription } = user;
  const progressPercentage = ((30 - daysRemaining) / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* ヘッダー */}
      <header className="border-b bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">会員ダッシュボード</h1>
            <p className="text-sm text-slate-600">
              {user.name || user.email}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            ログアウト
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* メインステータスカード */}
          <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <Crown className="h-6 w-6 text-blue-600" />
                    {subscription.tierName} プラン
                  </CardTitle>
                  <CardDescription className="text-base mt-1">
                    月額 ${subscription.price}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-blue-600">
                    {daysRemaining}
                  </div>
                  <div className="text-sm text-slate-600">日間残り</div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* プログレスバー */}
              <div>
                <div className="flex justify-between text-sm text-slate-600 mb-2">
                  <span>利用期間</span>
                  <span>{30 - daysRemaining} / 30 日経過</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-3">
                  <div
                    className="bg-blue-600 h-3 rounded-full transition-all"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* 日付情報 */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold">開始日</div>
                    <div className="text-xs text-slate-600">
                      {new Date(subscription.startDate).toLocaleDateString("ja-JP")}
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-orange-600 mt-0.5" />
                  <div>
                    <div className="text-sm font-semibold">終了日</div>
                    <div className="text-xs text-slate-600">
                      {new Date(subscription.endDate).toLocaleDateString("ja-JP")}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Discord連携情報 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Discord連携
              </CardTitle>
            </CardHeader>
            <CardContent>
              {user.discordUsername ? (
                <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {user.discordUsername.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="font-semibold">{user.discordUsername}</div>
                      <div className="text-sm text-slate-600 flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        連携済み・ロール付与済み
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://discord.com" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Discordを開く
                    </a>
                  </Button>
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    Discord連携が完了していません
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* 特典一覧 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5" />
                利用可能な特典
              </CardTitle>
              <CardDescription>
                {subscription.tierName}プランで利用できる特典
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {/* モック特典データ */}
                {[
                  "限定Discordチャンネルへのアクセス",
                  "月次レポートの閲覧",
                  "専用サポートチャネル",
                  "優先的なイベント参加権",
                  "限定コンテンツへのアクセス"
                ].map((benefit, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* ウォレット情報 */}
          <Card>
            <CardHeader>
              <CardTitle>ウォレット情報</CardTitle>
              <CardDescription>
                あなた専用のブロックチェーンウォレット
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-sm text-slate-600 mb-1">ウォレットアドレス</div>
                <div className="font-mono text-sm break-all">
                  {user.walletAddress}
                </div>
                <div className="mt-3 text-xs text-slate-500">
                  ℹ️ このウォレットは自動生成されました。秘密鍵の管理は不要です。
                </div>
              </div>
            </CardContent>
          </Card>

          {/* アクション */}
          <div className="grid md:grid-cols-2 gap-4">
            <Button variant="outline" className="w-full" asChild>
              <Link href="/plans">
                プランを変更
              </Link>
            </Button>
            <Button variant="outline" className="w-full text-red-600 border-red-300 hover:bg-red-50">
              サブスクリプションをキャンセル
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}