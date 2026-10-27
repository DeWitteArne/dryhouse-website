import { site } from '@/data/site';

/** schema.org builders. Every page references the same business node by @id. */
const businessId = `${site.url}/#business`;
const websiteId = `${site.url}/#website`;

export function businessSchema() {
  const { address, geo } = site;
  return {
    '@context': 'https://schema.org',
    '@type': ['HomeAndConstructionBusiness', 'LocalBusiness'],
    '@id': businessId,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    logo: `${site.url}/images/brand/logo.png`,
    image: `${site.url}/og/default.jpg`,
    email: site.email,
    ...(site.phone && { telephone: site.phone }),
    ...(site.vat && { vatID: site.vat }),
    description:
      'Dryhouse lost elk vochtprobleem op: opstijgend vocht, doorslaand vocht, condensatie en schimmel, kelderdichting en gevelwerken. Gratis diagnose en 30 jaar garantie, in heel België.',
    address: {
      '@type': 'PostalAddress',
      ...(address.street && { streetAddress: address.street }),
      ...(address.postalCode && { postalCode: address.postalCode }),
      addressLocality: address.city,
      addressRegion: address.region,
      addressCountry: address.country,
    },
    geo: { '@type': 'GeoCoordinates', latitude: geo.lat, longitude: geo.lng },
    areaServed: { '@type': 'Country', name: 'België' },
    ...(site.openingHours.length && {
      openingHoursSpecification: site.openingHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    ...(Object.keys(site.social).length && { sameAs: Object.values(site.social) }),
    knowsAbout: ['opstijgend vocht', 'doorslaand vocht', 'condensatie', 'schimmel', 'kelderdichting', 'betonrot', 'gevelrenovatie'],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: site.url,
    name: site.name,
    inLanguage: 'nl-BE',
    publisher: { '@id': businessId },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: new URL(item.path, site.url).href,
    })),
  };
}

export function faqSchema(faq: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; path: string; area?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    serviceType: opts.name,
    description: opts.description,
    url: new URL(opts.path, site.url).href,
    provider: { '@id': businessId },
    areaServed: opts.area ? { '@type': 'AdministrativeArea', name: opts.area } : { '@type': 'Country', name: 'België' },
  };
}

export function articleSchema(opts: {
  title: string;
  description: string;
  path: string;
  image?: string;
  published: Date;
  modified?: Date;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: opts.title,
    description: opts.description,
    mainEntityOfPage: new URL(opts.path, site.url).href,
    ...(opts.image && { image: new URL(opts.image, site.url).href }),
    datePublished: opts.published.toISOString(),
    dateModified: (opts.modified ?? opts.published).toISOString(),
    inLanguage: 'nl-BE',
    author: { '@id': businessId },
    publisher: { '@id': businessId },
  };
}
