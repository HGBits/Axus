import "dotenv/config";

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
}

export const config = {
  discordToken: required("DISCORD_TOKEN"),
  fluxerToken: required("FLUXER_BOT_TOKEN"),
  discordChannelId: required("DISCORD_CHANNEL_ID"),
  fluxerChannelId: required("FLUXER_CHANNEL_ID"),
};
