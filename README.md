# Portfolio — Rubina

Galleria drag & zoom basata su [questo Pen GSAP](https://codepen.io/filipz/pen/dPGKGOo).
Il progetto è una app **Vite + React**: React renderizza il markup statico, mentre il motore galleria (`src/gallery/fashion-gallery.js`) resta imperativo e viene avviato dopo il mount.

## Requisiti e comandi

Serve **Node.js** (≥ 18). Dalla root del repo:

- `npm install` — installa le dipendenze (React, GSAP, Vite).
- `npm run dev` — server di sviluppo con HMR su `http://localhost:5173`.
- `npm run build` — build di produzione in `dist/`.
- `npm run preview` — anteprima locale della build di `dist/`.

## Struttura del repo

- **`index.html`** — entry Vite minimale (`<div id="root">` + `src/main.jsx`).
- **`src/`**
  - **`main.jsx`** — monta React; importa prima `gsap-setup.js` e gli stili.
  - **`gsap-setup.js`** — importa GSAP/`CustomEase`/`Flip` da npm e li espone su `window` (il motore li usa come globali).
  - **`App.jsx`** — compone i componenti e, in un `useEffect`, esegue il boot: imposta il flag layout, carica il manifest Drive, importa dinamicamente il motore e lo avvia.
  - **`components/`** — markup statico in React (`LoadingOverlay`, `Header`, `Viewport`, `About`, `ProjectOverlays`, `ProjectViews`, `CloseButton`, `Footer`, `Vignette`). Stessi `id`/classi dell'HTML originale, così il motore li trova via `getElementById`.
  - **`gallery/`** — motore e moduli: `fashion-gallery.js`, `drive-manifest.js`, `home-loading.js`, `pf-helpers.js`, `pf-performance.js`.
  - **`data/index.js`** — importa (side-effect, nell'ordine corretto) `portfolio/portfolio-config.js`, i 14 `data.js` e `portfolio/projects-registry.js`, che popolano i globali `window.__PORTFOLIO_*__`.
  - **`styles/index.css`** — importa `style-shared.css`, i `css/projects/*.css` e, con gating breakpoint via media query, `style-desktop.css` / `style-mobile.css`.
- **`portfolio/`** — `portfolio-config.js`, `projects/<categoria>/<id>/data.js`, `projects-registry.js` (consumati come moduli da `src/data`).
- **`css/projects/`** — uno stylesheet per serie.
- **`style-shared.css` / `style-desktop.css` / `style-mobile.css`** — fogli globali.
- **`public/`** — asset serviti così come sono e caricati a runtime dal motore:
  - **`public/media/projects/<NomeProgetto>/…`** — le foto.
  - **`public/portfolio/projects/<categoria>/<id>/mobile.css`** — stili mobile per-serie iniettati a runtime.

**Breakpoint**: **900px** — desktop ≥901px, mobile ≤900px. Il boot imposta `window.__PF_IS_MOBILE_LAYOUT__` con `matchMedia("(max-width: 900px)")`. Dopo un resize che attraversa la soglia serve un **refresh** per allineare layout e fogli `media`.

## Contenuti e progetti

Le immagini vivono in `public/media/projects/` (una cartella per progetto). Metadati e lista file: **`portfolio/projects/<categoria>/<id>/data.js`** (vedi `portfolio/projects/README.md`). `projects-registry.js` definisce l'ordine nel menu e le categorie su disco.

- Per **aggiornare le foto**: copia in `public/media/projects/<NomeCartella>/`, poi aggiorna l'array `images` nel `data.js` di quel progetto (o rigenera con `node tools/emit-portfolio-projects.mjs` se hai modificato lo script).
- **Anteprima**: `npm run dev` (oppure `npm run build` + `npm run preview`).

### Deploy

`npm run build` genera la cartella **`dist/`** pronta da pubblicare (include `index.html`, gli asset hashati e tutto il contenuto di `public/`, quindi `media/` e i `mobile.css` per-serie).

1. **Hosting statico** (Vercel, Netlify, ecc.): build command `npm run build`, output directory `dist/`.
2. **GitHub Pages / sottocartella**: la build usa `base: "./"` (vedi `vite.config.js`), quindi i percorsi degli asset sono relativi e funzionano anche servendo il sito da una sottocartella.
3. **Sito in una sottocartella diversa da dove sono le immagini**: in `portfolio/portfolio-config.js` imposta `basePath` in `__PORTFOLIO_CONFIG__`, oppure definisci `window.__PORTFOLIO_BASE_PATH__` prima dell'avvio.
4. **File aperti con `file://`**: non supportato. Usa sempre `npm run dev` o `npm run preview`.

Nel menu **Progetti** puoi filtrare la griglia per serie; **Tutti** (o il logo) mostra l'intero catalogo.

## Immagini da Google Drive

Sì, è possibile: il sito costruisce gli URL con l'**ID file** di Drive (non il link "Apri in Drive" così com'è).

1. Carica le foto su Drive (stesso ordine che usi in ogni `portfolio/projects/<categoria>/<id>/data.js`).
2. Per ogni file: **Condividi** → accesso **Chiunque abbia il link** → **Visualizzatore**.
3. Dal link `https://drive.google.com/file/d/QUESTO_È_L_ID/view` copia solo l'ID (la lunga stringa tra `/d/` e `/view`).
4. In `portfolio/portfolio-config.js` imposta:
   - `imagesFrom: "drive"` dentro `__PORTFOLIO_CONFIG__`.
   - Sostituisci ogni array `images` con gli **ID** nello stesso ordine dei file locali, oppure oggetti `{ driveId: "...", file: "nome.webp" }` per un `alt` leggibile.

La griglia usa le **miniature** (`thumbnail?id=…&sz=w1200`) per alleggerire il carico; lo **zoom** usa `uc?export=view&id=…` (qualità piena). Puoi disattivare le miniature con `useThumbnailsInGrid: false`.

**Limiti:** Drive non è una CDN: con molte immagini puoi avere **più latenza** o limiti rispetto ai file in `public/media/`. Per un sito molto visitato conviene uno storage pensato per il web (es. Cloudflare R2, S3, Cloudinary). Se un'immagine non si vede, verifica condivisione e che non sia solo "Utenti con link" senza accesso in lettura.

Opzionale: sovrascrivi gli URL con `driveUrlTemplate` e `driveThumbnailTemplate` in `__PORTFOLIO_CONFIG__` (usa il segnaposto `{id}`).

### Cartella Drive unica (stessa struttura delle cartelle locali)

Se le foto sono nella cartella condivisa del portfolio ([link esempio](https://drive.google.com/drive/folders/1U62jXXhkW0K6bGWlO75GUxEQWRf_N0Ay?usp=sharing)), il link della **cartella** non basta per le `<img>`: servono gli **ID dei file**. Il modo più semplice è usare il manifest generato da **Google Apps Script**:

1. Segui **`tools/DRIVE-MANIFEST.md`** e incolla lo script da **`tools/google-apps-script-drive-manifest.js`** in un nuovo progetto Apps Script.
2. Pubblica come **App web** (accesso *Chiunque*) e copia l'URL che finisce con **`/exec`**.
3. In `portfolio/portfolio-config.js` imposta `driveManifestUrl: "https://script.google.com/macros/s/.../exec"`.

All'avvio il sito carica il JSON con tutti i `driveId` e passa in modalità Drive automaticamente. Se lasci `driveManifestUrl` vuoto, restano le immagini in `public/media/projects/`.

## CSS monolitico → tre file

Per rigenerare `style-shared.css` / `style-mobile.css` / `style-desktop.css` da un unico foglio: salva il CSS completo come `style.monolith.css` nella root ed esegui `node tools/split-styles.mjs` (oppure `node tools/split-styles.mjs percorso/file.css`).

## Progetti modulari

- **`node tools/emit-portfolio-projects.mjs`** — rigenera tutti i `portfolio/projects/<categoria>/<id>/data.js` dall'array nello script (utile dopo modifiche bulk). Se editi a mano un solo `data.js`, non rilanciare il tool senza aggiornare l'array nello script.
