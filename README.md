# Roblox Birthday Updater

A Vercel-ready website to update your Roblox account birthday to **January 21, 2015** using the Roblox Open Cloud API.

## 🚀 Features

- Modern UI built with Next.js and Tailwind CSS.
- Secure API interaction with Roblox Open Cloud.
- Easy to deploy on Vercel.

## 🛠️ How to use

1.  **Get your User ID**: Find your Roblox User ID from your profile URL (e.g., `https://www.roblox.com/users/12345678/profile`).
2.  **Create an API Key**:
    -   Go to the [Roblox Creator Dashboard](https://create.roblox.com/dashboard/credentials).
    -   Select **Open Cloud** -> **API Keys**.
    -   Create a new API Key.
    -   Add the **"Accounts"** permission with **Write** access.
    -   (Optional) Restrict the IP address for security.
3.  **Deploy to Vercel**:
    -   Push this code to a GitHub repository.
    -   Import the repository into Vercel.
4.  **Update**:
    -   Enter your **User ID** and **API Key** in the web interface.
    -   Click **Update Birthday**.

## ⚠️ Security Warning

**Never share your API Key with anyone.** This website sends the API key from the client to the server-side API route to perform the request. For maximum security, it is recommended to set up the API key as an environment variable (`ROBLOX_API_KEY`) on Vercel if you only plan to use it for one account.

## 📄 API Reference

This project uses the Roblox Open Cloud v2 Accounts API:
`PATCH https://apis.roblox.com/cloud/v2/accounts/{userId}?updateMask=birthday`

Payload:
```json
{
  "birthday": {
    "year": 2015,
    "month": 1,
    "day": 21
  }
}
```
