/**
 * Home page copy. English is the source; Indonesian is written by hand.
 * Other languages fall back to English until their translations land.
 */
const en = {
  hero: {
    lines: ['Manga and webtoons', 'on iPhone, from your', 'phone or your server'],
    lede: 'Kuchie is a free, open-source reader. Import CBZ files, add extension stores, or connect to your own Suwayomi server.',
    download: 'Download for iPhone',
    altstore: 'Add to AltStore',
    meta: ['iOS 15 or later', 'Free, no account'],
    hint: 'Scroll to open the book',
    cover: { title: 'Kuchie', subtitle: 'A reader for iPhone', volume: 'Vol. 1' },
  },
  how: {
    folio: 'How it works',
    title: 'One reader, two kinds of library',
    lede: 'Kuchie is three layers. The reader on top, your library under it, and the place the chapters come from.',
    layers: {
      reader: { name: 'Reader', note: 'Webtoon and paged modes, Liquid Glass controls' },
      library: { name: 'Library', note: 'Categories, history, updates, downloads' },
      source: { name: 'Source', note: '' },
    },
    local: {
      tab: 'Local',
      title: 'Local',
      body: 'Everything stays on your iPhone. Import CBZ and ZIP archives or image folders from Files, or add extension stores.',
      items: ['The-Lost-Bookmark.cbz', 'Scans / Volume 2', 'Extension store'],
      metas: ['38 MB', '212 pages', 'verified'],
    },
    server: {
      tab: 'Server',
      title: 'Server',
      body: 'Read the library on your own Suwayomi server, with its download queue, trackers and backups. Save chapters to the iPhone for later.',
      items: ['Suwayomi', 'Library', 'Download queue'],
      metas: ['192.168.1.10:4567', '326 series', '4 chapters'],
    },
    switch: 'You can switch any time. Each collection keeps its own library.',
  },
  reading: {
    folio: 'Reading',
    steps: [
      { tag: 'Webtoon', title: 'Scroll a whole chapter like one long page', body: 'Continuous vertical reading is the default, and the next chapter starts right where this one ends.' },
      { tag: 'Paged', title: 'Turn pages right to left, left to right or down', body: 'Pick a direction for each series. The page slider starts at page 1 on the left in every direction.' },
      { tag: 'Liquid Glass', title: 'Controls that stay out of the way', body: 'On iOS 26 the reader, search and tab bar use Liquid Glass. Earlier versions get the standard controls.' },
      { tag: 'Offline', title: 'Save chapters and watch them in the Dynamic Island', body: 'Downloads keep going in the background, with the bookmark scarf and a progress ring in Live Activities.' },
    ],
    phone: {
      series: 'The Lost Bookmark',
      chapter: 'Chapter 3',
      mode: 'Reading mode',
      modes: ['Webtoon', 'Right to left', 'Left to right', 'Vertical'],
      downloading: 'Chapter 4',
      pages: '18 of 29 pages',
    },
  },
  safety: {
    folio: 'Extensions',
    title: 'Every extension is checked before it runs',
    lede: "Kuchie verifies each APK's signature against the key of the store it came from, the same trust model Mihon uses. Tampered packages, plain-HTTP stores and stores that change their key are refused.",
    link: 'How Kuchie decides an APK is safe',
    replay: 'Replay',
    slips: [
      { name: 'moonlit-reader-1.4.2.apk', check: 'Signed by the store key', verdict: 'Verified' },
      { name: 'panel-house-2.0.1.apk', check: 'Signature scheme v3, key matches', verdict: 'Verified' },
      { name: 'moonlit-reader-1.4.2.apk', check: 'Signed by a different key', verdict: 'Refused' },
      { name: 'http://mirror.example/index.json', check: 'Store is not served over HTTPS', verdict: 'Refused' },
    ],
  },
  page: {
    shelf: 'Covers of made-up series. Your library is whatever you import or follow.',
    folio: 'Everything else',
    title: 'The parts you use every day',
    panels: {
      library: { title: 'Library', body: 'Categories, filters, sorting, unread badges, a duplicate finder, ratings, notes and tags.' },
      updates: { title: 'Updates and history', body: 'New chapters for both collections, and resume where you left off.' },
      server: { title: 'Trackers, backups, migration', body: 'Server tools for Suwayomi, from tracker links to moving a series to another source.' },
      languages: { title: '23 languages', body: 'With right-to-left layouts for Arabic.' },
      themes: { title: 'Themes and Liquid Glass', body: 'Light, dark and pure black, with Liquid Glass controls on iOS 26.' },
      offline: { title: 'Offline chapters', body: 'Saved chapters read without a connection, in both collections.' },
    },
  },
  oss: {
    folio: 'Open source',
    title: 'Free, open source, and built on work we credit',
    lede: "Kuchie is based on Suwayomi-Tsumiru and follows Mihon's extension format and trust model.",
    stores: 'stores tested',
    extensions: 'extensions tested',
  },
  faq: {
    folio: 'Questions',
    title: 'Before you install',
    all: 'All questions',
    items: [
      { q: "Why isn't Kuchie on the App Store?", a: "Not yet. Kuchie is still being polished, and the plan is to bring it to the App Store if things go well. Until then you install the IPA with AltStore, SideStore or your own developer account." },
      { q: 'Will there be an Android or desktop version?', a: 'Yes, both are planned if things go well.' },
      { q: 'Is Kuchie free?', a: 'Yes, completely. No ads, no in-app purchases and no account.' },
      { q: 'Does Kuchie come with manga?', a: "No. Kuchie doesn't host or provide content. You choose what to read and where it comes from." },
      { q: "What's the difference between Local and Server?", a: 'Local keeps everything on the iPhone. Server reads from your Suwayomi server. Each keeps its own library, and you can switch any time.' },
      { q: 'Will I lose my library when I update?', a: 'No. Install the new IPA over the old one. The bundle ID stays app.kuchie.reader.' },
    ],
  },
  back: {
    title: 'Start reading',
    body: 'Free, open source, and yours to keep.',
    barcode: 'KUCHIE',
  },
};

