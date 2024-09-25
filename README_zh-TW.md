[English](https://github.com/WatchAndyTW/FJCU-m365-Social-sync/blob/main/README.md) | 中文

# FJCU-m365-Social-sync
一個用於將輔仁大學 m365 郵件（TronClass）同步到社交媒體平台的機器人源代碼庫

## 使用方法
1. 在 [Discord Developer Portal](https://discord.dev) 創建一個 Discord 機器人，並將其邀請到您的伺服器中（或者您可以自行修復 Line API 並實現 Listener 相關函數）
2. 在您的 m365 Outlook 頁面，前往設定 > 郵件 > 轉寄，啟用轉寄到有效的 Gmail 帳戶（或任何支援 IMAP 的電子郵件提供商）
3. 為您的 Google 帳戶創建應用程式密碼（如果您使用的電子郵件提供商不是 Gmail，可以跳過此步驟）
4. 配置您的環境變數:
   - IMAP_USER
   - IMAP_PASS
   - STUD_NAME
   - BOT_TOKEN
   - DC_CHANNE
5. 運行指令 `npm run dev` 來啟動機器人
6. 完成！

<small>本 README 翻譯由 ChatGPT 提供</small>