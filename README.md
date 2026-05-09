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

Open your repo on GitHub → left sidebar **Settings** → left **Pages** (under “Code and automation”).

You will see **Build and deployment** with a **Source** control. New repos often default to **GitHub Actions** — that is normal; you may **not** see “Deploy from a branch” until you open the dropdown.

### Option A — GitHub Actions（推荐，本仓库已带 workflow）

1. **Source** 选择 **`GitHub Actions`**（不要选 Workflow 里别的自定义项；保存后首次推送会跑 `.github/workflows/pages.yml`）。
2. 若第一次提示要批准 **github-pages** 环境：点进去按提示 **Approve**。
3. 把本地最新提交推上去（含 workflow）：
   ```bash
   cd /Users/qiwang/Desktop/DSA2026/Assignment2BaseCode/greater-sydney-ev-charging
   git add .github && git commit -m "Add GitHub Pages workflow"  # 若已提交过可省略
   git push
   ```
4. 打开仓库 **Actions** 标签，确认 **Deploy Pages** 绿勾；再等 1～2 分钟访问：  
   **`https://qiwangai.github.io/greater-sydney-ev-charging/`**

### Option B — Deploy from a branch（经典方式）

1. 在 **Source** 的下拉框里选 **`Deploy from a branch`**（英文界面；中文界面可能是 **从分支部署**）。
2. **Branch** 选 **`main`**，文件夹选 **`/ (root)`**，Save。
3. 若下拉里只有 **GitHub Actions**，没有 branch 选项，说明当前账号/仓库只能用 Actions，请用 **Option A**。

4. 若仍找不到：在 Settings 顶部搜索框搜 **`Pages`**，确认进的是 **仓库** Settings 而不是个人/组织 Settings。

## Update station data

From the main project folder:

```bash
OCM_API_KEY="your_key" python3 tools/fetch_ocm.py
cp web/data/stations.json web/data/stations.csv greater-sydney-ev-charging/data/
cd greater-sydney-ev-charging
git add data && git commit -m "Refresh OCM data" && git push
```

`.nojekyll` is present so GitHub does not run Jekyll on this site.
