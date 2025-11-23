"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useBlockchain } from "@/lib/useBlockchain";

const plans = [
  {
    id: 1,
    name: "Silver",
    price: "$10",
    duration: "30 days",
    benefits: [
      "Access to exclusive Discord channels",
      "Monthly reports",
      "Community forum access"
    ]
  },
  {
    id: 2,
    name: "Gold",
    price: "$25",
    duration: "30 days",
    benefits: [
      "All Silver benefits",
      "Weekly reports",
      "Dedicated support",
      "Priority event access"
    ],
    popular: true
  },
  {
    id: 3,
    name: "Platinum",
    price: "$50",
    duration: "30 days",
    benefits: [
      "All Gold benefits",
      "Daily reports",
      "1-on-1 consulting",
      "VIP event access",
      "Custom dashboard"
    ]
  }
];

export default function PlansPage() {
  const router = useRouter();
  const { subscribe } = useBlockchain();
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (plan: typeof plans[0]) => {
    try {
      setLoading(true);

      // 1. Subscribe via blockchain (mint NFT)
      const result = await subscribe(plan.id);
      
      if (!result.success) {
        alert(`Subscription failed: ${result.message}`);
        return;
      }

      // 2. Get Discord ID and Guild ID from localStorage
      const storedDiscordId = localStorage.getItem('discordId');
      const storedGuildId = localStorage.getItem('discordServerId');
      
      console.log('Assigning Discord role:', plan.name, 'to', storedDiscordId, 'in guild', storedGuildId);
      console.log('Request body:', { guildId: storedGuildId, discordId: storedDiscordId, roleName: plan.name });
      
      // 3. Assign Discord role
      if (storedDiscordId && storedGuildId) {
        const roleResponse = await fetch('/api/discord/assign-role', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ 
            guildId: storedGuildId,
            discordId: storedDiscordId, 
            roleName: plan.name 
          }),
        });

        const roleResult = await roleResponse.json();
        console.log('Discord role assignment result:', roleResult);

        if (!roleResult.success) {
          console.error('Discord role assignment failed:', roleResult.error);
        }
      } else {
        console.error('Missing Discord ID or Guild ID');
      }

      // 4. Redirect to dashboard
      alert('Subscription successful! Redirecting to dashboard...');
      router.push('/member/dashboard');
    } catch (error: any) {
      console.error('Subscription error:', error);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <Link href="/member/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Choose Your Plan</h1>
          <p className="text-slate-600 text-lg">
            Select a membership tier that fits your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative ${plan.popular ? 'border-blue-600 border-2 shadow-lg' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <CardHeader>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-slate-600 ml-2">/ {plan.duration}</span>
                </div>
                <CardDescription className="mt-2">
                  Perfect for growing communities
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-slate-700">{benefit}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Subscribe Now"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-sm text-slate-600">
            All plans include NFT-based membership verification and automatic Discord role management
          </p>
        </div>
      </div>
    </div>
  );
}