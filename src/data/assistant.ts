/**
 * The website assistant: a guided chat that replaces the old Smartsupp live chat.
 * Everything runs in the browser: answers come from the nodes below, free text is
 * matched against `intents`. Messages people leave go to /api/offerte (bron=chat).
 *
 * Writing answers: `say` is a list of chat bubbles. Links use [text](/path).
 * Option targets: `next` (another node), `href` (a page), or `action`.
 * Special hrefs: `$tel` (phone number for the visitor's country), `$mail`.
 */
export type Option =
  | { label: string; next: string }
  | { label: string; href: string }
  | { label: string; action: 'message' | 'land-be' | 'land-nl' };

export interface ChatNode {
  say: string[];
  options: Option[];
}

const diagnose = (slug?: string): Option => ({ label: 'Gratis diagnose aanvragen', href: slug ? `/offerte-aanvragen?probleem=${slug}` : '/offerte-aanvragen' });
const back: Option = { label: 'Andere vraag', next: 'menu' };

export const nodes: Record<string, ChatNode> = {
  start: {
    say: ['Hallo! Ik ben de digitale assistent van Dryhouse.', 'Waarmee kan ik je helpen? Kies hieronder of typ je vraag.'],
    options: [
      { label: 'Ik heb een vochtprobleem', next: 'probleem' },
      { label: 'Wat kost een behandeling?', next: 'prijs' },
      { label: 'Komen jullie bij mij langs?', next: 'regio' },
      { label: 'Hoeveel garantie krijg ik?', next: 'garantie' },
      { label: 'Ik wil iemand spreken', next: 'contact' },
    ],
  },
  menu: {
    say: ['Waarmee kan ik je nog helpen?'],
    options: [
      { label: 'Ik heb een vochtprobleem', next: 'probleem' },
      { label: 'Wat kost een behandeling?', next: 'prijs' },
      { label: 'Komen jullie bij mij langs?', next: 'regio' },
      { label: 'Ik wil iemand spreken', next: 'contact' },
    ],
  },
  probleem: {
    say: ['Wat zie je bij jou thuis?'],
    options: [
      { label: 'Zoutrand of vocht onderaan de muur', next: 'opstijgend' },
      { label: 'Vochtvlekken na regen', next: 'doorslaand' },
      { label: 'Schimmel of beslagen ramen', next: 'condensatie' },
      { label: 'Water of vocht in de kelder', next: 'kelder' },
      { label: 'Scheuren of roest in beton', next: 'beton' },
      { label: 'Ik weet het niet goed', next: 'onbekend' },
    ],
  },
  opstijgend: {
    say: [
      'Dat klinkt als opstijgend vocht: grondvocht dat via de poriën omhoog in de muur trekt. Typisch is een horizontale zoutrand tot zo’n meter hoog, met bladderende verf en een muffe geur.',
      'We stoppen het met een injectie die een nieuwe vochtkering in de muur vormt, met tot 30 jaar garantie. Meer uitleg vind je bij [opstijgend vocht](/opstijgend-vocht).',
    ],
    options: [diagnose('opstijgend-vocht'), { label: 'Doe de vochtcheck', href: '/vochtcheck' }, back],
  },
  doorslaand: {
    say: [
      'Vlekken die groter worden na regen wijzen meestal op doorslaand vocht: regenwater dat door de gevel dringt, via poreuze stenen, slechte voegen of scheuren.',
      'We zoeken waar het water binnenkomt, herstellen dat en maken de gevel waterafstotend. Lees meer over [doorslaand vocht](/doorslaand-vocht).',
    ],
    options: [diagnose('doorslaand-vocht'), { label: 'Meer over gevelwerken', href: '/gevelwerken' }, back],
  },
  condensatie: {
    say: [
      'Beslagen ramen en schimmel in koude hoeken of achter kasten komen bijna altijd door condensatie: vochtige binnenlucht die neerslaat op koude oppervlakken.',
      'Schimmel wegpoetsen helpt maar even. We pakken de oorzaak aan, meestal met ventilatie op maat. Meer bij [condensatie & schimmel](/condensatie-schimmels).',
    ],
    options: [diagnose('condensatie-schimmels'), { label: 'Doe de vochtcheck', href: '/vochtcheck' }, back],
  },
  kelder: {
    say: [
      'Een natte kelder kan van grondwater komen dat door muren en vloer drukt, of van scheuren en lekkende naden. Dryhouse maakte al meer dan 1.000 kelders waterdicht.',
      'Ook bij grondwaterdruk maken we je kelder droog. Lees meer over [kelderdichting](/kelderdichtingen).',
    ],
    options: [diagnose('kelderdichtingen'), back],
  },
  beton: {
    say: [
      'Scheuren waar water door komt dichten we met een betoninjectie. Zie je roestvlekken of brokkelt het beton af, dan gaat het vaak om betonrot: de wapening roest en duwt het beton weg.',
      'Meer uitleg: [betoninjectie](/betoninjectie), [betonrot](/betonrot) en [liftputten](/liftputten).',
    ],
    options: [diagnose('betoninjectie'), back],
  },
  onbekend: {
    say: [
      'Geen probleem, dat is vaak moeilijk te zien. Met de online vochtcheck beantwoord je 5 korte vragen en zie je meteen wat het waarschijnlijk is.',
      'Of we komen gratis langs: we meten het vocht en zoeken de oorzaak ter plaatse.',
    ],
    options: [{ label: 'Doe de vochtcheck', href: '/vochtcheck' }, diagnose(), back],
  },
  prijs: {
    say: [
      'Elke woning en elk vochtprobleem is anders, dus een prijs geven zonder de situatie te zien zou niet eerlijk zijn.',
      'Wat wel vastligt: de diagnose bij je thuis is gratis en vrijblijvend. We meten het vocht, zoeken de oorzaak en je krijgt een duidelijke offerte.',
    ],
    options: [diagnose(), { label: 'Bel ons', href: '$tel' }, { label: 'Zijn er premies?', next: 'premie' }, back],
  },
  premie: {
    say: [
      'Voor bepaalde renovatiewerken, ook het aanpakken van vochtproblemen, bestaan er premies of subsidies. De voorwaarden verschillen per land en regio en veranderen geregeld.',
      'We helpen je graag na te gaan waar je recht op hebt wanneer we langskomen.',
    ],
    options: [diagnose(), back],
  },
  regio: {
    say: ['We werken in heel België en Nederland, vanuit Sint-Niklaas. Waar woon je? Je mag ook je postcode typen.'],
    options: [
      { label: 'België', action: 'land-be' },
      { label: 'Nederland', action: 'land-nl' },
    ],
  },
  'regio-be': {
    say: ['Prima, we komen in elke Belgische provincie langs, van de kust tot de Ardennen. Bekijk [vochtbestrijding in België](/vochtbestrijding/belgie) of vraag meteen een diagnose aan.'],
    options: [diagnose(), { label: 'Bel ons', href: '$tel' }, back],
  },
  'regio-nl': {
    say: ['Prima, we werken ook in heel Nederland, van Zeeland en Brabant tot in het noorden. Bekijk [vochtbestrijding in Nederland](/vochtbestrijding/nederland) of vraag meteen een diagnose aan.'],
    options: [diagnose(), { label: 'Bel ons', href: '$tel' }, back],
  },
  garantie: {
    say: ['Op onze behandelingen tegen vocht krijg je tot 30 jaar garantie. Welke garantie precies bij jouw behandeling hoort, staat zwart op wit in je offerte.'],
    options: [diagnose(), back],
  },
  duur: {
    say: [
      'Meestal hoef je je woning niet te verlaten. Een injectie tegen opstijgend vocht gebeurt van binnenuit en is in de meeste woningen op korte tijd klaar.',
      'Voor grotere werken, zoals een kelderdichting, bespreken we de planning vooraf met je.',
    ],
    options: [diagnose(), back],
  },
  diagnose: {
    say: [
      'Bij een gratis diagnose komt een specialist bij je langs. We meten het vocht in je muren, zoeken de oorzaak en je krijgt een duidelijke offerte. Je zit nergens aan vast.',
    ],
    options: [diagnose(), { label: 'Ik wil iemand spreken', next: 'contact' }, back],
  },
  contact: {
    say: ['Je kan ons bellen of mailen (kantoor: ma–vr 9u–17u30). Of laat hier een bericht achter, dan nemen we contact met je op.'],
    options: [
      { label: 'Bericht achterlaten', action: 'message' },
      { label: 'Bel ons', href: '$tel' },
      { label: 'Mail ons', href: '$mail' },
      back,
    ],
  },
  onbekendeVraag: {
    say: ['Daar heb ik niet meteen een antwoord op. Laat je vraag en je gegevens achter, dan neemt een specialist contact met je op.'],
    options: [{ label: 'Bericht achterlaten', action: 'message' }, { label: 'Bel ons', href: '$tel' }, back],
  },
  bedankt: {
    say: ['Bedankt! We hebben je bericht goed ontvangen en nemen zo snel mogelijk contact met je op.'],
    options: [back],
  },
};

