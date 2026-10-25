# PocketFlow 💫

<p align="center">
  <a href="./README.md">English</a> | <b>繁體中文</b>
</p>

<p align="center">
  <strong>專為 Google Pixel 10 Pro Fold 及各式行動/桌面裝置打造的現代化、隱私優先折疊雙欄記帳 Progressive Web App (PWA)。</strong>
</p>

<p align="center">
  <a href="https://janetkuo.github.io/pocketflow/"><img src="https://img.shields.io/badge/Demo-線上立即體驗-638881.svg" alt="線上立即體驗"></a>
  <a href="https://janetkuo.github.io/pocketflow/"><img src="https://img.shields.io/badge/PWA-離線可用%20%26%20可安裝-5E8C78.svg" alt="PWA 離線支援"></a>
  <a href="https://janetkuo.github.io/pocketflow/"><img src="https://img.shields.io/badge/隱私-100%25%20本機儲存-emerald.svg" alt="100% 本機隱私"></a>
  <a href="https://janetkuo.github.io/pocketflow/"><img src="https://img.shields.io/badge/多語系-繁體中文%20%7C%20English-sky.svg" alt="雙語支援"></a>
  <a href="https://github.com/janetkuo/pocketflow"><img src="https://img.shields.io/badge/架構-零建置秒開-amber.svg" alt="零建置架構"></a>
</p>

---

## 🚀 線上即時體驗 (Live Demo)

