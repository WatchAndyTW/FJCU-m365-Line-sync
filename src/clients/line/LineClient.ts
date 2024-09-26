import * as line from "@line/bot-sdk";

export default class LineClient {
    public client: line.messagingApi.MessagingApiClient;
    public static enabled: boolean = false;

    constructor() {
        this.client = new line.messagingApi.MessagingApiClient({
            channelAccessToken: process.env.LINE_TOKEN as string,
        });
        console.log("[LINE] Bot started");
    }

    public async send(text: string) {
        this.client.pushMessage({
            to: process.env.LINE_GROUP as string,
            messages: [
                {
                    type: "text",
                    text,
                }
            ],
        });
    }
}