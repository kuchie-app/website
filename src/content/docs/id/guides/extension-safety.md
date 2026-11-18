---
title: Keamanan extension
description: "Apa yang dicek Kuchie sebelum extension berjalan, dan apa yang harus dilakukan saat ditolak."
sidebar:
  order: 12
---

Kuchie mengikuti model kepercayaan Mihon dan mengecek setiap extension sebelum kodenya berjalan.

## Yang dicek

- **Hanya HTTPS.** Index store, paket, dan ikon dimuat lewat HTTPS.
- **Tanda tangan.** Setiap store menerbitkan kunci tanda tangan. Kuchie memverifikasi tanda tangan Android setiap APK (skema v2 atau v3): tanda tangannya, kunci sertifikat, dan digest seluruh file. APK yang diubah selalu ditolak.
- **Penanda tangan cocok dengan store.** APK yang ditandatangani pihak lain selain kunci store dianggap *tidak tepercaya*. Kuchie menampilkan sidik jari penanda tangannya dan hanya memasangnya kalau kamu memilih untuk memercayainya, khusus untuk versi itu.
- **Store tetap memakai kuncinya.** Store yang mulai menandatangani dengan kunci lain dianggap store yang berbeda.
- **Tidak bisa ditukar.** Extension dari satu store tidak bisa diganti paket dari store lain.
- **Batas.** Unduhan punya batas ukuran, redirect harus tetap HTTPS (maksimal lima kali), dan APK terpasang dicek ulang setiap kali dipakai.
- Hanya extension manga untuk extension-lib 1.4 dan 1.6 yang ditampilkan. Extension anime tidak disertakan.

## Saat Kuchie menolak

| Pesan | Artinya | Yang harus dilakukan |
| --- | --- | --- |
| Penanda tangan tidak tepercaya | APK tidak ditandatangani kunci store | Percayai hanya kalau kamu tahu siapa penanda tangannya |
| Store tidak memakai HTTPS | Link diawali `http://` | Pakai link `https://` store itu |
| Store mengganti kunci | Kuncinya berbeda dari saat ditambahkan | Hapus store lalu tambahkan lagi kalau kamu percaya perubahannya |
| APK diubah | File tidak cocok dengan tanda tangannya | Jangan dipasang |
