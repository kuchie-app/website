---
title: Check your download
description: "Make sure the Kuchie IPA you downloaded is the one that was published."
sidebar:
  order: 6
---

Every release publishes a `.sha256` file next to the IPA. If the checksum of your download matches it, the file wasn't changed on the way.

The current checksum is also on the [Download](/download/) page.

## macOS and Linux

```sh
shasum -a 256 Kuchie-v1.0.0-unsigned.ipa
```

## Windows (PowerShell)

```powershell
Get-FileHash .\Kuchie-v1.0.0-unsigned.ipa -Algorithm SHA256
```

Compare the long string it prints with the one in the `.sha256` file. They must be identical. If they aren't, delete the file and download it again from the official page.
