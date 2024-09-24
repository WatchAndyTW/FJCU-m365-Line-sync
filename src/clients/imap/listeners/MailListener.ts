import { imap } from "../../../index.ts";
import FetchEndListener from "./FetchEndListener.ts";
import FetchMessageListener from "./FetchMessageListener.ts";

export default function Mail() {
    console.log("[IMAP] New email detected!");

    imap.client.search(["UNSEEN"], (err, results) => {
        if (err) throw err;
        if (!results || !results.length) return;

        const fetch = imap.client.fetch(results, { bodies: '' });
        fetch.on('message', FetchMessageListener);
        fetch.once('end', FetchEndListener);
    });
}