import type { CountryCode } from './regions';
import type { ServiceSlug } from './services';

/**
 * City landing pages (/vochtbestrijding-<slug>), Dutch only. Each needs its own local text:
 * near-identical city pages count as doorway pages for Google.
 * `projects` stays empty until Dryhouse supplies real projects from that city.
 */
export interface City {
  slug: string;
  name: string;
  country: CountryCode; // 'be' | 'nl'
  /** Province slug as used in src/data/regions.ts (e.g. 'oost-vlaanderen', 'antwerpen', 'noord-brabant'). */
  region: string;
  /** <title> without the " | Dryhouse" suffix, e.g. 'Vochtbestrijding en kelderdichting in Sint-Niklaas'. */
  title: string;
  /** Meta description, max 160 characters. */
  description: string;
  h1: string;
  intro: string;
  /** 3–4 sections of local text, each body 70–140 words, plain text (no Markdown). */
  sections: { title: string; body: string }[];
  /** Deelgemeenten / wijken / nearby towns we also serve from this page. */
  areas: string[];
  /** Service slugs most relevant here, 3–4, from the list below. */
  common: ServiceSlug[];
  /** 3 local FAQ items. */
  faq: { q: string; a: string }[];
  /** Real projects only. Empty until Dryhouse supplies them. */
  projects: { title: string; body: string }[];
}

