"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Copy, Check, ExternalLink, RefreshCw } from "lucide-react";

export default function InviteUrlManager() {
  const [inviteCode, setInviteCode] = useState<string>("");
  const [copied, setCopied] = useState(false);

  // Generate invite code
  const generateInviteCode = () => {
    const code = Math.random().toString(36).substring(2, 10).toUpperCase();
    setInviteCode(code);
  };

  // Auto-generate on mount
  useState(() => {
    if (!inviteCode) {
      generateInviteCode();
    }
  });

  // Copy URL to clipboard
  const copyToClipboard = () => {
    const url = `${window.location.origin}/invite/${inviteCode}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Regenerate code
  const regenerateCode = () => {
    generateInviteCode();
    setCopied(false);
  };

  const inviteUrl = inviteCode ? `${typeof window !== 'undefined' ? window.location.origin : ''}/invite/${inviteCode}` : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Member Invite URL</CardTitle>
        <CardDescription>
          Share this URL on social media or Discord to recruit members
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Invite URL Display */}
        <div className="space-y-2">
          <Label>Invite URL</Label>
          <div className="flex gap-2">
            <Input
              value={inviteUrl}
              readOnly
              className="font-mono text-sm"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={copyToClipboard}
              title="Copy URL"
            >
              {copied ? (
                <Check className="h-4 w-4 text-green-600" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={regenerateCode}
              title="Generate new code"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
          {copied && (
            <p className="text-sm text-green-600">✓ URL copied!</p>
          )}
        </div>

        {/* Preview Button */}
        <div className="pt-2">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => window.open(inviteUrl, '_blank')}
          >
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview Invite Page
          </Button>
        </div>

        {/* Usage Instructions */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="text-sm text-blue-900 space-y-2">
            <div className="font-semibold mb-2">📋 How to Use</div>
            <ol className="list-decimal list-inside space-y-1">
              <li>Copy the URL above</li>
              <li>Share on social media or Discord</li>
              <li>Users sign up directly via the URL</li>
              <li>Discord roles are automatically assigned</li>
            </ol>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">0</div>
            <div className="text-xs text-slate-600">Total Clicks</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">0</div>
            <div className="text-xs text-slate-600">Sign-ups</div>
          </div>
          <div className="text-center p-3 bg-slate-50 rounded-lg">
            <div className="text-2xl font-bold text-slate-900">0%</div>
            <div className="text-xs text-slate-600">Conversion</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}