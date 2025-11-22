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
    // Save invite code to localStorage
    localStorage.setItem("inviteCode", inviteCode);
    // Redirect to member signup
    router.push("/signup/member");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              Welcome to the Community!
            </h1>
            <p className="text-xl text-slate-600">
              Invite Code: <span className="font-mono font-bold">{inviteCode}</span>
            </p>
          </div>

          {/* Main Card */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-2xl">Premium Membership Benefits</CardTitle>
              <CardDescription className="text-base">
                Sign up now and get instant access to exclusive content
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Benefits List */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Exclusive Discord Role</div>
                    <div className="text-sm text-slate-600">
                      Dedicated role automatically assigned upon registration
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Zero Gas Fees</div>
                    <div className="text-sm text-slate-600">
                      No crypto or wallet knowledge required
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Zap className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <div className="font-semibold">Instant Access</div>
                    <div className="text-sm text-slate-600">
                      Access exclusive content immediately after signup
                    </div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleJoin}
                size="lg"
                className="w-full text-lg"
              >
                Sign Up with Google Now
              </Button>

              {/* Notice */}
              <div className="text-sm text-slate-600 text-center">
                A valid invite code is required for registration
              </div>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <div className="text-center text-sm text-slate-600">
            <p>
              By signing up, you agree to our{" "}
              <a href="#" className="text-blue-600 hover:underline">Terms of Service</a>
              {" "}and{" "}
              <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}