import { middleware } from "@line/bot-sdk";
import express from "express";
import ConfigUtil from "../../utils/ConfigUtil.ts";
import { existsSync, readFileSync, writeFileSync } from "fs";
import { line } from "../../index.ts";

export default class LineWebServer {
    public app = express();

    constructor() { }

    public start(): void {
        const mdw = middleware({
            channelSecret: ConfigUtil.getConfig().lineWebhook.secret,
        });
        this.app.post("/*", mdw, async (req, res) => {
            try {
                let groups: { [key: string]: any } = {};
                if (existsSync("./groups.json")) {
                    groups = JSON.parse(readFileSync("./groups.json", "utf8"));
                }
                for (let event of req.body.events) {
                    let group = await line.client.getGroupSummary((event as any).source.groupId);
                    groups[(event as any).source.groupId] = group;
                }
                writeFileSync("./groups.json", JSON.stringify(groups, null, 4));
            } catch (e) {
                console.log(e);
            }
            res.sendStatus(200);
        });
        this.app.listen(ConfigUtil.getConfig().lineWebhook.port);
        console.log(`[LINE] Webhook is listening at ${ConfigUtil.getConfig().lineWebhook.port}`);
    }
}