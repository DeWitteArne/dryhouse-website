import type { ChatNode, Option } from './assistant';

/**
 * French version of the website assistant (see ./assistant.ts for how nodes, options,
 * `[text](/path)` links, `$tel` / `$mail` and actions work). Node ids stay the same as
 * in the Dutch file; only the texts are French. The quote form keeps the Dutch service
 * slug in `?probleem=`.
 */
const diagnose = (slug?: string): Option => ({
  label: 'Demander un diagnostic gratuit',
  href: slug ? `/fr/demande-devis?probleem=${slug}` : '/fr/demande-devis',
});
const back: Option = { label: 'Autre question', next: 'menu' };
const test: Option = { label: 'Faire le test d’humidité', href: '/fr/test-humidite' };

export const nodes: Record<string, ChatNode> = {
  start: {
    say: ['Bonjour ! Je suis l’assistant numérique de Dryhouse.', 'Comment puis-je vous aider ? Choisissez ci-dessous ou tapez votre question.'],
    options: [
      { label: 'J’ai un problème d’humidité', next: 'probleem' },
      { label: 'Combien coûte un traitement ?', next: 'prijs' },
      { label: 'Intervenez-vous chez moi ?', next: 'regio' },
      { label: 'Quelle garantie offrez-vous ?', next: 'garantie' },
      { label: 'Je voudrais parler à quelqu’un', next: 'contact' },
    ],
  },
  menu: {
    say: ['Puis-je vous aider pour autre chose ?'],
    options: [
      { label: 'J’ai un problème d’humidité', next: 'probleem' },
      { label: 'Combien coûte un traitement ?', next: 'prijs' },
      { label: 'Intervenez-vous chez moi ?', next: 'regio' },
      { label: 'Je voudrais parler à quelqu’un', next: 'contact' },
    ],
  },
  probleem: {
    say: ['Que constatez-vous chez vous ?'],
    options: [
      { label: 'Auréole de salpêtre ou humidité en bas du mur', next: 'opstijgend' },
      { label: 'Taches d’humidité après la pluie', next: 'doorslaand' },
      { label: 'Moisissures ou vitres embuées', next: 'condensatie' },
      { label: 'Eau ou humidité dans la cave', next: 'kelder' },
      { label: 'Fissures ou rouille dans le béton', next: 'beton' },
      { label: 'Je ne sais pas trop', next: 'onbekend' },
    ],
  },
  opstijgend: {
    say: [
      'Cela ressemble à de l’humidité ascensionnelle : l’humidité du sol remonte dans le mur par les pores. Signe typique : une auréole de salpêtre horizontale jusqu’à environ un mètre de haut, avec de la peinture qui s’écaille et une odeur de moisi.',
      'Nous l’arrêtons par une injection qui crée une nouvelle barrière anti-humidité dans le mur, avec jusqu’à 30 ans de garantie. Plus d’explications : [humidité ascensionnelle](/fr/humidite-ascensionnelle).',
    ],
    options: [diagnose('opstijgend-vocht'), test, back],
  },
  doorslaand: {
    say: [
      'Des taches qui s’agrandissent après la pluie indiquent le plus souvent de l’humidité par infiltration : l’eau de pluie traverse la façade par des briques poreuses, des joints abîmés ou des fissures.',
      'Nous cherchons par où l’eau entre, nous réparons et nous rendons la façade hydrofuge. Plus d’explications : [humidité par infiltration](/fr/humidite-par-infiltration).',
    ],
    options: [diagnose('doorslaand-vocht'), { label: 'La rénovation de façade', href: '/fr/renovation-facade' }, back],
  },
  condensatie: {
    say: [
      'Des vitres embuées et des moisissures dans les coins froids ou derrière les armoires viennent presque toujours de la condensation : l’air intérieur humide se dépose sur les surfaces froides.',
      'Nettoyer les moisissures n’aide qu’un temps. Nous traitons la cause, le plus souvent avec une ventilation sur mesure. Plus d’explications : [condensation et moisissures](/fr/condensation-moisissures).',
    ],
    options: [diagnose('condensatie-schimmels'), test, back],
  },
  kelder: {
    say: [
      'Une cave humide peut venir de l’eau souterraine qui pousse à travers les murs et le sol, ou de fissures et de joints qui fuient. Dryhouse a déjà rendu étanches plus de 1 000 caves.',
      'Même quand la nappe phréatique exerce une pression, nous asséchons votre cave. Plus d’explications : [étanchéité de cave](/fr/etancheite-cave).',
    ],
    options: [diagnose('kelderdichtingen'), back],
  },
  beton: {
    say: [
      'Les fissures du béton par lesquelles l’eau passe, nous les colmatons par injection. Vous voyez des taches de rouille ou le béton s’effrite ? Il s’agit souvent de béton dégradé : les armatures rouillent et font éclater le béton.',
      'Plus d’explications : [injection de béton](/fr/injection-beton), [béton dégradé](/fr/beton-degrade) et [fosses d’ascenseur](/fr/fosses-ascenseur).',
    ],
    options: [diagnose('betoninjectie'), back],
  },
  onbekend: {
    say: [
      'Pas de souci, ce n’est souvent pas facile à voir. Avec le test d’humidité en ligne, vous répondez à 5 courtes questions et vous voyez tout de suite la cause la plus probable.',
      'Ou nous passons gratuitement chez vous : nous mesurons l’humidité et cherchons la cause sur place.',
    ],
    options: [test, diagnose(), back],
  },
  prijs: {
    say: [
      'Chaque maison et chaque problème d’humidité est différent. Donner un prix sans avoir vu la situation ne serait donc pas honnête.',
      'Ce qui est sûr : le diagnostic chez vous est gratuit et sans engagement. Nous mesurons l’humidité, cherchons la cause et vous recevez un devis clair.',
    ],
    options: [diagnose(), { label: 'Nous appeler', href: '$tel' }, { label: 'Existe-t-il des primes ?', next: 'premie' }, back],
  },
  premie: {
    say: [
      'Pour certains travaux de rénovation, y compris le traitement de l’humidité, il existe des primes ou des subventions. Les conditions varient selon le pays et la région, et elles changent régulièrement.',
      'Lors de notre visite, nous vous aidons volontiers à vérifier à quoi vous avez droit.',
    ],
    options: [diagnose(), back],
  },
  regio: {
    say: ['Nous travaillons dans toute la Belgique et aux Pays-Bas, depuis Sint-Niklaas. Où habitez-vous ? Vous pouvez aussi taper votre code postal.'],
    options: [
      { label: 'Belgique', action: 'land-be' },
      { label: 'Pays-Bas', action: 'land-nl' },
    ],
  },
  'regio-be': {
    say: [
      'Parfait, nous intervenons dans toutes les provinces belges, de la côte aux Ardennes. Découvrez [le traitement de l’humidité en Belgique](/fr/traitement-humidite/belgique) ou demandez directement un diagnostic.',
    ],
    options: [diagnose(), { label: 'Nous appeler', href: '$tel' }, back],
  },
  'regio-nl': {
    say: [
      'Parfait, nous travaillons aussi dans tous les Pays-Bas, de la Zélande et du Brabant jusqu’au nord. Découvrez [le traitement de l’humidité aux Pays-Bas](/fr/traitement-humidite/pays-bas) ou demandez directement un diagnostic.',
    ],
    options: [diagnose(), { label: 'Nous appeler', href: '$tel' }, back],
  },
  garantie: {
    say: ['Nos traitements contre l’humidité sont garantis jusqu’à 30 ans. La garantie exacte de votre traitement figure noir sur blanc dans votre devis.'],
    options: [diagnose(), back],
  },
  duur: {
    say: [
      'En général, vous ne devez pas quitter votre logement. Une injection contre l’humidité ascensionnelle se fait de l’intérieur et, dans la plupart des maisons, elle est vite terminée.',
      'Pour des travaux plus importants, comme l’étanchéité d’une cave, nous convenons du planning avec vous à l’avance.',
    ],
    options: [diagnose(), back],
  },
  diagnose: {
    say: [
      'Lors d’un diagnostic gratuit, un spécialiste passe chez vous. Nous mesurons l’humidité dans vos murs, cherchons la cause et vous recevez un devis clair. Vous ne vous engagez à rien.',
    ],
    options: [diagnose(), { label: 'Je voudrais parler à quelqu’un', next: 'contact' }, back],
  },
  contact: {
    say: ['Vous pouvez nous appeler ou nous écrire (bureau : lu–ve 9h–17h30). Vous pouvez aussi laisser un message ici, et nous vous recontacterons.'],
    options: [
      { label: 'Laisser un message', action: 'message' },
      { label: 'Nous appeler', href: '$tel' },
      { label: 'Nous écrire', href: '$mail' },
      back,
    ],
  },
  onbekendeVraag: {
    say: ['Je n’ai pas tout de suite de réponse à cette question. Laissez votre question et vos coordonnées, et un spécialiste vous recontactera.'],
    options: [{ label: 'Laisser un message', action: 'message' }, { label: 'Nous appeler', href: '$tel' }, back],
  },
  bedankt: {
    say: ['Merci ! Nous avons bien reçu votre message et nous vous recontacterons dès que possible.'],
    options: [back],
  },
};

