---
title: Pasang lewat SideStore
description: "Pasang Kuchie dengan SideStore, yang me-refresh app langsung di iPhone tanpa komputer."
sidebar:
  order: 4
---

SideStore adalah turunan AltStore yang me-refresh app langsung di iPhone, jadi komputer hanya dibutuhkan untuk setup pertama.

## 1. Siapkan SideStore

Ikuti panduan resmi di [docs.sidestore.io](https://docs.sidestore.io). Singkatnya: kamu memasang SideStore sekali dari komputer, memberinya pairing file untuk iPhone-mu, lalu menyalakan VPN atau penghubung kecil yang dipakainya untuk menandatangani app di perangkat. Di iOS 16 ke atas, nyalakan juga **Settings → Privacy & Security → Developer Mode**.

Langkah tepatnya berubah antar versi SideStore, jadi ikuti panduan mereka, bukan video lama.

## 2. Pasang Kuchie

**Lewat source**

Di SideStore, buka **Sources**, ketuk **+**, lalu tambahkan:

```
https://kuchie.app/altstore.json
```

Buka Kuchie di source itu dan ketuk **Get**.

**Lewat file IPA**

Unduh `Kuchie-vX.Y.Z-unsigned.ipa` ke iPhone, buka SideStore → **My Apps**, ketuk **+**, lalu pilih filenya.

## 3. Jaga tetap aktif

Dengan Apple ID gratis, refresh dalam tujuh hari: buka SideStore dengan penghubungnya menyala, lalu ketuk **Refresh All**. Kalau Kuchie kedaluwarsa, refresh dengan cara yang sama; library tetap ada.
