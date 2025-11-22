"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function DiscordSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const discordId = searchParams.get("discordId");
    const discordUsername = searchParams.get("discordUsername");
    const discordAvatar = searchParams.get("discordAvatar");

    if (discordId && discordUsername) {
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const user = JSON.parse(userStr);
        user.discordId = discordId;
        user.discordUsername = discordUsername;
        user.discordAvatar = discordAvatar;
        localStorage.setItem("user", JSON.stringify(user));
      }

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
        <h1 className="text-2xl font-bold mb-4">✅ Discord Integration Successful!</h1>
        <p className="text-slate-600">Redirecting to plan selection...</p>
      </div>
    </div>
  );
}

export default function DiscordSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <DiscordSuccessContent />
    </Suspense>
  );
}