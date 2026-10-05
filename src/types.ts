export type Platform = "discord" | "fluxer";

export interface NormalizedMessage {
  source: Platform;
  sourceMessageId: string;
  sourceChannelId: string;
  authorId: string;
  authorName: string;
  authorIsBot: boolean;
  content: string;
  timestamp: string;
  attachments: string[];
}
