import { Channel, EmbedBuilder, IntentsBitField, TextChannel } from "discord.js";
import { Client } from "discordx";
import ReadyListener from "./listeners/ReadyListener.ts";

export default class DiscordClient {
    public client: Client;

    constructor() {
        this.client = new Client({
            intents: [
                IntentsBitField.Flags.Guilds,
                IntentsBitField.Flags.GuildMembers,
                IntentsBitField.Flags.GuildMessages,
                IntentsBitField.Flags.GuildMessageReactions,
                IntentsBitField.Flags.GuildVoiceStates,
            ],
            silent: true,
        });
    }

    public start(): void {
        this.registerListeners();
        this.client.login(process.env.DC_TOKEN as string);
    }

    private registerListeners(): void {
        this.client.once("ready", ReadyListener);
    }

    public send(embed: EmbedBuilder): void {
        let channel: Channel | undefined = this.client.channels.cache.get(process.env.DC_CHANNEL as string);
        if (channel == undefined) return;
        if (!channel.isTextBased()) return;
        let textChannel: TextChannel = channel as TextChannel;
        embed.setTimestamp();
        textChannel.send({ embeds: [embed] });
    }
}