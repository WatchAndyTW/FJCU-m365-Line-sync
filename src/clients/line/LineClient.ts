import * as line from "@line/bot-sdk"

export default class LineClient {
    public client: line.messagingApi.MessagingApiClient;

    constructor() {
        this.client = new line.messagingApi.MessagingApiClient({
            channelAccessToken: process.env.LINE_TOKEN as string,
        });
    }
}