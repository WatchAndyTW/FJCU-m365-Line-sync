import { EmbedBuilder } from "discord.js";
import { discord, line } from "../index.ts";

export default class MsgUtil {
    public static send(subject: string, text: string) {
        // Discord
        if (discord.enabled) {
            let embed = new EmbedBuilder();
            embed.setTitle(subject);
            embed.setDescription(`\`\`\`${text}\`\`\``);
            discord.send(embed);
        }
        // LINE
        if (line.enabled) {
            line.send(text);
        }
    }
}