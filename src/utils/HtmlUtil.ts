export default class HtmlUtil {
    public static trimHtml(html: string): string {
        let body: string = html.split("<body")[1].split(">").slice(1).join(">").split("</body>")[0];
        body = body.replace(/<br>/g, "\n");
        body = body.replace(/&amp;/g, "&");
        for (let i = 0; i >= 0; i++) {
            if (body.search("<div") == -1) break;
            body = this.removeHtml(body, "div");
        }
        for (let i = 0; i >= 0; i++) {
            if (body.search("<a") == -1) break;
            body = this.removeHtml(body, "a");
        }
        for (let i = 0; i >= 0; i++) {
            if (body.search("<p") == -1) break;
            body = this.removeHtml(body, "p");
        }
        for (let i = 0; i >= 0; i++) {
            if (body.search("<span") == -1) break;
            body = this.removeHtml(body, "span");
        }
        let fjcuLine: boolean = false;
        let nameLine: boolean = false;
        let noTextInTheFront: boolean = true;
        let noTextInTheBack: boolean = false;
        let list = [];
        for (let line of body.split("\n")) {
            // School name line
            if (!fjcuLine && line.trim() == "天主教輔仁大學") {
                fjcuLine = true;
                continue;
            }
            // Student name line
            if (!nameLine && line.trim().includes(" 您好！")) {
                nameLine = true;
                continue;
            }
            // Check if it's header line
            if (noTextInTheFront && this.isEmptyLine(line)) continue;
            // Check if it's bottom line
            if (line.trim() == "此為自動發送郵件，請勿直接回覆！") noTextInTheBack = true;
            if (noTextInTheBack) continue;
            // Push string
            list.push(line.trim());
            noTextInTheFront = false;
        }
        let lastLine = 0;
        for (let i = 0; i < list.length; i++) {
            if (list[i] != "") lastLine = i;
        }
        list = list.slice(0, lastLine);
        return list.join("\n");
    }

    private static removeHtml(body: string, name: string): string {
        let split = body.split(`<${name}`);
        let data = split[0] + body.split(`<${name}`).slice(1).join(`<${name}`).split(">").slice(1).join(">").split(`</${name}>`).join("");
        return data;
    }
    
    private static isEmptyLine(line: string) {
        return line.replace(/ /g, "") == "";
    }
}