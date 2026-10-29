/**
 * Languages: Dutch (default, no prefix) and French (/fr/...).
 * Page-specific copy lives next to the page (src/views); texts shared by several
 * components live in `ui` below. URLs differ per language, so every page tells the
 * layout where its counterpart lives (`alternate`) for the language switch and hreflang.
 */
export type Lang = 'nl' | 'fr';

export const langFromUrl = (url: URL): Lang => (url.pathname === '/fr' || url.pathname.startsWith('/fr/') ? 'fr' : 'nl');
export const other = (lang: Lang): Lang => (lang === 'nl' ? 'fr' : 'nl');

/** Fixed pages. The blog only exists in Dutch. */
export const paths = {
  home: { nl: '/', fr: '/fr' },
  vochtcheck: { nl: '/vochtcheck', fr: '/fr/test-humidite' },
  werkgebied: { nl: '/werkgebied', fr: '/fr/zone-intervention' },
  offerte: { nl: '/offerte-aanvragen', fr: '/fr/demande-devis' },
  contact: { nl: '/contact', fr: '/fr/contact' },
  bedankt: { nl: '/bedankt', fr: '/fr/merci' },
  privacy: { nl: '/privacy', fr: '/fr/vie-privee' },
  blog: { nl: '/blog', fr: '/blog' },
} as const;
export type PageKey = keyof typeof paths;

export const ui = {
  nl: {
    home: 'Home',
    services: 'Diensten',
    /** Header button, mobile bar. */
    quote: 'Offerte aanvragen',
    /** Mobile bar: little room. */
    quoteShort: 'Offerte aanvragen',
    /** The main call to action, the same everywhere on the site. */
    requestQuote: 'Vraag advies of offerte aan',
    callUs: 'Bel ons',
    doVochtcheck: 'Doe de vochtcheck',
    readMore: 'Lees meer',
    nav: [
      { label: 'Vochtcheck', key: 'vochtcheck' },
      { label: 'Werkgebied', key: 'werkgebied' },
      { label: 'Blog', key: 'blog' },
      { label: 'Contact', key: 'contact' },
    ] as { label: string; key: PageKey }[],
    toHome: 'Dryhouse, naar de startpagina',
    mainMenu: 'Hoofdmenu',
    chooseCountry: 'Kies je land',
    chooseLanguage: 'Taal',
    menuOpen: 'Menu openen',
    menuClose: 'Menu sluiten',
    skip: 'Naar de inhoud',
    breadcrumb: 'Kruimelpad',
    countries: { be: 'België', nl: 'Nederland' },
    footerClaim: ['Specialist in ', 'droge en gezonde', ' gebouwen.'],
    footerArea: 'Werkgebied',
    footerCompany: 'Dryhouse',
    footerLinks: [
      { label: 'Online vochtcheck', key: 'vochtcheck' },
      { label: 'Offerte aanvragen', key: 'offerte' },
      { label: 'Blog & advies', key: 'blog' },
      { label: 'Contact', key: 'contact' },
      { label: 'Privacy', key: 'privacy' },
    ] as { label: string; key: PageKey }[],
    vat: 'BTW',
    rights: 'Alle rechten voorbehouden.',
    footerNote: (city: string) => `Vochtbestrijding in België en Nederland, vanuit ${city}.`,
    treatmentIn: 'Vochtbestrijding',
    cta: { title: 'Advies of offerte op maat', points: ['Gratis diagnose ter plaatse', 'Heldere offerte, vrijblijvend', 'Tot 30 jaar garantie'], button: 'Vraag advies of offerte aan' },
    faqTitle: 'Veelgestelde vragen',
    officeHours: 'Kantoor: ma–vr 9u – 17u30',
  },
  fr: {
    home: 'Accueil',
    services: 'Services',
    quote: 'Demander un devis',
    quoteShort: 'Devis gratuit',
    requestQuote: 'Demandez conseil ou un devis',
    callUs: 'Appeler',
    doVochtcheck: 'Faire le test d’humidité',
    readMore: 'En savoir plus',
    nav: [
      { label: 'Test d’humidité', key: 'vochtcheck' },
      { label: 'Zone d’intervention', key: 'werkgebied' },
      { label: 'Contact', key: 'contact' },
    ] as { label: string; key: PageKey }[],
    toHome: 'Dryhouse, vers la page d’accueil',
    mainMenu: 'Menu principal',
    chooseCountry: 'Choisissez votre pays',
    chooseLanguage: 'Langue',
    menuOpen: 'Ouvrir le menu',
    menuClose: 'Fermer le menu',
    skip: 'Aller au contenu',
    breadcrumb: 'Fil d’Ariane',
    countries: { be: 'Belgique', nl: 'Pays-Bas' },
    footerClaim: ['Spécialiste des bâtiments ', 'secs et sains', '.'],
    footerArea: 'Zone d’intervention',
    footerCompany: 'Dryhouse',
    footerLinks: [
      { label: 'Test d’humidité en ligne', key: 'vochtcheck' },
      { label: 'Demander un devis', key: 'offerte' },
      { label: 'Contact', key: 'contact' },
      { label: 'Vie privée', key: 'privacy' },
    ] as { label: string; key: PageKey }[],
    vat: 'TVA',
    rights: 'Tous droits réservés.',
    footerNote: (city: string) => `Traitement de l’humidité en Belgique et aux Pays-Bas, depuis ${city}.`,
    treatmentIn: 'Traitement de l’humidité',
    cta: { title: 'Conseil ou devis sur mesure', points: ['Diagnostic gratuit sur place', 'Devis clair, sans engagement', 'Jusqu’à 30 ans de garantie'], button: 'Demandez conseil ou un devis' },
    faqTitle: 'Questions fréquentes',
    officeHours: 'Bureau : lu–ve 9h – 17h30',
  },
} satisfies Record<Lang, unknown>;
