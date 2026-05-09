# Greater Sydney EV Charging Map (GitHub Pages)

Static map + station list. Live site (after you enable Pages):  
**`https://qiwangai.github.io/greater-sydney-ev-charging/`**

## One-time: create the repo on GitHub

1. Open [github.com/new](https://github.com/new).
2. Repository name: **`greater-sydney-ev-charging`** (must match the URL above).
3. **Public** → Create repository.

## One-time: push this folder from your Mac

In Terminal (use your real path if different):

```bash
cd /Users/qiwang/Desktop/DSA2026/Assignment2BaseCode/greater-sydney-ev-charging
git init
git branch -M main
git add .
git commit -m "Initial GitHub Pages site"
git remote add origin https://github.com/qiwangai/greater-sydney-ev-charging.git
git push -u origin main
```

If GitHub shows “repository not empty”, create the repo **without** README/license, or use `git pull origin main --rebase` first.

## Enable GitHub Pages

1. On GitHub: repo **Settings** → **Pages**.
2. **Build and deployment** → Source: **Deploy from a branch**.
3. Branch: **main** → folder **`/ (root)`** → Save.
4. Wait ~1 minute; open **`https://qiwangai.github.io/greater-sydney-ev-charging/`**

## Update station data

From the main project folder:

```bash
OCM_API_KEY="your_key" python3 tools/fetch_ocm.py
cp web/data/stations.json web/data/stations.csv greater-sydney-ev-charging/data/
cd greater-sydney-ev-charging
git add data && git commit -m "Refresh OCM data" && git push
```

`.nojekyll` is present so GitHub does not run Jekyll on this site.
