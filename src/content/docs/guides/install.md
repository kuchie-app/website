---
title: Install Kuchie
description: "Choose how to install Kuchie on your iPhone, and what each method needs."
sidebar:
  order: 2
---

Kuchie isn't on the App Store yet, so you install the IPA file yourself and sign it with your own Apple ID. This is called sideloading. It's safe as long as you download from the official [Download](/download/) page or [GitHub releases](https://github.com/kuchie-app/Kuchie/releases) and [check the file](/guides/verify-download/).

## Pick a method

| Method | Needs a computer | Refresh | Good for |
| --- | --- | --- | --- |
| [AltStore](/guides/install-altstore/) | Yes, to install and refresh | Every 7 days with a free Apple ID, over Wi-Fi with AltServer | Most people |
| [SideStore](/guides/install-sidestore/) | Only for the first setup | Every 7 days, on the iPhone itself | People who don't want to keep a computer around |
| [Your own developer account](/guides/install-developer/) | Yes | Once a year | Paid Apple Developer members and people building from source |

## Before you start

- **Developer Mode.** On iOS 16 and later, sideloaded apps only open after you turn on **Settings → Privacy & Security → Developer Mode** and restart the iPhone. iOS asks for it the first time you open a sideloaded app.
- **Free Apple ID limits.** A free account can have three sideloaded apps active at a time, and each install lasts seven days unless refreshed. Refreshing keeps your library and settings.
- **Download the IPA** named `Kuchie-vX.Y.Z-unsigned.ipa` and the `.sha256` file next to it.

:::caution
Only install Kuchie from this website or github.com/kuchie-app. Copies from other places may be modified.
:::
