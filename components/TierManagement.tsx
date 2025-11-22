"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus, Trash2 } from "lucide-react";
import { useBlockchain } from "@/lib/useBlockchain";

export default function TierManagement() {
  const { tiers, createTier } = useBlockchain();
  const [isCreating, setIsCreating] = useState(false);
  const [newTier, setNewTier] = useState({
    name: "",
    price: "",
    duration: "30",
    benefits: [""],
  });

  const handleAddBenefit = () => {
    setNewTier({
      ...newTier,
      benefits: [...newTier.benefits, ""],
    });
  };

  const handleRemoveBenefit = (index: number) => {
    const updatedBenefits = newTier.benefits.filter((_, i) => i !== index);
    setNewTier({
      ...newTier,
      benefits: updatedBenefits,
    });
  };

  const handleBenefitChange = (index: number, value: string) => {
    const updatedBenefits = [...newTier.benefits];
    updatedBenefits[index] = value;
    setNewTier({
      ...newTier,
      benefits: updatedBenefits,
    });
  };

  const handleCreateTier = async () => {
    if (!newTier.name || !newTier.price) {
      alert("Please fill in all required fields");
      return;
    }

    const filteredBenefits = newTier.benefits.filter(b => b.trim() !== "");
    if (filteredBenefits.length === 0) {
      alert("Please add at least one benefit");
      return;
    }

    setIsCreating(true);

    const result = await createTier(
      newTier.name,
      newTier.price,
      parseInt(newTier.duration),
      filteredBenefits
    );

    if (result.success) {
      alert("Tier created successfully!");
      setNewTier({
        name: "",
        price: "",
        duration: "30",
        benefits: [""],
      });
    } else {
      alert("Failed to create tier: " + result.message);
    }

    setIsCreating(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Tier Management</CardTitle>
        <CardDescription>
          Create and manage membership plans
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Existing Tiers */}
        <div className="space-y-3">
          <Label>Current Tiers</Label>
          {tiers.length === 0 ? (
            <div className="text-sm text-slate-600 p-4 bg-slate-50 rounded-lg">
              No tiers created yet
            </div>
          ) : (
            <div className="space-y-2">
              {tiers.map((tier) => (
                <div
                  key={tier.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{tier.name}</div>
                    <div className="text-sm text-slate-600">
                      ${tier.price}/month · {tier.subscriberCount} subscribers
                    </div>
                  </div>
                  <div className="text-sm text-slate-600">
                    {tier.benefits.length} benefits
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <hr />

        {/* Create New Tier */}
        <div className="space-y-4">
          <Label className="text-base font-semibold">Create New Tier</Label>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="tier-name">Tier Name *</Label>
              <Input
                id="tier-name"
                placeholder="e.g., Silver"
                value={newTier.name}
                onChange={(e) => setNewTier({ ...newTier, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tier-price">Price (USDC) *</Label>
              <Input
                id="tier-price"
                type="number"
                placeholder="e.g., 25"
                value={newTier.price}
                onChange={(e) => setNewTier({ ...newTier, price: e.target.value })}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="tier-duration">Duration (days)</Label>
            <Input
              id="tier-duration"
              type="number"
              placeholder="30"
              value={newTier.duration}
              onChange={(e) => setNewTier({ ...newTier, duration: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>Benefits *</Label>
            {newTier.benefits.map((benefit, index) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder={`Benefit ${index + 1}`}
                  value={benefit}
                  onChange={(e) => handleBenefitChange(index, e.target.value)}
                />
                {newTier.benefits.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleRemoveBenefit(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={handleAddBenefit}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Benefit
            </Button>
          </div>

          <Button
            onClick={handleCreateTier}
            disabled={isCreating}
            className="w-full"
          >
            {isCreating ? "Creating..." : "Create Tier"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}