---
title: Hubungkan ke server
description: "Temukan server Suwayomi dari Kuchie, login, dan atasi masalah koneksi yang umum."
sidebar:
  order: 21
---

## Hubungkan

1. Buka Kuchie dan pilih **Server**, atau ganti dari **More → Collection mode**.
2. Ketuk **Search my network** untuk mencari server otomatis, atau ketik alamatnya, misalnya `http://192.168.1.10:4567`.
3. Kalau server butuh login, pilih metode yang sama dengan yang dipakai server (**Basic auth**, **Simple login**, atau **UI login**) lalu isi username dan password.

Library, update, riwayat, dan antrean unduhan dimuat dari server.

## Kalau server tidak ditemukan

- **Izin Local Network.** iOS menanyakan apakah Kuchie boleh mencari perangkat di jaringanmu. Kalau kamu menolak, nyalakan di **Settings → Kuchie → Local Network**.
- **Jaringan yang sama.** iPhone harus di Wi-Fi yang sama dengan server (atau VPN yang sama).
- **Alamat lengkap.** Sertakan `http://` dan port: `http://192.168.1.10:4567`.
- **Server berjalan?** Buka alamat yang sama di Safari iPhone. Kalau halaman Suwayomi tidak muncul, masalahnya ada di server atau jaringan, bukan di Kuchie.

## Kalau login gagal

"Those credentials didn't work" berarti username, password, atau metode login tidak cocok dengan server. Cek `server.authMode` di pengaturan server dan pilih metode yang sama di Kuchie.

## Berganti server

Unduhan offline terikat dengan server asalnya. Kalau kamu terhubung ke server lain, Kuchie akan bertanya dulu sebelum menghapus unduhan server lama dari iPhone.
