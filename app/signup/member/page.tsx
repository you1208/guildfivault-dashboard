"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Sparkles, Shield, Zap } from "lucide-react";
import Link from "next/link";

export default function MemberSignupPage() {
  const handleGoogleSignup = () => {
    // バックエンドのGoogle OAuth エンドポイントにリダイレクト
    window.location.href = "/api/auth/google?role=member";
  };

  return (
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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-2">会員として登録</h1>
            <p className="text-slate-600">
              Googleアカウントで簡単に始められます
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>アカウント作成</CardTitle>
              <CardDescription>
                ウォレットは自動で生成されます
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Button
                onClick={handleGoogleSignup}
                className="w-full"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Googleで登録
              </Button>

              {/* Account Abstraction の特徴 */}
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Sparkles className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">ウォレット自動生成</div>
                    <div className="text-xs text-slate-600">
                      暗号資産やウォレットの知識は一切不要
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">ガス代完全無料</div>
                    <div className="text-xs text-slate-600">
                      すべての操作で一切費用はかかりません
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Zap className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">即座にアクセス</div>
                    <div className="text-xs text-slate-600">
                      登録完了後、すぐに限定コンテンツへ
                    </div>
                  </div>
                </div>
              </div>

              {/* Account Abstraction の説明 */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-sm text-slate-700">
                 <div className="font-semibold mb-2 flex items-center gap-2">
                    <span>💡</span>
                    AAウォレット + Paymaster技術
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Account Abstractionでウォレットを自動生成し、Paymasterがガス代を代理支払い。
                    複雑な暗号資産の管理を意識せず、Googleアカウントだけで安全にWeb3サービスを利用できます。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}