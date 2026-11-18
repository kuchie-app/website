---
title: Siapkan server Suwayomi
description: "Jalankan Suwayomi-Server di komputer atau server rumah supaya Kuchie bisa membaca library darinya."
sidebar:
  order: 20
---

Koleksi Server membaca dari [Suwayomi-Server](https://github.com/Suwayomi/Suwayomi-Server), server gratis dan open source yang menyimpan library, unduhan, tracker, dan backup di satu tempat. Kamu menjalankannya di komputer, NAS, atau server rumah kecil.

## Pasang Suwayomi-Server

1. Unduh rilis terbaru untuk sistemmu dari [Suwayomi-Server releases](https://github.com/Suwayomi/Suwayomi-Server/releases). Tersedia installer untuk Windows, macOS, dan Linux, juga image Docker.
2. Jalankan. Secara bawaan server memakai port **4567**.
3. Buka `http://localhost:4567` di browser komputer itu untuk memastikan server berjalan.

Extension untuk server ditambahkan di server itu sendiri; lihat [panduan extension](https://github.com/Suwayomi/Suwayomi-Server/blob/master/docs/Getting-Extensions.md) Suwayomi.

## Supaya bisa dijangkau iPhone

- Pastikan komputer dan iPhone berada di **Wi-Fi yang sama**.
- Cari alamat lokal komputer, misalnya `192.168.1.10`. Kuchie akan terhubung ke `http://192.168.1.10:4567`.
- Kalau firewall bertanya, izinkan Suwayomi di jaringan privat.

## Pilih metode login

Suwayomi bisa berjalan tanpa login, atau dengan salah satu metode ini (pengaturan server `server.authMode`):

| Metode | Kapan dipakai |
| --- | --- |
| Tanpa login | Hanya di jaringan yang kamu percaya |
| Basic Auth | Username dan password sederhana |
| Simple Login | Halaman login dengan sesi |
| UI Login | Disarankan; juga dibutuhkan untuk versi browser Suwayomi |

## Membaca di luar rumah

Jangan buka port server ke internet. Pakai jaringan privat seperti [Tailscale](https://tailscale.com) atau VPN WireGuard, lalu hubungkan Kuchie ke alamat server di jaringan itu. Chapter yang [disimpan di iPhone](/id/guides/downloads/) juga bisa dibaca tanpa koneksi sama sekali.
