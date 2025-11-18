"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { ethers } from "ethers";
import { TIERED_MANAGER_ADDRESS, TIERED_SUBSCRIPTION_MANAGER_ABI } from "@/lib/contracts";

interface Tier {
  id: number;
  name: string;
  price: string;
  priceRaw: bigint;
  discordRoleId: string;
  isActive: boolean;
}

export default function TierManagement() {
  const [tiers, setTiers] = useState<Tier[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [newTier, setNewTier] = useState({
    name: "",
    price: "",
    discordRoleId: "",
  });

  useEffect(() => {
    loadTiers();
  }, []);

  const loadTiers = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(
        process.env.NEXT_PUBLIC_BLOCKDAG_RPC_URL
      );

      const manager = new ethers.Contract(
        TIERED_MANAGER_ADDRESS,
        TIERED_SUBSCRIPTION_MANAGER_ABI,
        provider
      );

      const allTiers = await manager.getAllTiers();

      const tiersData: Tier[] = allTiers.map((tier: any, index: number) => ({
        id: index + 1,
        name: tier.name,
        price: ethers.formatUnits(tier.price, 6),
        priceRaw: tier.price,
        discordRoleId: tier.discordRoleId.toString(),
        isActive: tier.isActive,
      }));

      setTiers(tiersData);
      setIsLoading(false);
    } catch (error) {
      console.error("ティア取得エラー:", error);
      setIsLoading(false);
    }
  };

  const handleCreateTier = () => {
    if (!newTier.name || !newTier.price || !newTier.discordRoleId) {
      alert("すべての項目を入力してください");
      return;
    }

    alert(
      "ティア作成機能\n\n" +
      `プラン名: ${newTier.name}\n` +
      `月額: $${newTier.price}\n` +
      `Discord Role ID: ${newTier.discordRoleId}\n\n` +
      "※ この機能を完全に実装するには、ウォレット接続してスマートコントラクトのcreateTier()を呼び出す必要があります。"
    );

    // TODO: Implement with signer
    // const manager = new ethers.Contract(TIERED_MANAGER_ADDRESS, ABI, signer);
    // await manager.createTier(name, ethers.parseUnits(price, 6), discordRoleId);

    setIsCreating(false);
    setNewTier({ name: "", price: "", discordRoleId: "" });
  };

  const handleUpdateTier = (tierId: number) => {
    alert("ティア更新機能は開発中です。\n\nスマートコントラクトのupdateTier()を呼び出す必要があります。");
    setEditingId(null);
  };

  const handleDeactivateTier = (tierId: number, tierName: string) => {
    const confirmed = confirm(`${tierName} プランを無効化しますか？\n\n既存の会員には影響しませんが、新規登録ができなくなります。`);
    if (confirmed) {
      alert("ティア無効化機能は開発中です。\n\nスマートコントラクトのdeactivateTier()を呼び出す必要があります。");
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="py-8 text-center">
          <div className="text-slate-600">プラン情報を読み込み中...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>プラン管理</CardTitle>
        <CardDescription>
          サブスクリプションプランを追加・編集します
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 既存のプラン一覧 */}
        <div className="space-y-3">
          <h3 className="font-medium text-sm text-slate-700">現在のプラン</h3>
          {tiers.length === 0 ? (
            <div className="text-center py-8 text-slate-600 border-2 border-dashed rounded-lg">
              プランがまだ作成されていません
            </div>
          ) : (
            tiers.map((tier) => (
              <div
                key={tier.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
              >
                <div className="flex-1">
                  {editingId === tier.id ? (
                    <div className="space-y-2">
                      <Input
                        placeholder="プラン名"
                        defaultValue={tier.name}
                        className="max-w-xs"
                      />
                      <Input
                        type="number"
                        placeholder="月額料金"
                        defaultValue={tier.price}
                        className="max-w-xs"
                      />
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-lg">{tier.name}</span>
                        <span
                          className={`px-2 py-1 text-xs rounded-full ${
                            tier.isActive
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {tier.isActive ? "有効" : "無効"}
                        </span>
                      </div>
                      <div className="text-sm text-slate-600 mt-1 space-y-1">
                        <div>💰 ${tier.price}/月（運営者受取: ${(parseFloat(tier.price) * 0.95).toFixed(2)}）</div>
                        <div>🎭 Discord Role ID: {tier.discordRoleId}</div>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  {editingId === tier.id ? (
                    <>
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => handleUpdateTier(tier.id)}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingId(tier.id)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeactivateTier(tier.id, tier.name)}
                        disabled={!tier.isActive}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* 新規プラン作成 */}
        <div className="border-t pt-4 mt-6">
          {!isCreating ? (
            <Button
              onClick={() => setIsCreating(true)}
              variant="outline"
              className="w-full border-2 border-dashed hover:border-solid"
            >
              <Plus className="h-4 w-4 mr-2" />
              新しいプランを追加
            </Button>
          ) : (
            <div className="space-y-4 p-4 bg-slate-50 rounded-lg border-2 border-blue-200">
              <h4 className="font-medium text-slate-900">新しいプランを作成</h4>
              
              <div className="space-y-2">
                <Label htmlFor="tier-name">プラン名 *</Label>
                <Input
                  id="tier-name"
                  placeholder="例: Platinum, Diamond, VIP"
                  value={newTier.name}
                  onChange={(e) =>
                    setNewTier({ ...newTier, name: e.target.value })
                  }
                />
                <p className="text-xs text-slate-600">
                  会員に表示されるプラン名です
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tier-price">月額料金 (USDC) *</Label>
                <Input
                  id="tier-price"
                  type="number"
                  placeholder="例: 30"
                  value={newTier.price}
                  onChange={(e) =>
                    setNewTier({ ...newTier, price: e.target.value })
                  }
                />
                <p className="text-xs text-slate-600">
                  {newTier.price
                    ? `運営者受取: $${(parseFloat(newTier.price) * 0.95).toFixed(2)} （プラットフォーム手数料5%）`
                    : "プラットフォーム手数料5%が差し引かれます"}
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tier-role">Discord ロールID *</Label>
                <Input
                  id="tier-role"
                  placeholder="例: 1234567890123456789"
                  value={newTier.discordRoleId}
                  onChange={(e) =>
                    setNewTier({ ...newTier, discordRoleId: e.target.value })
                  }
                />
                <p className="text-xs text-slate-600">
                  Discordサーバーでロールを作成し、ロールを右クリック→「IDをコピー」してここに貼り付けてください
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <Button onClick={handleCreateTier} className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  プランを作成
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsCreating(false);
                    setNewTier({ name: "", price: "", discordRoleId: "" });
                  }}
                >
                  キャンセル
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* 説明 */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-900">
            <strong>💡 プラン管理のヒント:</strong>
            <ul className="mt-2 space-y-1 text-blue-800">
              <li>• 各プランには異なるDiscordロールを割り当ててください</li>
              <li>• プラン名は会員に表示されるため、分かりやすい名前を付けましょう</li>
              <li>• 価格の高いプランには、より多くの特典を提供しましょう</li>
              <li>• 無効化したプランは既存会員に影響しませんが、新規登録はできなくなります</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}