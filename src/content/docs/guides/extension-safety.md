---
title: Extension safety
description: "What Kuchie checks before an extension runs, and what to do when it refuses one."
sidebar:
  order: 12
---

Kuchie follows Mihon's trust model and checks every extension before any of its code runs.

## What Kuchie checks

- **HTTPS only.** Store indexes, packages and icons load over HTTPS.
- **Signatures.** Every store publishes a signing key. Kuchie verifies each APK's Android signature (scheme v2 or v3): the signature, the certificate key and the digest of the whole file. A modified APK is always refused.
- **Signer matches the store.** An APK signed by anyone other than the store's key is *untrusted*. Kuchie shows the signer's fingerprint and installs it only if you choose to trust it, for that one version.
- **Stores keep their key.** A store that starts signing with a different key is treated as a different store.
- **No swapping.** An extension installed from one store can't be replaced by a package from another store.
- **Limits.** Downloads have size limits, redirects must stay on HTTPS (at most five), and the installed APK is checked again before each use.
- Only manga extensions for extension-lib 1.4 and 1.6 are listed. Anime extensions are left out.

## When Kuchie refuses something

| Message | What it means | What to do |
| --- | --- | --- |
| Untrusted signer | The APK isn't signed by the store's key | Trust it only if you know who signed it |
| Store isn't served over HTTPS | The link starts with `http://` | Use the store's `https://` link |
| Store changed its signing key | The key differs from when you added it | Remove the store and add it again if you trust the change |
| APK was modified | The file doesn't match its signature | Don't install it |
