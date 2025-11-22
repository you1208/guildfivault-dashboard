"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function DiscordSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const discordId = searchParams.get("discordId");
    const discordUsername = searchParams.get("discordUsername");
    const discordAvatar = searchParams.get("discordAvatar");

    if (discordId && discordUsername) {
      // localStorageのユーザー情報を更新
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.discordId = discordId;
        user.discordUsername = discordUsername;
        user.discordAvatar = discordAvatar;
        localStorage.setItem("user", JSON.stringify(user));
      }

      // プラン選択ページへ
      setTimeout(() => {
        router.push("/plans");
      }, 1000);
    } else {
      router.push("/plans?error=discord_failed");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">✅ Discord連携成功！</h1>
        <p className="text-slate-600">プラン選択ページへリダイレクト中...</p>
      </div>
    </div>
  );
}