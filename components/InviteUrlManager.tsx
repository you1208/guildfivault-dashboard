"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, ExternalLink, RefreshCw } from "lucide-react";

export default function InviteUrlManager() {
  const [inviteCode, setInviteCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // 招待コードを生成
  const generateInviteCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setInviteCode(code);
  };

  // 初回表示時に自動生成
  useState(() => {
    if (!inviteCode) {
      generateInviteCode();
    }
  });

  // URLをクリップボードにコピー
  const copyToClipboard = () => {
    const url = `${window.location.origin}/invite/${inviteCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 新しいコードを生成
  const regenerateCode = () => {
    generateInviteCode();
    setCopied(false);
  };

  const inviteUrl = inviteCode ? `${typeof window !== 'undefined' ? window.location.origin : ''}/invite/${inviteCode}` : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>会員招待URL</CardTitle>
        <CardDescription>
          このURLをSNSやDiscordで共有して、会員を募集できます
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 招待URL表示 */}
        <div className="space-y-2">
          <Label>招待URL</Label>
          <div className="flex gap-2">
            <Input
              value={inviteUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              title="URLをコピー"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={regenerateCode}
              title="新しいコードを生成"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-sm text-green-600">✓ URLをコピーしました！</p>
          )}
        </div>

        {/* プレビューボタン */}
        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(inviteUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            招待ページをプレビュー
          </Button>
        </div>

        {/* 使い方の説明 */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-900 space-y-2">
            <div className="font-semibold mb-2">📋 使い方</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>上記のURLをコピー</li>
              <li>SNSやDiscordで共有</li>
              <li>ユーザーがURLから直接登録</li>
              <li>自動でDiscordロールが付与されます</li>
            </ol>
          </div>
        </div>

        {/* 統計情報 */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">0</div>
            <div className="text-xs text-slate-600">総クリック数</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">0</div>
            <div className="text-xs text-slate-600">登録数</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">0%</div>
            <div className="text-xs text-slate-600">コンバージョン率</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}