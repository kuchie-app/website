---
title: Pasang Kuchie
description: "Pilih cara memasang Kuchie di iPhone dan apa yang dibutuhkan tiap cara."
sidebar:
  order: 2
---

Kuchie belum ada di App Store, jadi kamu memasang file IPA sendiri dan menandatanganinya dengan Apple ID milikmu. Cara ini disebut sideload. Aman selama kamu mengunduh dari halaman [Unduh](/id/download/) resmi atau [GitHub releases](https://github.com/kuchie-app/Kuchie/releases) dan [mengecek filenya](/id/guides/verify-download/).

## Pilih cara

| Cara | Butuh komputer | Refresh | Cocok untuk |
| --- | --- | --- | --- |
| [AltStore](/id/guides/install-altstore/) | Ya, untuk instal dan refresh | Tiap 7 hari dengan Apple ID gratis, lewat Wi-Fi bersama AltServer | Kebanyakan orang |
| [SideStore](/id/guides/install-sidestore/) | Hanya untuk setup pertama | Tiap 7 hari, langsung di iPhone | Yang tidak mau selalu butuh komputer |
| [Akun developer sendiri](/id/guides/install-developer/) | Ya | Setahun sekali | Anggota Apple Developer berbayar dan yang build dari source |

## Sebelum mulai

- **Developer Mode.** Di iOS 16 ke atas, app hasil sideload baru bisa dibuka setelah kamu menyalakan **Settings → Privacy & Security → Developer Mode** dan me-restart iPhone. iOS akan memintanya saat pertama kali membuka app sideload.
- **Batas Apple ID gratis.** Akun gratis hanya bisa punya tiga app sideload aktif sekaligus, dan tiap instalasi bertahan tujuh hari kecuali di-refresh. Refresh tidak menghapus library dan pengaturan.
- **Unduh IPA** bernama `Kuchie-vX.Y.Z-unsigned.ipa` dan file `.sha256` di sampingnya.

:::caution
Pasang Kuchie hanya dari kuchie.app atau github.com/kuchie-app. Salinan dari tempat lain bisa saja sudah diubah.
:::