export type HomeCopy = typeof en;

const id: HomeCopy = {
  hero: {
    lines: ['Manga dan webtoon', 'di iPhone, dari ponselmu', 'atau servermu sendiri'],
    lede: 'Kuchie adalah pembaca gratis dan open source. Impor file CBZ, tambahkan extension store, atau hubungkan ke server Suwayomi milikmu.',
    download: 'Unduh untuk iPhone',
    altstore: 'Tambah ke AltStore',
    meta: ['iOS 15 atau lebih baru', 'Gratis, tanpa akun'],
    hint: 'Scroll untuk membuka buku',
    cover: { title: 'Kuchie', subtitle: 'Pembaca untuk iPhone', volume: 'Vol. 1' },
  },
  how: {
    folio: 'Cara kerja',
    title: 'Satu pembaca, dua jenis library',
    lede: 'Kuchie terdiri dari tiga lapisan. Reader di atas, library di bawahnya, dan tempat asal chapter.',
    layers: {
      reader: { name: 'Reader', note: 'Mode webtoon dan paged, kontrol Liquid Glass' },
      library: { name: 'Library', note: 'Kategori, riwayat, update, unduhan' },
      source: { name: 'Sumber', note: '' },
    },
    local: {
      tab: 'Local',
      title: 'Local',
      body: 'Semuanya tersimpan di iPhone. Impor arsip CBZ dan ZIP atau folder gambar dari Files, atau tambahkan extension store.',
      items: ['The-Lost-Bookmark.cbz', 'Scans / Volume 2', 'Extension store'],
      metas: ['38 MB', '212 halaman', 'terverifikasi'],
    },
    server: {
      tab: 'Server',
      title: 'Server',
      body: 'Baca library di server Suwayomi milikmu, lengkap dengan antrean unduhan, tracker, dan backup. Simpan chapter ke iPhone untuk dibaca nanti.',
      items: ['Suwayomi', 'Library', 'Antrean unduhan'],
      metas: ['192.168.1.10:4567', '326 judul', '4 chapter'],
    },
    switch: 'Bisa ganti kapan saja. Setiap koleksi punya library sendiri.',
  },
  reading: {
    folio: 'Membaca',
    steps: [
      { tag: 'Webtoon', title: 'Gulir satu chapter seperti satu halaman panjang', body: 'Membaca vertikal bersambung adalah mode bawaan, dan chapter berikutnya langsung menyambung di akhir chapter ini.' },
      { tag: 'Paged', title: 'Balik halaman kanan-ke-kiri, kiri-ke-kanan, atau ke bawah', body: 'Pilih arah untuk tiap judul. Slider halaman selalu mulai dari halaman 1 di kiri, apa pun arahnya.' },
      { tag: 'Liquid Glass', title: 'Kontrol yang tidak menghalangi', body: 'Di iOS 26, reader, pencarian, dan tab bar memakai Liquid Glass. Versi sebelumnya memakai kontrol standar.' },
      { tag: 'Offline', title: 'Simpan chapter dan pantau di Dynamic Island', body: 'Unduhan tetap berjalan di latar belakang, dengan syal penanda dan cincin progres di Live Activities.' },
    ],
    phone: {
      series: 'The Lost Bookmark',
      chapter: 'Chapter 3',
      mode: 'Mode baca',
      modes: ['Webtoon', 'Kanan ke kiri', 'Kiri ke kanan', 'Vertikal'],
      downloading: 'Chapter 4',
      pages: '18 dari 29 halaman',
    },
  },
  safety: {
    folio: 'Extensions',
    title: 'Setiap extension dicek sebelum dijalankan',
    lede: 'Kuchie mencocokkan tanda tangan setiap APK dengan kunci store asalnya, model kepercayaan yang sama dengan Mihon. Paket yang diubah, store HTTP biasa, dan store yang mengganti kuncinya akan ditolak.',
    link: 'Cara Kuchie memutuskan APK aman',
    replay: 'Ulangi',
    slips: [
      { name: 'moonlit-reader-1.4.2.apk', check: 'Ditandatangani kunci store', verdict: 'Terverifikasi' },
      { name: 'panel-house-2.0.1.apk', check: 'Signature scheme v3, kunci cocok', verdict: 'Terverifikasi' },
      { name: 'moonlit-reader-1.4.2.apk', check: 'Ditandatangani kunci lain', verdict: 'Ditolak' },
      { name: 'http://mirror.example/index.json', check: 'Store tidak memakai HTTPS', verdict: 'Ditolak' },
    ],
  },
  page: {
    shelf: 'Sampul seri fiksi. Library-mu berisi apa pun yang kamu impor atau ikuti.',
    folio: 'Lainnya',
    title: 'Hal-hal yang dipakai setiap hari',
    panels: {
      library: { title: 'Library', body: 'Kategori, filter, urutan, badge belum dibaca, pencari duplikat, rating, catatan, dan tag.' },
      updates: { title: 'Update dan riwayat', body: 'Chapter baru untuk kedua koleksi, dan lanjutkan dari terakhir dibaca.' },
      server: { title: 'Tracker, backup, migrasi', body: 'Alat server untuk Suwayomi, dari tautan tracker sampai memindahkan judul ke sumber lain.' },
      languages: { title: '23 bahasa', body: 'Termasuk tata letak kanan-ke-kiri untuk Arab.' },
      themes: { title: 'Tema dan Liquid Glass', body: 'Terang, gelap, dan pure black, dengan kontrol Liquid Glass di iOS 26.' },
      offline: { title: 'Chapter offline', body: 'Chapter tersimpan bisa dibaca tanpa koneksi, di kedua koleksi.' },
    },
  },
  oss: {
    folio: 'Open source',
    title: 'Gratis, open source, dan menghargai karya yang mendasarinya',
    lede: 'Kuchie berbasis Suwayomi-Tsumiru dan mengikuti format serta model kepercayaan extension Mihon.',
    stores: 'store diuji',
    extensions: 'extension diuji',
  },
  faq: {
    folio: 'Pertanyaan',
    title: 'Sebelum memasang',
    all: 'Semua pertanyaan',
    items: [
      { q: 'Kenapa Kuchie tidak ada di App Store?', a: 'Belum. Kuchie masih dalam proses penyempurnaan, dan rencananya akan masuk App Store kalau semuanya lancar. Sampai saat itu, pasang IPA-nya lewat AltStore, SideStore, atau akun developer sendiri.' },
      { q: 'Apakah akan ada versi Android atau desktop?', a: 'Ya, keduanya direncanakan kalau semuanya lancar.' },
      { q: 'Apakah Kuchie menyediakan manga?', a: 'Tidak. Kuchie tidak meng-host atau menyediakan konten. Kamu yang memilih apa yang dibaca dan dari mana sumbernya.' },
      { q: 'Apa beda Local dan Server?', a: 'Local menyimpan semuanya di iPhone. Server membaca dari server Suwayomi milikmu. Setiap koleksi punya library sendiri, dan bisa ganti kapan saja.' },
      { q: 'Apakah library hilang saat update?', a: 'Tidak. Pasang IPA baru di atas yang lama. Bundle ID tetap app.kuchie.reader.' },
    ],
  },
  back: {
    title: 'Mulai membaca',
    body: 'Gratis, open source, dan milikmu.',
    barcode: 'KUCHIE',
  },
};

const copies: Record<string, HomeCopy> = { en, id };

export function homeCopy(slug: string): HomeCopy {
  return copies[slug] ?? en;
}

export const LANGUAGE_SAMPLES = [
  'Library', 'Perpustakaan', 'ライブラリ', '书库', '라이브러리', 'Bibliothèque', 'Biblioteca',
  'Bibliothek', 'Библиотека', 'Thư viện', 'คลัง', 'Kütüphane', 'المكتبة', 'Бібліотека', 'Bibliotheek',
];
