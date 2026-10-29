import type { ServiceSlug } from './services';
import type { Lang } from '@/i18n';
import { site } from './site';
import { countriesFr, regionsFr } from './regions.fr';

/**
 * Werkgebied: Belgium and the Netherlands, one landing page per country
 * (/vochtbestrijding/<country>) and per province (/vochtbestrijding/<country>/<province>).
 * Every page needs its own, genuinely local text: near-identical "city pages" get
 * treated as doorway pages by Google and hurt the whole site.
 */
export type CountryCode = 'be' | 'nl';

export interface Country {
  code: CountryCode;
  slug: string;
  name: string;
  /** "in België" */
  inName: string;
  phone: string;
  phoneDisplay: string;
  intro: string;
  context: string;
}

export const countries: Record<CountryCode, Country> = {
  be: {
    code: 'be',
    slug: 'belgie',
    name: 'België',
    inName: 'in België',
    phone: site.phone,
    phoneDisplay: site.phoneDisplay,
    intro: 'Vanuit Sint-Niklaas behandelen we vochtproblemen in heel België: van de kust tot de Ardennen, in Vlaanderen, Brussel en Wallonië.',
    context:
      'Een groot deel van de Belgische woningen is gebouwd voor 1970, vaak zonder vochtkering in de muren en met kelders die tegen of onder het grondwater liggen. In de polders en rivierdalen staat het grondwater hoog, aan de kust slaat de regen tegen de gevels en in gerenoveerde woningen zorgt een te dicht huis zonder ventilatie voor condensatie. Elke streek heeft zo zijn eigen vochtprobleem.',
  },
  nl: {
    code: 'nl',
    slug: 'nederland',
    name: 'Nederland',
    inName: 'in Nederland',
    phone: site.phoneNl,
    phoneDisplay: site.phoneNlDisplay,
    intro: 'Dryhouse werkt ook in Nederland. Zeeland en Brabant liggen om de hoek van onze thuisbasis, en we behandelen vochtproblemen tot in het noorden van het land.',
    context:
      'Een groot deel van Nederland ligt onder de zeespiegel, op klei- en veengrond waar het grondwater hoog staat. Veel woningen hebben een kruipruimte in plaats van een kelder: blijft die vochtig, dan trekt het vocht in de vloer en de onderkant van de muren. In de oudere stadskernen zien we souterrains en kelders onder het grondwaterpeil, en in goed geïsoleerde woningen zonder voldoende ventilatie condensatie en schimmel.',
  },
};

export interface Region {
  country: CountryCode;
  slug: string;
  name: string;
  /** Used in titles where the name alone is ambiguous (Limburg exists in both countries). */
  fullName?: string;
  /** "in Oost-Vlaanderen" / "in Brussel" */
  inName: string;
  cities: string[];
  intro: string;
  context: string;
  common: ServiceSlug[];
}

