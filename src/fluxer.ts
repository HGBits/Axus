import { Client, Events } from "@fluxerjs/core";
import { config } from "./config.js";
import type { NormalizedMessage } from "./types.js";
import type { Bridge } from "./bridge.js";

export function createFluxer(bridge: Bridge): Client {
  const client = new Client();

  client.on(Events.Ready, () => {
    console.log("[fluxer] ready");
  });

  client.on(Events.MessageCreate, async (message) => {
    if (message.channelId !== config.fluxerChannelId) return;
    if (message.author?.bot) return;

    const normalized: NormalizedMessage = {
      source: "fluxer",
      sourceMessageId: message.id,
      sourceChannelId: message.channelId,
      authorId: message.author.id,
      authorName: message.author.username,
      authorIsBot: Boolean(message.author.bot),
      content: message.content ?? "",
      timestamp: message.createdAt.toISOString(),
      attachments:
        message.attachments?.flatMap((attachment) =>
          attachment.url ? [attachment.url] : [],
        ) ?? [],
    };

    try {
      await bridge.forward(normalized);
    } catch (error) {
      console.error("[fluxer] forwarding failed:", error);
    }
  });

  return client;
}

export async function sendToFluxer(message: NormalizedMessage, client: Client): Promise<void> {
  const channel = await client.channels.fetch(config.fluxerChannelId);
  if (!channel || !("send" in channel)) {
    throw new Error("Configured Fluxer channel is not sendable");
  }

  const header = `**${message.authorName}** · Discord`;
  const content = [header, message.content.trim(), ...message.attachments].filter(Boolean).join("\n");

  const send = channel.send;
  if (typeof send !== "function") {
    throw new Error("Configured Fluxer channel does not expose send()");
  }

  await send.call(channel, {
    content: content.slice(0, 2000),
    allowedMentions: { parse: [] },
  });
}
