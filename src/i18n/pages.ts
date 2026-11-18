/**
 * Copy for the Features, Download, Changelog and FAQ pages.
 * English is the source; Indonesian is written by hand. Other languages fall
 * back to English until translated.
 */
const en = {
  features: {
    title: 'Features',
    lede: 'Everything Kuchie does, grouped the way you use it. Nothing here needs an account.',
    nav: 'On this page',
    groups: [
      {
        id: 'collections',
        title: 'Two collections',
        body: 'Choose Local or Server the first time you open Kuchie, and switch any time. Each keeps its own library, history and downloads.',
        items: [
          ['Local', 'Library, history and downloads on the iPhone. Import CBZ/ZIP archives and image folders, or add extension stores.'],
          ['Server', 'Read your Suwayomi library with its download queue, trackers and backups. Network discovery finds the server for you.'],
          ['Switch any time', 'From Library or More → Collection mode. Nothing is mixed or deleted when you switch.'],
        ],
      },
      {
        id: 'reader',
        title: 'Reader',
        body: 'Made for long webtoons and for right-to-left manga alike.',
        items: [
          ['Webtoon and paged modes', 'Continuous vertical, paged right to left, left to right and vertical. Auto mode opens manhwa and webtoons as strips.'],
          ['Chapter to chapter', 'The next chapter starts where this one ends, with optional swipe between chapters.'],
          ['Tap zones and zoom', 'Invert or shrink tap zones, pinch or double tap to zoom, crop borders and double-page spreads.'],
          ['Liquid Glass', 'On iOS 26 the reader, search and tab bar use Liquid Glass. The page slider starts at page 1 on the left in every direction.'],
        ],
      },
      {
        id: 'library',
        title: 'Library',
        body: 'Sort a few titles or a few hundred.',
        items: [
          ['Categories', 'Tabs, hidden categories, a default category, and sorting and filters per category.'],
          ['Filters, sorting, badges', 'Unread, downloaded, tracked and tagged, with badges you can reorder.'],
          ['Tags, notes, ratings', 'Your own tags, notes and ratings on every title, all searchable.'],
          ['Duplicate finder', 'Finds titles that look like the same series so you can tidy up.'],
        ],
      },
      {
        id: 'offline',
        title: 'Updates, history and offline',
        body: 'Pick up where you left off, with or without a connection.',
        items: [
          ['Updates and history', 'New chapters for both collections, and resume where you left off.'],
          ['On-device downloads', 'Keep chapters on the iPhone, Wi-Fi only if you like, cleaned up automatically after a while.'],
          ['Live Activities', 'Download progress in the Dynamic Island, with the bookmark scarf and a progress ring.'],
        ],
      },
      {
        id: 'extensions',
        title: 'Extensions',
        body: 'The Local collection reads Mihon extension stores and Kuchie repositories.',
        items: [
          ['Mihon stores', 'v2 indexes, repo.json, legacy index.min.json and mihon:// or tachiyomi:// links.'],
          ['Checked before they run', 'APK signatures are verified against the store key. Tampered packages and plain-HTTP stores are refused.'],
          ['Source settings and Cloudflare', 'Per-source settings, and Cloudflare checks solved in a hidden web view.'],
        ],
      },
      {
        id: 'server',
        title: 'Server tools',
        body: 'Everything Suwayomi can do, from the iPhone.',
        items: [
          ['Trackers', 'Log in to the tracking sites your server supports and keep progress in sync.'],
          ['Backups', 'Create, restore and schedule backups on the server.'],
          ['Migration', 'Move titles to another source with their chapters, categories and tracking.'],
        ],
      },
      {
        id: 'appearance',
        title: 'Appearance and languages',
        body: 'Make it yours.',
        items: [
          ['Themes', 'Light, dark and pure black.'],
          ['App icons', 'Alternate Home Screen icons.'],
          ['23 languages', 'Including right-to-left layouts for Arabic.'],
        ],
      },
    ],
    compare: {
      title: 'Local and Server side by side',
      rows: [
        ['Where the library lives', 'On the iPhone', 'On your server'],
        ['Add titles from', 'Files, folders, extension stores', 'Your server’s sources'],
        ['Progress and history', 'On the iPhone', 'Synced with the server'],
        ['Offline reading', 'Saved chapters', 'On-device downloads'],
        ['Trackers, backups, migration', '—', 'Yes'],
        ['Needs a computer running', 'No', 'The server, unless reading offline'],
      ],
      cols: ['', 'Local', 'Server'],
    },
    cta: 'Read the guides',
  },
  download: {
    title: 'Download Kuchie',
    lede: 'Kuchie is an IPA you sign with your own Apple ID. It takes a few minutes the first time.',
    latest: 'Latest release',
    released: 'Released',
    size: 'Size',
    requires: 'Requires',
    requiresValue: 'iOS 15 or later',
    downloadIpa: 'Download IPA',
    altstore: 'Add to AltStore',
    sidestore: 'Add to SideStore',
    source: 'Source link for AltStore and SideStore',
    sha: 'SHA-256',
    copy: 'Copy',
    copied: 'Copied',
    notes: 'Release notes',
    methodsTitle: 'Choose how to install',
    methods: [
      ['AltStore', 'Install and refresh from a computer on the same Wi-Fi.', 'install-altstore'],
      ['SideStore', 'Refresh on the iPhone itself after a one-time setup.', 'install-sidestore'],
      ['Your developer account', 'Sign it yourself or build from source. Lasts a year.', 'install-developer'],
    ],
    verifyTitle: 'Check the file',
    verifyBody: 'Compare the checksum of your download with the one above.',
    older: 'Earlier releases',
    allReleases: 'All releases on GitHub',
    help: 'Stuck? Read the install guide',
  },
  changelog: {
    title: 'Changelog',
    lede: 'Every Kuchie release, straight from GitHub. This page updates by itself when a new version is published.',
    onGithub: 'View on GitHub',
    download: 'Download',
    latest: 'Latest',
    updated: 'Last checked',
  },
  faq: {
    title: 'Questions',
    lede: 'Short answers to what people ask before and after installing Kuchie.',
    more: 'Still stuck? Read the guides or ask on GitHub.',
    groups: [
      {
        title: 'About Kuchie',
        items: [
          ['What is Kuchie?', 'A free, open-source reader for manga and webtoons on iPhone. It reads from files on your iPhone, from extension stores, or from your own Suwayomi server.'],
          ['Is Kuchie free?', 'Yes, completely. No ads, no in-app purchases and no account. Thank you if you were thinking of donating; there’s no donation option for now.'],
          ['Who makes Kuchie?', 'Kuchie is a personal project by one developer.'],
          ['Does Kuchie work on iPad?', 'Kuchie installs and runs on iPad, but it’s designed for iPhone first. A layout made for the bigger screen is planned.'],
          ['Does Kuchie come with manga?', 'No. Kuchie doesn’t host or provide any content. You choose what to read and where it comes from.'],
          ['Why isn’t Kuchie on the App Store?', 'Not yet. Kuchie is still being polished, and the plan is to bring it to the App Store if things go well. Until then it’s installed as an IPA.'],
          ['Will there be an Android or desktop version?', 'Yes, both are planned if things go well. The app is built with Flutter, so the same code can run there later.'],
          ['Does Kuchie collect my data?', 'Kuchie has no analytics or tracking. It talks only to the server, stores and sources you add, and to GitHub to check for updates.'],
          ['Where can I ask questions?', 'On GitHub for now. If enough people are interested, a community group will follow, probably on Discord.'],
        ],
      },
      {
        title: 'Installing',
        items: [
          ['Why do I need AltStore or SideStore?', 'Apps outside the App Store have to be signed for your device. AltStore and SideStore do that with your own Apple ID.'],
          ['Do I need a paid developer account?', 'No. A free Apple ID works. A paid account only makes installs last a year instead of seven days.'],
          ['Why does Kuchie stop opening after a week?', 'Installs signed with a free Apple ID expire after seven days. Refresh it in AltStore or SideStore; nothing is lost.'],
          ['Will I lose my library when I update?', 'No. Install the new IPA over the old one. Don’t delete the app first.'],
          ['Is there a beta or TestFlight?', 'No. Kuchie is made by one developer, so new versions go straight to the regular release. The changelog lists every one.'],
        ],
      },
      {
        title: 'Collections and extensions',
        items: [
          ['What’s the difference between Local and Server?', 'Local keeps everything on the iPhone. Server reads from your Suwayomi server. Each keeps its own library, and you can switch any time.'],
          ['Can I move my library between Local and Server?', 'Not yet. Local and Server are kept separate, and so are their downloads.'],
          ['Can I bring my Mihon or Tachiyomi library?', 'Yes. Open Backup and restore and choose your .tachibk backup. It’s restored to your Suwayomi server, so it appears in the Server collection.'],
          ['Which files can I import?', 'CBZ and ZIP archives, and folders of images (JPG, PNG, GIF, WebP, BMP and AVIF). CBR, CB7, PDF and EPUB aren’t supported yet.'],
          ['Does the Local collection sync over iCloud?', 'Not yet. Syncing between devices is planned.'],
          ['Can Kuchie read from Komga, Kavita or other servers?', 'Only Suwayomi for now. Support for more servers is planned.'],
          ['Does the server have to be on?', 'Yes, to browse and sync. Chapters you saved to the iPhone still open without it.'],
          ['Are Mihon extensions safe to run?', 'Kuchie checks every APK’s signature against its store’s key before any code runs, and refuses modified packages and plain-HTTP stores.'],
          ['Where do I find extension stores?', 'Kuchie doesn’t include or recommend any. It accepts any store link Mihon accepts.'],
          ['Why doesn’t an extension work?', 'Some sites are down, block apps, or need settings. Extensions built for Mihon forks may not work either.'],
        ],
      },
    ],
  },
};