export const regions: Region[] = [
  {
    country: 'be',
    slug: 'oost-vlaanderen',
    name: 'Oost-Vlaanderen',
    inName: 'in Oost-Vlaanderen',
    cities: ['Sint-Niklaas', 'Gent', 'Aalst', 'Lokeren', 'Dendermonde', 'Temse', 'Beveren', 'Oudenaarde', 'Eeklo', 'Ninove', 'Wetteren', 'Zele'],
    intro:
      'Oost-Vlaanderen is onze thuisbasis: vanuit Sint-Niklaas staan we snel bij je in het Waasland, Gent, de Denderstreek en het Meetjesland.',
    context:
      'In de polders rond het Waasland en het Meetjesland staat het grondwater vaak hoog, en in de Schelde- en Dendervallei bouwde men eeuwenlang op natte klei- en leemgrond. Veel rijwoningen en arbeidershuizen van voor 1950 hebben geen vochtkering in de muur. Opstijgend vocht en vochtige kelders zijn hier dan ook de klachten die we het vaakst zien.',
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'ventilatie-schimmel'],
  },
  {
    country: 'be',
    slug: 'antwerpen',
    name: 'Antwerpen',
    inName: 'in de provincie Antwerpen',
    cities: ['Antwerpen', 'Mechelen', 'Lier', 'Turnhout', 'Geel', 'Mol', 'Herentals', 'Boom', 'Brasschaat', 'Mortsel', 'Heist-op-den-Berg'],
    intro: 'Van de Antwerpse herenhuizen tot de Kempense fermettes: we behandelen vochtproblemen in de hele provincie Antwerpen.',
    context:
      'In de stad Antwerpen en in Mechelen hebben veel 19e-eeuwse burgerhuizen een kelder die onder het grondwaterpeil ligt of tegen de buurwoning aan zit. In de Kempen draineert de zandgrond beter, maar daar zorgen oudere spouwmuren en dichtgemaakte ramen zonder ventilatie vaker voor condensatie en schimmel.',
    common: ['kelder-waterdicht-maken', 'opstijgend-vocht', 'ventilatie-schimmel'],
  },
  {
    country: 'be',
    slug: 'west-vlaanderen',
    name: 'West-Vlaanderen',
    inName: 'in West-Vlaanderen',
    cities: ['Brugge', 'Kortrijk', 'Oostende', 'Roeselare', 'Ieper', 'Waregem', 'Knokke-Heist', 'Tielt', 'Torhout', 'Menen'],
    intro: 'Aan de kust en in het binnenland van West-Vlaanderen krijgen gevels het hard te verduren. Wij maken ze opnieuw droog.',
    context:
      'Aan de kust slaat de westenwind regen en zout tegen de gevels: doorslaand vocht en verweerd voegwerk zijn er schering en inslag. Achter de kust liggen de polders, waar het grondwater hoog staat en opstijgend vocht in oudere woningen veel voorkomt. In de Leiestreek zien we vooral vochtige kelders.',
    common: ['doorslaand-vocht', 'gevelrenovatie', 'opstijgend-vocht'],
  },
  {
    country: 'be',
    slug: 'vlaams-brabant',
    name: 'Vlaams-Brabant',
    inName: 'in Vlaams-Brabant',
    cities: ['Leuven', 'Vilvoorde', 'Halle', 'Tienen', 'Aarschot', 'Diest', 'Zaventem', 'Asse', 'Grimbergen', 'Dilbeek', 'Tervuren'],
    intro: 'Rond Leuven, in het Pajottenland en in de Brusselse rand lossen we vochtproblemen op in woningen van elke leeftijd.',
    context:
      'De leemgrond in het Hageland en het Pajottenland houdt water lang vast, en in de Dijle- en Demervallei staat het grondwater hoog. Oudere hoeves en rijhuizen in natuursteen of baksteen hebben vaak geen vochtkering. In de Brusselse rand zien we veel gerenoveerde woningen waar condensatie ontstaat nadat ramen en dak goed geïsoleerd zijn, maar de ventilatie niet mee is aangepast.',
    common: ['opstijgend-vocht', 'ventilatie-schimmel', 'kelder-waterdicht-maken'],
  },
  {
    country: 'be',
    slug: 'limburg',
    name: 'Limburg',
    fullName: 'Belgisch-Limburg',
    inName: 'in Belgisch-Limburg',
    cities: ['Hasselt', 'Genk', 'Sint-Truiden', 'Tongeren', 'Lommel', 'Beringen', 'Maasmechelen', 'Bilzen', 'Maaseik', 'Houthalen-Helchteren'],
    intro: 'Ook in Limburg, van Haspengouw tot de Maasvallei, staan we klaar met een gratis vochtdiagnose.',
    context:
      'In de Maasvallei en langs de Demer stijgt het grondwater in natte periodes snel, wat vochtige kelders en opstijgend vocht geeft. De oudere mijncités en de hoeves in Haspengouw hebben vaak dikke bakstenen muren zonder vochtkering. In de Kempense zandstreek ligt het probleem eerder bij condensatie in slecht geventileerde woningen.',
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'ventilatie-schimmel'],
  },
  {
    country: 'be',
    slug: 'brussel',
    name: 'Brussel',
    inName: 'in Brussel',
    cities: ['Brussel', 'Schaarbeek', 'Elsene', 'Ukkel', 'Anderlecht', 'Etterbeek', 'Jette', 'Sint-Gillis', 'Vorst', 'Molenbeek', 'Woluwe'],
    intro: 'Herenhuizen, appartementsgebouwen en kelders in de 19 Brusselse gemeenten: wij maken ze droog, met respect voor het gebouw.',
    context:
      'Het Brusselse woningpatrimonium is oud: veel herenhuizen zijn meer dan honderd jaar oud, met gemetselde kelders en gemene muren met de buren. Opstijgend vocht in de kelder- en gelijkvloerse muren komt daardoor vaak voor. In appartementsgebouwen zien we daarnaast lekkende liftputten en betonrot in garages en terrassen.',
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'liftputten'],
  },
  {
    country: 'be',
    slug: 'waals-brabant',
    name: 'Waals-Brabant',
    inName: 'in Waals-Brabant',
    cities: ['Waver', 'Nijvel', 'Ottignies-Louvain-la-Neuve', 'Tubeke', 'Eigenbrakel', 'Waterloo', 'Geldenaken', 'Rixensart'],
    intro: 'In Waals-Brabant behandelen we zowel oude hoeves als recente villa’s.',
    context:
      'Veel woningen in Waals-Brabant zijn gebouwd op leemgrond die vocht vasthoudt. Oude vierkantshoeves met natuurstenen muren krijgen last van opstijgend vocht, terwijl we in recente villa’s eerder vochtige kelders en garages zien, zeker op hellende percelen waar regenwater tegen de muur blijft staan.',
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'betoninjectie'],
  },
  {
    country: 'be',
    slug: 'henegouwen',
    name: 'Henegouwen',
    inName: 'in Henegouwen',
    cities: ['Charleroi', 'Bergen', 'Doornik', 'La Louvière', 'Moeskroen', 'Aat', 'Edingen', 'Zinnik', 'Binche'],
    intro: 'Van Doornik tot Charleroi: ook in Henegouwen pakken we vochtproblemen grondig aan.',
    context:
      'Henegouwen telt veel arbeiderswoningen uit de industriële periode, vaak in baksteen zonder vochtkering en met kelders die tegen de grond aan liggen. Opstijgend vocht en natte kelders zijn er de meest voorkomende problemen. In oude industriële en appartementsgebouwen zien we daarnaast betonrot.',
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'betonrot-herstellen'],
  },
  {
    country: 'be',
    slug: 'namen',
    name: 'Namen',
    inName: 'in de provincie Namen',
    cities: ['Namen', 'Dinant', 'Gembloers', 'Andenne', 'Sambreville', 'Ciney', 'Philippeville', 'Jambes'],
    intro: 'In de Maas- en Sambervallei en op de plateaus van de Condroz lossen we vochtproblemen op in huizen van elke leeftijd.',
    context:
      'Langs de Maas en de Samber staan veel woningen in natuursteen, dicht bij de rivier en tegen de helling aan gebouwd. Water dat van de helling komt drukt dan tegen de achtergevel en de kelder. Zulke muren hebben een aanpak nodig die rekening houdt met de steen: niet elk product past bij kalksteen of zandsteen.',
    common: ['kelder-waterdicht-maken', 'opstijgend-vocht', 'doorslaand-vocht'],
  },
  {
    country: 'be',
    slug: 'luik',
    name: 'Luik',
    inName: 'in de provincie Luik',
    cities: ['Luik', 'Verviers', 'Seraing', 'Hoei', 'Herstal', 'Eupen', 'Spa', 'Borgworm', 'Sankt Vith'],
    intro: 'Van de stad Luik tot de Oostkantons: ook daar zorgt Dryhouse voor droge muren.',
    context:
      'De oude stadswoningen in Luik en Verviers zijn vaak tegen de heuvel gebouwd, met kelders die deels in de grond zitten. In de Ardennen en de Oostkantons is het klimaat kouder en natter, waardoor condensatie in slecht geïsoleerde woningen en doorslaand vocht op de weerzijde vaker voorkomen dan elders.',
    common: ['kelder-waterdicht-maken', 'ventilatie-schimmel', 'doorslaand-vocht'],
  },
  {
    country: 'be',
    slug: 'luxemburg',
    name: 'Luxemburg',
    inName: 'in de provincie Luxemburg',
    cities: ['Aarlen', 'Bastenaken', 'Marche-en-Famenne', 'Durbuy', 'Virton', 'Neufchâteau', 'Bouillon', 'Libramont'],
    intro: 'Ook in de Belgische Ardennen, in de provincie Luxemburg, kan je bij ons terecht voor een vochtdiagnose.',
    context:
      'De provincie Luxemburg heeft het koudste en natste klimaat van het land. Veel woningen zijn opgetrokken in leisteen of andere natuursteen, met dikke muren zonder spouw. Doorslaand vocht en condensatie zijn er de grootste uitdaging, zeker in tweede verblijven die lange tijd niet verwarmd worden.',
    common: ['doorslaand-vocht', 'ventilatie-schimmel', 'opstijgend-vocht'],
  },
  // Nederland, roughly ordered by distance from Sint-Niklaas.
  {
    country: 'nl',
    slug: 'zeeland',
    name: 'Zeeland',
    inName: 'in Zeeland',
    cities: ['Middelburg', 'Vlissingen', 'Goes', 'Terneuzen', 'Hulst', 'Zierikzee', 'Sluis', 'Oostburg', 'Axel', 'Yerseke'],
    intro: 'Zeeuws-Vlaanderen ligt op een half uur van onze thuisbasis: van Hulst en Terneuzen tot Walcheren en Schouwen-Duiveland staan we snel bij je.',
    context:
      'Zeeland ligt grotendeels onder de zeespiegel, op zware zeeklei met een hoog en vaak brak grondwater. Dat zout trekt mee de muur in: in oude dijkwoningen en boerderijen zien we hoge zoutranden en afbladderend pleisterwerk. Aan de kust jaagt de zeewind de regen dwars door verweerde voegen, zodat doorslaand vocht er net zo vaak voorkomt als opstijgend vocht.',
    common: ['opstijgend-vocht', 'doorslaand-vocht', 'gevelrenovatie'],
  },
  {
    country: 'nl',
    slug: 'noord-brabant',
    name: 'Noord-Brabant',
    inName: 'in Noord-Brabant',
    cities: ['Breda', 'Eindhoven', 'Tilburg', "'s-Hertogenbosch", 'Bergen op Zoom', 'Roosendaal', 'Helmond', 'Oss', 'Oosterhout', 'Waalwijk'],
    intro: 'Van Bergen op Zoom en Breda tot Eindhoven en Den Bosch: in Brabant behandelen we vochtproblemen in elk type woning.',
    context:
      'West-Brabant ligt op dezelfde kleigrond als het Waasland, met dezelfde klachten: opstijgend vocht in oudere rijwoningen en vochtige kruipruimtes. In de jaren-dertigwijken van Breda, Tilburg en Eindhoven zien we vaak een kruipruimte zonder bodemafsluiting, waardoor vocht onder de vloer blijft hangen. Op de zandgronden in het oosten van de provincie ligt het probleem eerder bij condensatie en schimmel.',
    common: ['opstijgend-vocht', 'ventilatie-schimmel', 'kelder-waterdicht-maken'],
  },
  {
    country: 'nl',
    slug: 'limburg',
    name: 'Limburg',
    fullName: 'Nederlands-Limburg',
    inName: 'in Nederlands-Limburg',
    cities: ['Maastricht', 'Venlo', 'Heerlen', 'Sittard-Geleen', 'Roermond', 'Weert', 'Kerkrade', 'Venray', 'Valkenburg'],
    intro: 'Van Maastricht tot Venlo: ook in Nederlands-Limburg pakken we vochtige muren en kelders aan.',
    context:
      'In Zuid-Limburg staan veel huizen in mergel, een zachte kalksteen die water opzuigt als een spons. Tegen de hellingen van het Heuvelland drukt regenwater tegen achtergevels en kelders. In de Maasvallei van Midden- en Noord-Limburg staat het grondwater na natte periodes hoog, met vochtige kelders en opstijgend vocht in oudere woningen als gevolg.',
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'doorslaand-vocht'],
  },
  {
    country: 'nl',
    slug: 'zuid-holland',
    name: 'Zuid-Holland',
    inName: 'in Zuid-Holland',
    cities: ['Rotterdam', 'Den Haag', 'Leiden', 'Dordrecht', 'Delft', 'Gouda', 'Zoetermeer', 'Schiedam', 'Gorinchem', 'Spijkenisse'],
    intro: 'In Rotterdam, Den Haag, Leiden en de Drechtsteden maken we kelders, souterrains en muren opnieuw droog.',
    context:
      'Zuid-Holland ligt diep onder de zeespiegel, op veen- en kleigrond. De herenhuizen in Den Haag, Leiden en Delft hebben vaak een souterrain dat onder het grondwaterpeil ligt, en in de vooroorlogse wijken van Rotterdam blijven kruipruimtes nat. In naoorlogse portiekflats en galerijflats zien we daarnaast condensatie en betonrot aan balkons en galerijen.',
    common: ['kelder-waterdicht-maken', 'ventilatie-schimmel', 'betonrot-herstellen'],
  },
  {
    country: 'nl',
    slug: 'utrecht',
    name: 'Utrecht',
    inName: 'in de provincie Utrecht',
    cities: ['Utrecht', 'Amersfoort', 'Veenendaal', 'Zeist', 'Nieuwegein', 'Houten', 'Woerden', 'IJsselstein', 'De Bilt'],
    intro: 'Van de Utrechtse binnenstad tot Amersfoort en de Heuvelrug: we zoeken de oorzaak en lossen het vochtprobleem op.',
    context:
      'De oude binnensteden van Utrecht en Amersfoort hebben veel gemetselde kelders, sommige eeuwen oud, die tegen of onder het grondwater liggen. In het westen van de provincie, rond Woerden en in de Vechtstreek, staan woningen op natte veengrond met opstijgend vocht als gevolg. Op de zandgrond van de Heuvelrug zien we vooral condensatie in oudere villa’s en jaren-zeventigwoningen.',
    common: ['kelder-waterdicht-maken', 'opstijgend-vocht', 'ventilatie-schimmel'],
  },
  {
    country: 'nl',
    slug: 'gelderland',
    name: 'Gelderland',
    inName: 'in Gelderland',
    cities: ['Arnhem', 'Nijmegen', 'Apeldoorn', 'Ede', 'Doetinchem', 'Zutphen', 'Harderwijk', 'Tiel', 'Zaltbommel', 'Culemborg'],
    intro: 'In het rivierengebied, op de Veluwe en in de Achterhoek: ook in Gelderland kan je bij ons terecht.',
    context:
      'In de Betuwe en langs Rijn, Waal en IJssel staan veel dijkwoningen en boerderijen waar kwelwater en een hoog grondwater voor opstijgend vocht en natte kelders zorgen. In Nijmegen, Arnhem en Zutphen hebben de oude stadspanden vaak kelders zonder waterdichting. Op de droge zandgrond van de Veluwe zien we eerder condensatie en schimmel in slecht geventileerde woningen.',
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'ventilatie-schimmel'],
  },
  {
    country: 'nl',
    slug: 'noord-holland',
    name: 'Noord-Holland',
    inName: 'in Noord-Holland',
    cities: ['Amsterdam', 'Haarlem', 'Alkmaar', 'Zaandam', 'Hilversum', 'Hoorn', 'Purmerend', 'Amstelveen', 'Den Helder', 'Enkhuizen'],
    intro: 'Van Amsterdamse grachtenpanden tot huizen achter de duinen: we behandelen vochtproblemen in heel Noord-Holland.',
    context:
      'Amsterdam en Haarlem staan op palen in slappe veengrond. Souterrains en kelders liggen er vaak onder het grondwaterpeil en de muren erboven trekken vocht op. Achter de duinen en in West-Friesland slaat de wind de regen tegen de gevels, zodat doorslaand vocht en verweerd voegwerk veel voorkomen. In de Zaanstreek en het Gooi zien we daarnaast veel oudere woningen met vochtige kruipruimtes.',
    common: ['kelder-waterdicht-maken', 'opstijgend-vocht', 'doorslaand-vocht'],
  },
  {
    country: 'nl',
    slug: 'flevoland',
    name: 'Flevoland',
    inName: 'in Flevoland',
    cities: ['Almere', 'Lelystad', 'Dronten', 'Emmeloord', 'Zeewolde', 'Urk'],
    intro: 'Flevoland is jong, maar ook daar zien we vochtproblemen. Alleen zijn het andere dan in oude binnensteden.',
    context:
      'De meeste woningen in Flevoland zijn na 1970 gebouwd, op drooggelegde zeebodem, en hebben een vochtkering. Opstijgend vocht is hier dus zeldzaam. Wat we wel zien: condensatie en schimmel in goed geïsoleerde woningen met te weinig ventilatie, vochtige kruipruimtes door het hoge grondwater, en betonrot aan balkons en galerijen van appartementsgebouwen uit de jaren zeventig en tachtig.',
    common: ['ventilatie-schimmel', 'betonrot-herstellen', 'liftputten'],
  },
  {
    country: 'nl',
    slug: 'overijssel',
    name: 'Overijssel',
    inName: 'in Overijssel',
    cities: ['Zwolle', 'Enschede', 'Deventer', 'Hengelo', 'Almelo', 'Kampen', 'Oldenzaal', 'Hardenberg', 'Rijssen'],
    intro: 'In de Hanzesteden aan de IJssel en in Twente zorgt Dryhouse voor droge muren en kelders.',
    context:
      'Deventer, Kampen en Zwolle hebben historische binnensteden met eeuwenoude baksteenpanden en kelders, dicht bij de IJssel en de Vecht. Bij hoog rivierwater stijgt ook het grondwater onder die panden. In Twente staan veel arbeiderswoningen uit de textieltijd, vaak zonder vochtkering en met verweerde gevels.',
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'gevelrenovatie'],
  },
  {
    country: 'nl',
    slug: 'drenthe',
    name: 'Drenthe',
    inName: 'in Drenthe',
    cities: ['Assen', 'Emmen', 'Hoogeveen', 'Meppel', 'Coevorden', 'Roden', 'Beilen', 'Westerbork'],
    intro: 'Ook in Drenthe, van Assen tot Emmen en Meppel, kan je een vochtdiagnose bij ons aanvragen.',
    context:
      'Drenthe ligt grotendeels op zandgrond en is droger dan de rest van het noorden. De vochtproblemen zitten hier vooral in de woning zelf: condensatie en schimmel in naoorlogse rijwoningen, en vocht in de muren van oude boerderijen in de esdorpen. In de Veenkoloniën in het zuidoosten staat het grondwater hoger en zien we ook opstijgend vocht.',
    common: ['ventilatie-schimmel', 'opstijgend-vocht', 'gevelrenovatie'],
  },
  {
    country: 'nl',
    slug: 'groningen',
    name: 'Groningen',
    inName: 'in de provincie Groningen',
    cities: ['Groningen', 'Delfzijl', 'Veendam', 'Hoogezand', 'Winschoten', 'Stadskanaal', 'Appingedam', 'Leek'],
    intro: 'In de stad en de provincie Groningen helpen we je van vochtige muren en natte kelders af.',
    context:
      'Op de zware zeeklei van Noord-Groningen staan veel oude boerderijen en dorpswoningen zonder vochtkering. Bodembeweging heeft in een deel van de provincie scheuren in muren en gevels veroorzaakt, waarlangs regenwater naar binnen kan dringen. In de stad Groningen hebben de oude panden vaak kelders die bij hoog grondwater vochtig worden.',
    common: ['doorslaand-vocht', 'opstijgend-vocht', 'gevelrenovatie'],
  },
  {
    country: 'nl',
    slug: 'friesland',
    name: 'Friesland',
    inName: 'in Friesland',
    cities: ['Leeuwarden', 'Sneek', 'Heerenveen', 'Drachten', 'Harlingen', 'Franeker', 'Dokkum', 'Bolsward'],
    intro: 'Tot in Friesland, van Leeuwarden tot Harlingen en Heerenveen, maken we vochtige huizen opnieuw droog.',
    context:
      'Friesland is een natte provincie: klei in het noorden, veen in het zuiden en overal water. De oude stelpboerderijen en de woningen in de Friese steden hebben zelden een vochtkering, en aan de Waddenkust staan de gevels pal in de wind. Opstijgend en doorslaand vocht zijn er de klachten die we het vaakst tegenkomen.',
    common: ['opstijgend-vocht', 'doorslaand-vocht', 'ventilatie-schimmel'],
  },
];

export const regionsIn = (code: CountryCode) => regions.filter((r) => r.country === code);

/** Country texts, slug and URL in the given language (French copy in regions.fr.ts); `code` is the ID. */
export function localCountry(c: Country, lang: Lang = 'nl') {
  const t = lang === 'fr' ? countriesFr[c.code] : c;
  return { ...c, ...t, path: lang === 'fr' ? `/fr/traitement-humidite/${t.slug}` : `/vochtbestrijding/${c.slug}` };
}

/** Region texts and URL in the given language. `slug` stays the Dutch ID, `localSlug` is the URL segment. */
export function localRegion(r: Region, lang: Lang = 'nl') {
  if (lang === 'nl') return { ...r, localSlug: r.slug, path: `/vochtbestrijding/${countries[r.country].slug}/${r.slug}` };
  const t = regionsFr[`${r.country}/${r.slug}`];
  return { ...r, ...t, slug: r.slug, localSlug: t.slug, path: `/fr/traitement-humidite/${countriesFr[r.country].slug}/${t.slug}` };
}

export const countryPath = (c: Country, lang: Lang = 'nl') => localCountry(c, lang).path;
export const regionPath = (r: Region, lang: Lang = 'nl') => localRegion(r, lang).path;
