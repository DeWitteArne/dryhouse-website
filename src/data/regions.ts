import type { ServiceSlug } from './services';

/**
 * Werkgebied: one landing page per province (/vochtbestrijding/<slug>).
 * Every page needs its own, genuinely local text: near-identical "city pages" get
 * treated as doorway pages by Google and hurt the whole site.
 */
export interface Region {
  slug: string;
  name: string;
  /** "in Oost-Vlaanderen" / "in Brussel" */
  inName: string;
  cities: string[];
  intro: string;
  context: string;
  common: ServiceSlug[];
}

export const regions: Region[] = [
  {
    slug: 'oost-vlaanderen',
    name: 'Oost-Vlaanderen',
    inName: 'in Oost-Vlaanderen',
    cities: ['Sint-Niklaas', 'Gent', 'Aalst', 'Lokeren', 'Dendermonde', 'Temse', 'Beveren', 'Oudenaarde', 'Eeklo', 'Ninove', 'Wetteren', 'Zele'],
    intro:
      'Oost-Vlaanderen is onze thuisbasis: vanuit Sint-Niklaas staan we snel bij je in het Waasland, Gent, de Denderstreek en het Meetjesland.',
    context:
      'In de polders rond het Waasland en het Meetjesland staat het grondwater vaak hoog, en in de Schelde- en Dendervallei bouwde men eeuwenlang op natte klei- en leemgrond. Veel rijwoningen en arbeidershuizen van voor 1950 hebben geen vochtkering in de muur. Opstijgend vocht en vochtige kelders zijn hier dan ook de klachten die we het vaakst zien.',
    common: ['opstijgend-vocht', 'kelderdichtingen', 'condensatie-schimmels'],
  },
  {
    slug: 'antwerpen',
    name: 'Antwerpen',
    inName: 'in de provincie Antwerpen',
    cities: ['Antwerpen', 'Mechelen', 'Lier', 'Turnhout', 'Geel', 'Mol', 'Herentals', 'Boom', 'Brasschaat', 'Mortsel', 'Heist-op-den-Berg'],
    intro: 'Van de Antwerpse herenhuizen tot de Kempense fermettes: we behandelen vochtproblemen in de hele provincie Antwerpen.',
    context:
      'In de stad Antwerpen en in Mechelen hebben veel 19e-eeuwse burgerhuizen een kelder die onder het grondwaterpeil ligt of tegen de buurwoning aan zit. In de Kempen draineert de zandgrond beter, maar daar zorgen oudere spouwmuren en dichtgemaakte ramen zonder ventilatie vaker voor condensatie en schimmel.',
    common: ['kelderdichtingen', 'opstijgend-vocht', 'condensatie-schimmels'],
  },
  {
    slug: 'west-vlaanderen',
    name: 'West-Vlaanderen',
    inName: 'in West-Vlaanderen',
    cities: ['Brugge', 'Kortrijk', 'Oostende', 'Roeselare', 'Ieper', 'Waregem', 'Knokke-Heist', 'Tielt', 'Torhout', 'Menen'],
    intro: 'Aan de kust en in het binnenland van West-Vlaanderen krijgen gevels het hard te verduren. Wij maken ze opnieuw droog.',
    context:
      'Aan de kust slaat de westenwind regen en zout tegen de gevels: doorslaand vocht en verweerd voegwerk zijn er schering en inslag. Achter de kust liggen de polders, waar het grondwater hoog staat en opstijgend vocht in oudere woningen veel voorkomt. In de Leiestreek zien we vooral vochtige kelders.',
    common: ['doorslaand-vocht', 'gevelwerken', 'opstijgend-vocht'],
  },
  {
    slug: 'vlaams-brabant',
    name: 'Vlaams-Brabant',
    inName: 'in Vlaams-Brabant',
    cities: ['Leuven', 'Vilvoorde', 'Halle', 'Tienen', 'Aarschot', 'Diest', 'Zaventem', 'Asse', 'Grimbergen', 'Dilbeek', 'Tervuren'],
    intro: 'Rond Leuven, in het Pajottenland en in de Brusselse rand lossen we vochtproblemen op in woningen van elke leeftijd.',
    context:
      'De leemgrond in het Hageland en het Pajottenland houdt water lang vast, en in de Dijle- en Demervallei staat het grondwater hoog. Oudere hoeves en rijhuizen in natuursteen of baksteen hebben vaak geen vochtkering. In de Brusselse rand zien we veel gerenoveerde woningen waar condensatie ontstaat nadat ramen en dak goed geïsoleerd zijn, maar de ventilatie niet mee is aangepast.',
    common: ['opstijgend-vocht', 'condensatie-schimmels', 'kelderdichtingen'],
  },
  {
    slug: 'limburg',
    name: 'Limburg',
    inName: 'in Limburg',
    cities: ['Hasselt', 'Genk', 'Sint-Truiden', 'Tongeren', 'Lommel', 'Beringen', 'Maasmechelen', 'Bilzen', 'Maaseik', 'Houthalen-Helchteren'],
    intro: 'Ook in Limburg, van Haspengouw tot de Maasvallei, staan we klaar met een gratis vochtdiagnose.',
    context:
      'In de Maasvallei en langs de Demer stijgt het grondwater in natte periodes snel, wat vochtige kelders en opstijgend vocht geeft. De oudere mijncités en de hoeves in Haspengouw hebben vaak dikke bakstenen muren zonder vochtkering. In de Kempense zandstreek ligt het probleem eerder bij condensatie in slecht geventileerde woningen.',
    common: ['opstijgend-vocht', 'kelderdichtingen', 'condensatie-schimmels'],
  },
  {
    slug: 'brussel',
    name: 'Brussel',
    inName: 'in Brussel',
    cities: ['Brussel', 'Schaarbeek', 'Elsene', 'Ukkel', 'Anderlecht', 'Etterbeek', 'Jette', 'Sint-Gillis', 'Vorst', 'Molenbeek', 'Woluwe'],
    intro: 'Herenhuizen, appartementsgebouwen en kelders in de 19 Brusselse gemeenten: wij maken ze droog, met respect voor het gebouw.',
    context:
      'Het Brusselse woningpatrimonium is oud: veel herenhuizen zijn meer dan honderd jaar oud, met gemetselde kelders en gemene muren met de buren. Opstijgend vocht in de kelder- en gelijkvloerse muren komt daardoor vaak voor. In appartementsgebouwen zien we daarnaast lekkende liftputten en betonrot in garages en terrassen.',
    common: ['opstijgend-vocht', 'kelderdichtingen', 'liftputten'],
  },
  {
    slug: 'waals-brabant',
    name: 'Waals-Brabant',
    inName: 'in Waals-Brabant',
    cities: ['Waver', 'Nijvel', 'Ottignies-Louvain-la-Neuve', 'Tubeke', 'Eigenbrakel', 'Waterloo', 'Geldenaken', 'Rixensart'],
    intro: 'In Waals-Brabant behandelen we zowel oude hoeves als recente villa’s.',
    context:
      'Veel woningen in Waals-Brabant zijn gebouwd op leemgrond die vocht vasthoudt. Oude vierkantshoeves met natuurstenen muren krijgen last van opstijgend vocht, terwijl we in recente villa’s eerder vochtige kelders en garages zien, zeker op hellende percelen waar regenwater tegen de muur blijft staan.',
    common: ['opstijgend-vocht', 'kelderdichtingen', 'betoninjectie'],
  },
  {
    slug: 'henegouwen',
    name: 'Henegouwen',
    inName: 'in Henegouwen',
    cities: ['Charleroi', 'Bergen', 'Doornik', 'La Louvière', 'Moeskroen', 'Aat', 'Edingen', 'Zinnik', 'Binche'],
    intro: 'Van Doornik tot Charleroi: ook in Henegouwen pakken we vochtproblemen grondig aan.',
    context:
      'Henegouwen telt veel arbeiderswoningen uit de industriële periode, vaak in baksteen zonder vochtkering en met kelders die tegen de grond aan liggen. Opstijgend vocht en natte kelders zijn er de meest voorkomende problemen. In oude industriële en appartementsgebouwen zien we daarnaast betonrot.',
    common: ['opstijgend-vocht', 'kelderdichtingen', 'betonrot'],
  },
  {
    slug: 'namen',
    name: 'Namen',
    inName: 'in de provincie Namen',
    cities: ['Namen', 'Dinant', 'Gembloers', 'Andenne', 'Sambreville', 'Ciney', 'Philippeville', 'Jambes'],
    intro: 'In de Maas- en Sambervallei en op de plateaus van de Condroz lossen we vochtproblemen op in huizen van elke leeftijd.',
    context:
      'Langs de Maas en de Samber staan veel woningen in natuursteen, dicht bij de rivier en tegen de helling aan gebouwd. Water dat van de helling komt drukt dan tegen de achtergevel en de kelder. Zulke muren hebben een aanpak nodig die rekening houdt met de steen: niet elk product past bij kalksteen of zandsteen.',
    common: ['kelderdichtingen', 'opstijgend-vocht', 'doorslaand-vocht'],
  },
  {
    slug: 'luik',
    name: 'Luik',
    inName: 'in de provincie Luik',
    cities: ['Luik', 'Verviers', 'Seraing', 'Hoei', 'Herstal', 'Eupen', 'Spa', 'Borgworm', 'Sankt Vith'],
    intro: 'Van de stad Luik tot de Oostkantons: ook daar zorgt Dryhouse voor droge muren.',
    context:
      'De oude stadswoningen in Luik en Verviers zijn vaak tegen de heuvel gebouwd, met kelders die deels in de grond zitten. In de Ardennen en de Oostkantons is het klimaat kouder en natter, waardoor condensatie in slecht geïsoleerde woningen en doorslaand vocht op de weerzijde vaker voorkomen dan elders.',
    common: ['kelderdichtingen', 'condensatie-schimmels', 'doorslaand-vocht'],
  },
  {
    slug: 'luxemburg',
    name: 'Luxemburg',
    inName: 'in de provincie Luxemburg',
    cities: ['Aarlen', 'Bastenaken', 'Marche-en-Famenne', 'Durbuy', 'Virton', 'Neufchâteau', 'Bouillon', 'Libramont'],
    intro: 'Ook in de Belgische Ardennen, in de provincie Luxemburg, kan je bij ons terecht voor een vochtdiagnose.',
    context:
      'De provincie Luxemburg heeft het koudste en natste klimaat van het land. Veel woningen zijn opgetrokken in leisteen of andere natuursteen, met dikke muren zonder spouw. Doorslaand vocht en condensatie zijn er de grootste uitdaging, zeker in tweede verblijven die lange tijd niet verwarmd worden.',
    common: ['doorslaand-vocht', 'condensatie-schimmels', 'opstijgend-vocht'],
  },
];

export const regionBySlug = (slug: string) => regions.find((r) => r.slug === slug);
