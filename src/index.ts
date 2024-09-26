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
    const imapEnable = EnvUtil.checkIfNotNull(["IMAP_USER", "IMAP_PASS", "STUD_NAME"]);
    if (imapEnable) {
        imap = new ImapClient();
        imap.start();
    } else {
        throw new Error("IMAP service is not configured correctly, the bot will not start");
    }

    // Discord client
    const discordEnable = EnvUtil.checkIfNotNull(["DC_TOKEN", "DC_CHANNEL"]);
    if (discordEnable) {
        discord = new DiscordClient();
        discord.start();
    }

    // Line client (Temproary disabled due to Line API bugs)
    const lineEnable = EnvUtil.checkIfNotNull(["LINE_TOKEN", "LINE_GROUP"]);
    if (lineEnable) {
        line = new LineClient();
    }

    if (!discordEnable && !lineEnable) {
        throw new Error("None of the social media platforms are enabled");
    }
}

void run();