/** Free text → node. First match wins, so put the specific intents first. */
export const intents: [RegExp, string][] = [
  [/\b(hallo|hoi|hey|dag|goeiedag|goedendag|goedemorgen|goedemiddag)\b/i, 'menu'],
  [/premie|subsidie|renovatiepremie|mijn ?verbouwpremie/i, 'premie'],
  [/prijs|kost|kosten|budget|euro|€|duur is|goedkoop|tarief/i, 'prijs'],
  [/garantie|waarborg/i, 'garantie'],
  [/hoe ?lang|planning|verlaten|wanneer kunnen/i, 'duur'],
  [/zout|salpeter|opstijg|onderaan|plint|injectie|capillair/i, 'opstijgend'],
  [/schimmel|condens|beslagen|zwarte vlek|ventil|badkamer|muf/i, 'condensatie'],
  [/kelder|souterrain|kruipruimte|grondwater/i, 'kelder'],
  [/beton|roest|wapening|balkon|liftput|scheur/i, 'beton'],
  [/doorslaan|regen|buitenmuur|gevel|voeg/i, 'doorslaand'],
  [/diagnose|langskomen|langs komen|bezoek|meten|meting/i, 'diagnose'],
  [/nederland|holland|\bnl\b/i, 'regio-nl'],
  [/belgi|vlaanderen|wallonie|brussel|\bbe\b/i, 'regio-be'],
  [/regio|buurt|provincie|werkgebied|komen jullie|postcode/i, 'regio'],
  [/bel|telefoon|mail|contact|afspraak|spreken|medewerker|iemand/i, 'contact'],
  [/vocht|nat|vlek/i, 'probleem'],
];

/** "1234 AB" is Dutch, a bare "9100" is Belgian. */
export function landFromPostcode(text: string): 'be' | 'nl' | null {
  if (/\b\d{4}\s?[a-z]{2}\b/i.test(text)) return 'nl';
  if (/\b[1-9]\d{3}\b/.test(text)) return 'be';
  return null;
}
