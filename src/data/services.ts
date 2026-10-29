import type { Lang } from '@/i18n';

/**
 * The services, in menu order. The first ten follow the order of the homepage cards
 * ("Onze specialisaties"); the last three are kept as pages but get no card.
 * Long-form content per service lives in src/content/services/<slug>.md (French: fr/<slug>.md).
 * Renamed slugs keep their old URL as a 301 in public/_redirects.
 */
export type ServiceIcon =
  | 'rising' | 'rain' | 'basement' | 'mould' | 'inject' | 'facade' | 'shaft' | 'concrete' | 'coating'
  | 'drain' | 'insulation' | 'seal' | 'clean';

export const services = [
  {
    slug: 'kelder-waterdicht-maken', name: 'Kelderdichting', short: 'Waterdichte kelders, ook bij hoog grondwater, met een bekuiping langs de binnenzijde.', icon: 'basement',
    card: { name: 'Kelderdichting en drainage', short: 'Waterdichte kelders, ook bij hoog grondwater, met bekuiping en drainage naar een pompput.' },
    fr: { slug: 'etancheite-cave', name: 'Étanchéité de cave', short: 'Des caves étanches, même avec une nappe phréatique haute, grâce à un cuvelage intérieur.',
      card: { name: 'Étanchéité et drainage de cave', short: 'Des caves étanches, même avec une nappe haute, grâce au cuvelage et à un drainage vers un puisard.' } },
  },
  {
    slug: 'kelderdrainage', name: 'Kelderdrainage', short: 'Drainage langs de kimnaad die het water naar een pompput afvoert.', icon: 'drain',
    fr: { slug: 'drainage-cave', name: 'Drainage de cave', short: 'Un drainage le long du joint mur-sol qui évacue l’eau vers un puisard.' },
  },
  {
    slug: 'opstijgend-vocht', name: 'Opstijgend vocht', short: 'Muurinjectie die het metselwerk definitief afsluit, met aangepaste herbepleistering.', icon: 'rising',
    fr: { slug: 'humidite-ascensionnelle', name: 'Humidité ascensionnelle', short: 'Une injection qui coupe définitivement les remontées dans la maçonnerie, avec un enduit adapté.' },
  },
  {
    slug: 'gevelrenovatie', name: 'Gevelrenovatie', short: 'Herstel, reiniging en waterafstotende bescherming van gevels tegen doorslaand vocht.', icon: 'facade',
    fr: { slug: 'renovation-facade', name: 'Rénovation de façade', short: 'Réparation, nettoyage et protection hydrofuge des façades contre les infiltrations.' },
  },
  {
    slug: 'betonrot-herstellen', name: 'Betonrotherstel', short: 'Herstel van aangetaste wapening en beton aan balkons, gevels en kelders.', icon: 'concrete',
    fr: { slug: 'reparation-beton', name: 'Réparation de béton', short: 'Réparation des armatures rouillées et du béton des balcons, façades et caves.' },
  },
  {
    slug: 'isolatie', name: 'Isolatie', short: 'Gevel- en binnenisolatie die vocht en warmteverlies tegengaat.', icon: 'insulation',
    fr: { slug: 'isolation', name: 'Isolation', short: 'Isolation de façade et intérieure contre l’humidité et les pertes de chaleur.' },
  },
  {
    slug: 'coatings', name: 'Coatings', short: 'Waterdichte en beschermende coatings voor vloeren, muren, daken en terrassen.', icon: 'coating',
    fr: { slug: 'revetements', name: 'Revêtements', short: 'Revêtements étanches et protecteurs pour sols, murs, toitures et terrasses.' },
  },
  {
    slug: 'ventilatie-schimmel', name: 'Ventilatie en schimmel', short: 'Ventilatiesystemen C en D tegen condens, schimmel en slechte binnenlucht.', icon: 'mould',
    fr: { slug: 'ventilation-moisissures', name: 'Ventilation et moisissures', short: 'Ventilation simple ou double flux contre la condensation, les moisissures et l’air vicié.' },
  },
  {
    slug: 'buitenafdichting-kelder', name: 'Buitenafdichting', short: 'Afdichting van funderingen en keldermuren langs de buitenzijde.', icon: 'seal',
    fr: { slug: 'etancheite-exterieure-cave', name: 'Étanchéité extérieure', short: 'Étanchéité des fondations et des murs de cave par l’extérieur.' },
  },
  {
    slug: 'reinigingstechnieken', name: 'Reinigingstechnieken', short: 'Professionele reiniging van gevels en oppervlakken.', icon: 'clean',
    fr: { slug: 'techniques-de-nettoyage', name: 'Techniques de nettoyage', short: 'Nettoyage professionnel des façades et des surfaces.' },
  },
  {
    slug: 'doorslaand-vocht', name: 'Doorslaand vocht', short: 'Regen die door de gevel dringt: oorzaak opsporen en gevel waterafstotend maken.', icon: 'rain', more: true,
    fr: { slug: 'humidite-par-infiltration', name: 'Humidité par infiltration', short: 'La pluie traverse la façade : trouver la cause et rendre la façade hydrofuge.' },
  },
  {
    slug: 'betoninjectie', name: 'Betoninjectie', short: 'Scheuren en lekken in beton waterdicht injecteren.', icon: 'inject', more: true,
    fr: { slug: 'injection-beton', name: 'Injection de béton', short: 'Fissures et fuites dans le béton rendues étanches par injection.' },
  },
  {
    slug: 'liftputten', name: 'Liftputten', short: 'Lekkende liftputten droogleggen zonder grote afbraak.', icon: 'shaft', more: true,
    fr: { slug: 'fosses-ascenseur', name: 'Fosses d’ascenseur', short: 'Assécher une fosse d’ascenseur qui fuit, sans gros travaux de démolition.' },
  },
] as const satisfies readonly {
  slug: string;
  name: string;
  short: string;
  icon: ServiceIcon;
  /** Homepage card text, when it differs from the page. */
  card?: { name: string; short: string };
  /** Kept as a page, but not one of the homepage specialisations. */
  more?: boolean;
  fr: { slug: string; name: string; short: string; card?: { name: string; short: string } };
}[];

export type ServiceSlug = (typeof services)[number]['slug'];

export type Service = (typeof services)[number];

export const serviceBySlug = (slug: string) => services.find((s) => s.slug === slug);

/** Name, short text and URL in the given language. The Dutch slug stays the ID everywhere. */
export function localService(s: Service, lang: Lang) {
  const t = lang === 'fr' ? s.fr : s;
  const card = ('card' in t && t.card) || { name: t.name, short: t.short };
  return { ...s, name: t.name, short: t.short, card, path: lang === 'fr' ? `/fr/${s.fr.slug}` : `/${s.slug}` };
}

/** The homepage cards ("Onze specialisaties"), all equal. Kelderdrainage is part of the first card. */
export const specialisations = services.filter((s) => !('more' in s) && s.slug !== 'kelderdrainage');
