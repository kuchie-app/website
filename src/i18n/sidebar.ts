/**
 * Starlight sidebar. Group labels are translated per BCP-47 `lang`; page
 * titles come from each page's frontmatter in its own language (English when
 * a page isn't translated yet).
 */
type Labels = Record<string, string>;

const group = (label: string, translations: Labels, slugs: string[]) => ({
  label,
  translations,
  items: slugs.map((s) => `guides/${s}`),
});

export const sidebar = [
  group(
    'Start here',
    {
      id: 'Mulai di sini', ar: 'ابدأ هنا', ca: 'Comença aquí', de: 'Erste Schritte', es: 'Empieza aquí', fil: 'Magsimula rito',
      fr: 'Commencer', it: 'Inizia qui', ja: 'はじめに', ko: '시작하기', nb: 'Kom i gang', nl: 'Begin hier',
      'pt-BR': 'Comece aqui', 'pt-PT': 'Comece aqui', ru: 'Начало', ta: 'இங்கே தொடங்கவும்', th: 'เริ่มต้น',
      tr: 'Buradan başlayın', uk: 'Початок', vi: 'Bắt đầu', 'zh-CN': '从这里开始', 'zh-TW': '從這裡開始',
    },
    ['getting-started'],
  ),
  group(
    'Install',
    {
      id: 'Instalasi', ar: 'التثبيت', ca: 'Instal·lació', de: 'Installation', es: 'Instalación', fil: 'Pag-install',
      fr: 'Installation', it: 'Installazione', ja: 'インストール', ko: '설치', nb: 'Installasjon', nl: 'Installatie',
      'pt-BR': 'Instalação', 'pt-PT': 'Instalação', ru: 'Установка', ta: 'நிறுவல்', th: 'การติดตั้ง',
      tr: 'Kurulum', uk: 'Встановлення', vi: 'Cài đặt', 'zh-CN': '安装', 'zh-TW': '安裝',
    },
    ['install', 'install-altstore', 'install-sidestore', 'install-developer', 'verify-download', 'updating'],
  ),
  group(
    'Local collection',
    {
      id: 'Koleksi Local', ar: 'المجموعة المحلية', ca: 'Col·lecció local', de: 'Lokale Sammlung', es: 'Colección local',
      fil: 'Lokal na koleksiyon', fr: 'Collection locale', it: 'Collezione locale', ja: 'ローカル', ko: '로컬 컬렉션',
      nb: 'Lokal samling', nl: 'Lokale collectie', 'pt-BR': 'Coleção local', 'pt-PT': 'Coleção local', ru: 'Локальная коллекция',
      ta: 'உள்ளூர் தொகுப்பு', th: 'คอลเลกชันในเครื่อง', tr: 'Yerel koleksiyon', uk: 'Локальна колекція', vi: 'Bộ sưu tập cục bộ',
      'zh-CN': '本地收藏', 'zh-TW': '本機收藏',
    },
    ['local-library', 'extension-stores', 'extension-safety'],
  ),
  group(
    'Server collection',
    {
      id: 'Koleksi Server', ar: 'مجموعة الخادم', ca: 'Col·lecció del servidor', de: 'Server-Sammlung', es: 'Colección del servidor',
      fil: 'Koleksiyon sa server', fr: 'Collection serveur', it: 'Collezione server', ja: 'サーバー', ko: '서버 컬렉션',
      nb: 'Serversamling', nl: 'Servercollectie', 'pt-BR': 'Coleção do servidor', 'pt-PT': 'Coleção do servidor', ru: 'Коллекция сервера',
      ta: 'சேவையகத் தொகுப்பு', th: 'คอลเลกชันเซิร์ฟเวอร์', tr: 'Sunucu koleksiyonu', uk: 'Колекція сервера', vi: 'Bộ sưu tập máy chủ',
      'zh-CN': '服务器收藏', 'zh-TW': '伺服器收藏',
    },
    ['server-setup', 'server-connect', 'trackers-backups'],
  ),
  group(
    'Reading',
    {
      id: 'Membaca', ar: 'القراءة', ca: 'Lectura', de: 'Lesen', es: 'Lectura', fil: 'Pagbabasa', fr: 'Lecture', it: 'Lettura',
      ja: '読む', ko: '읽기', nb: 'Lesing', nl: 'Lezen', 'pt-BR': 'Leitura', 'pt-PT': 'Leitura', ru: 'Чтение', ta: 'வாசிப்பு',
      th: 'การอ่าน', tr: 'Okuma', uk: 'Читання', vi: 'Đọc', 'zh-CN': '阅读', 'zh-TW': '閱讀',
    },
    ['reader', 'library', 'downloads', 'appearance'],
  ),
  group(
    'Help',
    {
      id: 'Bantuan', ar: 'المساعدة', ca: 'Ajuda', de: 'Hilfe', es: 'Ayuda', fil: 'Tulong', fr: 'Aide', it: 'Aiuto', ja: 'ヘルプ',
      ko: '도움말', nb: 'Hjelp', nl: 'Hulp', 'pt-BR': 'Ajuda', 'pt-PT': 'Ajuda', ru: 'Помощь', ta: 'உதவி', th: 'ความช่วยเหลือ',
      tr: 'Yardım', uk: 'Допомога', vi: 'Trợ giúp', 'zh-CN': '帮助', 'zh-TW': '說明',
    },
    ['troubleshooting'],
  ),
];
