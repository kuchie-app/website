---
title: Troubleshooting
description: "Fixes for the problems people run into most, from installing to reading."
sidebar:
  order: 40
---

## Installing

**"Unable to install" or "integrity could not be verified"**
The IPA wasn't signed for your device. Install it through AltStore, SideStore or a signing tool, not by opening the file directly.

**The app won't open after a few days**
With a free Apple ID, installs expire after seven days. [Refresh it](/guides/updating/#when-the-app-wont-open); nothing is lost.

**"Developer Mode required"**
Turn on **Settings → Privacy & Security → Developer Mode**, restart, and confirm.

**"Maximum number of apps"**
A free Apple ID allows three sideloaded apps at a time. Remove one in AltStore or SideStore.

## Server

**Search my network finds nothing**
Allow **Settings → Kuchie → Local Network**, make sure both devices are on the same Wi-Fi, and try the full address, for example `http://192.168.1.10:4567`.

**Login fails**
Use the same sign-in method in Kuchie as `server.authMode` on the server.

## Extensions

**An extension won't install**
Read the message; [Extension safety](/guides/extension-safety/#when-kuchie-refuses-something) explains each one.

**A source shows a check page or errors**
Some sites use a Cloudflare check; Kuchie solves it in a hidden web view, but a site that is down or blocks apps can't be fixed from Kuchie. Try again later or use another source.

**A setting didn't take effect**
Some extensions only apply settings after Kuchie restarts.

## Reporting a bug

Copy the crash log from Kuchie's settings (it holds recent errors and reader diagnostics) and open an [issue on GitHub](https://github.com/kuchie-app/Kuchie/issues) with what you did, what you expected, and your iOS version.
