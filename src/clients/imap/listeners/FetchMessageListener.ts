import { ImapMessage } from "imap";
import { ParsedMail, simpleParser } from 'mailparser';
import { Readable } from 'stream';
import HtmlUtil from '../../../utils/HtmlUtil.ts';
import { imap } from '../../../index.ts';
import MsgUtil from "../../../utils/MsgUtil.ts";
import ConfigUtil from "../../../utils/ConfigUtil.ts";

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
            if ((parsed.html as string) == null) return;
            if (ConfigUtil.checkIfIgnoreCourse(parsed.subject as string)) return;
            let trimmed: string = HtmlUtil.trimHtml(parsed.html as string);
            MsgUtil.send(parsed.subject as string, trimmed);
        });
    });
}