---
title: Install with SideStore
description: "Install Kuchie with SideStore, which refreshes apps on the iPhone without a computer."
sidebar:
  order: 4
---

SideStore is a fork of AltStore that refreshes apps on the iPhone itself, so you only need a computer for the first setup.

## 1. Set up SideStore

Follow the official guide at [docs.sidestore.io](https://docs.sidestore.io). In short, you install SideStore once from a computer, give it a pairing file for your iPhone, and turn on the small VPN or connection helper it uses to sign apps on the device. On iOS 16 or later, also turn on **Settings → Privacy & Security → Developer Mode**.

The exact steps change between SideStore versions, so use their guide rather than an old video.

## 2. Install Kuchie

**With the source**

On the iPhone, open the [Download](/download/) page and tap **Add to SideStore**. Or copy the source link shown there, then in SideStore open **Sources**, tap **+** and paste it.

Then open Kuchie in the source and tap **Get**.

**With the IPA file**

Download `Kuchie-vX.Y.Z-unsigned.ipa` to the iPhone, open SideStore → **My Apps**, tap **+** and choose the file.

## 3. Keep it refreshed

With a free Apple ID, refresh within seven days: open SideStore with its connection helper turned on and tap **Refresh All**. If Kuchie expires, refresh it the same way; your library stays.
