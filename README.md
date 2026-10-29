# Dryhouse website

Nieuwe website voor [Dryhouse](https://www.dryhouse.be) (vochtbestrijding, Sint-Niklaas), ter vervanging van de Wix-site.
Volledig statisch, in het Nederlands, gebouwd voor snelheid en vindbaarheid in Google.

- **Framework:** [Astro](https://astro.build) 7 met React-eilandjes voor de interactieve delen, Tailwind CSS 4.
- **Hosting:** Cloudflare Pages. De enige servercode is één Pages Function voor het offerteformulier.
- **Content:** Markdown in `src/content/` (blog en diensten), data in `src/data/`.

## Lokaal draaien

Vereist Node 24 (zie `.nvmrc`).

```bash
nvm use
npm install
npm run dev        # http://localhost:4321
npm run cf:dev     # productiebuild + Cloudflare-runtime (redirects, headers, formulier) op http://localhost:8788
npm run check      # typecheck
```

## Structuur

| Pad | Wat |
| --- | --- |
| `src/i18n/index.ts` | Talen: Nederlands (zonder prefix) en Frans (`/fr/...`). Vaste URL's per taal en gedeelde teksten (menu, footer, knoppen). |
| `src/views/*.astro` | De pagina's zelf, één sjabloon voor beide talen. De routes in `src/pages` en `src/pages/fr` zijn enkel doorgeefluiken. Paginateksten staan bovenaan elk sjabloon in een `nl`- en een `fr`-blok. |
| `src/data/site.ts` | Bedrijfsgegevens (adres, telefoon, BTW, sociale media). Eén bron voor header, footer, contact en structured data. |
| `src/data/services.ts` | De diensten in menuvolgorde = volgorde van de kaarten "Onze specialisaties" op de homepage. Hernoemde slugs hebben een 301 in `public/_redirects`. |
| `src/content/services/*.md` | Inhoud per dienstpagina: SEO-titel, symptomen, aanpak, FAQ en tekst. Franse versie in `src/content/services/fr/` (zelfde bestandsnaam). |
| `src/content/blog/*.md` | Blogartikels (`/post/<slug>`, zelfde URL's als op Wix). |
| `src/data/regions.fr.ts` | Franse namen, URL's en teksten van landen en provincies. |
| `src/data/regions.ts` | Werkgebied in België en Nederland: één pagina per land (`/vochtbestrijding/<land>`) en per provincie (`/vochtbestrijding/<land>/<provincie>`). |
| `src/data/cities.ts` | Stadspagina's (`/vochtbestrijding-<stad>`, enkel Nederlands), elk met eigen lokale tekst. `projects` blijft leeg tot er echte projecten uit die stad zijn. |
| `src/components/react/Building.tsx` | Doorsnede van een volledig gebouw (5 zones), gebruikt in de hero en in `BuildingStory.tsx`, het scrollverhaal op de homepage. |
| `src/components/react/WallStory.tsx` | De scroll-animatie van opstijgend vocht (muur wordt droog), op de pagina opstijgend vocht. |
| `src/components/react/Vochtcheck.tsx` | De online vochtcheck. |
| `src/data/assistant.ts` | De chat-assistent rechtsonder (vervangt de Smartsupp-chat): antwoorden, knoppen en herkende trefwoorden. Frans: `assistant.fr.ts`. |
| `public/images/brand/` | Het Dryhouse-logo als SVG (kleur, wit, enkel het huisje). `npm run brand` maakt er favicon, OG-beeld en logo.png van. |
| `functions/api/offerte.ts` | Pages Function die offerteaanvragen en berichten uit de chat-assistent per e-mail verstuurt. |
| `public/_redirects` | 301-redirects van alle oude Wix- en WordPress-URL's. |
| `public/_headers` | Security headers, caching, en `noindex` op `*.pages.dev`. |

## Content aanpassen

- **Frans:** elke tekst bestaat in het Nederlands en het Frans. Pas je iets aan, doe het dan in beide talen. Franse typografie: een vaste spatie (U+00A0) vóór `? ! : ;` en gekrulde apostrofs (’). De blog is enkel Nederlandstalig.

- **Nieuw blogartikel:** maak `src/content/blog/<slug>.md` met dezelfde frontmatter als de bestaande artikels.
  Zet afbeeldingen in `src/assets/blog/<slug>/`; Astro maakt er automatisch AVIF/WebP in de juiste formaten van.
- **Dienst aanpassen:** bewerk het bestand in `src/content/services/`. De structured data (Service, FAQ) wordt automatisch gegenereerd.
- **Prijzen en garanties:** enkel in `src/data/pricing.ts` (bedragen excl. btw; Belgische bezoekers zien ze incl. 6 % btw, Nederlandse excl. btw). Daar staan ook de rekenregels van de prijscalculator (`/prijs-berekenen`, en ook op de pagina's opstijgend vocht en kelderdichting; opzet naar sanumur.be: staat van het gebouw, muur per muur, herstel ja/nee), en de garantie per dienst (30 jaar opstijgend vocht, 10 jaar andere werken, 2 jaar toestellen).
- **Ontbrekende prijzen en garanties:** in de teksten staan open plekken als `[PRIJS: …]` en `[GARANTIE: …]`; op de site zijn ze geel gemarkeerd. `npm run todo` toont ze allemaal. Vul ze in vóór de lancering.
- **Bedrijfsgegevens:** enkel in `src/data/site.ts`.
- **Share-afbeelding en icoon** opnieuw genereren: `npm run brand`.

## SEO

- Elke pagina is vooraf gerenderde HTML met eigen title, description, canonical, Open Graph en `hreflang nl-BE`.
- Structured data (JSON-LD): `HomeAndConstructionBusiness` op elke pagina, plus `Service`, `FAQPage`, `BlogPosting` en `BreadcrumbList` waar relevant.
- `sitemap-index.xml`, `robots.txt` en `rss.xml` worden bij elke build gegenereerd.
- **Preview-domeinen blijven uit Google:** `public/_headers` stuurt `X-Robots-Tag: noindex` op `*.pages.dev`.
  Zodra `www.dryhouse.be` gekoppeld is, is de site automatisch indexeerbaar; er hoeft niets omgezet te worden.

## Deploy op Cloudflare Pages

1. **Workers & Pages → Create → Pages → Connect to Git**, kies deze repo, production branch `main`.
2. Build-instellingen: framework preset *Astro*, build command `npm run build`, output directory `dist`.
   De Node-versie komt uit `.nvmrc`.
3. Elke push naar `main` deployt automatisch; andere branches krijgen een preview-URL.

### Offerteformulier activeren

Het formulier verstuurt e-mails via [Resend](https://resend.com). Zolang er geen sleutel is, toont het formulier een
foutmelding met het telefoonnummer en e-mailadres als alternatief.

1. Maak een Resend-account, verifieer het domein `dryhouse.be` en maak een API-key.
2. In het Cloudflare-dashboard (**Settings → Variables and Secrets**):
   - `RESEND_API_KEY` (secret)
   - `OFFERTE_TO` = `info@dryhouse.be`
   - `OFFERTE_FROM` = `Dryhouse website <website@dryhouse.be>`
3. Deploy opnieuw.

### Overschakelen van Wix naar de nieuwe site

1. Voeg `www.dryhouse.be` en `dryhouse.be` toe als custom domain in Cloudflare Pages.
2. Stuur `dryhouse.be` door naar `https://www.dryhouse.be` (redirect rule), zodat er één canonieke host is.
3. Zet de DNS om. De redirects in `public/_redirects` vangen alle oude URL's op.
4. Dien `https://www.dryhouse.be/sitemap-index.xml` in bij Google Search Console en volg de dekking de eerste weken op.
