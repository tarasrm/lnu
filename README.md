# lnu-schedule

Mobile-first React schedule for group ЕКПМ-11с: day-by-day view with swipe. Optimized for phones; works in any browser (e.g. on GitHub Pages).

## Run locally

```bash
npm install
npm run dev
```

Open the URL from the terminal (e.g. http://localhost:5173). To open in the browser automatically:

```bash
npm run dev -- --open
```

## Deploy to GitHub Pages (open on mobile)

The app is a **web app**: you host it on GitHub Pages and open the link on your phone in Safari or Chrome. No app store.

1. **Set the correct base path**  
   In `vite.config.js`, set `base` to your repo name (e.g. `'/lnu-schedule/'` for `https://<username>.github.io/lnu-schedule/`).

2. **Build for GitHub Pages**
   ```bash
   npm run build:gh-pages
   ```
   This creates the `dist/` folder with the correct asset paths.

3. **Publish `dist/` to GitHub Pages**
   - **Option A – GitHub Actions**  
     Use a workflow that runs `npm run build:gh-pages` and deploys the `dist/` folder (e.g. with `peaceiris/actions-gh-pages`).
   - **Option B – `gh-pages` package**  
     ```bash
     npm install -D gh-pages
     npx gh-pages -d dist
     ```
     Then in the repo **Settings → Pages** set source to the `gh-pages` branch.

4. **Open on mobile**  
   Visit `https://<username>.github.io/<repo-name>/` (e.g. `https://<username>.github.io/lnu-schedule/`) in your phone’s browser. You can add the page to the home screen for quick access.

## Project structure

- `src/App.jsx` – root, day index state, swipe
- `src/components/` – Header, MobileDayNav, MobileDayView, LectureCard
- `src/data/scheduleData.js` – schedule data and day labels
- `src/utils/` – dateUtils, formatUtils
- `index.html` – Vite entry
