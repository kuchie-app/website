---
title: Extension stores
description: "Add Mihon extension stores or Kuchie repositories to browse and read sources in the Local collection."
sidebar:
  order: 11
---

Extensions let the Local collection browse and read from sources. Kuchie reads the same extension stores as Mihon, and its own Kuchie repositories.

Kuchie doesn't come with any stores or sources, and doesn't recommend any. You choose what to add.

## Add a store

1. Go to **Browse → Extensions → Extension stores**.
2. Tap **+** and paste the store's link.
3. Go back to **Extensions** and install the extensions you want.
4. Open them from **Browse → Sources**, pick a language, and search or browse.

Store websites that offer an **Add to Mihon** button use `mihon://` or `tachiyomi://add-repo` links. Kuchie opens those directly.

## Store formats that work

| Format | Looks like |
| --- | --- |
| v2 index | a link ending in `index.pb` or `index.json` |
| `repo.json` pointing at a v2 index | a link ending in `repo.json` |
| Legacy index | a link ending in `index.min.json` |
| Add links | `mihon://add-repo?url=…`, `tachiyomi://add-repo?url=…` |

Gzipped indexes and stores that keep their list behind `extensionListUrl` work too.

## Source settings

Some sources need a server address, a login or a language. Open the source's **⋯** menu and choose **Source settings**. A few extensions only apply a changed setting after Kuchie restarts, as in Mihon.

Sources behind a Cloudflare check are solved in a hidden web view, the same way Mihon does it.

## Kuchie repositories and packages

Kuchie also has its own repository format. Add its index link the same way, or import a `.kuchie-source` or `.json` package from Files. The format is documented in the [app repository](https://github.com/kuchie-app/Kuchie/blob/main/docs/local-extensions.md).

## How well extensions work

Mihon extensions are Android packages; Kuchie runs them in an embedded runtime. It was tested against 80 public stores and 211 random extensions. The extensions that still fail have the same problems in other apps too, such as dead sites or extensions built for Mihon forks. See [Extension safety](/guides/extension-safety/) for what Kuchie checks before anything runs.
