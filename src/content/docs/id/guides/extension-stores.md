---
title: Extension store
description: "Tambahkan extension store Mihon atau repository Kuchie untuk menjelajah dan membaca sumber di koleksi Local."
sidebar:
  order: 11
---

Extension membuat koleksi Local bisa menjelajah dan membaca dari berbagai sumber. Kuchie membaca extension store yang sama dengan Mihon, ditambah repository Kuchie sendiri.

Kuchie tidak menyertakan store atau sumber apa pun, dan tidak merekomendasikan satu pun. Kamu yang memilih apa yang ditambahkan.

## Tambah store

1. Buka **Browse → Extensions → Extension stores**.
2. Ketuk **+** dan tempel link store.
3. Kembali ke **Extensions** dan pasang extension yang kamu mau.
4. Buka dari **Browse → Sources**, pilih bahasa, lalu cari atau jelajahi.

Situs store yang punya tombol **Add to Mihon** memakai link `mihon://` atau `tachiyomi://add-repo`. Kuchie bisa membukanya langsung.

## Format store yang didukung

| Format | Contoh bentuk |
| --- | --- |
| Index v2 | link berakhiran `index.pb` atau `index.json` |
| `repo.json` yang menunjuk index v2 | link berakhiran `repo.json` |
| Index lama | link berakhiran `index.min.json` |
| Link tambah | `mihon://add-repo?url=…`, `tachiyomi://add-repo?url=…` |

Index yang di-gzip dan store yang menyimpan daftarnya di `extensionListUrl` juga bisa.

## Pengaturan sumber

Sebagian sumber butuh alamat server, login, atau bahasa. Buka menu **⋯** sumber itu lalu pilih **Source settings**. Beberapa extension baru menerapkan pengaturan setelah Kuchie dibuka ulang, sama seperti di Mihon.

Sumber yang memakai pengecekan Cloudflare diselesaikan di web view tersembunyi, dengan cara yang sama seperti Mihon.

## Repository dan paket Kuchie

Kuchie juga punya format repository sendiri. Tambahkan link index-nya dengan cara yang sama, atau impor paket `.kuchie-source` atau `.json` dari Files. Formatnya dijelaskan di [repository app](https://github.com/kuchie-app/Kuchie/blob/main/docs/local-extensions.md).

## Seberapa baik extension berjalan

Extension Mihon adalah paket Android; Kuchie menjalankannya di runtime bawaan. Kuchie diuji dengan 80 store publik dan 211 extension acak. Extension yang masih gagal punya masalah yang sama di app lain juga, misalnya situs yang sudah mati atau extension untuk turunan Mihon. Lihat [Keamanan extension](/id/guides/extension-safety/) untuk apa saja yang dicek sebelum extension berjalan.
