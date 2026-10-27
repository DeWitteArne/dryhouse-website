import type { CountryCode } from './regions';

/**
 * French texts for the werkgebied pages (see ./regions.ts for the Dutch source and
 * the structure). Facts match the Dutch versions; the wording is written for French
 * readers, not translated word for word.
 */
export interface CountryFr {
  slug: string;
  name: string;
  inName: string;
  intro: string;
  context: string;
}

export interface RegionFr {
  slug: string;
  name: string;
  fullName?: string;
  inName: string;
  cities: string[];
  intro: string;
  context: string;
}

export const countriesFr: Record<CountryCode, CountryFr> = {
  be: {
    slug: 'belgique',
    name: 'Belgique',
    inName: 'en Belgique',
    intro:
      'Depuis Sint-Niklaas, nous traitons les problèmes d’humidité dans toute la Belgique : de la côte aux Ardennes, en Flandre, à Bruxelles et en Wallonie.',
    context:
      'Une grande partie des habitations belges date d’avant 1970. Leurs murs n’ont souvent pas de barrière anti-humidité, et leurs caves se trouvent contre ou sous le niveau de la nappe phréatique. Dans les polders et les vallées, la nappe est haute. À la côte, la pluie frappe les façades. Et dans les maisons rénovées, un logement trop étanche et mal ventilé provoque de la condensation. Chaque région a donc son propre problème d’humidité.',
  },
  nl: {
    slug: 'pays-bas',
    name: 'Pays-Bas',
    inName: 'aux Pays-Bas',
    intro:
      'Dryhouse travaille aussi aux Pays-Bas. La Zélande et le Brabant sont à deux pas de notre base, et nous traitons les problèmes d’humidité jusque dans le nord du pays.',
    context:
      'Une grande partie des Pays-Bas se trouve sous le niveau de la mer, sur des sols d’argile et de tourbe où la nappe phréatique est haute. Beaucoup de maisons ont un vide sanitaire plutôt qu’une cave. S’il reste humide, l’humidité gagne le plancher et le bas des murs. Dans les centres-villes anciens, nous rencontrons des demi-sous-sols et des caves sous le niveau de la nappe. Dans les logements bien isolés mais trop peu ventilés, ce sont plutôt la condensation et les moisissures.',
  },
};