/** Free text → node. First match wins, so put the specific intents first. */
export const intents: [RegExp, string][] = [
  [/\b(bonjour|bonsoir|salut|coucou|hello|hey)\b/i, 'menu'],
  [/\bprimes?\b|subsides?|subvention|aide financi[eè]re/i, 'premie'],
  // Before 'prijs', which also catches "combien".
  [/combien de temps|dur[eé]e|\bdure\b|d[eé]lai|planning|quitter|quand pouvez/i, 'duur'],
  [/\bprix\b|co[uû]t|combien|budget|euro|€|\bcher\b|tarif/i, 'prijs'],
  [/garanti/i, 'garantie'],
  // Before 'opstijgend', which also catches a bare "injection".
  [/injection (de |du |dans le )?b[eé]ton/i, 'beton'],
  [/salp[eê]tre|\bsels?\b|ascensionn|remont|bas (du|des) murs?|plinthe|injection|capillar/i, 'opstijgend'],
  [/moisi|condens|bu[eé]e|taches? noires?|ventil|salle de bain|renferm/i, 'condensatie'],
  [/\bcaves?\b|sous[- ]sol|vide sanitaire|nappe|eau souterraine/i, 'kelder'],
  [/b[eé]ton|rouill|armature|balcon|ascenseur|fissur/i, 'beton'],
  [/infiltr|pluie|mur ext[eé]rieur|fa[cç]ade|\bjoints?\b/i, 'doorslaand'],
  [/diagnostic|passer chez|visite|mesur|devis/i, 'diagnose'],
  [/pays[- ]bas|hollande|n[eé]erland|\bnl\b/i, 'regio-nl'],
  [/belgi|flandre|wallonie|bruxelles|\bbe\b/i, 'regio-be'],
  [/r[eé]gion|province|secteur|venez|d[eé]placez|intervenez|code postal/i, 'regio'],
  [/appel|t[eé]l[eé]phon|mail|contact|rendez-vous|\brdv\b|parler|quelqu.un|conseiller|joindre/i, 'contact'],
  [/humid|mouill|tache|\beau\b|moite/i, 'probleem'],
];
