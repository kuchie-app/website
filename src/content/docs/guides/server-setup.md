---
title: Set up a Suwayomi server
description: "Run Suwayomi-Server on a computer or home server so Kuchie can read your library from it."
sidebar:
  order: 20
---

The Server collection reads from [Suwayomi-Server](https://github.com/Suwayomi/Suwayomi-Server), a free, open-source server that keeps your library, downloads, trackers and backups in one place. You run it on a computer, a NAS or a small home server.

## Install Suwayomi-Server

1. Download the latest release for your system from [Suwayomi-Server releases](https://github.com/Suwayomi/Suwayomi-Server/releases). There are installers for Windows, macOS and Linux, and Docker images.
2. Start it. By default it listens on port **4567**.
3. Open `http://localhost:4567` in a browser on that computer to check it's running.

Extensions for the server are added on the server itself; see Suwayomi's [extensions guide](https://github.com/Suwayomi/Suwayomi-Server/blob/master/docs/Getting-Extensions.md).

## Make it reachable from the iPhone

- Keep the computer and the iPhone on the **same Wi-Fi**.
- Find the computer's local address, for example `192.168.1.10`. Kuchie will connect to `http://192.168.1.10:4567`.
- If a firewall asks, allow Suwayomi on private networks.

## Choose a sign-in method

Suwayomi can run without a login, or with one of these (server setting `server.authMode`):

| Method | When to use it |
| --- | --- |
| No login | Only on a network you trust |
| Basic Auth | Simple username and password |
| Simple Login | A login page with a session |
| UI Login | Recommended; also needed for Suwayomi's browser version |

## Reading away from home

Don't open the server's port to the internet. Use a private network instead, such as [Tailscale](https://tailscale.com) or a WireGuard VPN, and connect Kuchie to the server's address on that network. Chapters you [saved to the iPhone](/guides/downloads/) also work with no connection at all.
