"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users } from "lucide-react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";

export default function MemberSignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          credential: credentialResponse.credential,
          role: "member",
        }),
      });

      const data = await response.json();

      if (data.success) {
        // トークンを保存
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        alert(
          `✅ 登録完了！\n\n` +
          `ウォレットアドレス:\n${data.user.walletAddress}\n\n` +
          `ガス代不要で利用できます。\n` +
          `プランを選択してください。`
        );

        // プラン選択ページへリダイレクト
        router.push("/member/plans");
      } else {
        alert("登録エラー: " + data.error);
      }
    } catch (error) {
      console.error("認証エラー:", error);
      alert("認証に失敗しました");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    alert("Google認証がキャンセルされました");
  };

  return (
    <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}>
      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
        {/* ヘッダー */}
        <header className="border-b bg-white">
          <div className="container mx-auto px-4 py-4">
            <Link href="/signup">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                戻る
              </Button>
            </Link>
          </div>
        </header>

        {/* メインコンテンツ */}
        <div className="container mx-auto px-4 py-20">
          <div className="max-w-md mx-auto">
            {/* デモモードバッジ */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 border border-amber-300 rounded-full">
                <span className="text-2xl">🎬</span>
                <span className="font-medium text-amber-900">デモモード</span>
              </div>
            </div>

            <Card>
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl">会員として登録</CardTitle>
                <CardDescription className="text-base mt-2">
                  Googleアカウントで簡単登録
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Google認証ボタン */}
                <div className="flex justify-center">
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={handleGoogleError}
                    useOneTap
                    text="signup_with"
                    locale="ja"
                  />
                </div>

                {isLoading && (
                  <div className="text-center text-sm text-slate-600">
                    ウォレットを生成中...
                  </div>
                )}

                {/* 説明 */}
                <div className="space-y-3 pt-4 border-t">
                  <h3 className="font-medium text-sm">✨ 登録すると...</h3>
                  <ul className="space-y-2 text-sm text-slate-600">
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>ウォレットが自動生成されます</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>ガス代完全無料（Account Abstraction）</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>好きなプランを選択できます</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-green-500 mt-0.5">✓</span>
                      <span>Discordで自動ロール付与</span>
                    </li>
                  </ul>
                </div>

                {/* 料金プラン紹介 */}
                <div className="space-y-2">
                  <h3 className="font-medium text-sm">💰 料金プラン</h3>
                  <div className="grid grid-cols-3 gap-2 text-center text-sm">
                    <div className="p-3 border rounded">
                      <div className="font-medium">🥉 Bronze</div>
                      <div className="text-slate-600">$5/月</div>
                    </div>
                    <div className="p-3 border rounded border-blue-300 bg-blue-50">
                      <div className="font-medium">🥈 Silver</div>
                      <div className="text-slate-600">$10/月</div>
                    </div>
                    <div className="p-3 border rounded">
                      <div className="font-medium">🥇 Gold</div>
                      <div className="text-slate-600">$20/月</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}