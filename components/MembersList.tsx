"use client";

import { useState, useEffect } from "react";
import { Loader2, User, Calendar } from "lucide-react";

interface Member {
  id: number;
  name: string;
  email: string;
  discordId: string;
  discordUsername: string;
  tier: string;
  joinDate: string;
  status: string;
  expiryDate: string;
}

export default function MembersList() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const serverId = localStorage.getItem('discordServerId');
        
        if (!serverId) {
          setMembers([]);
          setLoading(false);
          return;
        }
        
        const response = await fetch(`/api/members?serverId=${serverId}`);
        const data = await response.json();
        
        if (data.success) {
          setMembers(data.members);
        }
      } catch (error) {
        console.error('Failed to fetch members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Gold':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Silver':
        return 'bg-slate-100 text-slate-800 border-slate-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (members.length === 0) {
    return (
      <div className="text-center py-8 text-slate-600">
        No active members yet. Please set your Discord Server ID in Settings.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {members.map((member) => (
        <div
          key={member.id}
          className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors"
        >
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {member.discordUsername.charAt(0).toUpperCase()}
            </div>
            
            <div>
              <div className="font-semibold flex items-center gap-2">
                {member.discordUsername}
                <span className={`px-2 py-0.5 text-xs rounded-full border ${getTierColor(member.tier)}`}>
                  {member.tier}
                </span>
              </div>
              <div className="text-sm text-slate-600">{member.email}</div>
            </div>
          </div>

          <div className="text-right text-sm">
            <div className="flex items-center gap-1 text-slate-600 mb-1">
              <Calendar className="h-3 w-3" />
              <span className="text-xs">Joined: {new Date(member.joinDate).toLocaleDateString()}</span>
            </div>
            <div className="text-xs text-slate-500">
              Expires: {new Date(member.expiryDate).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}