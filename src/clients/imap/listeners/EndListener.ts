import { imap } from "../../../index.ts";

export default function End() {
    console.log('Connection ended');
    imap.start();
}