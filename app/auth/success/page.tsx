"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function AuthSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

useEffect(() => {
    const token = searchParams.get("token");
    const userStr = searchParams.get("user");
    const serverId = searchParams.get("serverId");

    if (token && userStr) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", userStr);
      
      // Save serverId if present
      if (serverId) {
        localStorage.setItem('discordServerId', serverId);
        console.log('Saved serverId from auth:', serverId);
      }

      const user = JSON.parse(userStr);

      setTimeout(() => {
        if (user.role === 'operator') {
          router.push("/dashboard");
        } else {
          // Get serverId from localStorage (either from URL param or already stored)
          const storedServerId = localStorage.getItem('discordServerId');
          router.push(`/api/auth/discord?serverId=${storedServerId || ''}`);
        }
      }, 1000);
    } else {
      router.push("/signup/operator?error=auth_failed");
    }
  }, [router, searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">✅ Authentication Successful!</h1>
        <p className="text-slate-600">Redirecting to Discord integration...</p>
      </div>
    </div>
  );
}

export default function AuthSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Loading...</h1>
        </div>
      </div>
    }>
      <AuthSuccessContent />
    </Suspense>
  );
}