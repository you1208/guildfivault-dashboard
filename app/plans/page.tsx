"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check, Loader2, Crown, Star, Zap, CreditCard } from "lucide-react";
import { useBlockchain } from "@/lib/useBlockchain";

export default function PlansPage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [subscribing, setSubscribing] = useState<number | null>(null);
  const { tiers, loading, subscribe } = useBlockchain();

  useEffect(() => {
    // Get user info
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.push("/signup/member");
      return;
    }
    setUser(JSON.parse(userStr));
  }, [router]);

  const handleSubscribe = async (tierId: number, tierName: string, price: string) => {
    if (!user) return;

    setSubscribing(tierId);

    try {
      // Subscription process
      const result = await subscribe(tierId);

      if (result.success) {
        // Save subscription info
        const subscription = {
          tierId,
          tierName,
          price,
          startDate: new Date().toISOString(),
          endDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          active: true,
        };

        const updatedUser = {
          ...user,
          subscription,
        };

        localStorage.setItem("user", JSON.stringify(updatedUser));

       // Assign Discord role
        if (user.discordId) {
          try {
            const requestBody = {
              discordId: user.discordId,
              roleName: tierName,
            };
            
            console.log(`Assigning Discord role: ${tierName} to ${user.discordId}`);
            console.log('Request body:', requestBody);
            
            const roleResponse = await fetch('/api/discord/assign-role', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            });

            const roleResult = await roleResponse.json();
            console.log('Discord role assignment result:', roleResult);
            
            if (!roleResult.success) {
              console.error('Discord role assignment failed:', roleResult.error);
            }
          } catch (error) {
            console.error('Failed to assign Discord role:', error);
          }
        } else {
          console.warn('No Discord ID found for user:', user);
        }

        // Redirect to member dashboard
        router.push("/member/dashboard");
      } else {
        alert("Subscription registration failed: " + result.message);
      }
    } catch (error: any) {
      console.error("Subscription error:", error);
      alert("An error occurred: " + error.message);
    } finally {
      setSubscribing(null);
    }
  };

  const getTierIcon = (index: number) => {
    switch (index) {
      case 0:
        return <Zap className="h-8 w-8 text-orange-600" />;
      case 1:
        return <Star className="h-8 w-8 text-blue-600" />;
      case 2:
        return <Crown className="h-8 w-8 text-purple-600" />;
      default:
        return <Star className="h-8 w-8 text-slate-600" />;
    }
  };

  const getTierColor = (index: number) => {
    switch (index) {
      case 0:
        return "border-orange-200 bg-orange-50";
      case 1:
        return "border-blue-200 bg-blue-50";
      case 2:
        return "border-purple-200 bg-purple-50";
      default:
        return "border-slate-200 bg-slate-50";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">GuildFi Vault</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
         {/* Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">
              Choose Your Plan
            </h2>
            <p className="text-xl text-slate-600">
              Find the membership that's right for you
            </p>
            {user?.discordUsername && (
              <p className="text-sm text-slate-500 mt-2">
                Discord: <span className="font-mono font-semibold">{user.discordUsername}</span>
              </p>
            )}
          </div>

          {/* 👇 ここに追加 */}
          {/* Credit Card Top-up Section */}
          <Card className="mb-8 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
            <CardContent className="py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold mb-1 flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-green-600" />
                    Need USDC? Top Up with Credit Card
                  </h3>
                  <p className="text-sm text-slate-600">
                    Buy USDC instantly using your credit card (Visa/Mastercard)
                  </p>
                </div>
                <Button
                  onClick={() => {
                    alert("🎉 Demo: Credit card top-up integration\n\nIn production, this would connect to:\n• Stripe\n• MoonPay\n• Transak\n\nTo purchase USDC directly with your credit card.");
                  }}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <CreditCard className="h-4 w-4 mr-2" />
                  Top Up USDC
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tier List */}
          <div className="grid md:grid-cols-3 gap-6">
            {tiers.map((tier, index) => (
              <Card
                key={tier.id}
                className={`relative ${getTierColor(index)} border-2 transition-all hover:shadow-lg`}
              >
                {/* Popular Badge */}
                {index === 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="px-4 py-1 bg-blue-600 text-white text-xs font-bold rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-3">
                    {getTierIcon(index)}
                  </div>
                  <CardTitle className="text-2xl">{tier.name}</CardTitle>
                  <div className="mt-4">
                    <div className="text-4xl font-bold">
                      ${tier.price}
                      <span className="text-lg font-normal text-slate-600">/month</span>
                    </div>
                  </div>
                  <CardDescription className="mt-2">
                    Valid for {tier.duration} days
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Benefits List */}
                  <div className="space-y-3">
                    {tier.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-slate-700">{benefit}</span>
                      </div>
                    ))}
                  </div>

                  {/* Current Members */}
                  <div className="pt-4 border-t">
                    <div className="text-xs text-slate-600 text-center">
                      Currently <span className="font-bold">{tier.subscriberCount} members</span>
                    </div>
                  </div>

                  {/* Subscribe Button */}
                  <Button
                    onClick={() => handleSubscribe(tier.id, tier.name, tier.price)}
                    disabled={subscribing !== null}
                    className="w-full"
                    size="lg"
                    variant={index === 1 ? "default" : "outline"}
                  >
                    {subscribing === tier.id ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Select This Plan"
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Notes */}
          <div className="mt-12 p-6 bg-white rounded-lg border border-slate-200">
            <h3 className="font-semibold mb-3">💡 Important Information</h3>
            <ul className="space-y-2 text-sm text-slate-600">
              <li>• All plans include 30 days of access</li>
              <li>• Discord role is assigned immediately upon registration</li>
              <li>• Zero gas fees (Paymaster covers all transaction costs)</li>
              <li>• Cancel anytime</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}