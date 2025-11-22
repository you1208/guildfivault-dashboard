import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Wallet, Users, DollarSign, Shield } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold">GuildFi Vault</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold mb-6">
          Automate Your<br />
          <span className="text-blue-600">Discord Community Revenue</span>
        </h2>
        <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
          From subscription payments to role management and DeFi yield.<br />
          Next-generation community management platform powered by Web3.
        </p>
        <div className="flex gap-4 justify-center">
          <Link href="/signup/operator">
            <Button size="lg" className="text-lg px-8">
              Start as Operator
            </Button>
          </Link>
          <Link href="#features">
            <Button size="lg" variant="outline" className="text-lg px-8">
              Learn More
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Key Features</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader>
              <DollarSign className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Auto Payments</CardTitle>
              <CardDescription>
                Fully automated subscription payments. Roles removed automatically when payment expires.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Users className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Auto Role Management</CardTitle>
              <CardDescription>
                Discord roles automatically assigned/removed based on NFT ownership status.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Wallet className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Auto DeFi Yield</CardTitle>
              <CardDescription>
                Idle subscription funds automatically deployed to DeFi for additional yield.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <Shield className="h-10 w-10 text-blue-600 mb-2" />
              <CardTitle>Gasless Experience</CardTitle>
              <CardDescription>
                Account Abstraction enabled. Users pay zero gas fees.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-center mb-12">Pricing Structure</h3>
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Platform Fee</CardTitle>
              <CardDescription className="text-lg">
                Fee from member subscriptions
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="text-4xl font-bold text-blue-600 mb-4">5%</div>
              <p className="text-slate-600">
                5% platform fee on monthly member subscriptions.<br />
                Remaining 95% goes to operator's vault.
              </p>
            </div>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Performance Fee</CardTitle>
              <CardDescription className="text-lg">
                Fee from DeFi yield
              </CardDescription>
            </CardHeader>
            <div className="px-6 pb-6">
              <div className="text-4xl font-bold text-blue-600 mb-4">10%</div>
              <p className="text-slate-600">
                10% performance fee on profits generated from auto DeFi deployment.<br />
                Remaining 90% goes to operator.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-bold mb-6">
            Start Monetizing Your Community Today
          </h3>
          <p className="text-xl mb-8 opacity-90">
            Setup takes 5 minutes. Build your automated revenue system immediately.
          </p>
          <Link href="/signup/operator">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start as Operator
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-white py-8">
        <div className="container mx-auto px-4 text-center text-slate-600">
          <p>&copy; 2025 GuildFi Vault. Built on BlockDAG.</p>
        </div>
      </footer>
    </div>
  );
}