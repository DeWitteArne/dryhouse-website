/**
 * Single source of truth for company facts (NAP: name, address, phone).
 * Used by the header, footer, contact page and all structured data, so Google
 * always sees exactly the same details.
 */
export const site = {
  name: 'Dryhouse',
  legalName: 'Dryhouse BV',
  tagline: 'Specialist in droge en gezonde gebouwen',
  url: 'https://www.dryhouse.be',
  email: 'info@dryhouse.be',
  phone: '+32486201010',
  phoneDisplay: '+32 486 20 10 10',
  /** Separate number for customers in the Netherlands. */
  phoneNl: '+31651607128',
  phoneNlDisplay: '+31 6 51 60 71 28',
  vat: 'BE 0830.539.932',
  address: {
    street: 'Anthonis de Jonghestraat 60',
    postalCode: '9100',
    city: 'Sint-Niklaas',
    region: 'Oost-Vlaanderen',
    country: 'BE',
  },
  geo: { lat: 51.1848369, lng: 4.1943667 },
  openingHours: [{ days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '09:00', closes: '17:30' }],
  social: {
    facebook: 'https://www.facebook.com/dryhousebvba/',
    instagram: 'https://www.instagram.com/dryhouse_vochtbestrijding/',
    linkedin: 'https://www.linkedin.com/company/dryhouse-vochtproblemen/',
  } as Record<string, string>,
  guaranteeYears: 30,
  /** Claims as published on the current site/blog. */
  yearsExperience: 20,
  basementsSealed: 1000,
} as const;
