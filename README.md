English | [中文](https://github.com/WatchAndyTW/FJCU-m365-Social-sync/blob/main/README_zh-TW.md)

# FJCU-m365-Social-sync
A repository containing the source code of the bot for syncing FJCU m365 mails (TronClass) onto Social media platforms

## Usage
1. Create a Discord bot on [Discord Developer Portal](https://discord.dev) and invite it into your server (or you can fix Line API and implement the listener stuff by yourself)
2. In your m365 Outlook page, go to Settings > Mail > Forwarding, enable forwarding to a valid Gmail account (or whatever Email provider which supports IMAP)
3. Create Application Password for your Google account (you can skip this step if you are using Email provider other than Gmail)
4. Configure your environment variable:
   - IMAP_USER
   - IMAP_PASS
   - STUD_NAME
   - BOT_TOKEN
   - DC_CHANNE
5. Start the bot by command `npm run dev`
6. Enjoy!