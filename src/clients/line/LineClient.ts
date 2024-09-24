import { Client } from "@evex/linejs";
import PincallListener from "./listeners/PincallListener.ts";
import { FileStorage } from "@evex/linejs/storage";

export default class LineClient {
    public client: Client;

    constructor() {
        this.client = new Client({
            storage: new FileStorage("./storage.json"),
        });
    }

    public async start() {
        this.registerListeners();
        await this.client.login({
            email: process.env.LINE_USER,
            password: process.env.LINE_PASS,
            pincode: "122101"
        });
    }

    public registerListeners(): void {
        this.client.on("pincall", PincallListener);
        this.client.on("ready", async (user) => {
            console.log(`[LINE] Logged in as ${user.displayName} (${user.mid});`);
            const chat = await this.client.getChat({
                gid: process.env.LINE_MID as string,
            });
        });
    }

    private async getGroupMids() {
        const mids = await this.client.getAllChatMids()
        const chats = await this.client.getChats({
            gids: mids.memberChatMids
        });
        for (let chat of chats.chats) {
            console.log(chat.chatName, chat.chatMid);
        }
    }
}