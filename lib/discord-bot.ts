import { Client, GatewayIntentBits, GuildMember } from 'discord.js';

const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID;

// Discord Bot クライアント
let client: Client | null = null;

// Botを初期化
export async function initDiscordBot() {
  if (client) return client;

  client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMembers,
    ],
  });

  await client.login(DISCORD_BOT_TOKEN);
  
  console.log('✅ Discord Bot connected');
  
  return client;
}

// ユーザーにロールを付与
export async function assignRole(
  discordUserId: string,
  roleName: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!client) {
      await initDiscordBot();
    }

    const guild = await client!.guilds.fetch(DISCORD_GUILD_ID!);
    const member = await guild.members.fetch(discordUserId);

    // ロール名でロールを検索（なければ作成）
    let role = guild.roles.cache.find(r => r.name === roleName);
    
    if (!role) {
      role = await guild.roles.create({
        name: roleName,
        color: 0x0099ff,
        reason: 'GuildFi Vault subscription role',
      });
      console.log(`✅ Created new role: ${roleName}`);
    }

    // ロールを付与
    await member.roles.add(role);
    
    console.log(`✅ Assigned role "${roleName}" to ${member.user.tag}`);
    
    return {
      success: true,
      message: `ロール "${roleName}" を付与しました`,
    };
  } catch (error: any) {
    console.error('Discord role assignment error:', error);
    return {
      success: false,
      message: error.message,
    };
  }
}

// ユーザーからロールを削除
export async function removeRole(
  discordUserId: string,
  roleName: string
): Promise<{ success: boolean; message: string }> {
  try {
    if (!client) {
      await initDiscordBot();
    }

    const guild = await client!.guilds.fetch(DISCORD_GUILD_ID!);
    const member = await guild.members.fetch(discordUserId);
    const role = guild.roles.cache.find(r => r.name === roleName);

    if (!role) {
      return {
        success: false,
        message: `ロール "${roleName}" が見つかりません`,
      };
    }

    await member.roles.remove(role);
    
    console.log(`✅ Removed role "${roleName}" from ${member.user.tag}`);
    
    return {
      success: true,
      message: `ロール "${roleName}" を削除しました`,
    };
  } catch (error: any) {
    console.error('Discord role removal error:', error);
    return {
      success: false,
      message: error.message,
    };
  }
}