無需下載安裝或註冊帳號，即可在瀏覽器中直接使用：  
👉 **[https://janetkuo.github.io/pocketflow/](https://janetkuo.github.io/pocketflow/)**

---

## 🌟 核心功能亮點一覽

| 功能分類 | 重點特色摘要 |
| :--- | :--- |
| 📱 **折疊雙欄響應式設計** | 展開大螢幕（≥ 768px）雙欄儀表板；閉合單手模式（< 768px）底部導覽列與懸浮記帳按鈕。 |
| 🔒 **100% 本機隱私優先** | 零追蹤、零廣告、免註冊登入。所有交易紀錄與個人設定純粹保存在本機瀏覽器 (`localStorage`)。 |
| 📊 **精準互動式圓餅圖** | 真實 SVG 圓弧運算，具備最小角度保護（6°），避免極小佔比切片重疊破圖；支援懸停與點擊互動分析。 |
| 🧮 **彈窗內建計算機** | 記帳彈窗內建四則運算鍵盤，免切換 App 快速計算；智慧歷史聯想輸入與 Emoji 自動配對。 |
| 🔄 **週期收支自動化管理** | 支援月/週固定收支規則（房租、Netflix/Spotify 訂閱、水電、薪資），自動到期提醒並提供一鍵全數入帳。 |
| 🤖 **AI 財務顧問提示詞** | 一鍵將當月收支總覽、儲蓄率與分類排行打包為標準 Markdown 提示詞，直接貼給 Gemini、ChatGPT 或 Claude 獲取理財建議。 |
| ☁️ **雲端同步與備份** | 支援 Google Drive 最小權限（`drive.file`）雲端備份還原、自訂 OAuth Client ID、本機完整 JSON 備份及 CSV 試算表匯出。 |
| 🎨 **莫蘭迪美學色盤** | 精選 5 款莫蘭迪質感風格色系（鼠尾草綠、迷霧藍、沙漠玫瑰、暖灰褐、玄武灰），支援深色/淺色無縫切換。 |
| 🌐 **完整雙語切換 (i18n)** | 支援繁體中文（台灣）與英文（預設），全站介面、圖表、日期與彈窗即時一鍵切換，無需重新整理。 |
| ⚡ **PWA 漸進式網頁應用** | Service Worker 快取架構支援完全離線使用；支援 Android 與 iOS 裝置「新增至主畫面」如同原生 App。 |

---

## ✨ 詳細功能介紹

### 📱 1. 折疊大螢幕與雙欄自適應架構
- **展開內螢幕 / 寬螢幕桌面模式（≥ 768px）**：
  - **左側欄**：當月結餘（淨儲蓄）卡片、儲蓄率進度指標、動態互動式 SVG 圓餅圖。
  - **右側欄**：即時搜尋框、類別與收支篩選頁籤（全部、支出、收入）、分日群組交易瀑布流。
- **閉合外螢幕 / 行動單手模式（< 768px）**：
  - 符合人體工學的底部快速導覽列。
  - 懸浮快捷動作按鈕 `(+)`，單手大拇指即可快速喚起記帳。
- **螢幕狀態即時感知**：透過 `initFoldScreenObserver()` 即時監聽視窗縮放與折疊展開狀態，動態流暢調整版面。

### 🔒 2. 絕對隱私保護與本機儲存
- **零登入架構**：不需帳號密碼、不搜集任何隱私數據或 Cookie。
- **純本機儲存**：所有帳目與配置完全存儲在使用者自己的裝置 `localStorage` 中。
- **內建展示資料模式**：初次進入提供展示範例，支援一鍵「清空並開始我的私密帳本」，打造乾淨自主的個人財務帳本。

### 📊 3. 數據視覺化與互動式圓餅圖
- **精密 SVG 圓弧運算**：以純數學三角函數動態計算圓弧角度，呈現細緻視覺效果。
- **最小角度保護機制（6.0°）**：解決極小支出佔比（如 < 1%）在傳統圓餅圖中切片過小難以點選或 SVG 渲染溢出的問題。
- **觸控與懸停分析**：點擊切片即可在圓心即時顯示該類別金額、名稱及當月總支出佔比。
- **財務健康指標**：即時計算當月儲蓄率，並標記盈餘良好 ✨ 或赤字注意 ⚠️ 狀態。

### 🧮 4. 快速記帳與內建四則運算計算機
- **彈窗內建計算機**：在輸入金額時可隨時開啟數字運算鍵盤進行加減乘除（`+`, `-`, `×`, `÷`），不必跳出 App 開啟計算機。
- **多幣別彈性支援**：單筆交易可自選幣別：**美元 ($)**、**新台幣 (NT$)**、**日圓 (¥)**、**歐元 (€)**、**韓元 (₩)**、**港幣 (HK$)**、**英鎊 (£)**。
- **智慧聯想輸入與圖示匹配**：依據過往記帳紀錄智慧自動完成，並自動識別常用關鍵字推薦 Emoji 圖示（如拿鐵 → ☕、捷運 → 🚇、生活用品 → 🛍️）。
- **即點即改**：點擊任一筆交易卡片即可呼叫編輯面板，支援即時修改與刪除。

### 🔄 5. 週期性固定收支自動化管理
- **彈性規則設定**：自訂每月或每週的定期款項（房租、水電雜費、薪水、Netflix、Spotify 訂閱服務）。
- **自動檢查與到期通知**：每次啟動時自動掃描當月尚未入帳之項目，頂部浮現待處理通知橫幅。
- **一鍵全數入帳**：點選「一鍵全數入帳」即可快速將所有到期週期款項批次入帳，省去逐筆輸入的時間。
- **記帳時快速建立**：在新增一般收支時，勾選週期性選項即可同步建立重複規則。

### 🤖 6. AI 財務顧問提示詞打包器
- 自動將當月收入、支出、儲蓄率、最大支出類別及各項清單結構化格式化為 Markdown 提示詞。
- 一鍵複製後直接貼入 **Google Gemini**、**ChatGPT** 或 **Claude**，立即獲得個人化的收支分析、節流建議與預算配置策略。

### ☁️ 7. Google Drive 雲端同步與資料匯入匯出
- **個人 Google Drive 雲端備份**：採用 Google Identity Services (GIS) 與 Google Drive API v3。
- **最小授權安全規範**：僅使用 `drive.file` 權限，PocketFlow 僅能存取由本 App 建立之備份檔，完全無法讀取使用者雲端硬碟中的其他任何私人檔案。
- **自訂 OAuth Client ID**：支援在設定面板填入個人 Google Cloud 應用程式 Client ID，掌握完整自主權。
- **完整本機備份與匯出**：支援 JSON 格式完整備份/還原，以及匯出為 CSV 試算表（可用於 Excel 或 Google 試算表進一步分析）。

### 🎨 8. 莫蘭迪風格美學色盤與深淺主題
- 精心調配 5 組耐看沈穩的莫蘭迪配色方案：
  - 🌿 **鼠尾草綠 (Sage Green)**（預設）
  - 🌊 **迷霧藍 (Mist Blue)**
  - 🌸 **沙漠玫瑰 (Desert Rose)**
  - 🪵 **暖灰褐 (Warm Taupe)**
  - 🪨 **玄武灰 (Slate Gray)**
- 支援流暢切換深色模式（Dark Mode）與淺色模式（Light Mode）。

---

## 🛠️ 技術架構

- **前端開發**：語意化 HTML5、原生 Vanilla ES6+ JavaScript（無任何打包工具、零相依套件、極速載入）。
- **樣式呈現**：Tailwind CSS（CDN 引入）搭配客製化莫蘭迪 CSS 原生變數與暗黑模式類別。
- **PWA 規範**：Service Worker (`sw.js`) 快取策略 + Web App Manifest (`manifest.json`)。
- **圖示設計**：純手工精緻向量 SVG 圖示。
- **雲端整合**：Google Identity Services (GIS) + Google Drive API v3。

---

## 💻 本機開發與執行

本專案無需安裝 Node.js，亦無需任何建置/編譯步驟。使用任何靜態 HTTP 伺服器即可直接啟動：

```bash
# 下載專案庫
git clone https://github.com/janetkuo/pocketflow.git
cd pocketflow

# 使用 Python 內建伺服器啟動
python3 -m http.server 8080 --bind 0.0.0.0
```

在瀏覽器中開啟 `http://localhost:8080` 即可預覽。

---

## 🧪 程式碼品質與驗證機制

PocketFlow 提供內建自動化驗證腳本，確保執行穩定性、DOM 綁定正確性與語法零錯誤：

```bash
python3 verify.py
```

檢驗項目包含：
1. **JavaScript 語法檢測**：利用 macOS JavaScriptCore 引擎（`osascript -l JavaScript`）確保 `app.js` 與 `sw.js` 零語法錯誤。
2. **DOM ID 一致性驗證**：比對 `app.js` 所參照之所有元素 ID 是否均存在於 `index.html`。
3. **核心業務運算驗證**：驗證金額雙位數格式化（`formatMoney`）及智慧圖示匹配邏輯。
4. **品牌與資源同步**：驗證 SVG 圖示與相關詮釋資料之一致性。
