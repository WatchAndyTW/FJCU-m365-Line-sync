import "dotenv/config";
import ImapClient from "./clients/imap/ImapClient.ts";
import DiscordClient from "./clients/discord/DiscordClient.ts";
import LineClient from "./clients/line/LineClient.ts";
import EnvUtil from "./utils/EnvUtil.ts";

export let imap: ImapClient;
export let discord: DiscordClient;
export let line: LineClient;

async function run() {
    // IMAP client
    ImapClient.enabled = EnvUtil.checkIfNotNull(["IMAP_USER", "IMAP_PASS", "STUD_NAME"]);
    if (ImapClient.enabled) {
        imap = new ImapClient();
        imap.start();
    } else {
        throw new Error("IMAP service is not configured correctly, the bot will not start");
    }

    // Discord client
    DiscordClient.enabled = EnvUtil.checkIfNotNull(["DC_TOKEN", "DC_CHANNEL"]);
    if (DiscordClient.enabled) {
        discord = new DiscordClient();
        discord.start();
    }

    // Line client (Temproary disabled due to Line API bugs)
    LineClient.enabled = EnvUtil.checkIfNotNull(["LINE_TOKEN", "LINE_GROUP"]);
    if (LineClient.enabled) {
        line = new LineClient();
    }

    if (!DiscordClient.enabled && !LineClient.enabled) {
        throw new Error("None of the social media platforms are enabled");
    }
}

void run();