import { Bridge } from "./bridge.js";
import { config } from "./config.js";
import { createDiscord, sendToDiscord, setDiscordClient } from "./discord.js";
import { createFluxer, sendToFluxer } from "./fluxer.js";

const bridge = new Bridge();

const discord = createDiscord(bridge);
setDiscordClient(discord);

const fluxer = createFluxer(bridge);

bridge.register("discord", {
  send: (message) => sendToDiscord(message),
});

bridge.register("fluxer", {
  send: (message) => sendToFluxer(message, fluxer),
});

process.on("SIGINT", async () => {
  console.log("Shutting down...");
  discord.destroy();
  fluxer.destroy();
  process.exit(0);
});

await Promise.all([
  discord.login(config.discordToken),
  fluxer.login(config.fluxerToken),
]);
