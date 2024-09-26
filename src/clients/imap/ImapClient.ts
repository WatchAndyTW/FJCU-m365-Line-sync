import Imap from 'imap';
import ReadyListener from './listeners/ReadyListener.ts';
import EndListener from './listeners/EndListener.ts';
import ErrorListener from './listeners/ErrorListener.ts';
import MailListener from './listeners/MailListener.ts';
import ConfigUtil from '../../utils/ConfigUtil.ts';

export default class ImapClient {
    public client: Imap;
    public static enabled: boolean = false;

    constructor() {
        const config = ConfigUtil.getConfig().imap;
        this.client = new Imap({
            user: config.user,
            password: config.password,
            host: "imap.gmail.com",
            port: 993,
            tls: true,
            tlsOptions: {
                rejectUnauthorized: false
            }
        });
    }

    public start(): void {
        this.registerListeners();
        this.client.connect();
    }

    public registerListeners(): void {
        this.client.on("ready", ReadyListener);
        this.client.on('end', EndListener);
        this.client.on('error', ErrorListener);
        this.client.on('mail', MailListener);
    }
}
