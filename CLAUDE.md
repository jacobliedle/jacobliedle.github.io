# CLAUDE.md — Jacob Liedle Film Portfolio

## What This Is

Personal portfolio website for Jacob Liedle, a director and cinematographer based in Denver, Colorado. Built with Hugo and a custom theme called `jl-cinematic`. Previously operated as Argo Media Group (argomediagroup.com) — this is the solo rebrand under jacobliedle.com.

## Quick Start

```bash
# Install Hugo (if needed)
sudo apt install hugo   # or: brew install hugo

# Run the dev server
hugo server --bind 0.0.0.0 --port 1313 --disableFastRender

# Build for production
hugo --gc --minify
```

The dev server runs at `http://localhost:1313/` with live reload.

## Tech Stack

- **Static site generator**: Hugo v0.123.7+ (extended edition)
- **Theme**: `jl-cinematic` — custom-built, lives in `themes/jl-cinematic/`
- **Fonts**: Playfair Display (headings) + Montserrat Light (body) via Google Fonts
- **CMS**: Sveltia CMS planned but not yet wired up (see Roadmap)
- **Hosting**: GitHub Pages (via GitHub Actions — see `.github/workflows/deploy.yml`)
- **Videos**: Hosted externally on YouTube or Vimeo (not in the repo — gitignored)

## Site Structure

| Page | URL | Layout | Content File |
|------|-----|--------|-------------|
| Home | `/` | `_default/home.html` | `content/_index.md` |
| Reel | `/reel/` | `page/reel.html` | `content/reel.md` |
| About | `/about/` | `page/about.html` | `content/about.md` |
| Contact | `/contact/` | `page/contact.html` | `content/contact.md` |

## Theme Architecture

All theme files live in `themes/jl-cinematic/`:

```
assets/css/main.css          # Full design system — color tokens, layout, responsive
layouts/
  _default/
    baseof.html              # Base template (nav, main, footer, scripts)
    home.html                # Homepage: hero video, services, about teaser, location
    single.html              # Generic single page (fallback)
  page/
    reel.html                # Demo reel + clip grid (supports local video or embeds)
    about.html               # Portrait hero with gradient blend + bio + services
    contact.html             # Contact info + form
  partials/
    head.html                # Meta tags, fonts, CSS
    nav.html                 # Fixed nav with mobile hamburger
    footer.html              # Copyright footer
    scripts.html             # Mobile nav toggle JS
```

### Design Tokens (CSS Custom Properties)

The color palette was derived from one of Jacob's cinematography stills — warm cinematic tones:

```css
--bg-primary: #141414;      /* charcoal, not pure black */
--bg-secondary: #1c1c1c;
--accent: #c8a46e;           /* warm amber/honey */
--text-primary: #f0ebe4;     /* warm cream, not pure white */
--text-secondary: #b8b0a4;
```

## Configuration

All site content and parameters are in `hugo.toml`. Key sections:

- **Hero**: tagline, subtitle, CTA text/link, background video path, poster image
- **Services**: array of service cards (title + description) displayed on homepage
- **About teaser**: title, body text, and BTS background image for homepage section
- **Navigation**: menu items with weights for ordering

**TOML gotcha**: The `aboutTeaser*` params MUST come before `[[params.services]]` array entries in the config file. TOML assigns keys after `[[array]]` headers to the last array item, not the parent table.

## Static Assets

### Images (`static/images/`)
- `argo-originals/` — 28 images scraped from the original Argo Media Group site (headshots, thumbnails, BTS photos, icons, maps)
- `jacob-portrait.jpg` — copy of Jacob's headshot used on the About page

