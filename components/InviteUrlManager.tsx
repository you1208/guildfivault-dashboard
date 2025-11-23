"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, RefreshCw } from "lucide-react";

export default function InviteUrlManager() {
  const [inviteUrl, setInviteUrl] = useState("");

  const generateInviteUrl = () => {
    const serverId = localStorage.getItem('discordServerId');
    
    if (!serverId) {
      alert('Please set your Discord Server ID first in Basic Settings');
      return;
    }
    
    const code = Math.random().toString(36).substring(2, 15);
    const url = `${window.location.origin}/invite/${code}?serverId=${serverId}`;
    setInviteUrl(url);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteUrl);
    alert('Invite URL copied to clipboard!');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Invite URL</CardTitle>
        <CardDescription>
          Generate and share invitation links for new members
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={inviteUrl}
            placeholder="Click 'Generate' to create an invite URL"
            readOnly
          />
          <Button
            variant="outline"
            size="icon"
            onClick={copyToClipboard}
            disabled={!inviteUrl}
          >
            <Copy className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={generateInviteUrl}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-sm text-slate-600">
          Share this URL with potential members to allow them to join your community
        </p>
      </CardContent>
    </Card>
  );
}