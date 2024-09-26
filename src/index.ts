import "dotenv/config";
import ImapClient from "./clients/imap/ImapClient.ts";
import DiscordClient from "./clients/discord/DiscordClient.ts";
import LineClient from "./clients/line/LineClient.ts";
import ConfigUtil from "./utils/ConfigUtil.ts";

export let imap: ImapClient;
export let discord: DiscordClient;
export let line: LineClient;

async function run() {
    // IMAP client
    ConfigUtil.loadConfig();
    const config = ConfigUtil.getConfig();

    // IMAP client
    ImapClient.enabled = ConfigUtil.checkIfEmpty(config.imap);
    if (ImapClient.enabled) {
        imap = new ImapClient();
        imap.start();
    } else {
        throw new Error("IMAP service is not configured correctly, the bot will not start");
    }

    // Discord client
    DiscordClient.enabled = ConfigUtil.checkIfEmpty(config.discord);
    if (DiscordClient.enabled) {
        discord = new DiscordClient();
        discord.start();
    }

    // Line client
    LineClient.enabled = ConfigUtil.checkIfEmpty(config.line);
    if (LineClient.enabled) {
        line = new LineClient();
    }

    if (!DiscordClient.enabled && !LineClient.enabled) {
        throw new Error("None of the social media platforms are enabled");
    }
}

void run();