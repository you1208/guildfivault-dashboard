"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const userStr = searchParams.get("user");

    if (token && userStr) {
      // localStorageに保存
      localStorage.setItem("token", token);
      localStorage.setItem("user", userStr);

      const user = JSON.parse(userStr);

      // roleに応じてリダイレクト
      setTimeout(() => {
        if (user.role === 'operator') {
          router.push("/dashboard");
        } else {
          // 会員の場合はDiscord連携へ
          router.push(`/api/auth/discord?userId=${user.id}`);
        }
      }, 1000);
    } else {
      router.push("/signup/operator?error=auth_failed");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">✅ 認証成功！</h1>
        <p className="text-slate-600">Discord連携へリダイレクト中...</p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">読み込み中...</h1>
        </div>
      </div>
    }>
      <AuthSuccessContent />
    </Suspense>
  );
}