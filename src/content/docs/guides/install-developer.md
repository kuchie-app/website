---
title: Install with your own developer account
description: "Sign Kuchie with a paid Apple Developer account, or build it from source with Xcode."
sidebar:
  order: 5
---

With a paid Apple Developer account, a signed install lasts a year and has no three-app limit.

## Sign the released IPA

Any signing tool that accepts your developer certificate works, including AltStore and SideStore signed in with that account. Sign `Kuchie-vX.Y.Z-unsigned.ipa`, then install it with the same tool.

Kuchie uses the bundle ID `app.kuchie.reader`, and its Live Activity extension uses `app.kuchie.reader.DownloadLiveActivity`. Some tools change bundle IDs to ones registered to your team; that's fine, but keep the same ID between updates so your data carries over.

## Build from source

You need a Mac with Xcode 26 or newer and the Flutter version pinned in the repository.

```sh
git clone https://github.com/kuchie-app/Kuchie.git
cd Kuchie
tool/bootstrap
```

To run Mihon APK extensions on a device, prepare the embedded runtime first (needs JDK 21):

```sh
ios/MihonRuntime/prepare.sh
```

Then open `ios/Runner.xcworkspace`, choose your team for **Runner** and **DownloadLiveActivity**, set bundle IDs registered to that team, and run on your iPhone.

Builds without the runtime still support the Server collection, Kuchie repositories and file imports. The [README](https://github.com/kuchie-app/Kuchie#build-from-source) has the full details.