export const cities: City[] = [
  {
    slug: 'sint-niklaas',
    name: 'Sint-Niklaas',
    country: 'be',
    region: 'oost-vlaanderen',
    title: 'Vochtbestrijding en kelderdichting in Sint-Niklaas',
    description:
      'Vochtige muren of een natte kelder in Sint-Niklaas, Belsele, Sinaai of Nieuwkerken? Dryhouse zit in de stad zelf. Gratis diagnose, tot 30 jaar garantie.',
    h1: 'Vochtbestrijding in Sint-Niklaas',
    intro:
      'Dryhouse is gevestigd in de Anthonis de Jonghestraat in Sint-Niklaas. Vochtproblemen in onze eigen stad behandelen we dus zonder lange verplaatsing. Met meer dan 20 jaar ervaring werken we in stadswoningen in het centrum en in de verkavelingen van Belsele, Sinaai en Nieuwkerken-Waas.',
    sections: [
      {
        title: 'Rijwoningen uit de textielperiode',
        body:
          'Sint-Niklaas groeide in de 19e en vroege 20e eeuw rond de textielnijverheid. Uit die periode stammen veel rijwoningen en arbeidershuizen in de wijken rond het centrum. Ze zijn gemetseld in volle baksteen met kalkmortel, zonder vochtkering onderaan de muur. Vocht uit de grond stijgt dan capillair op in het metselwerk. Je ziet het aan zoutranden, loskomend pleisterwerk en behang dat op een vaste hoogte loslaat. We behandelen dat met een injectie: in een rij boorgaten onderaan de muur brengen we een crème die in de steen een horizontale vochtkering vormt. Daarna moet het zoutbelaste pleisterwerk eruit. Blijft het zitten, dan blijft de muur vocht uit de lucht opnemen.',
      },
      {
        title: 'Kelders op de Wase zandgrond',
        body:
          'Sint-Niklaas ligt op de zandige rug van het Waasland. Zand laat regenwater snel door. Hoe snel het daarna wegzakt, hangt af van de lagen eronder, en dat verschilt per straat. Daardoor is een kelder die in de zomer droog is, in een natte winter soms vochtig of nat. Het water komt meestal binnen langs de kimnaad, de naad tussen vloer en muur, en door scheuren in de vloer. Hier werken we met een bekuiping: een waterdichte laag aan de binnenkant van vloer en muren, met een afgewerkte kimnaad. Staat het grondwater echt tegen de kelder, dan komt er een drainage met een pompput bij.',
      },
      {
        title: 'Verkavelingen in Belsele, Sinaai en Nieuwkerken',
        body:
          'In de deelgemeenten staan veel vrijstaande en halfopen woningen uit de jaren zestig tot tachtig. Die hebben meestal wel een vochtkering, maar andere zwakke punten: een kelder in betonblokken zonder buitenafdichting, een oprit die naar de gevel afloopt, of nieuwe ramen zonder ventilatieroosters. Dat laatste geeft condensatie, met beslagen ramen en schimmel in hoeken en achter kasten. Een injectie lost dat niet op. Tijdens de gratis diagnose ter plaatse meten we waar het vocht vandaan komt. Pas dan stellen we een behandeling voor, of dat nu ventilatie op maat is of het waterdicht maken van de kelder.',
      },
    ],
    areas: ['Belsele', 'Sinaai', 'Nieuwkerken-Waas', 'Stekene', 'Sint-Gillis-Waas', 'Kemzeke'],
    common: ['opstijgend-vocht', 'kelder-waterdicht-maken', 'ventilatie-schimmel', 'gevelrenovatie'],
    faq: [
      {
        q: 'Komen jullie ook in Belsele, Sinaai en Nieuwkerken-Waas?',
        a: 'Ja. Die deelgemeenten liggen op enkele minuten van ons kantoor. Ook in Stekene, Sint-Gillis-Waas en de rest van het Waasland komen we langs voor een gratis diagnose.',
      },
      {
        q: 'Mijn kelder is alleen in de winter nat. Moet die behandeld worden?',
        a: 'Meestal wel. Water dat elk jaar terugkomt, tast mortel en pleisterwerk aan en houdt de kelder vochtig. Ter plaatse bekijken we of een bekuiping volstaat of dat er ook een drainage met pompput nodig is.',
      },
      {
        q: 'Hoe lang garantie krijg ik op de behandeling?',
        a: 'Op de injectie tegen opstijgend vocht krijg je 30 jaar garantie. Op kelderdichting, drainage, gevelwerken en andere behandelingen is dat 10 jaar. Op elektrische toestellen, zoals een pomp of een ventilatietoestel, geldt 2 jaar, soms 5 jaar als je het serienummer bij de leverancier registreert.',
      },
    ],
    projects: [],
  },
  {
    slug: 'antwerpen',
    name: 'Antwerpen',
    country: 'be',
    region: 'antwerpen',
    title: 'Vochtbestrijding en kelderdichting in Antwerpen',
    description:
      'Natte kelder, lekkende liftput of betonrot in Antwerpen? Dryhouse werkt voor eigenaars, syndici en architecten. Gratis diagnose, tot 30 jaar garantie.',
    h1: 'Vochtbestrijding in Antwerpen: kelders, liftputten en gevels',
    intro:
      'Vanuit Sint-Niklaas rijden we via de Kennedytunnel naar Antwerpen, buiten de spits in ongeveer een halfuur. In de stad en de districten werken we voor particulieren, voor syndici van appartementsgebouwen en voor architecten die een renovatie begeleiden. We maakten al meer dan 1.000 kelders waterdicht.',
    sections: [
      {
        title: 'Herenhuizen en burgerwoningen van rond 1900',
        body:
          'In wijken als het Zuid, Zurenborg en delen van Berchem en Borgerhout staan veel herenhuizen en burgerwoningen van rond 1900. Ze hebben meestal een kelder onder het voorhuis, met gemetselde gewelven. Typische lekpunten zijn het oude kolenluik aan de straatkant, leidingdoorvoeren en de aansluiting met de muur van de buren. Een bekuiping aan de binnenkant werkt hier goed, omdat je aan de buitenkant niet kan graven. Op het gelijkvloers zien we opstijgend vocht in de voorgevel en in de dragende middenmuur. Bij waardevolle gevels kiezen we een gevelbehandeling die het uitzicht van de steen niet verandert.',
      },
      {
        title: 'Appartementsgebouwen: liftputten, garages en terrassen',
        body:
          'Antwerpen telt veel appartementsgebouwen uit de jaren zestig en zeventig, in de districten en op Linkeroever. De klachten zijn vaak dezelfde: water in de liftput, vochtplekken in de ondergrondse garage en betonrot aan balkons en terrassen. Een liftput ligt het diepst van het gebouw en krijgt dus als eerste grondwater. We dichten scheuren en werkvoegen met een injectie en werken de put af met een waterdichte bekuiping, zonder grote afbraak. Bij betonrot leggen we de aangetaste wapening vrij, behandelen die tegen roest en herstellen het beton. Voor de syndicus maken we een offerte die op de algemene vergadering besproken kan worden.',
      },
      {
        title: 'Dicht bij de Schelde',
        body:
          'In de laaggelegen delen van de stad, dicht bij de Schelde, en in de polders in het noorden staat het grondwater vaak hoog. Een kelder die daar onder het grondwaterpeil ligt, krijgt water onder druk. Een vochtwerende verf of een gewone cementlaag houdt dat niet tegen: het water duwt ze los. In zo’n kelder plaatsen we eerst een drainage langs de kimnaad, die het water naar een pompput leidt. Daarover komt een bekuiping die tegen waterdruk bestand is. Op die kelderdichting krijg je 10 jaar garantie, op de pomp 2 jaar.',
      },
    ],
    areas: ['Berchem', 'Borgerhout', 'Deurne', 'Merksem', 'Wilrijk', 'Hoboken', 'Ekeren', 'Linkeroever', 'Zwijndrecht', 'Mortsel', 'Edegem'],
    common: ['kelder-waterdicht-maken', 'liftputten', 'betonrot-herstellen', 'gevelrenovatie'],
    faq: [
      {
        q: 'Werken jullie ook voor syndici en VME’s?',
        a: 'Ja. Voor appartementsgebouwen werken we rechtstreeks met de syndicus. We komen eerst gratis kijken en zoeken de oorzaak. We nemen binnen 2 werkdagen contact op en je ontvangt de offerte binnen een week na de diagnose.',
      },
      {
        q: 'Kan je de kelder van een rijhuis waterdicht maken zonder bij de buren te graven?',
        a: 'Ja. Bij een bekuiping werken we volledig van binnenuit. In een gesloten bebouwing is dat meestal de enige praktische keuze.',
      },
      {
        q: 'Mijn liftput staat onder water. Moet de lift dan lang buiten dienst?',
        a: 'Tijdens de werken in de put kan de lift niet gebruikt worden. Hoe lang dat duurt, hangt af van de toestand van de put. Dat kunnen we pas zeggen na de diagnose ter plaatse.',
      },
    ],
    projects: [],
  },
  {
    slug: 'gent',
    name: 'Gent',
    country: 'be',
    region: 'oost-vlaanderen',
    title: 'Vochtbestrijding en kelderdichting in Gent',
    description:
      'Vocht in een Gentse rijwoning, beluik of herenhuis? Dryhouse zoekt de oorzaak en behandelt ze, met tot 30 jaar garantie. Gratis diagnose ter plaatse.',
    h1: 'Vochtbestrijding in Gent',
    intro:
      'Gent ligt op ongeveer een halfuur van Sint-Niklaas, via de E17. We werken in de binnenstad, in de 19e-eeuwse wijken rond het centrum en in de deelgemeenten, van Oostakker tot Zwijnaarde. Elke opdracht begint met een gratis diagnose bij je thuis.',
    sections: [
      {
        title: 'Beluiken en arbeiderswoningen',
        body:
          'In de 19e eeuw groeide Gent snel door de textielindustrie. Rond de fabrieken, in wijken als de Brugse Poort, het Rabot en de Muide, werden rijen arbeiderswoningen en beluiken gebouwd: kleine huizen rond een smalle gang achter de straat. Ze zijn opgetrokken in baksteen, op ondiepe funderingen en zonder vochtkering. Opstijgend vocht komt er veel voor. Veel van die huizen zijn intussen gerenoveerd. Werd daarbij een cementpleister of een dampdichte verf op een vochtige muur gezet, dan stijgt het vocht hoger in de muur. We injecteren eerst een vochtkering, laten het oude pleisterwerk verwijderen en werken af met een zoutwerende pleister.',
      },
      {
        title: 'Waar Leie en Schelde samenkomen',
        body:
          'Gent ligt aan de samenvloeiing van de Leie en de Schelde. Door de binnenstad lopen nog veel waterlopen, en een deel van de vroegere vaarten is overwelfd of gedempt. In de valleien is de grond natter dan in de zandstreek rond de stad. Kelders in oude panden dicht bij het water zijn daardoor vaak vochtig, zeker na een natte winter. Een kelder die als berging dient, vraagt een andere aanpak dan een kelder die je als wasplaats of hobbyruimte wil inrichten. Voor een berging volstaat soms een afdichting van de kimnaad en de scheuren. Wil je de ruimte echt gebruiken, dan kiezen we voor een volledige bekuiping.',
      },
      {
        title: 'Na de renovatie: condensatie',
        body:
          'In de Gentse 19e-eeuwse gordel worden veel woningen grondig gerenoveerd: nieuwe ramen, dakisolatie, een dichte achterbouw. Het huis wordt daardoor luchtdicht, maar de vochtige lucht van koken, douchen en was drogen moet ergens heen. Zonder ventilatie slaat ze neer op de koudste plekken: hoeken van buitenmuren, achter kasten en rond de ramen. Dat lijkt op opstijgend vocht, maar de behandeling is helemaal anders. Ter plaatse meten we het vochtgehalte in de muur op verschillende hoogtes. Zo zien we of het vocht van onderen komt of uit de lucht. Een injectie stellen we alleen voor als die ook echt nodig is.',
      },
    ],
    areas: ['Gentbrugge', 'Ledeberg', 'Sint-Amandsberg', 'Oostakker', 'Mariakerke', 'Drongen', 'Wondelgem', 'Sint-Denijs-Westrem', 'Zwijnaarde', 'Merelbeke', 'Destelbergen', 'Lochristi'],
    common: ['opstijgend-vocht', 'ventilatie-schimmel', 'kelder-waterdicht-maken', 'doorslaand-vocht'],
    faq: [
      {
        q: 'Komen jullie ook in de deelgemeenten en de randgemeenten?',
        a: 'Ja. Van Drongen en Mariakerke tot Oostakker, Gentbrugge en Zwijnaarde, en ook in Merelbeke, Destelbergen en Lochristi.',
      },
      {
        q: 'Mijn muur is vochtig sinds de renovatie. Is dat opstijgend vocht?',
        a: 'Niet altijd. Na een renovatie is condensatie minstens even waarschijnlijk, en nieuw pleisterwerk heeft enkele maanden nodig om uit te drogen. We meten het ter plaatse, zodat je niet betaalt voor een behandeling die het probleem niet oplost.',
      },
      {
        q: 'Welke garantie krijg ik op een injectie tegen opstijgend vocht?',
        a: 'Op een injectie tegen opstijgend vocht geven we 30 jaar garantie. Op onze andere behandelingen, zoals een kelderdichting, is dat 10 jaar.',
      },
    ],
    projects: [],
  },
  {
    slug: 'mechelen',
    name: 'Mechelen',
    country: 'be',
    region: 'antwerpen',
    title: 'Vochtbestrijding en kelderdichting in Mechelen',
    description:
      'Vochtige kelder, muren of gevel in Mechelen, Walem, Heffen of Muizen? Dryhouse komt gratis langs voor een diagnose en behandelt met tot 30 jaar garantie.',
    h1: 'Vochtbestrijding in Mechelen',
    intro:
      'Mechelen ligt tussen Antwerpen en Brussel, op ongeveer drie kwartier van Sint-Niklaas. We behandelen er vocht in de historische binnenstad, in de wijken rond de ring en in de deelgemeenten. We werken voor particulieren, maar ook architecten en aannemers schakelen ons in bij een renovatie.',
    sections: [
      {
        title: 'Een oude binnenstad aan de Dijle',
        body:
          'De Dijle loopt dwars door de Mechelse binnenstad, en vroeger liep er een net van vlieten door de stad, waarvan een deel overwelfd is. Veel panden in het centrum zijn eeuwen oud, met kelders in baksteen of natuursteen en muren die meermaals verbouwd zijn. In zo’n pand komt vocht zelden uit één bron. Opstijgend vocht in de muren, grondwater in de kelder en regenwater langs een lekkende dakgoot kunnen tegelijk spelen. We brengen eerst elke bron in kaart en behandelen ze dan in de juiste volgorde: eerst het water dat binnenkomt, dan het vocht dat al in de muur zit.',
      },
      {
        title: 'Gevels in baksteen en natuursteen',
        body:
          'Mechelen telt veel oude gevels in baksteen, vaak met details in natuursteen. Na tientallen jaren vuil, mos en verweerde voegen nemen die gevels meer regenwater op. Dat zie je binnen als vochtplekken op de verdieping, los van opstijgend vocht onderaan. We reinigen de gevel met een techniek die bij de steen past, herstellen het voegwerk waar nodig en brengen een waterafstotende gevelbehandeling aan die dampopen blijft. Een reiniging met hoge druk raden we bij zachte baksteen af: die beschadigt de buitenhuid van de steen, waardoor hij nog meer water opneemt. Voor waardevolle en beschermde gevels werken we in overleg met de architect, zodat de behandeling past bij wat er toegelaten is.',
      },
      {
        title: 'Kelders in de Dijle- en Zennevallei',
        body:
          'Een deel van de deelgemeenten ligt laag, in de vallei van de Dijle en de Zenne. Daar staat het grondwater in de winter hoog, en kunnen kelders van woningen uit de jaren vijftig tot zeventig water maken. Die kelders zijn vaak gebouwd in betonblokken of gestort beton, met een koude naad tussen vloer en muur. Het water komt dan binnen via die kimnaad en via scheuren. We injecteren de scheuren, werken de kimnaad af en brengen een bekuiping aan. Staat het water onder druk, dan plaatsen we een drainage met een pompput. Op die kelderdichting krijg je 10 jaar garantie.',
      },
    ],
    areas: ['Walem', 'Heffen', 'Leest', 'Hombeek', 'Muizen', 'Battel', 'Bonheiden', 'Sint-Katelijne-Waver', 'Willebroek', 'Duffel'],
    common: ['kelder-waterdicht-maken', 'opstijgend-vocht', 'gevelrenovatie', 'reinigingstechnieken'],
    faq: [
      {
        q: 'Mijn woning in de binnenstad is beschermd. Kunnen jullie daar werken?',
        a: 'Ja. We kiezen technieken die het metselwerk niet beschadigen en stemmen ze af met je architect. Voor sommige werken aan beschermd erfgoed is vooraf een toelating nodig. Die vraagt de eigenaar of de architect aan.',
      },
      {
        q: 'Wat kost de eerste diagnose?',
        a: 'Niets. We komen gratis langs, meten het vocht en zoeken de oorzaak. We nemen binnen 2 werkdagen contact op en je ontvangt de offerte binnen een week na de diagnose.',
      },
      {
        q: 'Werken jullie ook in Bonheiden, Sint-Katelijne-Waver en Willebroek?',
        a: 'Ja. Vanuit Mechelen bedienen we ook de omliggende gemeenten, van Willebroek tot Bonheiden en Duffel.',
      },
    ],
    projects: [],
  },
  {
    slug: 'lokeren',
    name: 'Lokeren',
    country: 'be',
    region: 'oost-vlaanderen',
    title: 'Vochtbestrijding en kelderdichting in Lokeren',
    description:
      'Natte kelder of vochtige muren in Lokeren, Daknam of Eksaarde? Dryhouse zit op een kwartier rijden. Gratis diagnose, tot 30 jaar garantie.',
    h1: 'Vochtbestrijding in Lokeren',
    intro:
      'Lokeren ligt op een kwartier van ons kantoor in Sint-Niklaas, via de E17 of de N70. We werken in de stad en in de deelgemeenten Daknam en Eksaarde. We nemen binnen 2 werkdagen contact op en je ontvangt de offerte binnen een week na de diagnose. Die diagnose ter plaatse is gratis. Op een injectie tegen opstijgend vocht krijg je 30 jaar garantie, op een kelderdichting of drainage 10 jaar.',
    sections: [
      {
        title: 'Wonen aan de Durme',
        body:
          'De Durme loopt door het centrum van Lokeren. Delen van de stad en de omgeving liggen laag in de Durmevallei, en sommige percelen vallen in overstromingsgevoelig gebied. Ook zonder overstroming staat het grondwater daar in natte periodes hoog. Kelders krijgen dan water langs de kimnaad of door de vloer. Een bekuiping alleen is dan niet altijd genoeg. We combineren ze met een drainage langs de vloer, die het water naar een pompput leidt. De pompput komt op het laagste punt van de kelder, met een afvoer naar de riolering, zodat het water wordt weggepompt voor het in de kelder komt.',
      },
      {
        title: 'Verbouwde woningen en voorzetwanden',
        body:
          'Bij een verbouwing worden vochtige muren vaak weggewerkt achter gipskarton of een voorzetwand. Het vocht blijft dan in de muur zitten. Je ziet het pas als er schimmel achter de wand groeit, de plinten loskomen of er een geur in de kamer blijft hangen. Dat zien we zowel in oudere woningen in het centrum als in hoeves en dorpswoningen in Daknam en Eksaarde. Een voorzetwand tegen een natte muur raden we af. Eerst moet de oorzaak weg: een injectie tegen opstijgend vocht, of een afdichting als het water van buitenaf komt. Pas als de muur droog is, heeft een nieuwe afwerking zin.',
      },
      {
        title: 'Rijwoningen en verkavelingen',
        body:
          'Rond het centrum en in de woonwijken staan veel rijwoningen en halfopen woningen uit de jaren vijftig tot tachtig. Een deel ervan heeft een kelder onder een stuk van het huis, gebouwd in betonblokken. Bij hoog grondwater zijn de blokken en de voegen de zwakke plek. Is de buitenkant bereikbaar, bijvoorbeeld bij een grondige renovatie of als de oprit toch opnieuw wordt aangelegd, dan is een buitenafdichting met een drainage aan de voet van de muur de duurzaamste oplossing. Anders werken we van binnenuit. Tegelijk kijken we naar ventilatie: een vochtige kelder geeft vaak ook vocht in de ruimtes erboven.',
      },
    ],
    areas: ['Daknam', 'Eksaarde', 'Zele', 'Waasmunster', 'Moerbeke', 'Wachtebeke'],
    common: ['kelderdrainage', 'opstijgend-vocht', 'buitenafdichting-kelder', 'ventilatie-schimmel'],
    faq: [
      {
        q: 'Mijn woning ligt in overstromingsgevoelig gebied. Wat betekent dat voor mijn kelder?',
        a: 'Dat de kans op hoog grondwater groter is. Je kan het nakijken op de overstromingskaarten van de Vlaamse overheid. Een waterdichte kelder houdt grondwater buiten, maar geen water dat bij een overstroming via ramen of deuren binnenkomt.',
      },
      {
        q: 'Werken jullie ook in Zele, Waasmunster en Moerbeke?',
        a: 'Ja. Die gemeenten liggen net als Lokeren dicht bij ons kantoor in Sint-Niklaas.',
      },
      {
        q: 'Kan ik een voorzetwand plaatsen tegen een vochtige muur?',
        a: 'Liever niet zolang het vocht er niet uit is. Het probleem blijft dan bestaan achter de wand. Laat eerst de oorzaak bepalen en behandelen.',
      },
    ],
    projects: [],
  },
  {
    slug: 'beveren',
    name: 'Beveren',
    country: 'be',
    region: 'oost-vlaanderen',
    title: 'Vochtbestrijding en kelderdichting in Beveren',
    description:
      'Vocht in een polderhoeve, rijwoning of kelder in Beveren, Melsele, Kallo of Haasdonk? Gratis diagnose ter plaatse en tot 30 jaar garantie van Dryhouse.',
    h1: 'Vochtbestrijding in Beveren en de Wase polders',
    intro:
      'Beveren ligt op een kwartier van ons kantoor in Sint-Niklaas. We werken in het centrum, in Melsele en Haasdonk en in de polderdorpen Kieldrecht, Verrebroek, Kallo en Doel. Dat zijn twee heel verschillende soorten grond, met elk hun eigen vochtproblemen.',
    sections: [
      {
        title: 'Polders in het noorden, zand in het zuiden',
        body:
          'In het noorden van de gemeente liggen de Scheldepolders rond Kieldrecht, Verrebroek, Kallo en Doel: vlak, laag en op kleigrond, met grondwater dat dicht onder het maaiveld zit. Het zuiden, rond Haasdonk, ligt hoger en is zandiger. Dat verschil zie je terug in de klachten. In de polders zien we vooral opstijgend vocht en kelders die het hele jaar vochtig zijn. Op de zandgrond is een kelder vaak alleen in natte periodes nat. Daarom start elke opdracht met een gratis diagnose ter plaatse: dezelfde vochtplek vraagt in Kieldrecht een andere aanpak dan in Haasdonk.',
      },
      {
        title: 'Polderhoeves en dorpswoningen',
        body:
          'In de polderdorpen staan nog oude hoeves en dorpswoningen, gebouwd in baksteen op ondiepe funderingen in de klei. Een vochtkering hadden ze bij de bouw niet. Het water in de klei stijgt op in de muren. Bij een verbouwing tot moderne woning wordt dat zichtbaar: zoutkorsten op de muur, verkleurde plinten en schimmel achter meubels. Oude hoevemuren zijn vaak dik. We boren dan dieper, soms van twee kanten, zodat de injectie over de volledige muurdikte een vochtkering vormt. Daarna moet de muur drogen voor er nieuw pleisterwerk op komt. Daar houden we rekening mee in de planning van de afwerking. Verbouw je een hoeve, plan de injectie dan vroeg, voor de nieuwe vloeren en de afwerking.',
      },
      {
        title: 'Kleigrond en scheuren',
        body:
          'Klei krimpt in droge zomers en zwelt weer bij regen. Bij woningen op kleigrond geeft dat beweging in de fundering, en soms scheuren in keldermuren en -vloeren. Door die scheuren komt bij hoog grondwater water binnen. Een scheur gewoon dichtsmeren houdt niet: bij de volgende beweging gaat ze opnieuw open. We injecteren scheuren met een hars die waterdicht is en een beetje kan meebewegen. Is de kelder over de hele oppervlakte vochtig, dan volgt een bekuiping, en bij grondwaterdruk een drainage naar een pompput. Kan je rond de woning graven, dan is ook een buitenafdichting mogelijk. Dat graafwerk combineer je best met andere werken aan de buitenkant, zoals nieuwe riolering.',
      },
    ],
    areas: ['Melsele', 'Haasdonk', 'Vrasene', 'Kallo', 'Kieldrecht', 'Verrebroek', 'Doel', 'Kruibeke', 'Bazel', 'Zwijndrecht', 'Burcht'],
    common: ['opstijgend-vocht', 'betoninjectie', 'buitenafdichting-kelder', 'kelderdrainage'],
    faq: [
      {
        q: 'Werken jullie ook in Kruibeke en Zwijndrecht?',
        a: 'Ja. Kruibeke, Bazel, Rupelmonde, Zwijndrecht en Burcht liggen op korte afstand. We komen er op dezelfde manier langs als in Beveren zelf.',
      },
      {
        q: 'Hoe lang duurt het voor een muur droog is na een injectie?',
        a: 'Dat hangt af van de muurdikte en het seizoen. Reken op enkele maanden, bij dikke hoevemuren langer. De vochtkering werkt meteen, maar het vocht dat al in de muur zit, moet nog uitdrogen. Werk de muur tot dan niet af met dampdichte verf of behang.',
      },
      {
        q: 'Welke garantie geven jullie?',
        a: 'Op een injectie tegen opstijgend vocht krijg je 30 jaar garantie, ook in de polders. Op kelderdichting, drainage en betoninjectie is dat 10 jaar. Op een pomp geldt 2 jaar, soms 5 jaar als je het serienummer bij de leverancier registreert.',
      },
    ],
    projects: [],
  },
  {
    slug: 'temse',
    name: 'Temse',
    country: 'be',
    region: 'oost-vlaanderen',
    title: 'Vochtbestrijding en kelderdichting in Temse',
    description:
      'Vocht in je woning in Temse, Elversele, Steendorp of Tielrode? Dryhouse zit op een kwartier en komt gratis langs voor een diagnose. Tot 30 jaar garantie.',
    h1: 'Vochtbestrijding in Temse',
    intro:
      'Temse ligt op een kwartier van ons kantoor in Sint-Niklaas. De gemeente ligt aan de Schelde, met Tielrode aan de monding van de Durme. Dat water bepaalt voor een groot deel welke vochtproblemen we hier zien. We werken in Temse zelf, in Elversele, Steendorp en Tielrode, en over de brug ook in Bornem.',
    sections: [
      {
        title: 'Aan de Schelde',
        body:
          'De Schelde is hier een getijdenrivier: het waterpeil gaat twee keer per dag op en neer. Dijken en de werken van het Sigmaplan beschermen de woningen tegen overstroming, maar dicht bij de rivier staat het grondwater hoog. In het oude centrum en in de lager gelegen straten zien we daardoor vochtige kelders en opstijgend vocht in de muren van het gelijkvloers. We behandelen de muren met een injectie en maken de kelder waterdicht met een bekuiping. Waar het water onder druk binnenkomt, komt er een drainage met pompput bij. Op de injectie krijg je 30 jaar garantie, op de kelderdichting 10 jaar.',
      },
      {
        title: 'Kleigrond rond de woning',
        body:
          'Op verschillende plaatsen in Temse zit klei dicht onder de oppervlakte. Klei laat water slecht door. Regenwater zakt rond de woning traag weg en blijft tegen de keldermuren staan, ook als het grondwater laag is. Het gevolg is een kelder die na elke stevige regenbui opnieuw vochtig wordt. Kan je rond de woning graven, dan is een buitenafdichting met een drainage aan de voet van de muur de beste oplossing: het water blijft dan buiten de muur. Gaat dat niet, bijvoorbeeld bij een rijwoning, dan maken we de kelder van binnenuit waterdicht.',
      },
      {
        title: 'Rijwoningen en verweerde gevels',
        body:
          'Temse was lang een scheepsbouwgemeente. Uit die periode en uit de jaren na de oorlog stammen veel rijwoningen in baksteen. Na zestig jaar of meer is het voegwerk vaak verweerd en neemt de baksteen meer regenwater op. Binnen zie je vochtplekken die na een regenbui groter worden, ook op de verdieping. Dat is doorslaand vocht, geen opstijgend vocht, en een injectie helpt dan niet. We herstellen het voegwerk waar nodig en brengen een waterafstotende gevelbehandeling aan die dampopen blijft, zodat de muur kan uitdrogen. Heeft de gevel een cementpleister of crepi, dan kijken we eerst of die gescheurd is: achter een gescheurde bepleistering blijft regenwater vaak zitten.',
      },
    ],
    areas: ['Elversele', 'Steendorp', 'Tielrode', 'Hamme', 'Bornem', 'Rupelmonde'],
    common: ['kelder-waterdicht-maken', 'opstijgend-vocht', 'doorslaand-vocht', 'buitenafdichting-kelder'],
    faq: [
      {
        q: 'Werken jullie ook in Bornem en Hamme?',
        a: 'Ja. Bornem ligt aan de overkant van de Schelde, Hamme aan de overkant van de Durme. Beide horen bij ons vaste werkgebied.',
      },
      {
        q: 'Ik woon dicht bij de Schelde. Kan mijn kelder nog droog?',
        a: 'Meestal wel. Bij hoog grondwater is een bekuiping alleen niet genoeg en is een drainage met pompput nodig. Of en hoe het kan, zien we tijdens een gratis bezoek ter plaatse.',
      },
      {
        q: 'Hoe weet ik of het vocht van onderen of van buitenaf komt?',
        a: 'Opstijgend vocht zit onderaan de muur, meestal tot op een meter à anderhalve meter hoogte. Doorslaand vocht kan overal op de gevelmuur zitten en verandert met het weer. Zeker weten doen we het pas na een meting.',
      },
    ],
    projects: [],
  },
  {
    slug: 'dendermonde',
    name: 'Dendermonde',
    country: 'be',
    region: 'oost-vlaanderen',
    title: 'Vochtbestrijding en kelderdichting in Dendermonde',
    description:
      'Vochtige muren of een natte kelder in Dendermonde, Grembergen, Appels of Baasrode? Gratis diagnose ter plaatse, behandeling met tot 30 jaar garantie.',
    h1: 'Vochtbestrijding in Dendermonde',
    intro:
      'Dendermonde ligt waar de Dender in de Schelde uitmondt, op ongeveer een halfuur van Sint-Niklaas. We werken in de stad en in de deelgemeenten, van Grembergen en Sint-Gillis tot Appels, Oudegem en Schoonaarde. De meeste klachten hier hebben met water in de grond te maken, maar niet allemaal: ook condensatie en doorslaand vocht komen we tegen.',
    sections: [
      {
        title: 'Tussen Schelde en Dender',
        body:
          'De stad ligt laag, tussen twee rivieren. Langs de Schelde liggen dijken en overstromingsgebieden van het Sigmaplan. Die beschermen tegen hoogwater, maar het grondwater in de vallei blijft hoog. Kelders in de lager gelegen straten krijgen daardoor in natte maanden water binnen. Dan is een drainage met pompput vaak nodig, en een pompput is zo goed als de pomp erin. We plaatsen een pomp met vlotter, voorzien een terugslagklep zodat het afgevoerde water niet terugloopt, en leggen uit hoe je de put zelf controleert. Daarboven komt een bekuiping die tegen waterdruk bestand is.',
      },
      {
        title: 'Een oude vestingstad',
        body:
          'Dendermonde was eeuwenlang een vestingstad. In de binnenstad staan oude stadswoningen en herenhuizen, vaak met gemetselde kelders en gemene muren. Daar zien we opstijgend vocht in de muren van de kelder en het gelijkvloers, en zoutschade in het pleisterwerk. Je herkent het aan witte uitslag en pleister die afbrokkelt in een band onderaan de muur. In een gesloten bebouwing werken we van binnenuit. We injecteren de muren, laten het zoutbelaste pleisterwerk verwijderen tot boven de vochtgrens en werken af met een zoutwerende pleister. Een gemene muur injecteren we van jouw kant, over de volledige dikte. Gewone gipspleister raden we daar af: die neemt de zouten die nog in de muur zitten opnieuw op.',
      },
      {
        title: 'Woonwijken in de deelgemeenten',
        body:
          'In de deelgemeenten staan naast oude dorpskernen ook woonwijken uit de jaren zestig en zeventig. Die woningen hebben vaak een kelder in betonblokken met een gestorte vloer. De zwakke punten zijn de voegen tussen de blokken, de kimnaad en de doorvoeren van leidingen. Bij een enkele lekplek dichten we de doorvoer of de scheur met een injectie. Is de hele kelder vochtig, dan kijken we of de buitenkant bereikbaar is. Een buitenafdichting houdt het water aan de buitenkant van de muur, maar vraagt graafwerk rond de woning. Welke aanpak past, bespreken we na de diagnose.',
      },
    ],
    areas: ['Appels', 'Baasrode', 'Grembergen', 'Mespelare', 'Oudegem', 'Schoonaarde', 'Sint-Gillis-Dendermonde', 'Lebbeke', 'Buggenhout', 'Berlare'],
    common: ['kelder-waterdicht-maken', 'kelderdrainage', 'opstijgend-vocht', 'buitenafdichting-kelder'],
    faq: [
      {
        q: 'Mijn kelder liep onder bij hevige regen. Kan dat na de behandeling opnieuw gebeuren?',
        a: 'Tegen grondwater maken we je kelder waterdicht. Water dat bij een overstroming via ramen, deuren of de riolering binnenkomt, houdt een kelderdichting niet tegen. Een terugslagklep op de riolering helpt daar wel tegen; dat bekijken we mee.',
      },
      {
        q: 'Komen jullie ook in Lebbeke, Buggenhout en Berlare?',
        a: 'Ja. Die gemeenten liggen vlak bij Dendermonde en horen bij ons werkgebied.',
      },
      {
        q: 'Wat kost een eerste bezoek?',
        a: 'Het eerste bezoek is gratis. We meten het vocht, zoeken de oorzaak en stellen een behandeling voor. We nemen binnen 2 werkdagen contact op en je ontvangt de offerte binnen een week na de diagnose.',
      },
    ],
    projects: [],
  },
  {
    slug: 'breda',
    name: 'Breda',
    country: 'nl',
    region: 'noord-brabant',
    title: 'Vochtbestrijding en kelderdichting in Breda',
    description:
      'Vochtige muren, een natte kruipruimte of kelder in Breda? Dryhouse werkt ook in West-Brabant. Gratis diagnose aan huis en tot 30 jaar garantie.',
    h1: 'Vochtbestrijding in Breda',
    intro:
      'Breda ligt op ongeveer een uur rijden van onze thuisbasis in Sint-Niklaas, via Antwerpen en de A16. Voor klanten in Nederland hebben we een apart Nederlands telefoonnummer, dat je op deze pagina vindt. De eerste stap is ook hier een gratis diagnose bij je thuis. We nemen binnen 2 werkdagen contact op en je ontvangt de offerte binnen een week na de diagnose.',
    sections: [
      {
        title: 'De binnenstad aan de Mark',
        body:
          'De Mark en de Aa of Weerijs komen samen in Breda, en de oude binnenstad is omgeven door singels. Veel panden in het centrum zijn eeuwenoud, met gemetselde kelders onder winkels en woningen. Dicht bij het water staat het grondwater hoog. In die kelders zien we vocht langs de kimnaad en muren met zoutuitslag. Voor zulke kelders werken we met een bekuiping aan de binnenkant, gecombineerd met een injectie tegen opstijgend vocht in de muren erboven. Waar de kelder als winkelruimte of opslag gebruikt wordt, plannen we de werken in overleg, zodat je zo kort mogelijk zonder die ruimte zit.',
      },
      {
        title: 'Kruipruimtes in lager gelegen wijken',
        body:
          'De meeste woningen in Breda hebben geen kelder maar een kruipruimte. In het noorden van de stad, zoals in de Haagse Beemden en rond Prinsenbeek, ligt de grond lager en dichter bij de Mark. Daar kan na een natte periode water in de kruipruimte blijven staan. Het vocht stijgt op naar de vloer en de onderkant van de muren. Je merkt het aan een koude, vochtige vloer en schimmel achter de plinten. We zoeken eerst waar het water vandaan komt en zorgen dat het afgevoerd wordt. Daarna kijken we naar ventilatie van de kruipruimte en eventueel vloerisolatie.',
      },
      {
        title: 'Appartementen en VvE’s',
        body:
          'Ook voor Verenigingen van Eigenaars werken we in Breda. In appartementsgebouwen gaat het vaak om een lekkende liftput, vochtige bergingen of een parkeerkelder waar water door scheuren of werkvoegen binnenkomt. We injecteren scheuren en voegen, maken de liftput waterdicht met een bekuiping en herstellen betonrot waar de wapening is aangetast. Binnen een week na de diagnose krijgt de VvE een offerte die op de ledenvergadering besproken kan worden. De technieken en de garanties zijn dezelfde als in België: 10 jaar op de dichting van kelders en liftputten en op betonherstel, 30 jaar op een injectie tegen opstijgend vocht.',
      },
      {
        title: 'Zandgrond in het zuiden',
        body:
          'In het zuiden van Breda, rond Ginneken en Bavel, is de grond buiten de beekdalen zandig. Natte kruipruimtes zijn daar minder vaak het probleem. Wat we er wel zien, zijn oudere woningen die stap voor stap zijn nageïsoleerd: spouwmuur, dak, nieuwe kozijnen. Zonder aangepaste ventilatie geeft dat condensatie op koude plekken, zoals rond de kozijnen en in de hoeken van slaapkamers. Daar helpt mechanische ventilatie of goed geplaatste ventilatieroosters meer dan een behandeling van de muur. Tijdens de diagnose meten we of het vocht uit de muur komt of uit de lucht.',
      },
    ],
    areas: ['Ginneken', 'Princenhage', 'Prinsenbeek', 'Teteringen', 'Bavel', 'Ulvenhout', 'Haagse Beemden', 'Oosterhout', 'Etten-Leur'],
    common: ['ventilatie-schimmel', 'opstijgend-vocht', 'kelder-waterdicht-maken', 'isolatie'],
    faq: [
      {
        q: 'Werken jullie echt in Nederland, vanuit België?',
        a: 'Ja. Dryhouse werkt in België en Nederland. Breda en West-Brabant liggen dicht bij onze vestiging in Sint-Niklaas. Voor Nederlandse klanten is er een apart telefoonnummer.',
      },
      {
        q: 'Er staat soms water in mijn kruipruimte. Wat kan ik doen?',
        a: 'Eerst uitzoeken waar het vandaan komt: grondwater, een lekkende leiding of regenwater dat langs de gevel naar binnen loopt. Bij grondwater kan een pomp in een pompput het peil onder de vloer laag houden. Dat bekijken we tijdens de diagnose.',
      },
      {
        q: 'Komen jullie ook buiten de gemeente Breda?',
        a: 'Ja. Ook in Oosterhout, Etten-Leur en de rest van West-Brabant kan je een gratis diagnose aanvragen.',
      },
    ],
    projects: [],
  },
];

export const cityPath = (c: City) => `/vochtbestrijding-${c.slug}`;
export const citiesIn = (country: CountryCode, region: string) => cities.filter((c) => c.country === country && c.region === region);
