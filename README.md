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
| `src/data/site.ts` | Bedrijfsgegevens (adres, telefoon, BTW, sociale media). Eén bron voor header, footer, contact en structured data. |
| `src/data/services.ts` | De diensten, menuvolgorde en korte omschrijving. Slugs = de oude Wix-URL's. |
| `src/content/services/*.md` | Inhoud per dienstpagina: SEO-titel, symptomen, aanpak, FAQ en tekst. |
| `src/content/blog/*.md` | Blogartikels (`/post/<slug>`, zelfde URL's als op Wix). |
| `src/data/regions.ts` | Werkgebied: één pagina per provincie op `/vochtbestrijding/<provincie>`. |
| `src/components/react/WallStory.tsx` | De scroll-animatie op de homepage (muur wordt droog). |
| `src/components/react/Vochtcheck.tsx` | De online vochtcheck. |
| `functions/api/offerte.ts` | Pages Function die offerteaanvragen per e-mail verstuurt. |
| `public/_redirects` | 301-redirects van alle oude Wix- en WordPress-URL's. |
| `public/_headers` | Security headers, caching, en `noindex` op `*.pages.dev`. |

## Content aanpassen

- **Nieuw blogartikel:** maak `src/content/blog/<slug>.md` met dezelfde frontmatter als de bestaande artikels.
  Zet afbeeldingen in `src/assets/blog/<slug>/`; Astro maakt er automatisch AVIF/WebP in de juiste formaten van.
- **Dienst aanpassen:** bewerk het bestand in `src/content/services/`. De structured data (Service, FAQ) wordt automatisch gegenereerd.
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