/** Keyed by `${country}/${dutch slug}`, e.g. 'be/oost-vlaanderen', 'nl/limburg'. */
export const regionsFr: Record<string, RegionFr> = {
  'be/oost-vlaanderen': {
    slug: 'flandre-orientale',
    name: 'Flandre-Orientale',
    inName: 'en Flandre-Orientale',
    cities: ['Sint-Niklaas', 'Gand', 'Alost', 'Lokeren', 'Termonde', 'Tamise', 'Beveren', 'Audenarde', 'Eeklo', 'Ninove', 'Wetteren', 'Zele'],
    intro:
      'La Flandre-Orientale, c’est chez nous : depuis Sint-Niklaas, nous sommes vite sur place au Pays de Waes, à Gand, dans la région de la Dendre et au Meetjesland.',
    context:
      'Dans les polders du Pays de Waes et du Meetjesland, la nappe phréatique est souvent haute. Dans les vallées de l’Escaut et de la Dendre, on construit depuis des siècles sur des sols humides d’argile et de limon. Beaucoup de maisons mitoyennes et de maisons ouvrières d’avant 1950 n’ont pas de barrière anti-humidité dans les murs. L’humidité ascensionnelle et les caves humides sont donc les problèmes que nous rencontrons le plus souvent ici.',
  },
  'be/antwerpen': {
    slug: 'anvers',
    name: 'Anvers',
    inName: 'dans la province d’Anvers',
    cities: ['Anvers', 'Malines', 'Lierre', 'Turnhout', 'Geel', 'Mol', 'Herentals', 'Boom', 'Brasschaat', 'Mortsel', 'Heist-op-den-Berg'],
    intro:
      'Des maisons de maître anversoises aux fermettes de Campine : nous traitons les problèmes d’humidité dans toute la province d’Anvers.',
    context:
      'À Anvers et à Malines, beaucoup de maisons bourgeoises du XIXe siècle ont une cave sous le niveau de la nappe phréatique ou accolée à la maison voisine. En Campine, le sol sablonneux draine mieux. Mais les murs creux anciens et les fenêtres rendues étanches sans ventilation y causent plus souvent de la condensation et des moisissures.',
  },
  'be/west-vlaanderen': {
    slug: 'flandre-occidentale',
    name: 'Flandre-Occidentale',
    inName: 'en Flandre-Occidentale',
    cities: ['Bruges', 'Courtrai', 'Ostende', 'Roulers', 'Ypres', 'Waregem', 'Knokke-Heist', 'Tielt', 'Torhout', 'Menin'],
    intro:
      'À la côte comme à l’intérieur des terres, les façades de Flandre-Occidentale sont mises à rude épreuve. Nous les asséchons.',
    context:
      'À la côte, le vent d’ouest projette la pluie et le sel contre les façades : l’humidité par infiltration et les joints usés y sont monnaie courante. Derrière la côte s’étendent les polders, où la nappe phréatique est haute et où l’humidité ascensionnelle touche souvent les maisons anciennes. Dans la région de la Lys, nous voyons surtout des caves humides.',
  },
  'be/vlaams-brabant': {
    slug: 'brabant-flamand',
    name: 'Brabant flamand',
    inName: 'dans le Brabant flamand',
    cities: ['Louvain', 'Vilvorde', 'Hal', 'Tirlemont', 'Aarschot', 'Diest', 'Zaventem', 'Asse', 'Grimbergen', 'Dilbeek', 'Tervuren'],
    intro:
      'Autour de Louvain, dans le Pajottenland et en périphérie bruxelloise, nous résolvons les problèmes d’humidité dans des maisons de tous âges.',
    context:
      'Le sol limoneux du Hageland et du Pajottenland retient longtemps l’eau, et dans les vallées de la Dyle et du Démer, la nappe phréatique est haute. Les fermes et maisons anciennes en pierre naturelle ou en brique n’ont souvent pas de barrière anti-humidité. En périphérie bruxelloise, nous voyons beaucoup de maisons rénovées où la condensation apparaît une fois les fenêtres et la toiture bien isolées, parce que la ventilation n’a pas été adaptée.',
  },
  'be/limburg': {
    slug: 'limbourg',
    name: 'Limbourg',
    fullName: 'Limbourg belge',
    inName: 'dans le Limbourg belge',
    cities: ['Hasselt', 'Genk', 'Saint-Trond', 'Tongres', 'Lommel', 'Beringen', 'Maasmechelen', 'Bilzen', 'Maaseik', 'Houthalen-Helchteren'],
    intro: 'Dans le Limbourg aussi, de la Hesbaye à la vallée de la Meuse, nous sommes là pour un diagnostic d’humidité gratuit.',
    context:
      'Dans la vallée de la Meuse et le long du Démer, la nappe phréatique monte vite par temps pluvieux, ce qui donne des caves humides et de l’humidité ascensionnelle. Les anciennes cités minières et les fermes de Hesbaye ont souvent d’épais murs en brique sans barrière anti-humidité. Dans la Campine sablonneuse, le problème vient plutôt de la condensation dans des logements mal ventilés.',
  },
  'be/brussel': {
    slug: 'bruxelles',
    name: 'Bruxelles',
    inName: 'à Bruxelles',
    cities: ['Bruxelles', 'Schaerbeek', 'Ixelles', 'Uccle', 'Anderlecht', 'Etterbeek', 'Jette', 'Saint-Gilles', 'Forest', 'Molenbeek', 'Woluwe'],
    intro:
      'Maisons de maître, immeubles à appartements et caves dans les 19 communes bruxelloises : nous les asséchons, dans le respect du bâtiment.',
    context:
      'Le bâti bruxellois est ancien : beaucoup de maisons de maître ont plus de cent ans, avec des caves maçonnées et des murs mitoyens. L’humidité ascensionnelle dans les murs de la cave et du rez-de-chaussée y est donc fréquente. Dans les immeubles à appartements, nous voyons aussi des fosses d’ascenseur qui prennent l’eau et du béton dégradé dans les garages et sur les terrasses.',
  },
  'be/waals-brabant': {
    slug: 'brabant-wallon',
    name: 'Brabant wallon',
    inName: 'dans le Brabant wallon',
    cities: ['Wavre', 'Nivelles', 'Ottignies-Louvain-la-Neuve', 'Tubize', 'Braine-l’Alleud', 'Waterloo', 'Jodoigne', 'Rixensart'],
    intro: 'Dans le Brabant wallon, nous traitons aussi bien les fermes anciennes que les villas récentes.',
    context:
      'Beaucoup de maisons du Brabant wallon sont construites sur un sol limoneux qui retient l’humidité. Les anciennes fermes en carré aux murs de pierre naturelle souffrent d’humidité ascensionnelle. Dans les villas récentes, nous voyons plutôt des caves et des garages humides, surtout sur les terrains en pente où l’eau de pluie stagne contre les murs.',
  },
  'be/henegouwen': {
    slug: 'hainaut',
    name: 'Hainaut',
    inName: 'en Hainaut',
    cities: ['Charleroi', 'Mons', 'Tournai', 'La Louvière', 'Mouscron', 'Ath', 'Enghien', 'Soignies', 'Binche'],
    intro: 'De Tournai à Charleroi, nous traitons aussi les problèmes d’humidité en Hainaut, en nous attaquant à la cause.',
    context:
      'Le Hainaut compte de nombreuses maisons ouvrières de l’époque industrielle, souvent en brique, sans barrière anti-humidité et avec des caves directement contre la terre. L’humidité ascensionnelle et les caves humides y sont les problèmes les plus courants. Dans les anciens bâtiments industriels et les immeubles à appartements, nous rencontrons aussi du béton dégradé.',
  },
  'be/namen': {
    slug: 'namur',
    name: 'Namur',
    inName: 'dans la province de Namur',
    cities: ['Namur', 'Dinant', 'Gembloux', 'Andenne', 'Sambreville', 'Ciney', 'Philippeville', 'Jambes'],
    intro:
      'Dans les vallées de la Meuse et de la Sambre et sur les plateaux du Condroz, nous résolvons les problèmes d’humidité dans des maisons de tous âges.',
    context:
      'Le long de la Meuse et de la Sambre, beaucoup de maisons sont en pierre naturelle, construites près de la rivière et adossées à la pente. L’eau qui descend du versant pousse alors contre la façade arrière et la cave. Ces murs demandent une approche adaptée à la pierre : tous les produits ne conviennent pas au calcaire ou au grès.',
  },
  'be/luik': {
    slug: 'liege',
    name: 'Liège',
    inName: 'dans la province de Liège',
    cities: ['Liège', 'Verviers', 'Seraing', 'Huy', 'Herstal', 'Eupen', 'Spa', 'Waremme', 'Saint-Vith'],
    intro: 'De la ville de Liège aux Cantons de l’Est, Dryhouse vous garantit là aussi des murs secs.',
    context:
      'À Liège et à Verviers, les maisons anciennes sont souvent construites contre la colline, avec des caves en partie enterrées. En Ardenne et dans les Cantons de l’Est, le climat est plus froid et plus humide. La condensation dans les logements mal isolés et l’humidité par infiltration sur les façades exposées aux intempéries y sont plus fréquentes qu’ailleurs.',
  },
  'be/luxemburg': {
    slug: 'luxembourg',
    name: 'Luxembourg',
    inName: 'dans la province de Luxembourg',
    cities: ['Arlon', 'Bastogne', 'Marche-en-Famenne', 'Durbuy', 'Virton', 'Neufchâteau', 'Bouillon', 'Libramont'],
    intro:
      'Dans les Ardennes belges aussi, en province de Luxembourg, vous pouvez faire appel à nous pour un diagnostic d’humidité.',
    context:
      'La province de Luxembourg a le climat le plus froid et le plus humide du pays. Beaucoup de maisons sont bâties en schiste ou dans une autre pierre naturelle, avec des murs pleins et épais. L’humidité par infiltration et la condensation y sont les plus grands défis, surtout dans les secondes résidences qui restent longtemps sans chauffage.',
  },
  // Pays-Bas, same order as the Dutch file (roughly by distance from Sint-Niklaas).
  'nl/zeeland': {
    slug: 'zelande',
    name: 'Zélande',
    inName: 'en Zélande',
    cities: ['Middelbourg', 'Flessingue', 'Goes', 'Terneuzen', 'Hulst', 'Zierikzee', 'Sluis', 'Oostburg', 'Axel', 'Yerseke'],
    intro:
      'La Flandre zélandaise est à une demi-heure de notre base : de Hulst et Terneuzen jusqu’à Walcheren et Schouwen-Duiveland, nous sommes vite chez vous.',
    context:
      'La Zélande se trouve en grande partie sous le niveau de la mer, sur une argile marine lourde, avec une nappe phréatique haute et souvent saumâtre. Ce sel monte avec l’eau dans les murs : dans les anciennes maisons de digue et les fermes, nous voyons de hautes auréoles de salpêtre et des enduits qui s’écaillent. À la côte, le vent marin pousse la pluie à travers les joints usés, si bien que l’humidité par infiltration y est aussi fréquente que l’humidité ascensionnelle.',
  },
  'nl/noord-brabant': {
    slug: 'brabant-septentrional',
    name: 'Brabant-Septentrional',
    inName: 'dans le Brabant-Septentrional',
    cities: ['Breda', 'Eindhoven', 'Tilburg', 'Bois-le-Duc', 'Berg-op-Zoom', 'Roosendaal', 'Helmond', 'Oss', 'Oosterhout', 'Waalwijk'],
    intro:
      'De Berg-op-Zoom et Breda à Eindhoven et Bois-le-Duc : dans le Brabant, nous traitons les problèmes d’humidité dans tous les types de logements.',
    context:
      'L’ouest du Brabant repose sur la même argile que le Pays de Waes, avec les mêmes problèmes : humidité ascensionnelle dans les maisons mitoyennes anciennes et vides sanitaires humides. Dans les quartiers des années trente de Breda, Tilburg et Eindhoven, le sol du vide sanitaire n’est souvent pas recouvert, si bien que l’humidité reste sous le plancher. Sur les sols sablonneux de l’est de la province, le problème vient plutôt de la condensation et des moisissures.',
  },
  'nl/limburg': {
    slug: 'limbourg',
    name: 'Limbourg',
    fullName: 'Limbourg néerlandais',
    inName: 'dans le Limbourg néerlandais',
    cities: ['Maastricht', 'Venlo', 'Heerlen', 'Sittard-Geleen', 'Ruremonde', 'Weert', 'Kerkrade', 'Venray', 'Valkenburg'],
    intro: 'De Maastricht à Venlo, nous traitons aussi les murs et les caves humides dans le Limbourg néerlandais.',
    context:
      'Dans le sud du Limbourg, beaucoup de maisons sont en marne, un calcaire tendre qui absorbe l’eau comme une éponge. Sur les pentes du Heuvelland, l’eau de pluie pousse contre les façades arrière et les caves. Dans la vallée de la Meuse, au centre et au nord du Limbourg, la nappe phréatique monte après les périodes pluvieuses. Résultat : des caves humides et de l’humidité ascensionnelle dans les maisons anciennes.',
  },
  'nl/zuid-holland': {
    slug: 'hollande-meridionale',
    name: 'Hollande-Méridionale',
    inName: 'en Hollande-Méridionale',
    cities: ['Rotterdam', 'La Haye', 'Leyde', 'Dordrecht', 'Delft', 'Gouda', 'Zoetermeer', 'Schiedam', 'Gorinchem', 'Spijkenisse'],
    intro:
      'À Rotterdam, La Haye, Leyde et dans la région de Dordrecht, nous asséchons caves, demi-sous-sols et murs.',
    context:
      'La Hollande-Méridionale se trouve bien en dessous du niveau de la mer, sur des sols de tourbe et d’argile. Les maisons de maître de La Haye, Leyde et Delft ont souvent un demi-sous-sol sous le niveau de la nappe phréatique. Dans les quartiers d’avant-guerre de Rotterdam, les vides sanitaires restent humides. Dans les immeubles d’après-guerre, nous voyons aussi de la condensation, ainsi que du béton dégradé aux balcons et aux coursives.',
  },
  'nl/utrecht': {
    slug: 'utrecht',
    name: 'Utrecht',
    inName: 'dans la province d’Utrecht',
    cities: ['Utrecht', 'Amersfoort', 'Veenendaal', 'Zeist', 'Nieuwegein', 'Houten', 'Woerden', 'IJsselstein', 'De Bilt'],
    intro:
      'Du centre historique d’Utrecht à Amersfoort et à la Heuvelrug : nous cherchons la cause et réglons le problème d’humidité.',
    context:
      'Les vieux centres d’Utrecht et d’Amersfoort comptent de nombreuses caves maçonnées, parfois plusieurs fois centenaires, contre ou sous la nappe phréatique. Dans l’ouest de la province, autour de Woerden et dans la région de la Vecht, les maisons reposent sur une tourbe humide, avec de l’humidité ascensionnelle à la clé. Sur le sol sablonneux de la Heuvelrug, nous voyons surtout de la condensation dans des villas anciennes et des maisons des années septante.',
  },
  'nl/gelderland': {
    slug: 'gueldre',
    name: 'Gueldre',
    inName: 'en Gueldre',
    cities: ['Arnhem', 'Nimègue', 'Apeldoorn', 'Ede', 'Doetinchem', 'Zutphen', 'Harderwijk', 'Tiel', 'Zaltbommel', 'Culemborg'],
    intro:
      'Dans la région des grands fleuves, sur la Veluwe et dans l’Achterhoek : en Gueldre aussi, vous pouvez faire appel à nous.',
    context:
      'Dans la Betuwe et le long du Rhin, du Waal et de l’IJssel, beaucoup de maisons de digue et de fermes souffrent d’humidité ascensionnelle et de caves humides, à cause de l’eau qui suinte sous les digues et d’une nappe phréatique haute. À Nimègue, Arnhem et Zutphen, les bâtiments anciens ont souvent des caves sans étanchéité. Sur le sol sablonneux et sec de la Veluwe, nous rencontrons plutôt de la condensation et des moisissures dans des logements mal ventilés.',
  },
  'nl/noord-holland': {
    slug: 'hollande-septentrionale',
    name: 'Hollande-Septentrionale',
    inName: 'en Hollande-Septentrionale',
    cities: ['Amsterdam', 'Haarlem', 'Alkmaar', 'Zaandam', 'Hilversum', 'Hoorn', 'Purmerend', 'Amstelveen', 'Le Helder', 'Enkhuizen'],
    intro:
      'Des maisons de canal d’Amsterdam aux maisons derrière les dunes : nous traitons les problèmes d’humidité dans toute la Hollande-Septentrionale.',
    context:
      'Amsterdam et Haarlem sont bâties sur pilotis, dans une tourbe meuble. Les demi-sous-sols et les caves s’y trouvent souvent sous le niveau de la nappe phréatique, et les murs au-dessus absorbent l’humidité. Derrière les dunes et en Frise-Occidentale, le vent pousse la pluie contre les façades : l’humidité par infiltration et les joints usés y sont fréquents. Dans la région du Zaan et dans le Gooi, nous voyons aussi beaucoup de maisons anciennes aux vides sanitaires humides.',
  },
  'nl/flevoland': {
    slug: 'flevoland',
    name: 'Flevoland',
    inName: 'dans le Flevoland',
    cities: ['Almere', 'Lelystad', 'Dronten', 'Emmeloord', 'Zeewolde', 'Urk'],
    intro:
      'Le Flevoland est une province jeune, mais on y trouve aussi des problèmes d’humidité. Ce ne sont simplement pas les mêmes que dans les vieux centres-villes.',
    context:
      'La plupart des logements du Flevoland ont été construits après 1970, sur d’anciens fonds marins asséchés, et disposent d’une barrière anti-humidité. L’humidité ascensionnelle y est donc rare. Ce que nous voyons en revanche : de la condensation et des moisissures dans des logements bien isolés mais trop peu ventilés, des vides sanitaires humides à cause de la nappe phréatique haute, et du béton dégradé aux balcons et aux coursives des immeubles des années septante et quatre-vingt.',
  },
  'nl/overijssel': {
    slug: 'overijssel',
    name: 'Overijssel',
    inName: 'en Overijssel',
    cities: ['Zwolle', 'Enschede', 'Deventer', 'Hengelo', 'Almelo', 'Kampen', 'Oldenzaal', 'Hardenberg', 'Rijssen'],
    intro: 'Dans les villes hanséatiques au bord de l’IJssel et en Twente, Dryhouse vous assure des murs et des caves secs.',
    context:
      'Deventer, Kampen et Zwolle ont des centres historiques aux maisons en brique et aux caves plusieurs fois centenaires, tout près de l’IJssel et de la Vecht. Quand les rivières sont hautes, la nappe phréatique monte aussi sous ces bâtiments. En Twente, beaucoup de maisons ouvrières datent de l’époque du textile, souvent sans barrière anti-humidité et avec des façades usées par le temps.',
  },
  'nl/drenthe': {
    slug: 'drenthe',
    name: 'Drenthe',
    inName: 'en Drenthe',
    cities: ['Assen', 'Emmen', 'Hoogeveen', 'Meppel', 'Coevorden', 'Roden', 'Beilen', 'Westerbork'],
    intro: 'En Drenthe aussi, d’Assen à Emmen et Meppel, vous pouvez nous demander un diagnostic d’humidité.',
    context:
      'La Drenthe repose en grande partie sur un sol sablonneux et elle est plus sèche que le reste du nord. Les problèmes d’humidité viennent surtout du logement lui-même : condensation et moisissures dans les maisons mitoyennes d’après-guerre, humidité dans les murs des vieilles fermes des villages traditionnels. Dans la région tourbière du sud-est, la nappe phréatique est plus haute et nous voyons aussi de l’humidité ascensionnelle.',
  },
  'nl/groningen': {
    slug: 'groningue',
    name: 'Groningue',
    inName: 'dans la province de Groningue',
    cities: ['Groningue', 'Delfzijl', 'Veendam', 'Hoogezand', 'Winschoten', 'Stadskanaal', 'Appingedam', 'Leek'],
    intro: 'En ville comme dans la province de Groningue, nous vous débarrassons des murs et des caves humides.',
    context:
      'Sur l’argile marine lourde du nord de la province, beaucoup de vieilles fermes et de maisons de village n’ont pas de barrière anti-humidité. Dans une partie de la province, les mouvements du sol ont provoqué des fissures dans les murs et les façades, par lesquelles l’eau de pluie peut s’infiltrer. En ville, les bâtiments anciens ont souvent des caves qui deviennent humides quand la nappe phréatique est haute.',
  },
  'nl/friesland': {
    slug: 'frise',
    name: 'Frise',
    inName: 'en Frise',
    cities: ['Leeuwarden', 'Sneek', 'Heerenveen', 'Drachten', 'Harlingen', 'Franeker', 'Dokkum', 'Bolsward'],
    intro: 'Jusqu’en Frise, de Leeuwarden à Harlingen et Heerenveen, nous asséchons les maisons humides.',
    context:
      'La Frise est une province humide : de l’argile au nord, de la tourbe au sud et de l’eau partout. Les anciennes fermes frisonnes à grand toit et les maisons des villes frisonnes ont rarement une barrière anti-humidité, et sur la côte de la mer des Wadden, les façades sont en plein vent. L’humidité ascensionnelle et l’humidité par infiltration sont les problèmes que nous rencontrons le plus souvent.',
  },
};
