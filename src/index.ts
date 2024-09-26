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
    imap.enabled = EnvUtil.checkIfNotNull(["IMAP_USER", "IMAP_PASS", "STUD_NAME"]);
    if (imap.enabled) {
        imap = new ImapClient();
        imap.start();
    } else {
        throw new Error("IMAP service is not configured correctly, the bot will not start");
    }

    // Discord client
    discord.enabled = EnvUtil.checkIfNotNull(["DC_TOKEN", "DC_CHANNEL"]);
    if (discord.enabled) {
        discord = new DiscordClient();
        discord.start();
    }

    // Line client (Temproary disabled due to Line API bugs)
    line.enabled = EnvUtil.checkIfNotNull(["LINE_TOKEN", "LINE_GROUP"]);
    if (line.enabled) {
        line = new LineClient();
    }

    if (!discord.enabled && !line.enabled) {
        throw new Error("None of the social media platforms are enabled");
    }
}

void run();