### Videos (`static/videos/` — gitignored, NOT in the repo)
Video files are hosted externally (YouTube or Vimeo) and embedded via iframe. Local copies exist for development but are excluded from git:
- `hero-background.mp4` (16MB) — ambient hero loop (this one stays local — embeds don't work for autoplay backgrounds)
- `demo-reel.mp4` (57MB) — main demo reel → YouTube/Vimeo embed
- `haymaker-promo.mp4` (32MB) — Haymaker promo → YouTube/Vimeo embed
- `brew-promo.mp4` (30MB) — Brew promo → YouTube/Vimeo embed

To add video embeds, edit `content/reel.md` frontmatter with YouTube or Vimeo embed URLs. See the comments in that file for the URL format.

## Content Reference

`content-reference.md` in the repo root contains the full inventory scraped from argomediagroup.com — all images, video URLs, text content, social links, and technical notes from the original Wix site.

## How to Edit Content

### Page text
Edit the markdown files in `content/`. Each has YAML frontmatter for metadata and the body is standard markdown.

### Homepage sections
Edit `hugo.toml` — the services, about teaser, and hero content are all driven by config params (not separate content files).

### Reel page videos
Edit `content/reel.md` frontmatter. Currently configured for local video files:
```yaml
mainReel:
  src: "/videos/demo-reel.mp4"
clips:
  - src: "/videos/haymaker-promo.mp4"
    title: "Haymaker Promo"
```

When switching to YouTube/Vimeo embeds, the `reel.html` template will need updating to render `<iframe>` elements instead of `<video>` tags.

### About page portrait
Set in `content/about.md` frontmatter:
```yaml
portrait: "/images/jacob-portrait.jpg"
portraitAlt: "Jacob Liedle — Director and Cinematographer"
```

## Roadmap

### Decided
- [x] Hugo site scaffolded with custom theme
- [x] All content migrated from Argo site (text rewritten for solo brand)
- [x] Images and videos downloaded from original Wix CDN
- [x] Custom color palette from Jacob's cinematography
- [x] Homepage: hero video, services, about teaser, location strip
- [x] Reel page with local video playback
- [x] About page with portrait hero (gradient blend into background)
- [x] Contact page with form + social links

### Next Steps
- [x] **Hosting**: GitHub Pages via GitHub Actions (workflow at `.github/workflows/deploy.yml`)
- [x] **Video strategy**: Reel page template supports both local `<video>` and YouTube/Vimeo `<iframe>` embeds
- [ ] **Upload videos to YouTube or Vimeo**: Get embed URLs, add them to `content/reel.md` frontmatter
- [ ] **Activate GitHub Pages**: Repo is currently private. To deploy:
  1. Make the repo **public** (Settings → General → Danger Zone → Change visibility) — required for free GitHub Pages
  2. Go to Settings → Pages → Source: **GitHub Actions**
  3. Push any change to `main` — the workflow builds and deploys automatically
  4. Site will be live at `https://<username>.github.io/jacobs-film-site/` until a custom domain is configured
- [ ] **Buy and configure domain**: jacobliedle.com (or similar). Add CNAME in repo, configure DNS.
- [ ] **Handle hero background video**: Either keep `hero-background.mp4` in the repo (16MB, under limits) or replace with a high-quality poster image
- [ ] **Set up Sveltia CMS**: Add `static/admin/index.html` + `config.yml` so Jacob can edit content through a browser GUI without touching code
- [ ] **Get fresh content from Jacob**: Updated bio, new headshots, curated video links, social accounts
- [ ] **Mobile polish**: Test thoroughly on phone, optimize touch targets and video playback
- [ ] **Contact form**: GitHub Pages doesn't support server-side forms — use Formspree, Getform, or similar free service

### Nice to Have
- [ ] Add a blog/journal section for behind-the-scenes posts
- [ ] Client testimonials section
- [ ] SEO optimization (structured data, sitemap, robots.txt)
- [ ] Analytics (privacy-friendly — Plausible or Umami)

## Contact & Social (Current)

- Email: jacob@argomediagroup.com (will change with new domain)
- Instagram: https://instagram.com/jacobliedlehimself
- LinkedIn: https://www.linkedin.com/in/jacobliedle
- YouTube: https://www.youtube.com/@argomediagroup
