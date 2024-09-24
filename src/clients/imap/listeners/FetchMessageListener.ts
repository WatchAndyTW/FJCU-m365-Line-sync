import { ImapMessage } from "imap";
import { ParsedMail, simpleParser } from 'mailparser';
import { Readable } from 'stream';
import HtmlUtil from '../../../utils/HtmlUtil.ts';
import { EmbedBuilder } from 'discord.js';
import { discord, imap } from '../../../index.ts';

export default function FetchMessage(msg: ImapMessage, seqNo: number) {
    msg.on('body', (stream) => {
        const mailStream = stream as unknown as Readable;
        simpleParser(mailStream, (err: any, parsed: ParsedMail) => {
            if (err) throw err;
            if (parsed.from?.text != "elearn@mail.fju.edu.tw") return;
            imap.client.addFlags(seqNo, "\\Seen", (err: any) => {
                if (err) {
                    console.log(err);
                }
            });
            if (parsed.html as string != null) {
                let trimmed: string = HtmlUtil.trimHtml(parsed.html as string);
                let embed: EmbedBuilder = new EmbedBuilder();
                embed.setDescription(`\`\`\`${trimmed}\`\`\``);
                embed.setColor("Random");
                discord.send(embed);
            }
        });
    });
}