export type PagesCopy = typeof en;

const id: PagesCopy = {
  features: {
    title: 'Fitur',
    lede: 'Semua yang bisa dilakukan Kuchie, dikelompokkan sesuai cara kamu memakainya. Tidak ada yang butuh akun.',
    nav: 'Di halaman ini',
    groups: [
      {
        id: 'collections',
        title: 'Dua koleksi',
        body: 'Pilih Local atau Server saat pertama membuka Kuchie, dan ganti kapan saja. Setiap koleksi punya library, riwayat, dan unduhan sendiri.',
        items: [
          ['Local', 'Library, riwayat, dan unduhan di iPhone. Impor arsip CBZ/ZIP dan folder gambar, atau tambahkan extension store.'],
          ['Server', 'Baca library Suwayomi lengkap dengan antrean unduhan, tracker, dan backup. Network discovery menemukan server untukmu.'],
          ['Ganti kapan saja', 'Dari Library atau More → Collection mode. Tidak ada yang tercampur atau terhapus.'],
        ],
      },
      {
        id: 'reader',
        title: 'Reader',
        body: 'Dibuat untuk webtoon panjang maupun manga kanan-ke-kiri.',
        items: [
          ['Mode webtoon dan paged', 'Vertikal bersambung, paged kanan-ke-kiri, kiri-ke-kanan, dan vertikal. Mode otomatis membuka manhwa dan webtoon sebagai strip.'],
          ['Chapter ke chapter', 'Chapter berikutnya langsung menyambung, dengan opsi swipe antar chapter.'],
          ['Tap zone dan zoom', 'Balik atau perkecil tap zone, cubit atau ketuk dua kali untuk zoom, crop borders, dan halaman ganda.'],
          ['Liquid Glass', 'Di iOS 26, reader, pencarian, dan tab bar memakai Liquid Glass. Slider halaman selalu mulai dari halaman 1 di kiri.'],
        ],
      },
      {
        id: 'library',
        title: 'Library',
        body: 'Rapikan beberapa judul atau ratusan.',
        items: [
          ['Kategori', 'Tab, kategori tersembunyi, kategori bawaan, serta urutan dan filter per kategori.'],
          ['Filter, urutan, badge', 'Belum dibaca, sudah diunduh, di-track, dan bertag, dengan badge yang bisa diatur.'],
          ['Tag, catatan, rating', 'Tag, catatan, dan rating sendiri di setiap judul, semuanya bisa dicari.'],
          ['Pencari duplikat', 'Menemukan judul yang tampaknya seri yang sama supaya bisa dirapikan.'],
        ],
      },
      {
        id: 'offline',
        title: 'Update, riwayat, dan offline',
        body: 'Lanjutkan dari terakhir dibaca, dengan atau tanpa koneksi.',
        items: [
          ['Update dan riwayat', 'Chapter baru untuk kedua koleksi, dan lanjutkan dari terakhir dibaca.'],
          ['Unduhan di perangkat', 'Simpan chapter di iPhone, bisa hanya lewat Wi-Fi, dan dibersihkan otomatis setelah beberapa waktu.'],
          ['Live Activities', 'Progres unduhan di Dynamic Island, dengan syal penanda dan cincin progres.'],
        ],
      },
      {
        id: 'extensions',
        title: 'Extension',
        body: 'Koleksi Local membaca extension store Mihon dan repository Kuchie.',
        items: [
          ['Store Mihon', 'Index v2, repo.json, index.min.json lama, dan link mihon:// atau tachiyomi://.'],
          ['Dicek sebelum berjalan', 'Tanda tangan APK dicocokkan dengan kunci store. Paket yang diubah dan store HTTP biasa ditolak.'],
          ['Pengaturan sumber dan Cloudflare', 'Pengaturan per sumber, dan pengecekan Cloudflare diselesaikan di web view tersembunyi.'],
        ],
      },
      {
        id: 'server',
        title: 'Alat server',
        body: 'Semua yang bisa dilakukan Suwayomi, dari iPhone.',
        items: [
          ['Tracker', 'Login ke situs tracker yang didukung server dan jaga progres tetap sinkron.'],
          ['Backup', 'Buat, pulihkan, dan jadwalkan backup di server.'],
          ['Migrasi', 'Pindahkan judul ke sumber lain beserta chapter, kategori, dan tracking-nya.'],
        ],
      },
      {
        id: 'appearance',
        title: 'Tampilan dan bahasa',
        body: 'Sesuaikan dengan seleramu.',
        items: [
          ['Tema', 'Terang, gelap, dan pure black.'],
          ['Ikon app', 'Ikon Home Screen alternatif.'],
          ['23 bahasa', 'Termasuk tata letak kanan-ke-kiri untuk Arab.'],
        ],
      },
    ],
    compare: {
      title: 'Local dan Server berdampingan',
      rows: [
        ['Tempat library', 'Di iPhone', 'Di servermu'],
        ['Menambah judul dari', 'File, folder, extension store', 'Sumber di server'],
        ['Progres dan riwayat', 'Di iPhone', 'Tersinkron dengan server'],
        ['Baca offline', 'Chapter tersimpan', 'Unduhan di perangkat'],
        ['Tracker, backup, migrasi', '—', 'Ya'],
        ['Butuh komputer menyala', 'Tidak', 'Server, kecuali baca offline'],
      ],
      cols: ['', 'Local', 'Server'],
    },
    cta: 'Baca panduan',
  },
  download: {
    title: 'Unduh Kuchie',
    lede: 'Kuchie berupa IPA yang kamu tanda tangani dengan Apple ID sendiri. Pertama kali butuh beberapa menit.',
    latest: 'Rilis terbaru',
    released: 'Dirilis',
    size: 'Ukuran',
    requires: 'Butuh',
    requiresValue: 'iOS 15 atau lebih baru',
    downloadIpa: 'Unduh IPA',
    altstore: 'Tambah ke AltStore',
    sidestore: 'Tambah ke SideStore',
    source: 'Link source untuk AltStore dan SideStore',
    sha: 'SHA-256',
    copy: 'Salin',
    copied: 'Tersalin',
    notes: 'Catatan rilis',
    methodsTitle: 'Pilih cara instal',
    methods: [
      ['AltStore', 'Instal dan refresh dari komputer di Wi-Fi yang sama.', 'install-altstore'],
      ['SideStore', 'Refresh langsung di iPhone setelah setup sekali.', 'install-sidestore'],
      ['Akun developer sendiri', 'Tanda tangani sendiri atau build dari source. Bertahan setahun.', 'install-developer'],
    ],
    verifyTitle: 'Cek file',
    verifyBody: 'Bandingkan checksum file unduhanmu dengan yang di atas.',
    older: 'Rilis sebelumnya',
    allReleases: 'Semua rilis di GitHub',
    help: 'Bingung? Baca panduan instal',
  },
  changelog: {
    title: 'Changelog',
    lede: 'Setiap rilis Kuchie, langsung dari GitHub. Halaman ini diperbarui otomatis saat versi baru terbit.',
    onGithub: 'Lihat di GitHub',
    download: 'Unduh',
    latest: 'Terbaru',
    updated: 'Terakhir dicek',
  },
  faq: {
    title: 'Pertanyaan',
    lede: 'Jawaban singkat untuk pertanyaan sebelum dan sesudah memasang Kuchie.',
    more: 'Masih bingung? Baca panduan atau tanya di GitHub.',
    groups: [
      {
        title: 'Tentang Kuchie',
        items: [
          ['Apa itu Kuchie?', 'Pembaca manga dan webtoon untuk iPhone yang gratis dan open source. Kuchie membaca dari file di iPhone, dari extension store, atau dari server Suwayomi milikmu.'],
          ['Apakah Kuchie gratis?', 'Ya, sepenuhnya. Tanpa iklan, tanpa pembelian dalam app, dan tanpa akun. Terima kasih kalau kamu berniat berdonasi; untuk saat ini belum ada opsi donasi.'],
          ['Siapa yang membuat Kuchie?', 'Kuchie adalah proyek pribadi satu developer.'],
          ['Apakah Kuchie bisa dipakai di iPad?', 'Kuchie bisa dipasang dan berjalan di iPad, tapi desainnya fokus ke iPhone. Tata letak khusus layar besar direncanakan.'],
          ['Apakah Kuchie menyediakan manga?', 'Tidak. Kuchie tidak meng-host atau menyediakan konten apa pun. Kamu yang memilih apa yang dibaca dan dari mana sumbernya.'],
          ['Kenapa Kuchie tidak ada di App Store?', 'Belum. Kuchie masih dalam proses penyempurnaan, dan rencananya akan masuk App Store kalau semuanya lancar. Sampai saat itu, Kuchie dipasang sebagai IPA.'],
          ['Apakah akan ada versi Android atau desktop?', 'Ya, keduanya direncanakan kalau semuanya lancar. App ini dibuat dengan Flutter, jadi kode yang sama bisa dijalankan di sana nanti.'],
          ['Apakah Kuchie mengumpulkan data?', 'Kuchie tidak punya analytics atau pelacakan. Kuchie hanya terhubung ke server, store, dan sumber yang kamu tambahkan, serta ke GitHub untuk mengecek update.'],
          ['Di mana bisa bertanya?', 'Untuk sekarang di GitHub. Kalau banyak yang tertarik, akan ada grup komunitas, kemungkinan di Discord.'],
        ],
      },
      {
        title: 'Instalasi',
        items: [
          ['Kenapa butuh AltStore atau SideStore?', 'App di luar App Store harus ditandatangani untuk perangkatmu. AltStore dan SideStore melakukannya dengan Apple ID milikmu.'],
          ['Apakah butuh akun developer berbayar?', 'Tidak. Apple ID gratis bisa dipakai. Akun berbayar hanya membuat instalasi bertahan setahun, bukan tujuh hari.'],
          ['Kenapa Kuchie tidak bisa dibuka setelah seminggu?', 'Instalasi dengan Apple ID gratis kedaluwarsa setelah tujuh hari. Refresh di AltStore atau SideStore; tidak ada yang hilang.'],
          ['Apakah library hilang saat update?', 'Tidak. Pasang IPA baru di atas yang lama. Jangan hapus app-nya dulu.'],
          ['Apakah ada versi beta atau TestFlight?', 'Tidak. Kuchie dikerjakan satu developer, jadi versi baru langsung dirilis sebagai rilis biasa. Semuanya tercatat di changelog.'],
        ],
      },
      {
        title: 'Koleksi dan extension',
        items: [
          ['Apa beda Local dan Server?', 'Local menyimpan semuanya di iPhone. Server membaca dari server Suwayomi milikmu. Setiap koleksi punya library sendiri, dan bisa ganti kapan saja.'],
          ['Bisakah library dipindah antara Local dan Server?', 'Belum. Local dan Server terpisah, begitu juga unduhannya.'],
          ['Bisakah membawa library dari Mihon atau Tachiyomi?', 'Bisa. Buka Backup and restore lalu pilih file backup .tachibk. Backup dipulihkan ke server Suwayomi, jadi muncul di koleksi Server.'],
          ['File apa saja yang bisa diimpor?', 'Arsip CBZ dan ZIP, serta folder gambar (JPG, PNG, GIF, WebP, BMP, dan AVIF). CBR, CB7, PDF, dan EPUB belum didukung.'],
          ['Apakah koleksi Local tersinkron lewat iCloud?', 'Belum. Sinkronisasi antar perangkat sudah masuk rencana.'],
          ['Bisakah Kuchie membaca dari Komga, Kavita, atau server lain?', 'Untuk sekarang baru Suwayomi. Dukungan server lain direncanakan.'],
          ['Apakah server harus menyala?', 'Ya, untuk menjelajah dan sinkron. Chapter yang disimpan di iPhone tetap bisa dibuka tanpa server.'],
          ['Apakah extension Mihon aman?', 'Kuchie mengecek tanda tangan setiap APK dengan kunci store-nya sebelum kode apa pun berjalan, dan menolak paket yang diubah serta store HTTP biasa.'],
          ['Di mana mencari extension store?', 'Kuchie tidak menyertakan atau merekomendasikan store apa pun. Kuchie menerima link store apa pun yang diterima Mihon.'],
          ['Kenapa sebuah extension tidak jalan?', 'Sebagian situs sedang mati, memblokir app, atau butuh pengaturan. Extension untuk turunan Mihon juga mungkin tidak jalan.'],
        ],
      },
    ],
  },
};

const copies: Record<string, PagesCopy> = { en, id };

export function pagesCopy(slug: string): PagesCopy {
  return copies[slug] ?? en;
}
