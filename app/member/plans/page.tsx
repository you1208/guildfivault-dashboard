"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface User {
  email: string;
  name: string;
  walletAddress: string;
  role: string;
}

interface Tier {
  id: number;
  name: string;
  price: string;
  icon: string;
  features: string[];
}

export default function MemberPlansPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const tiers: Tier[] = [
    {
      id: 1,
      name: "Bronze",
      price: "5",
      icon: "🥉",
      features: [
        "基本的なコミュニティアクセス",
        "月次ニュースレター",
        "Discord Bronzeロール",
        "質問フォーラム参加",
      ],
    },
    {
      id: 2,
      name: "Silver",
      price: "10",
      icon: "🥈",
      features: [
        "全てのBronze特典",
        "限定チャンネルアクセス",
        "週次Q&A参加",
        "Discord Silverロール",
        "優先サポート",
      ],
    },
    {
      id: 3,
      name: "Gold",
      price: "20",
      icon: "🥇",
      features: [
        "全てのSilver特典",
        "個別相談会（月1回）",
        "プレミアムコンテンツ",
        "Discord Goldロール",
        "最優先サポート",
      ],
    },
  ];

  useEffect(() => {
    // ログイン確認
    const userStr = localStorage.getItem("user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    } else {
      alert("ログインが必要です");
      router.push("/signup/member");
    }
  }, [router]);

  const handleSubscribe = async (tierId: number, tierName: string, price: string) => {
    if (!user) {
      alert("ログインしてください");
      return;
    }

    const confirmed = confirm(
      `${tierName} プラン ($${price}/月) に登録しますか？\n\n` +
      `💡 ガス代は不要です（Account Abstraction）`
    );

    if (!confirmed) return;

    setIsProcessing(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/subscription/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ tierId }),
      });

      const data = await response.json();

      if (data.success) {
        alert(
          `✅ サブスク登録完了！\n\n` +
          `プラン: ${tierName}\n` +
          `トランザクション: ${data.transactionHash}\n\n` +
          `30秒以内にDiscordでロールが付与されます。`
        );
        // 成功ページへリダイレクト（後で作成）
      } else {
        alert(`❌ エラー: ${data.error}`);
      }
    } catch (error: any) {
      console.error("サブスクエラー:", error);
      alert(`エラーが発生しました: ${error.message}`);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div>読み込み中...</div>
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
          <div className="text-sm text-slate-600">
            👤 {user.name}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        {/* デモモードバッジ */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full">
            <span className="text-2xl">🎬</span>
            <span className="font-medium text-amber-900">デモモード - ガスレス決済</span>
          </div>
        </div>

        {/* ユーザー情報 */}
        <div className="max-w-2xl mx-auto mb-8">
          <Card>
            <CardContent className="py-4">
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-600">メールアドレス:</span>
                  <span className="font-medium">{user.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">ウォレット:</span>
                  <span className="font-mono text-xs">
                    {user.walletAddress.slice(0, 6)}...{user.walletAddress.slice(-4)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">プランを選択</h2>
          <p className="text-lg text-slate-600">
            すべてのプランでガス代は不要です
          </p>
        </div>

        {/* プランカード */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier) => (
            <Card
              key={tier.id}
              className={`relative ${
                tier.name === "Silver"
                  ? "border-blue-300 shadow-md border-2"
                  : ""
              }`}
            >
              {tier.name === "Silver" && (
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

                <Button
                  className="w-full"
                  onClick={() => handleSubscribe(tier.id, tier.name, tier.price)}
                  disabled={isProcessing}
                  variant={tier.name === "Silver" ? "default" : "outline"}
                >
                  {isProcessing ? "処理中..." : "このプランで始める"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* 注意事項 */}
        <div className="mt-12 max-w-2xl mx-auto">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">💡 ご利用について</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-slate-600">
              <p>
                • <strong>ガス代不要:</strong> Account Abstractionにより、すべての取引でガス代は不要です
              </p>
              <p>
                • <strong>自動ロール付与:</strong> 決済完了後、30秒以内にDiscordでロールが付与されます
              </p>
              <p>
                • <strong>プラン変更:</strong> いつでもアップグレード・ダウングレード可能です
              </p>
              <p>
                • <strong>キャンセル:</strong> いつでもキャンセル可能です（日割り返金なし）
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
