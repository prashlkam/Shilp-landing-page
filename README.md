# Shilp · शिल्प — Landing Page

A professional, animated landing page for [**Shilp**](https://github.com/prashlkam/Shilp), a Hindi
programming language whose semantics are identical to Python.

Built as a **zero-dependency static site** (plain HTML/CSS/JS) so it deploys cleanly to
**Azure Static Web Apps** with no build step.

## Files

| File | Purpose |
|------|---------|
| `index.html` | Page markup and content |
| `styles.css` | Warm saffron-gold dark theme, animations, responsive layout |
| `script.js` | Scroll reveals, typewriter code demo, syntax highlighting, keyword grid, copy buttons |
| `staticwebapp.config.json` | Azure Static Web Apps routing, caching, and security headers |

## Features

- Animated hero with a self-typing Shilp program and live "output" reveal
- Live Shilp → Python translation panes with Devanagari syntax highlighting
- Interactive keyword-map grid (हिंदी ↔ Python)
- Scroll-triggered reveal animations (respects `prefers-reduced-motion`)
- Fully responsive with a mobile nav
- Copy-to-clipboard install commands

## Preview locally

No build tools required — just serve the folder:

```bash
# Python
python -m http.server 8080

# or Node
npx serve .
```

Then open <http://localhost:8080>.

## Deploy to Azure Static Web Apps

### Option A — Azure CLI (SWA CLI)

```bash
npm install -g @azure/static-web-apps-cli
swa deploy . --env production
```

### Option B — Azure Portal + GitHub

1. Push this folder to a GitHub repo (or a subfolder of one).
2. In the Azure Portal, create a **Static Web App**.
3. Connect the repo. When asked for build details, choose:
   - **Build Presets:** `Custom`
   - **App location:** `/` (or the subfolder path)
   - **Api location:** *(leave blank)*
   - **Output location:** *(leave blank — the site is served as-is)*
4. Azure generates a GitHub Actions workflow that builds and deploys on every push to `main`.

Because there is no build step, the app location simply needs to contain `index.html`.

## Customize

- **Colors / theme:** edit the CSS variables at the top of `styles.css` (`--saffron`, `--gold`, `--violet`, …).
- **Keywords shown:** edit the `keywords` array in `script.js`.
- **Hero demo code:** edit the `source` and `outputs` arrays in `script.js`.

---

Content reflects the Shilp README/SPEC. Licensed to match the upstream project (GPL v3.0).
