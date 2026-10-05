import type { NormalizedMessage } from "./types.js";

export interface BridgeSink {
  send(message: NormalizedMessage): Promise<void>;
}

export class Bridge {
  private readonly sinks = new Map<"discord" | "fluxer", BridgeSink>();

  register(platform: "discord" | "fluxer", sink: BridgeSink): void {
    this.sinks.set(platform, sink);
  }

  async forward(message: NormalizedMessage): Promise<void> {
    if (message.authorIsBot) return;

    const target = message.source === "discord" ? "fluxer" : "discord";
    const sink = this.sinks.get(target);
    if (!sink) throw new Error(`No sink registered for ${target}`);

    await sink.send(message);
  }
}
