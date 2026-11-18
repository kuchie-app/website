---
title: Pemecahan masalah
description: "Solusi untuk masalah yang paling sering ditemui, dari instalasi sampai membaca."
sidebar:
  order: 40
---

## Instalasi

**"Unable to install" atau "integrity could not be verified"**
IPA belum ditandatangani untuk perangkatmu. Pasang lewat AltStore, SideStore, atau alat penandatangan, jangan membuka file secara langsung.

**App tidak bisa dibuka setelah beberapa hari**
Dengan Apple ID gratis, instalasi kedaluwarsa setelah tujuh hari. [Refresh](/id/guides/updating/#kalau-app-tidak-bisa-dibuka); tidak ada yang hilang.

**"Developer Mode required"**
Nyalakan **Settings → Privacy & Security → Developer Mode**, restart, lalu konfirmasi.

**"Maximum number of apps"**
Apple ID gratis hanya mengizinkan tiga app sideload sekaligus. Hapus salah satu di AltStore atau SideStore.

## Server

**Search my network tidak menemukan apa pun**
Izinkan **Settings → Kuchie → Local Network**, pastikan kedua perangkat di Wi-Fi yang sama, dan coba alamat lengkap, misalnya `http://192.168.1.10:4567`.

**Login gagal**
Pakai metode login yang sama di Kuchie dengan `server.authMode` di server.

## Extension

**Extension tidak mau terpasang**
Baca pesannya; [Keamanan extension](/id/guides/extension-safety/#saat-kuchie-menolak) menjelaskan masing-masing.

**Sumber menampilkan halaman pengecekan atau error**
Sebagian situs memakai pengecekan Cloudflare; Kuchie menyelesaikannya di web view tersembunyi, tapi situs yang sedang mati atau memblokir app tidak bisa diperbaiki dari Kuchie. Coba lagi nanti atau pakai sumber lain.

**Pengaturan tidak berpengaruh**
Beberapa extension baru menerapkan pengaturan setelah Kuchie dibuka ulang.

## Melaporkan bug

Salin crash log dari pengaturan Kuchie (berisi error terbaru dan diagnostik reader), lalu buka [issue di GitHub](https://github.com/kuchie-app/Kuchie/issues) dengan apa yang kamu lakukan, apa yang kamu harapkan, dan versi iOS-mu.
