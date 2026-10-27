import type { Lang } from '@/i18n';

/**
 * The services, in menu order. Slugs are the existing Wix URLs, so rankings carry over.
 * Long-form content per service lives in src/content/services/<slug>.md (French: fr/<slug>.md).
 */
export type ServiceIcon = 'rising' | 'rain' | 'basement' | 'mould' | 'inject' | 'facade' | 'shaft' | 'concrete' | 'coating';

export const services = [
  { slug: 'opstijgend-vocht', name: 'Opstijgend vocht', short: 'Injectie tegen capillair vocht dat uit de grond in je muren trekt.', icon: 'rising', group: 'vocht', fr: { slug: 'humidite-ascensionnelle', name: 'Humidité ascensionnelle', short: 'Injection contre l’humidité qui remonte du sol dans vos murs.' } },
  { slug: 'doorslaand-vocht', name: 'Doorslaand vocht', short: 'Regen die door gevels dringt: oorzaak opsporen en gevel waterafstotend maken.', icon: 'rain', group: 'vocht', fr: { slug: 'humidite-par-infiltration', name: 'Humidité par infiltration', short: 'La pluie traverse la façade : trouver la cause et rendre la façade hydrofuge.' } },
  { slug: 'condensatie-schimmels', name: 'Condensatie & schimmel', short: 'Beslagen ramen en zwarte vlekken duurzaam aanpakken met ventilatie op maat.', icon: 'mould', group: 'vocht', fr: { slug: 'condensation-moisissures', name: 'Condensation et moisissures', short: 'Vitres embuées et taches noires : une solution durable avec une ventilation sur mesure.' } },
  { slug: 'kelderdichtingen', name: 'Kelderdichting', short: 'Natte kelder? Waterdicht maken, ook bij grondwaterdruk.', icon: 'basement', group: 'vocht', fr: { slug: 'etancheite-cave', name: 'Étanchéité de cave', short: 'Cave humide ? Nous la rendons étanche, même sous la pression de la nappe.' } },
  { slug: 'betoninjectie', name: 'Betoninjectie', short: 'Scheuren en lekken in beton waterdicht injecteren.', icon: 'inject', group: 'beton', fr: { slug: 'injection-beton', name: 'Injection de béton', short: 'Fissures et fuites dans le béton rendues étanches par injection.' } },
  { slug: 'liftputten', name: 'Liftputten', short: 'Lekkende liftputten droogleggen zonder grote afbraak.', icon: 'shaft', group: 'beton', fr: { slug: 'fosses-ascenseur', name: 'Fosses d’ascenseur', short: 'Assécher une fosse d’ascenseur qui fuit, sans gros travaux de démolition.' } },
  { slug: 'betonrot', name: 'Betonrot', short: 'Aangetaste wapening behandelen en beton herstellen.', icon: 'concrete', group: 'beton', fr: { slug: 'beton-degrade', name: 'Béton dégradé', short: 'Traiter les armatures rouillées et réparer le béton.' } },
  { slug: 'gevelwerken', name: 'Gevelwerken', short: 'Gevelrenovatie, reiniging, voegwerk en bescherming.', icon: 'facade', group: 'gevel', fr: { slug: 'renovation-facade', name: 'Rénovation de façade', short: 'Rénovation, nettoyage, rejointoyage et protection de façades.' } },
  { slug: 'coatings', name: 'Coatings', short: 'Beschermende coatings voor vloeren, muren en gevels.', icon: 'coating', group: 'gevel', fr: { slug: 'revetements', name: 'Revêtements', short: 'Revêtements de protection pour sols, murs et façades.' } },
] as const satisfies readonly {
  slug: string;
  name: string;
  short: string;
  icon: ServiceIcon;
  group: 'vocht' | 'beton' | 'gevel';
  fr: { slug: string; name: string; short: string };
}[];

export type ServiceSlug = (typeof services)[number]['slug'];

export type Service = (typeof services)[number];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Name, short text and URL in the given language. The Dutch slug stays the ID everywhere. */
export function localService(s: Service, lang: Lang) {
  const t = lang === 'fr' ? s.fr : s;
  return { ...s, name: t.name, short: t.short, path: lang === 'fr' ? `/fr/${s.fr.slug}` : `/${s.slug}` };
}
