/**
 * The services, in menu order. Slugs are the existing Wix URLs, so rankings carry over.
 * Long-form content per service lives in src/content/services/<slug>.md.
 */
export type ServiceIcon = 'rising' | 'rain' | 'basement' | 'mould' | 'inject' | 'facade' | 'shaft' | 'concrete' | 'coating';

export const services = [
  { slug: 'opstijgend-vocht', name: 'Opstijgend vocht', short: 'Injectie tegen capillair vocht dat uit de grond in je muren trekt.', icon: 'rising', group: 'vocht' },
  { slug: 'doorslaand-vocht', name: 'Doorslaand vocht', short: 'Regen die door gevels dringt: oorzaak opsporen en gevel waterafstotend maken.', icon: 'rain', group: 'vocht' },
  { slug: 'condensatie-schimmels', name: 'Condensatie & schimmel', short: 'Beslagen ramen en zwarte vlekken duurzaam aanpakken met ventilatie op maat.', icon: 'mould', group: 'vocht' },
  { slug: 'kelderdichtingen', name: 'Kelderdichting', short: 'Natte kelder? Waterdicht maken, ook bij grondwaterdruk.', icon: 'basement', group: 'vocht' },
  { slug: 'betoninjectie', name: 'Betoninjectie', short: 'Scheuren en lekken in beton waterdicht injecteren.', icon: 'inject', group: 'beton' },
  { slug: 'liftputten', name: 'Liftputten', short: 'Lekkende liftputten droogleggen zonder grote afbraak.', icon: 'shaft', group: 'beton' },
  { slug: 'betonrot', name: 'Betonrot', short: 'Aangetaste wapening behandelen en beton herstellen.', icon: 'concrete', group: 'beton' },
  { slug: 'gevelwerken', name: 'Gevelwerken', short: 'Gevelrenovatie, reiniging, voegwerk en bescherming.', icon: 'facade', group: 'gevel' },
  { slug: 'coatings', name: 'Coatings', short: 'Beschermende coatings voor vloeren, muren en gevels.', icon: 'coating', group: 'gevel' },
] as const satisfies readonly { slug: string; name: string; short: string; icon: ServiceIcon; group: 'vocht' | 'beton' | 'gevel' }[];

export type ServiceSlug = (typeof services)[number]['slug'];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);
