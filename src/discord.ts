import {
  Client,
  GatewayIntentBits,
  type Message,
} from "discord.js";
import { config } from "./config.js";
import type { NormalizedMessage } from "./types.js";
import type { Bridge } from "./bridge.js";

export function createDiscord(bridge: Bridge): Client {
  const client = new Client({
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  });

  client.once("ready", () => {
    console.log(`[discord] ready as ${client.user?.tag}`);
  });

  client.on("messageCreate", async (message) => {
    if (message.channelId !== config.discordChannelId) return;
    if (message.author.id === client.user?.id) return;

    const normalized = normalizeDiscord(message);
    try {
      await bridge.forward(normalized);
    } catch (error) {
      console.error("[discord] forwarding failed:", error);
    }
  });

  return client;
}

function normalizeDiscord(message: Message): NormalizedMessage {
  return {
    source: "discord",
    sourceMessageId: message.id,
    sourceChannelId: message.channelId,
    authorId: message.author.id,
    authorName: message.member?.displayName ?? message.author.globalName ?? message.author.username,
    authorIsBot: message.author.bot,
    content: message.content,
    timestamp: message.createdAt.toISOString(),
    attachments: [...message.attachments.values()].map((a) => a.url),
  };
}

export async function sendToDiscord(message: NormalizedMessage): Promise<void> {
  const client = discordClient;
  const channel = await client.channels.fetch(config.discordChannelId);
  if (!channel?.isTextBased() || !("send" in channel)) {
    throw new Error("Configured Discord channel is not text-based");
  }

  const body = format(message);
  await channel.send({
    content: body,
    allowedMentions: { parse: [] },
  });
}

let discordClient: Client;
export function setDiscordClient(client: Client): void {
  discordClient = client;
}

function format(message: NormalizedMessage): string {
  const header = `**${message.authorName}** · Fluxer`;
  const content = message.content.trim();
  const links = message.attachments.join("\n");
  const payload = [header, content, links].filter(Boolean).join("\n");
  return payload.slice(0, 2000);
}
