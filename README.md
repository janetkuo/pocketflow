# PocketFlow 💫

<p align="center">
  <b>English</b> | <a href="./README.zh-TW.md">繁體中文</a>
</p>

<p align="center">
  <strong>A modern, privacy-first mobile & foldable expense tracker Progressive Web App (PWA) with dual-pane layout optimized for the Google Pixel 10 Pro Fold.</strong>
</p>

<p align="center">
  <a href="https://janetkuo.github.io/pocketflow/"><img src="https://img.shields.io/badge/Demo-Live%20on%20GitHub%20Pages-638881.svg" alt="Live Demo"></a>
  <a href="https://janetkuo.github.io/pocketflow/"><img src="https://img.shields.io/badge/PWA-Installable%20%26%20Offline-5E8C78.svg" alt="PWA Ready"></a>
  <a href="https://janetkuo.github.io/pocketflow/"><img src="https://img.shields.io/badge/Privacy-100%25%20Local-emerald.svg" alt="100% Privacy"></a>
  <a href="https://janetkuo.github.io/pocketflow/"><img src="https://img.shields.io/badge/i18n-English%20%7C%20繁體中文-sky.svg" alt="Bilingual Support"></a>
  <a href="https://github.com/janetkuo/pocketflow"><img src="https://img.shields.io/badge/Architecture-Zero%20Build-amber.svg" alt="Zero Build"></a>
</p>

---

## 🚀 Live Demo

