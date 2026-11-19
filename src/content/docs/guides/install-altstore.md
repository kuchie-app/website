---
title: Install with AltStore
description: "Step-by-step install of Kuchie with AltStore and AltServer, and how to keep it refreshed."
sidebar:
  order: 3
---

AltStore signs Kuchie with your Apple ID and refreshes it from a computer on the same Wi-Fi.

## 1. Set up AltStore

1. On your Mac or Windows PC, download **AltServer** from [altstore.io](https://altstore.io) and open it. On Windows, iTunes and iCloud from Apple's website are required.
2. Connect the iPhone with a cable and tap **Trust** on the iPhone if asked.
3. From the AltServer menu (menu bar on Mac, system tray on Windows), choose **Install AltStore** and pick your iPhone. Sign in with your Apple ID when asked.
4. On iOS 16 or later, turn on **Settings → Privacy & Security → Developer Mode**, restart, and confirm.
5. Open AltStore once on the iPhone.

## 2. Install Kuchie

You can add the Kuchie source so updates show up in AltStore, or install the file directly.

**With the source (recommended)**

1. On the iPhone, open the [Download](/download/) page and tap **Add to AltStore**, or copy the source link shown on that page and add it in AltStore under **Browse → Sources → +**.
2. Find Kuchie in the source and tap **Get**.

**With the IPA file**

1. Download `Kuchie-vX.Y.Z-unsigned.ipa` to the iPhone (it lands in Files).
2. In AltStore, open **My Apps**, tap **+** and choose the IPA.

Keep the iPhone on the same Wi-Fi as the computer while it installs.

## 3. Keep it refreshed

With a free Apple ID, apps signed by AltStore stop opening after seven days. AltStore refreshes them in the background when the iPhone and the computer running AltServer are on the same Wi-Fi. You can also open **My Apps** and tap **Refresh All**.

If Kuchie has expired, it won't open, but nothing is lost. Refresh it and your library, history and downloads are still there.

## Updating

When a new version is out, AltStore shows it under **My Apps** if you added the source. Otherwise install the new IPA the same way; it replaces the old one and keeps your data. See [Updating Kuchie](/guides/updating/).
