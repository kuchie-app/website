---
title: Cek file unduhan
description: "Pastikan IPA Kuchie yang kamu unduh sama dengan yang dirilis."
sidebar:
  order: 6
---

Setiap rilis menyertakan file `.sha256` di samping IPA. Kalau checksum file unduhanmu cocok dengan isinya, file itu tidak berubah di perjalanan.

Checksum terbaru juga ada di halaman [Unduh](/id/download/).

## macOS dan Linux

```sh
shasum -a 256 Kuchie-v1.0.0-unsigned.ipa
```

## Windows (PowerShell)

```powershell
Get-FileHash .\Kuchie-v1.0.0-unsigned.ipa -Algorithm SHA256
```

Bandingkan deretan karakter panjang yang muncul dengan isi file `.sha256`. Keduanya harus persis sama. Kalau berbeda, hapus filenya dan unduh lagi dari halaman resmi.
