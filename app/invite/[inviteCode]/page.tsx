"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Users, Shield, Zap } from "lucide-react";

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();
  const inviteCode = params.inviteCode as string;

  const handleJoin = () => {
    // 招待コードをlocalStorageに保存
    localStorage.setItem("inviteCode", inviteCode);
    // 会員登録ページへ
    router.push("/signup/member");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              コミュニティへようこそ！
            </h1>
            <p className="text-xl text-slate-600">
              招待コード: <span className="font-mono font-bold">{inviteCode}</span>
            </p>
          </div>

          {/* メインカード */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">特典満載のメンバーシップ</CardTitle>
              <CardDescription className="text-base">
                今すぐ登録して、限定コンテンツにアクセスしよう
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 特典リスト */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">限定Discordロール</div>
                    <div className="text-sm text-slate-600">
                      登録と同時にDiscordで専用ロールが自動付与されます
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">ガス代不要</div>
                    <div className="text-sm text-slate-600">
                      暗号資産やウォレットの知識は一切不要です
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">即座にアクセス</div>
                    <div className="text-sm text-slate-600">
                      登録完了後、すぐに限定コンテンツにアクセス可能
                    </div>
                  </div>
                </div>
              </div>

              {/* CTAボタン */}
              <Button
                onClick={handleJoin}
                size="lg"
                className="w-full text-lg"
              >
                Googleで今すぐ登録
              </Button>

              {/* 注意事項 */}
              <div className="text-sm text-slate-600 text-center">
                登録には有効な招待コードが必要です
              </div>
            </CardContent>
          </Card>

          {/* 追加情報 */}
          <div className="text-center text-sm text-slate-600">
            <p>
              登録することで、
              <a href="#" className="text-blue-600 hover:underline">利用規約</a>
              と
              <a href="#" className="text-blue-600 hover:underline">プライバシーポリシー</a>
              に同意したものとみなされます。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}