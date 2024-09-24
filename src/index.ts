import "dotenv/config";
import ImapClient from "./clients/imap/ImapClient.ts";
import DiscordClient from "./clients/discord/DiscordClient.ts";
import LineClient from "./clients/line/LineClient.ts";

export let imap: ImapClient;
export let discord: DiscordClient;
export let line: LineClient;

const envList: Array<string> = [
    "BOT_TOKEN",
    "DC_CHANNE",
    "IMAP_USER",
    "IMAP_PASS",
    "STUD_NAME",
    "LINE_USER",
    "LINE_PASS",
    "LINE_MID"
]

async function run() {
    for (let env of envList) {
        if (!process.env[env]) {
            throw Error(`Could not find ${env} in your environment`);
        }
    }

    // IMAP client
    imap = new ImapClient();
    imap.start();

    // Discord client
    discord = new DiscordClient();
    discord.start();

    // Line client (Temproary disabled due to Line API bugs)
    line = new LineClient();
    // line.start();
}

void run();