---
title: Connect to your server
description: "Find your Suwayomi server from Kuchie, sign in, and fix the usual connection problems."
sidebar:
  order: 21
---

## Connect

1. Open Kuchie and choose **Server**, or switch from **More → Collection mode**.
2. Tap **Search my network** to find the server automatically, or type its address, for example `http://192.168.1.10:4567`.
3. If the server needs a login, pick the same sign-in method the server uses (**Basic auth**, **Simple login** or **UI login**) and enter your username and password.

Your library, updates, history and download queue load from the server.

## If Kuchie can't find the server

- **Local Network permission.** iOS asks whether Kuchie may find devices on your network. If you said no, turn it on in **Settings → Kuchie → Local Network**.
- **Same network.** The iPhone must be on the same Wi-Fi as the server (or on the same VPN).
- **Full address.** Include `http://` and the port: `http://192.168.1.10:4567`.
- **Is it running?** Open the same address in Safari on the iPhone. If Suwayomi's page doesn't load there, the problem is the server or the network, not Kuchie.

## If the login fails

"Those credentials didn't work" means the username, password or sign-in method doesn't match the server. Check `server.authMode` in the server settings and choose the same method in Kuchie.

## Switching servers

Offline downloads belong to the server they came from. If you connect to a different server, Kuchie asks before clearing the old server's downloads from the iPhone.
