import * as line from "@line/bot-sdk";
import ConfigUtil from "../../utils/ConfigUtil.ts";

export default class LineClient {
    public client: line.messagingApi.MessagingApiClient;
    public static enabled: boolean = false;

    constructor() {
        this.client = new line.messagingApi.MessagingApiClient({
            channelAccessToken: ConfigUtil.getConfig().line.token,
        });
        console.log("[LINE] Bot started");
    }

    public async send(text: string) {
        this.client.pushMessage({
            to: ConfigUtil.getConfig().line.group,
            messages: [
                {
                    type: "text",
                    text,
                }
            ],
        });
    }
}