---
title: Pasang dengan akun developer sendiri
description: "Tanda tangani Kuchie dengan akun Apple Developer berbayar, atau build dari source dengan Xcode."
sidebar:
  order: 5
---

Dengan akun Apple Developer berbayar, instalasi bertahan setahun dan tidak ada batas tiga app.

## Tanda tangani IPA rilis

Alat penandatangan apa pun yang menerima sertifikat developer-mu bisa dipakai, termasuk AltStore dan SideStore yang masuk dengan akun itu. Tanda tangani `Kuchie-vX.Y.Z-unsigned.ipa`, lalu pasang dengan alat yang sama.

Kuchie memakai bundle ID `app.kuchie.reader`, dan extension Live Activity-nya memakai `app.kuchie.reader.DownloadLiveActivity`. Sebagian alat mengganti bundle ID dengan yang terdaftar di tim-mu; itu tidak masalah, tapi pakai ID yang sama setiap update supaya datamu ikut.

## Build dari source

Kamu butuh Mac dengan Xcode 26 atau lebih baru dan versi Flutter yang ditetapkan di repository.

```sh
git clone https://github.com/kuchie-app/Kuchie.git
cd Kuchie
tool/bootstrap
```

Untuk menjalankan extension APK Mihon di perangkat, siapkan runtime bawaan dulu (butuh JDK 21):

```sh
ios/MihonRuntime/prepare.sh
```

Lalu buka `ios/Runner.xcworkspace`, pilih tim untuk **Runner** dan **DownloadLiveActivity**, isi bundle ID yang terdaftar di tim itu, dan jalankan di iPhone.

Build tanpa runtime tetap mendukung koleksi Server, repository Kuchie, dan impor file. [README](https://github.com/kuchie-app/Kuchie#build-from-source) berisi detail lengkapnya.
