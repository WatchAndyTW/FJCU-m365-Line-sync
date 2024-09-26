import { middleware } from "@line/bot-sdk";
import express from "express";
import ConfigUtil from "../../utils/ConfigUtil.ts";
import { existsSync, mkdirSync, writeFileSync } from "fs";

export default class LineWebServer {
    public app = express();

    constructor() { }

    public start(): void {
        const mdw = middleware({
            channelSecret: ConfigUtil.getConfig().lineWebhook.secret,
        });
        this.app.post("/*", mdw, (req, res) => {
            try {
                if(!existsSync("groups")) {
                    mkdirSync("groups");
                }
                writeFileSync(`./groups/${req.body.events[0].source.groupId}.json`, JSON.stringify(req.body.events[0], null, 4));
            } catch { }
            res.sendStatus(200);
        });
        this.app.listen(ConfigUtil.getConfig().lineWebhook.port);
        console.log("[LINE] Webhook is listening at 5678");
    }
}