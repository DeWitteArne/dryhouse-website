import type { ServiceSlug } from './services';

/**
 * Prices and guarantees, one place for the whole site (briefing Robbe, 2026-10-29).
 * Amounts are EXCL. btw, as on the internal price list. Belgian visitors see them incl. 6 % btw
 * (renovation of private homes older than 10 years), Dutch visitors excl. btw (Dutch btw differs).
 * Never show a bare m² price for kelderdichting or drainage: competitors don't include preparation
 * and kimnaad, so ours would look more expensive than it is.
 */
export const VAT_RENOVATION = 0.06;
/** Minimum per opdracht, excl. btw. */
export const MINIMUM = 850;

type Text = { nl: string; fr: string };

export interface PriceLine {
  label: Text;
  /** Excl. btw. Omit both for "prijs na diagnose". */
  from?: number;
  to?: number;
  unit?: Text;
}

export interface ServicePrice {
  lines: PriceLine[];
  /** Worked example, amount excl. btw (shown rounded). */
  example?: { text: Text; amount: number };
  included?: { nl: string[]; fr: string[] };
  /** Prices for professionals only, always shown excl. btw. */
  pro?: boolean;
  /** Which calculator to show under the prices. */
  calculator?: 'rising' | 'basement';
}

const lm: Text = { nl: 'per lopende meter', fr: 'par mètre courant' };
const m2: Text = { nl: 'per m²', fr: 'par m²' };
const afterDiagnosis = (label: Text): ServicePrice => ({ lines: [{ label }] });

export const prices: Partial<Record<ServiceSlug, ServicePrice>> = {
  'opstijgend-vocht': {
    lines: [{ label: { nl: 'Muurinjectie', fr: 'Injection du mur' }, from: 90, to: 110, unit: lm }],
    example: { text: { nl: '30 lopende meter injectie met afkappen, zoutmembraan en nieuw pleisterwerk tot 1 m hoog', fr: '30 mètres courants d’injection avec piquage, membrane anti-sels et nouvel enduit jusqu’à 1 m de haut' }, amount: 7650 },
    included: { nl: ['injectie', 'afkappen van het pleisterwerk', 'zoutmembraan', 'nieuw pleisterwerk'], fr: ['injection', 'piquage de l’enduit', 'membrane anti-sels', 'nouvel enduit'] },
    calculator: 'rising',
  },
  'kelder-waterdicht-maken': {
    lines: [{ label: { nl: 'Projectprijs kelderdichting', fr: 'Prix du projet d’étanchéité' }, from: 5000, to: 20000 }],
    example: { text: { nl: 'kelder van 40 m², bekuiping van de wanden (± 60 m²) met voorbereiding en kimnaad', fr: 'cave de 40 m², cuvelage des murs (± 60 m²) avec préparation et joint mur-sol' }, amount: 15250 },
    included: {
      nl: ['voorbereiding', 'kimnaadversteviging', 'tweecomponentensysteem', 'afgedichte leidingdoorvoeren', 'afwerking'],
      fr: ['préparation', 'renfort du joint mur-sol', 'système bicomposant', 'traversées de conduites étanchées', 'finition'],
    },
    calculator: 'basement',
  },
  kelderdrainage: {
    lines: [{ label: { nl: 'Projectprijs na diagnose', fr: 'Prix du projet après diagnostic' } }],
    included: { nl: ['drainage', 'pompput', 'pomp', 'aansluiting'], fr: ['drainage', 'puisard', 'pompe', 'raccordement'] },
  },
  gevelrenovatie: {
    lines: [
      { label: { nl: 'Gevelreiniging', fr: 'Nettoyage de façade' }, from: 10, unit: m2 },
      { label: { nl: 'Hydrofuge (impregneren)', fr: 'Hydrofuge (imprégnation)' }, from: 15, unit: m2 },
      { label: { nl: 'Uitslijpen en opvoegen', fr: 'Dégarnissage et rejointoiement' }, from: 90, to: 125, unit: m2 },
    ],
  },
  'doorslaand-vocht': {
    lines: [
      { label: { nl: 'Hydrofuge (impregneren)', fr: 'Hydrofuge (imprégnation)' }, from: 15, unit: m2 },
      { label: { nl: 'Uitslijpen en opvoegen', fr: 'Dégarnissage et rejointoiement' }, from: 90, to: 125, unit: m2 },
      { label: { nl: 'Gevelreiniging', fr: 'Nettoyage de façade' }, from: 10, unit: m2 },
    ],
  },
  reinigingstechnieken: {
    lines: [{ label: { nl: 'Reiniging', fr: 'Nettoyage' }, from: 10, to: 30, unit: m2 }],
    included: { nl: ['stoom', 'hogedruk', 'ontmossen', 'graffitiverwijdering', 'stralen'], fr: ['vapeur', 'haute pression', 'démoussage', 'enlèvement de graffitis', 'sablage'] },
  },
  'ventilatie-schimmel': {
    lines: [{ label: { nl: 'Ventilatiesysteem C of D', fr: 'Ventilation simple ou double flux' }, from: 1250, to: 10000, unit: { nl: 'per systeem', fr: 'par système' } }],
    included: { nl: ['toestel', 'kanalen', 'plaatsing', 'inregeling'], fr: ['appareil', 'conduits', 'pose', 'réglage'] },
  },
  'betonrot-herstellen': afterDiagnosis({ nl: 'Prijs na diagnose', fr: 'Prix après diagnostic' }),
  isolatie: afterDiagnosis({ nl: 'Prijs na diagnose', fr: 'Prix après diagnostic' }),
  coatings: afterDiagnosis({ nl: 'Prijs na diagnose', fr: 'Prix après diagnostic' }),
  'buitenafdichting-kelder': afterDiagnosis({ nl: 'Prijs na diagnose', fr: 'Prix après diagnostic' }),
  betoninjectie: afterDiagnosis({ nl: 'Prijs na diagnose', fr: 'Prix après diagnostic' }),
  liftputten: {
    lines: [{ label: { nl: 'Liftput waterdicht maken', fr: 'Étanchéité de fosse d’ascenseur' }, from: 5500, unit: { nl: 'per put', fr: 'par fosse' } }],
    included: { nl: ['bekuiping', 'afdichting'], fr: ['cuvelage', 'étanchéité'] },
    pro: true,
  },
};

/**
 * Calculators on the opstijgend-vocht and kelder pages. Unit prices INCL. 6 % btw, as in the
 * briefing, so Robbe can adjust them directly.
 * Rising damp: lm × low … lm × high (high = full re-plastering up to 1 m), at least `minimum`.
 * Basement: perimeter ≈ 4 × √floor, walls = perimeter × height.
 *   low = walls × perM2 + perimeter × jointPerLm; high = (walls + floor) × perM2 + perimeter × jointPerLm.
 */
export const calculator = {
  rising: { low: 95, high: 270 },
  basement: { perM2: 245, jointPerLm: 58 },
  minimum: 901,
};

/** Guarantee in years per service: 30 on rising damp, 10 on all other works. */
export const guarantee = (slug: ServiceSlug) => (slug === 'opstijgend-vocht' ? 30 : 10);
/** Electrical devices (ventilation units, pumps): 2 years, sometimes 5 after registration with the supplier. */
export const deviceGuarantee = { years: 2, registered: 5 };
