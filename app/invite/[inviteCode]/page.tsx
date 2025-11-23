"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function InvitePage() {
  const params = useParams();
  const router = useRouter();

 useEffect(() => {
    // Save invite code
    if (params.inviteCode) {
      const code = Array.isArray(params.inviteCode) 
        ? params.inviteCode[0] 
        : params.inviteCode;
      localStorage.setItem('inviteCode', code);
    }
    
    // Save server ID from URL
    if (typeof window !== 'undefined') {
      const searchParams = new URLSearchParams(window.location.search);
      const serverId = searchParams.get('serverId');
      if (serverId) {
        localStorage.setItem('discordServerId', serverId);
        console.log('Saved server ID:', serverId);
      }
    }
  }, [params.inviteCode]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-blue-600 rounded-full flex items-center justify-center">
            <CheckCircle2 className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl">You're Invited!</CardTitle>
          <CardDescription>
            Join an exclusive community powered by blockchain technology
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">What you'll get:</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Access to exclusive Discord channels
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                NFT-based membership verification
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Automatic role management
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                DeFi yield generation (coming soon)
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link href="/signup/member">
              <Button className="w-full" size="lg">
                Get Started
              </Button>
            </Link>
            <p className="text-xs text-center text-slate-600">
              By continuing, you agree to connect your Google and Discord accounts
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}