Experience PocketFlow immediately in your browser (no registration or install required):  
👉 **[https://janetkuo.github.io/pocketflow/](https://janetkuo.github.io/pocketflow/)**

---

## 🌟 Feature Highlights at a Glance

| Category | Highlight Features |
| :--- | :--- |
| 📱 **Foldable & Responsive** | Dual-pane dashboard on unfolded screens (≥ 768px); ergonomic single-column view with bottom navigation on folded screens (< 768px). |
| 🔒 **100% Client-Side Privacy** | Zero tracking, zero ads, zero required login. All transaction records and settings remain strictly in local storage (`localStorage`). |
| 📊 **Interactive Donut Chart** | Mathematical SVG circular arcs with min-degree protection (6°) preventing tiny slice glitches; interactive hover & tap inspection. |
| 🧮 **In-Modal Calculator** | Built-in keypad calculator for quick arithmetic directly inside transaction entry; smart autocomplete with emoji matching. |
| 🔄 **Recurring Automation** | Monthly & weekly recurring subscriptions/bills (Netflix, Rent, Salary) with automatic due checking and 1-click batch entry. |
| 🤖 **AI Financial Advisor** | One-click prompt generator formatting totals, savings rate, and category breakdowns ready for Google Gemini, ChatGPT, or Claude. |
| ☁️ **Cloud & Local Backup** | Secure Google Drive sync (`drive.file` least-privilege), custom OAuth Client ID support, complete JSON backup/restore, and CSV export. |
| 🎨 **Morandi Color Themes** | Curated Morandi palettes (Sage Green, Mist Blue, Desert Rose, Warm Taupe, Slate Gray) with seamless Dark & Light mode. |
| 🌐 **Bilingual (i18n)** | English (default) and Traditional Chinese (`zh-TW`) with instant dynamic switching across all UI and charts. |
| ⚡ **Offline-Ready PWA** | Service Worker shell caching for complete offline functionality; installable to home screen on Android and iOS. |

---

## ✨ Detailed Features

### 📱 1. Foldable & Dual-Pane Architecture
- **Unfolded Inner Screen / Wide Displays (≥ 768px)**:
  - **Left Pane**: Monthly balance card, savings rate progress indicator, and interactive SVG donut chart.
  - **Right Pane**: Instant search bar, category/type filter tabs (All, Expense, Income), and chronological transaction feed.
- **Folded Outer Screen / Mobile Displays (< 768px)**:
  - Ergonomic thumb-friendly navigation bar.
  - Floating Action Button `(+)` for one-hand rapid entry.
- **Fold State Observer**: Dynamically reacts to window resizing and screen fold/unfold transitions in real time.

### 🔒 2. Privacy First & Local Persistence
- **Zero-Login Architecture**: No username, password, or third-party account required.
- **Device-Only Storage**: All financial ledgers reside exclusively in the client's browser `localStorage`.
- **Demo Mode**: Comes pre-loaded with sample demonstration data that can be wiped with a single click to start a fresh private ledger.

### 📊 3. Precision Analytics & Interactive Donut Chart
- **Mathematical SVG Arc Engine**: Custom vector donut chart calculating proportional angles dynamically.
- **Min-Degree Safeguard (6.0°)**: Ensures tiny spending categories (< 1%) remain visible, selectable, and interactive without overlapping glitches.
- **Hover & Touch Breakdown**: Tap any slice to inspect category amounts, percentages, and status instantly in the center ring.
- **Savings Rate & Financial Health**: Real-time calculation of net savings rate with automatic surplus/deficit status badges.

### 🧮 4. Smart Transaction Entry & In-Modal Calculator
- **Built-in Keypad Calculator**: Perform inline arithmetic (`+`, `-`, `×`, `÷`) directly within the transaction sheet without switching apps.
- **Multi-Currency Support**: Switch between **USD ($)**, **TWD (NT$)**, **JPY (¥)**, **EUR (€)**, **KRW (₩)**, **HKD (HK$)**, and **GBP (£)** per transaction.
- **Smart Autocomplete & Emoji Resolution**: Context-aware suggestions based on past entries with automatic icon matching (e.g., latte → ☕, metro → 🚇, groceries → 🛍️).
- **In-Place Editing**: Quick tap-to-edit on any transaction card or explicit edit/delete actions.

### 🔄 5. Recurring Transactions & Subscription Automation
- **Flexible Rules**: Define monthly or weekly recurring rules for rent, streaming subscriptions, utility bills, or regular income.
- **Due Date Checking**: PocketFlow scans upcoming dues on launch and displays an alert banner.
- **One-Click Batch Posting**: Post all due items at once with the "Post All Now" action.
- **Quick Add Integration**: Create a recurring rule directly while logging an expense.

### 🤖 6. AI Financial Advisor Prompt Packager
- Generates a cleanly structured Markdown prompt with your monthly spending distribution, savings rate, top expenses, and category metrics.
- One-click copy to paste directly into **Google Gemini**, **ChatGPT**, or **Claude** for actionable budget recommendations and personalized financial planning.

### ☁️ 7. Google Drive Cloud Sync & Data Portability
- **Google Drive Integration**: Backup and restore directly to personal Google Drive using Google Identity Services (GIS).
- **Least-Privilege Security**: Requests only the strict `drive.file` scope—PocketFlow cannot access any other files in your Google Drive.
- **Custom OAuth Client ID**: Option to input your own Google Cloud Web Client ID for personalized hosting.
- **Local Data Export/Import**: Full JSON snapshot backup/restore and CSV spreadsheet export compatible with Google Sheets and Excel.

### 🎨 8. Morandi Palette & Dark / Light Theme
- Curated soothing Morandi color presets:
  - 🌿 **Sage Green** (Default)
  - 🌊 **Mist Blue**
  - 🌸 **Desert Rose**
  - 🪵 **Warm Taupe**
  - 🪨 **Slate Gray**
- System-respecting Dark / Light mode toggle with smooth visual transitions.

---

## 🛠️ Technology Stack

- **Frontend**: Semantic HTML5, Vanilla ES6+ JavaScript (zero build tools, zero dependencies, instant load).
- **Styling**: Tailwind CSS (via CDN) with customized Morandi CSS variables and dark mode classes.
- **PWA**: Service Worker (`sw.js`) app-shell cache strategy + Web App Manifest (`manifest.json`).
- **Icons**: Handcrafted inline SVG vector icons.
- **Cloud Sync**: Google Identity Services (GIS) + Google Drive API v3.

---

## 💻 Local Development

No Node.js or build steps required. Run directly with any static web server:

```bash
# Clone the repository
git clone https://github.com/janetkuo/pocketflow.git
cd pocketflow

# Start local server with Python
python3 -m http.server 8080 --bind 0.0.0.0
```

Visit `http://localhost:8080` in your browser.

---

## 🧪 Verification & Quality Gate

PocketFlow includes an automated verification script to ensure runtime stability, DOM integrity, and syntax correctness:

```bash
python3 verify.py
```

Checks performed:
1. **JavaScript Syntax**: Validated using macOS JavaScriptCore engine (`osascript -l JavaScript`) for zero syntax errors.
2. **DOM ID Consistency**: Validates that all element IDs referenced in `app.js` exist in `index.html`.
3. **Core Calculations**: Validates currency formatting (`formatMoney`) and category icon resolution.
4. **Branding & Assets**: Verifies icon assets and metadata consistency.
