import { Box } from "imap";
import { imap } from "../../../index.ts";

export default function Ready() {
    openInbox((err: Error | null, box: Box) => {
        if (err) throw err;
        console.log("[IMAP] Listening for new emails...");
    });
}

function openInbox(cb: (err: Error | null, box: Box) => void): void {
    imap.client.openBox('INBOX', false, cb);
};