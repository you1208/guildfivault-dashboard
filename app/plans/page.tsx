"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Crown, Star, Zap } from "lucide-react";
import { useBlockchain } from "@/lib/useBlockchain";

export default function PlansPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [subscribing, setSubscribing] = useState<number | null>(null);
  const { tiers, loading, subscribe } = useBlockchain();

  useEffect(() => {
    // ユーザー情報を取得
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/signup/member");
      return;
    }
    setUser(JSON.parse(userStr));
  }, [router]);

  const handleSubscribe = async (tierId: number, tierName: string, price: string) => {
    if (!user) return;

    setSubscribing(tierId);

    try {
      // サブスクリプション処理（モック）
      const result = await subscribe(tierId);

      if (result.success) {
        // サブスクリプション情報を保存
        const subscription = {
          tierId,
          tierName,
          price,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          active: true,
        };

        const updatedUser = {
          ...user,
          subscription,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Discord ロール付与
        if (user.discordId) {
          try {
            const roleResponse = await fetch('/api/discord/assign-role', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                discordId: user.discordId,
                roleName: tierName,
              }),
            });

            const roleResult = await roleResponse.json();
            console.log('Discord role assignment:', roleResult);
          } catch (error) {
            console.error('Failed to assign Discord role:', error);
          }
        }

        localStorage.setItem("user", JSON.stringify(updatedUser));

        // 会員ダッシュボードへ
        router.push("/member/dashboard");
      } else {
        alert("サブスクリプション登録に失敗しました: " + result.message);
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      alert("エラーが発生しました: " + error.message);
    } finally {
      setSubscribing(null);
    }
  };

  const getTierIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Zap className="h-8 w-8 text-orange-600" />;
      case 1:
        return <Star className="h-8 w-8 text-blue-600" />;
      case 2:
        return <Crown className="h-8 w-8 text-purple-600" />;
      default:
        return <Star className="h-8 w-8 text-slate-600" />;
    }
  };

  const getTierColor = (index: number) => {
    switch (index) {
      case 0:
        return "border-orange-200 bg-orange-50";
      case 1:
        return "border-blue-200 bg-blue-50";
      case 2:
        return "border-purple-200 bg-purple-50";
      default:
        return "border-slate-200 bg-slate-50";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* ヘッダー */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">GuildFi Vault</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          {/* タイトル */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              プランを選択
            </h2>
            <p className="text-xl text-slate-600">
              あなたに最適なメンバーシップを見つけましょう
            </p>
            {user?.discordUsername && (
              <p className="text-sm text-slate-500 mt-2">
                Discord: <span className="font-mono font-semibold">{user.discordUsername}</span>
              </p>
            )}
          </div>

          {/* ティア一覧 */}
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <Card
                key={tier.id}
                className={`relative ${getTierColor(index)} border-2 transition-all hover:shadow-lg`}
              >
                {/* 人気バッジ */}
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      人気No.1
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    {getTierIcon(index)}
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">
                      ${tier.price}
                      <span className="text-lg font-normal text-slate-600">/月</span>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    {tier.duration}日間有効
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* 特典リスト */}
                  <div className="space-y-3">
                    {tier.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* 現在の会員数 */}
                  <div className="pt-4 border-t">
                    <div className="text-xs text-slate-600 text-center">
                      現在 <span className="font-bold">{tier.subscriberCount}人</span> が利用中
                    </div>
                  </div>

                  {/* サブスクリプションボタン */}
                  <Button
                    onClick={() => handleSubscribe(tier.id, tier.name, tier.price)}
                    disabled={subscribing !== null}
                    className="w-full"
                    size="lg"
                    variant={index === 1 ? "default" : "outline"}
                  >
                    {subscribing === tier.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        処理中...
                      </>
                    ) : (
                      "このプランを選択"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 注意事項 */}
          <div className="mt-12 p-6 bg-white rounded-lg border border-slate-200">
            <h3 className="font-semibold mb-3">💡 ご利用にあたって</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• すべてのプランで30日間のアクセス権が付与されます</li>
              <li>• 登録完了後、即座にDiscordロールが付与されます</li>
              <li>• ガス代は一切不要です（Paymaster機能でガス代を代理支払い）</li>
              <li>• いつでもキャンセル可能です</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
