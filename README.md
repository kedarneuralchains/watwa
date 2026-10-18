# watwa-website

New website for Watwa Group (Watwa Engineers Pvt. Ltd.), replacing the static
watwagroup.com. Next.js 16 (App Router, TypeScript), Tailwind v4, GSAP +
ScrollTrigger + SplitText + Lenis, and React Three Fiber for the 3D hero.

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

Set `NEXT_PUBLIC_SITE_URL` for staging so canonicals and llms.txt point at the right host.

## Where content lives

Every page, llms.txt, the Markdown versions, JSON-LD and the MCP server render from
`src/lib/`, so editing a data file updates all of them:

| File | What |
|---|---|
| `founders.ts` | Founders: name, role, bio, quote, photo |
| `clients.ts` | Featured brands (JK Cement), installation list, industries |
| `solutions.ts` | The 15 solutions and 5 categories |
| `contact.ts` | Phones, WhatsApp, email, offices, CIN, social links |
| `site.ts` | Site URL, page index, JSON-LD builders |

## AI compatibility (same layer as the KNC site)

- `/llms.txt`: the whole site for language models
- `/mcp`: read-only MCP server (Streamable HTTP). Tools: `get_company_overview`,
  `get_founders`, `list_solutions`, `get_solution`, `list_clients`, `get_contact`
- `/.well-known/mcp/server-card.json` and `/.well-known/api-catalog` (RFC 9727)
- Markdown negotiation: any page URL with `Accept: text/markdown` returns Markdown
- `robots.txt` open to AI crawlers, with Content-Signal; `Link` headers on every page
- schema.org JSON-LD: Organization/LocalBusiness, founders as Person, Service per solution

Check: `curl -H "Accept: text/markdown" http://localhost:3000/solutions/zero-liquid-discharge`

## Old URLs

`next.config.ts` 308-redirects every old `*.html` page and the catalogue PDF to its new route.

## Waiting on the client

- [ ] Founder portraits → `public/images/founders/`, then set `photo` in `founders.ts`
      (a branded monogram placeholder shows until then)
- [ ] Kuldeep's surname, and approval of both founders' bios and quotes (draft copy)
- [ ] JK Cement logo file (+ permission to use it) → set `logo` in `clients.ts`
- [ ] Other national brands to feature; each added to `FEATURED_BRANDS` appears automatically
- [ ] Better plant photos: the current ones are low-res images from the old site
- [ ] Confirm the office list: the catalogue (2019) and the website disagree on some branches
