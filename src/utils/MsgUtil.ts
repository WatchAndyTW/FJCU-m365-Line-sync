import { EmbedBuilder } from "discord.js";
import { discord, line } from "../index.ts";
import DiscordClient from "../clients/discord/DiscordClient.ts";
import LineClient from "../clients/line/LineClient.ts";

export default class MsgUtil {
    public static send(subject: string, text: string) {
        // Discord
        if (DiscordClient.enabled) {
            let embed = new EmbedBuilder();
            embed.setTitle(subject);
            embed.setDescription(`\`\`\`${text}\`\`\``);
            discord.send(embed);
        }
        // LINE
        if (LineClient.enabled) {
            line.send(text);
        }
    }
}