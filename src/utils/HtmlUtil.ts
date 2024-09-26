import { JSDOM } from 'jsdom';
import ConfigUtil from './ConfigUtil.ts';

export default class HtmlUtil {
    public static trimHtml(html: string): string {
        let body: string = html.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0];
        body = body.replace(/<br>/g, "\n");
        body = body.replace(/&amp;/g, "&");
        const dom = new JSDOM(body);
        body = dom.window.document.body.textContent as string;
        let fjcuLine: boolean = false;
        let nameLine: boolean = false;
        let noTextInTheFront: boolean = true;
        let list = [];
        for (let line of body.split("\n")) {
            // School name line
            if (!fjcuLine && line.trim() == "天主教輔仁大學") {
                fjcuLine = true;
                continue;
            }
            // Student name line
            const stud_name = ConfigUtil.getConfig().imap.student_name;
            if (!nameLine && line.trim().includes(stud_name)) {
                nameLine = true;
                body.replace(stud_name, "同學們");
                continue;
            }
            // Check if it's header line
            if (noTextInTheFront && this.isEmptyLine(line)) continue;
            // Push string
            list.push(line.trim());
            noTextInTheFront = false;
        }
        let lastLine = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i] != "") lastLine = i;
        }
        list = list.slice(0, lastLine);
        return list.join("\n").replace(/\n+$/, "");
    }
    
    private static isEmptyLine(line: string) {
        return line.replace(/ /g, "") == "";
    }
}