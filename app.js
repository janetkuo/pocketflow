// PocketFlow - Smart Expense Tracker for Pixel 10 Pro Fold
// State & Storage Configuration

const STORAGE_KEY = 'pocketflow_transactions_v1';
const RECURRING_KEY = 'pocketflow_recurring_v1';
const THEME_KEY = 'pocketflow_theme_v1';
const PALETTE_KEY = 'pocketflow_palette_v1';
const CURRENCY_KEY = 'pocketflow_currency_v1';
const LANG_KEY = 'pocketflow_lang_v1';
const DEFAULT_CURR_KEY = 'pocketflow_default_currency';
const GDRIVE_CLIENT_ID_KEY = 'pocketflow_gdrive_client_id';
const GDRIVE_LAST_BACKUP_KEY = 'pocketflow_gdrive_last_backup';
const GDRIVE_TOKEN_KEY = 'pocketflow_gdrive_token';
const GDRIVE_TOKEN_EXPIRES_KEY = 'pocketflow_gdrive_token_expires';
const GDRIVE_USER_EMAIL_KEY = 'pocketflow_gdrive_user_email';
const GDRIVE_CONNECTED_KEY = 'pocketflow_gdrive_connected';
const DEFAULT_GDRIVE_CLIENT_ID = '592001205133-6f41prs5p41s92e61pae5eb34rs05as2.apps.googleusercontent.com';

// Google Drive Auth State
let gdriveTokenClient = null;
let gdriveAccessToken = localStorage.getItem(GDRIVE_TOKEN_KEY) || null;
let gdriveTokenExpiresAt = parseInt(localStorage.getItem(GDRIVE_TOKEN_EXPIRES_KEY) || '0', 10);
if (gdriveAccessToken && Date.now() >= gdriveTokenExpiresAt - 30000) {
  gdriveAccessToken = null;
  gdriveTokenExpiresAt = 0;
  localStorage.removeItem(GDRIVE_TOKEN_KEY);
  localStorage.removeItem(GDRIVE_TOKEN_EXPIRES_KEY);
}

// Supported Currencies
const CURRENCIES = {
  USD: { symbol: '$', name: { en: 'US Dollar', 'zh-TW': '美元' } },
  TWD: { symbol: 'NT$', name: { en: 'New Taiwan Dollar', 'zh-TW': '新台幣' } },
  JPY: { symbol: '¥', name: { en: 'Japanese Yen', 'zh-TW': '日圓' } },
  EUR: { symbol: '€', name: { en: 'Euro', 'zh-TW': '歐元' } },
  KRW: { symbol: '₩', name: { en: 'South Korean Won', 'zh-TW': '韓元' } },
  HKD: { symbol: 'HK$', name: { en: 'Hong Kong Dollar', 'zh-TW': '港幣' } },
  GBP: { symbol: '£', name: { en: 'British Pound', 'zh-TW': '英鎊' } }
};

// Bilingual Localization Dictionary
const I18N = {
  en: {
    appTitle: 'PocketFlow - Smart Expense Tracker',
    appSubtitle: 'Foldable Expense Tracker',
    screenModeDual: 'Dual-Pane Mode (Unfolded)',
    screenModeSingle: 'Single-Pane Mode (Folded)',
    
    // Demo Banner
    demoBannerTag: 'Demo Preview',
    demoBannerText: '💡 Currently displaying <strong>sample demo data</strong> for preview. All your ledger data is stored safely on your local device.',
    demoBannerClearBtn: '✨ Clear & Start My Private Ledger',

    // Recurring Banner
    recurringAlertText: (count, items) => `${count} recurring item${count > 1 ? 's' : ''} due this month (${items})`,
    applyRecurringBtn: 'Post All Now',

    // Balance Card
    monthlyBalance: 'Monthly Balance (Net Savings)',
    balanceHealthy: 'Healthy ✨',
    balanceDeficit: 'Deficit Alert ⚠️',
    totalIncome: 'Total Income',
    totalExpense: 'Total Expense',

    // Donut Chart
    categoryBreakdown: 'Category Breakdown',
    tabExpense: 'Expense',
    tabIncome: 'Income',
    donutCenterExp: 'Total Expense',
    donutCenterInc: 'Total Income',
    donutCenterAll: 'All Categories',
    donutCenterPct: 'Share',
    donutNoData: 'No data for this month',

    // Savings Rate Card
    savingsRateTitle: 'Monthly Savings Rate',
    savingsRateLabel: (rate, sym, amount) => `${rate}% (Net ${sym} ${amount})`,
    manageRecurringBtn: 'Manage Recurring',

    // Feed / Filter
    searchPlaceholder: 'Search records or notes...',
    filterAll: 'All',
    filterExpense: 'Expenses Only',
    filterIncome: 'Income Only',
    emptyTitle: 'No transaction records yet',
    emptyDesc: "Tap the '+' button below to add your first transaction!",
    today: 'Today',
    yesterday: 'Yesterday',
    dailyExpense: (sym, amt) => `Daily Expense ${sym} ${amt}`,
    recurringBadge: 'Recurring',

    // Bottom Nav & Floating Add
    navRecords: 'Records',
    navRecurring: 'Recurring',
    quickAdd: 'Quick Add',

    // Add/Edit Modal
    modalNewTitle: 'New Transaction',
    modalEditTitle: 'Edit Transaction',
    modalExpenseTab: 'Expense -',
    modalIncomeTab: 'Income +',
    amountLabel: 'Select Currency & Enter Amount',
    descLabel: 'Description / Title (Optional)',
    descHint: '(Smart autocomplete enabled)',
    descPlaceholder: 'e.g., Latte, Groceries, Metro...',
    categoryLabel: 'Select Category',
    dateLabel: 'Date',
    saveTransaction: 'Save Transaction',
    updateTransaction: 'Update Transaction',
    calcToggleShow: 'Show Calculator',
    calcToggleHide: 'Hide Calculator',
    calcDivZero: '⚠️ Cannot divide by 0',
    calcInvalidExpr: '⚠️ Invalid calculation',
    editTxBtn: 'Edit',
    deleteTxBtn: 'Delete',

    // Recurring in Add Modal
    modalRecTitle: 'Recurring Transaction',
    modalRecDesc: 'Auto-repeat every month or week',
    modalRecNo: 'No',
    modalRecYes: 'Yes',
    modalRecFreqLabel: 'Frequency',
    modalRecFreqMonthly: 'Monthly',
    modalRecFreqWeekly: 'Weekly',
    modalRecDayLabel: 'Repeat Day (1-31)',
    modalRecHelpText: '💡 Automatically creates a recurring rule. Future due dates will alert you automatically.',
    recQuickAddTip: '💡 You can now set recurring transactions directly inside Quick Add!',
    recQuickAddBtn: '+ Quick Add',

    // Recurring Modal
    recurringModalTitle: 'Recurring Transactions',
    recurringModalDesc: 'Automatically track monthly fixed expenses (Rent, Subscriptions, Salary)',
    addRecurringTitle: '+ Add Recurring Item',
    editRecurringTitle: '✏️ Edit Recurring Item',
    recTitlePlaceholder: 'Item name (e.g. Rent)',
    recAmountPlaceholder: 'Amount',
    recTypeExpense: 'Expense (-)',
    recTypeIncome: 'Income (+)',
    recFreqMonthly: 'Monthly',
    recFreqWeekly: 'Weekly',
    recDayLabel: 'Day',
    recDaySuffix: 'of month',
    recDayPlaceholder: '1-31',
    addRecurringBtn: 'Add to Recurring List',
    updateRecurringBtn: 'Update Recurring Item',
    cancelEditBtn: 'Cancel',
    noRecurringRules: 'No recurring items configured yet',
    recurringItemSub: (day, type) => `Day ${day} each month · ${type === 'expense' ? 'Expense' : 'Income'}`,

    // Settings Modal
    settingsTitle: 'Settings & Data Backup',
    aiExportTitle: 'Export for AI Financial Review',
    aiExportDesc: "Formats this month's <strong>totals, category breakdown, savings rate, and items</strong> into a prompt. Paste directly into Gemini or ChatGPT for financial advice!",
    copyAiPromptBtn: 'Copy AI Financial Prompt',
    copyAiSuccess: '✅ Copied! Ready to paste into Gemini or ChatGPT',

    // Google Drive Backup
    gdriveTitle: 'Google Drive Backup',
    gdriveDesc: 'Securely sync and backup your ledger to your personal Google Drive with strict privacy (only accesses PocketFlow backup files).',
    gdriveBackupBtn: 'Backup Now',
    gdriveRestoreBtn: 'Restore from Drive',
    gdriveToggleConfig: 'Google Client ID Settings',
    gdriveClientIdLabel: 'Google OAuth 2.0 Client ID:',
    gdriveSaveClientIdBtn: 'Save',
    gdriveGuideTitle: 'How to get your Client ID:',
    gdriveGuideStep1: '1. Go to <a href="https://console.cloud.google.com/" target="_blank" rel="noopener" class="text-indigo-500 underline font-medium">Google Cloud Console</a> and create or select a project.',
    gdriveGuideStep2: '2. Enable Google Drive API, then go to APIs & Services > Credentials > Create OAuth client ID (Web application).',
    gdriveGuideStep3: '3. In "Authorized JavaScript origins", add <code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">https://janetkuo.github.io</code> and <code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">http://localhost:8080</code>.',
    gdriveStatusDisconnected: 'Not Connected',
    gdriveStatusConnected: 'Connected',
    gdriveStatusNeedConfig: 'Client ID Needed',
    gdriveDisconnectBtn: 'Disconnect',
    gdriveDisconnectConfirm: 'Are you sure you want to disconnect Google Drive?',
    gdriveLastBackup: (time) => `Last backup: ${time}`,
    gdriveNoBackup: 'No cloud backup yet',
    gdriveMissingClientId: 'Please enter and save your Google OAuth Client ID first.',
    gdriveSavedClientId: '✅ Client ID saved successfully!',
    gdriveLibraryLoading: 'Google Identity Service is loading, please try again in a moment.',
    gdriveBackingUp: 'Backing up...',
    gdriveRestoring: 'Restoring...',
    gdriveBackupSuccess: '🎉 Successfully backed up to Google Drive!',
    gdriveBackupError: (err) => `Failed to backup to Google Drive: ${err}`,
    gdriveRestoreNotFound: 'No PocketFlow backup file found in your Google Drive.',
    gdriveRestoreConfirm: (date, count) => `Found cloud backup from ${date} (${count} transactions).\nDo you want to restore and replace current data?`,
    gdriveRestoreSuccess: '🎉 Data restored from Google Drive successfully!',
    gdriveRestoreError: (err) => `Failed to restore from Google Drive: ${err}`,

    backupTitle: 'Backup & Transfer',
    backupDesc: 'Download backup files to keep in cloud storage or restore easily when switching devices:',
    exportJsonBtn: 'Export JSON Backup',
    exportCsvBtn: 'Export CSV Sheet',
    importJsonBtn: 'Import & Restore (JSON)',

    clearDataTitle: 'Clear All Data (Start Fresh)',
    clearDataDesc: 'One-click reset to start your own completely blank, private ledger (clears all transactions & recurring settings).',
    clearDataBtn: 'Clear All Data',
    clearConfirm: 'Are you sure you want to clear all records and recurring rules? You will start with a fresh, private ledger!',

    reloadDemoBtn: 'Reload Demo Sample Data',
    importConfirm: (count) => `Successfully read backup file with ${count} transactions.\nDo you want to import and replace current data?`,
    importSuccess: '🎉 Data restored successfully!',
    importInvalid: 'Invalid backup file format.',
    importError: 'Failed to parse JSON file.',

    pwaUpdateText: 'New version ready! Tap to update',
    pwaUpdateBtn: 'Update Now',

    paletteSettingsTitle: 'Appearance & Morandi Palette',
    paletteSettingsDesc: 'Choose your preferred Morandi color theme. Changes apply instantly:',
    paletteToggleTitle: 'Color Palette / 莫蘭迪風格色盤',
    paletteQuickLabel: 'Palette',
    paletteActiveBadge: 'Active',

    months: [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
    shortMonths: [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
    ],
    langSwitchLabel: '繁中'
  },

  'zh-TW': {
    appTitle: 'PocketFlow - 智慧記帳',
    appSubtitle: 'Pixel Fold 智慧記帳',
    screenModeDual: '雙欄大螢幕模式 (展開)',
    screenModeSingle: '單欄手機模式 (閉合)',
    
    // Demo Banner
    demoBannerTag: '展示預覽',
    demoBannerText: '💡 目前畫面為<strong>「公開展示用預設範例」</strong>（非任何人之個人帳本）。所有數據僅安全保存在您自己的手機或電腦本機。',
    demoBannerClearBtn: '✨ 清空並開始我的私密帳本',

    // Recurring Banner
    recurringAlertText: (count, items) => `本月有 ${count} 筆週期收支尚未入帳 (${items})`,
    applyRecurringBtn: '一鍵全數入帳',

    // Balance Card
    monthlyBalance: '本月結餘 (淨儲蓄)',
    balanceHealthy: '盈餘良好 ✨',
    balanceDeficit: '赤字注意 ⚠️',
    totalIncome: '總收入',
    totalExpense: '總支出',

    // Donut Chart
    categoryBreakdown: '分類收支佔比',
    tabExpense: '支出',
    tabIncome: '收入',
    donutCenterExp: '本月總支出',
    donutCenterInc: '本月總收入',
    donutCenterAll: '全部類別',
    donutCenterPct: '佔比',
    donutNoData: '本月尚無資料',

    // Savings Rate Card
    savingsRateTitle: '本月儲蓄率',
    savingsRateLabel: (rate, sym, amount) => `${rate}% (結餘 ${sym} ${amount})`,
    manageRecurringBtn: '管理固定週期收支',

    // Feed / Filter
    searchPlaceholder: '搜尋項目或備註...',
    filterAll: '全部',
    filterExpense: '只看支出',
    filterIncome: '只看收入',
    emptyTitle: '目前沒有記帳紀錄',
    emptyDesc: '點擊下方「+」按鈕，立即記錄第一筆消費！',
    today: '今天',
    yesterday: '昨天',
    dailyExpense: (sym, amt) => `日支出 ${sym} ${amt}`,
    recurringBadge: '週期',

    // Bottom Nav & Floating Add
    navRecords: '明細',
    navRecurring: '週期',
    quickAdd: '快速記帳',

    // Add/Edit Modal
    modalNewTitle: '新增收支',
    modalEditTitle: '編輯收支紀錄',
    modalExpenseTab: '支出 -',
    modalIncomeTab: '收入 +',
    amountLabel: '選擇幣別與輸入金額',
    descLabel: '備註 / 項目名稱 (選填)',
    descHint: '(支援智慧自動填入)',
    descPlaceholder: '例如：拿鐵、全聯、捷運...',
    categoryLabel: '選擇類別',
    dateLabel: '消費日期',
    saveTransaction: '儲存紀錄',
    updateTransaction: '更新紀錄',
    calcToggleShow: '顯示計算機',
    calcToggleHide: '收合計算機',
    calcDivZero: '⚠️ 除數不能為 0',
    calcInvalidExpr: '⚠️ 計算式有誤',
    editTxBtn: '編輯',
    deleteTxBtn: '刪除',

    // Recurring in Add Modal
    modalRecTitle: '固定週期收支 (Recurring)',
    modalRecDesc: '每月或每週固定重複記錄',
    modalRecNo: '否',
    modalRecYes: '是',
    modalRecFreqLabel: '週期頻率',
    modalRecFreqMonthly: '每月固定',
    modalRecFreqWeekly: '每週固定',
    modalRecDayLabel: '固定扣款/入帳日 (1-31)',
    modalRecHelpText: '💡 將同步建立固定週期規則，未來的扣款日系統會自動提醒與對帳。',
    recQuickAddTip: '💡 現在可以直接在「快速記帳」中開啟週期設定！',
    recQuickAddBtn: '+ 快速記帳新增',

    // Recurring Modal
    recurringModalTitle: '固定週期收支 (Recurring)',
    recurringModalDesc: '自動追蹤每月固定開銷 (房租、串流訂閱、薪資)',
    addRecurringTitle: '+ 新增固定收支項目',
    editRecurringTitle: '✏️ 編輯固定收支項目',
    recTitlePlaceholder: '項目名稱 (如: 房租)',
    recAmountPlaceholder: '金額',
    recTypeExpense: '支出 (-)',
    recTypeIncome: '收入 (+)',
    recFreqMonthly: '每月固定',
    recFreqWeekly: '每週固定',
    recDayLabel: '每月',
    recDaySuffix: '號',
    recDayPlaceholder: '1-31',
    addRecurringBtn: '加入定期清單',
    updateRecurringBtn: '更新定期項目',
    cancelEditBtn: '取消',
    noRecurringRules: '目前沒有設定定期項目',
    recurringItemSub: (day, type) => `每月 ${day} 號 · ${type === 'expense' ? '支出' : '收入'}`,

    // Settings Modal
    settingsTitle: '設定與資料備份',
    aiExportTitle: '打包丟給 AI 財務分析',
    aiExportDesc: '自動將本月份的<strong>收支總額、分類佔比、儲蓄率與明細清單</strong>整理成專業 Markdown 提示詞，複製後可直接貼給 Gemini 或 ChatGPT 進行財務健檢與省錢建議！',
    copyAiPromptBtn: '複製本月 AI 分析提示詞',
    copyAiSuccess: '✅ 已複製！可直接貼給 Gemini 或 ChatGPT',

    // Google Drive Backup
    gdriveTitle: 'Google 雲端硬碟備份',
    gdriveDesc: '安全地將帳本備份至個人的 Google 雲端硬碟（採用最小權限，僅存取 PocketFlow 備份檔，極致保護隱私）。',
    gdriveBackupBtn: '立即備份到雲端',
    gdriveRestoreBtn: '從雲端硬碟還原',
    gdriveToggleConfig: 'Google Client ID 設定',
    gdriveClientIdLabel: 'Google OAuth 2.0 Client ID：',
    gdriveSaveClientIdBtn: '儲存',
    gdriveGuideTitle: '如何取得您的 Client ID：',
    gdriveGuideStep1: '1. 前往 <a href="https://console.cloud.google.com/" target="_blank" rel="noopener" class="text-indigo-500 underline font-medium">Google Cloud Console</a> 建立或選擇專案。',
    gdriveGuideStep2: '2. 啟用 Google Drive API，並於「API 與服務 > 憑證」建立「OAuth 2.0 用戶端 ID（網頁應用程式）」。',
    gdriveGuideStep3: '3. 於「已授權的 JavaScript 來源」填入 <code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">https://janetkuo.github.io</code> 與 <code class="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded font-mono">http://localhost:8080</code>。',
    gdriveStatusDisconnected: '未連接',
    gdriveStatusConnected: '已連接',
    gdriveStatusNeedConfig: '尚未設定 Client ID',
    gdriveDisconnectBtn: '中斷連結',
    gdriveDisconnectConfirm: '確定要中斷與 Google 雲端硬碟的連結嗎？',
    gdriveLastBackup: (time) => `最後備份：${time}`,
    gdriveNoBackup: '尚無雲端備份',
    gdriveMissingClientId: '請先於下方輸入並儲存您的 Google OAuth Client ID。',
    gdriveSavedClientId: '✅ Client ID 儲存成功！',
    gdriveLibraryLoading: 'Google 認證服務載入中，請稍候重試。',
    gdriveBackingUp: '備份上傳中...',
    gdriveRestoring: '下載還原中...',
    gdriveBackupSuccess: '🎉 成功備份至 Google 雲端硬碟！',
    gdriveBackupError: (err) => `備份至 Google 雲端硬碟失敗：${err}`,
    gdriveRestoreNotFound: '在您的 Google 雲端硬碟中找不到 PocketFlow 備份檔案。',
    gdriveRestoreConfirm: (date, count) => `找到雲端備份檔（日期：${date}，包含 ${count} 筆交易紀錄）。\n確定要還原並覆蓋目前紀錄嗎？`,
    gdriveRestoreSuccess: '🎉 已成功自 Google 雲端硬碟還原資料！',
    gdriveRestoreError: (err) => `自 Google 雲端硬碟還原失敗：${err}`,

    backupTitle: '資料備份與轉移',
    backupDesc: '可下載備份檔保存至雲端硬碟，或在電腦與手機換機時無痛匯入還原：',
    exportJsonBtn: '匯出 JSON 備份',
    exportCsvBtn: '匯出 CSV 試算表',
    importJsonBtn: '選擇檔案匯入還原 (JSON)',

    clearDataTitle: '清空所有紀錄（開始自己的帳本）',
    clearDataDesc: '點擊此處可一鍵清空所有交易紀錄與固定週期收支設定，還原成乾淨的空白帳本。',
    clearDataBtn: '一鍵清空所有紀錄',
    clearConfirm: '確定要清空所有交易紀錄與固定週期收支設定嗎？清空後你將擁有一本完全乾淨的私密帳本！',

    reloadDemoBtn: '重新載入預設範例資料',
    importConfirm: (count) => `成功讀取備份檔！包含 ${count} 筆交易紀錄。\n確定要匯入並覆蓋目前紀錄嗎？`,
    importSuccess: '🎉 備份還原成功！',
    importInvalid: '檔案格式不正確，找不到交易紀錄。',
    importError: '解析檔案失敗，請確認是有效的 JSON 備份檔。',

    pwaUpdateText: '發現新版本！點擊立即載入最新功能',
    pwaUpdateBtn: '立即更新',

    paletteSettingsTitle: '外觀風格與莫蘭迪色盤',
    paletteSettingsDesc: '挑選您喜愛的莫蘭迪色系，即時換膚且自動保存：',
    paletteToggleTitle: '切換風格色盤',
    paletteQuickLabel: '色盤',
    paletteActiveBadge: '使用中',

    months: [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ],
    shortMonths: [
      '1月', '2月', '3月', '4月', '5月', '6月',
      '7月', '8月', '9月', '10月', '11月', '12月'
    ],
    langSwitchLabel: 'English'
  }
};

// Curated Morandi Color Palettes
const MORANDI_PALETTES = {
  sage: {
    id: 'sage',
    name: { en: 'Sage & Terracotta', 'zh-TW': '鼠尾草與陶土' },
    desc: { en: 'Classic Morandi herb, calming & natural', 'zh-TW': '經典草木靜物，自然療癒耐看' },
    badge: { en: 'Classic ⭐', 'zh-TW': '經典 ⭐' },
    primary: '#638881',
    primaryDark: '#50716A',
    primaryRgb: '99 136 129',
    primaryDarkRgb: '80 113 106',
    income: '#5E8C78',
    incomeRgb: '94 140 120',
    expense: '#B86968',
    expenseRgb: '184 105 104',
    bgLight: '#F5F3EF',
    bgDark: '#1C2323',
    cardDark: '#242D2D',
    borderDark: '#333E3E',
    categories: {
      food: { color: '#CB8364', bg: 'rgba(203, 131, 100, 0.15)' },
      drinks: { color: '#8C6C58', bg: 'rgba(140, 108, 88, 0.15)' },
      groceries: { color: '#709775', bg: 'rgba(112, 151, 117, 0.15)' },
      transport: { color: '#6A839A', bg: 'rgba(106, 131, 154, 0.15)' },
      housing: { color: '#5A8485', bg: 'rgba(90, 132, 133, 0.15)' },
      household: { color: '#7A938C', bg: 'rgba(122, 147, 140, 0.15)' },
      apparel: { color: '#B47B82', bg: 'rgba(180, 123, 130, 0.15)' },
      entertainment: { color: '#837B97', bg: 'rgba(131, 123, 151, 0.15)' },
      travel: { color: '#538B9E', bg: 'rgba(83, 139, 158, 0.15)' },
      education: { color: '#BF9F5F', bg: 'rgba(191, 159, 95, 0.15)' },
      health: { color: '#AB5F5F', bg: 'rgba(171, 95, 95, 0.15)' },
      taxes: { color: '#8E8279', bg: 'rgba(142, 130, 121, 0.15)' },
      shopping: { color: '#9E778E', bg: 'rgba(158, 119, 142, 0.15)' },
      other_exp: { color: '#788282', bg: 'rgba(120, 130, 130, 0.15)' },
      salary: { color: '#5E8C78', bg: 'rgba(94, 140, 120, 0.15)' },
      interest: { color: '#5F828F', bg: 'rgba(95, 130, 143, 0.15)' },
      invest: { color: '#638881', bg: 'rgba(99, 136, 129, 0.15)' },
      bonus: { color: '#6A9484', bg: 'rgba(106, 148, 132, 0.15)' },
      parttime: { color: '#B08852', bg: 'rgba(176, 136, 82, 0.15)' },
      other_inc: { color: '#837B97', bg: 'rgba(131, 123, 151, 0.15)' }
    }
  },
  slate: {
    id: 'slate',
    name: { en: 'Nordic Slate & Clay', 'zh-TW': '北歐煙燻岩藍' },
    desc: { en: 'Modern concrete & cool bay, rational & sleek', 'zh-TW': '現代極簡清水模，理性冷靜' },
    badge: { en: 'Nordic', 'zh-TW': '冷淡風' },
    primary: '#5B7C99',
    primaryDark: '#496782',
    primaryRgb: '91 124 153',
    primaryDarkRgb: '73 103 130',
    income: '#568266',
    incomeRgb: '86 130 102',
    expense: '#B56767',
    expenseRgb: '181 103 103',
    bgLight: '#F1F3F6',
    bgDark: '#181F28',
    cardDark: '#222A36',
    borderDark: '#313C4D',
    categories: {
      food: { color: '#C27D66', bg: 'rgba(194, 125, 102, 0.15)' },
      drinks: { color: '#887063', bg: 'rgba(136, 112, 99, 0.15)' },
      groceries: { color: '#6B9178', bg: 'rgba(107, 145, 120, 0.15)' },
      transport: { color: '#5B7A99', bg: 'rgba(91, 122, 153, 0.15)' },
      housing: { color: '#568087', bg: 'rgba(86, 128, 135, 0.15)' },
      household: { color: '#6E8C94', bg: 'rgba(110, 140, 148, 0.15)' },
      apparel: { color: '#A87085', bg: 'rgba(168, 112, 133, 0.15)' },
      entertainment: { color: '#777594', bg: 'rgba(119, 117, 148, 0.15)' },
      travel: { color: '#4D7D9A', bg: 'rgba(77, 125, 154, 0.15)' },
      education: { color: '#B59C63', bg: 'rgba(181, 156, 99, 0.15)' },
      health: { color: '#A85E60', bg: 'rgba(168, 94, 96, 0.15)' },
      taxes: { color: '#7C7877', bg: 'rgba(124, 120, 119, 0.15)' },
      shopping: { color: '#9A758B', bg: 'rgba(154, 117, 139, 0.15)' },
      other_exp: { color: '#737C87', bg: 'rgba(115, 124, 135, 0.15)' },
      salary: { color: '#568266', bg: 'rgba(86, 130, 102, 0.15)' },
      interest: { color: '#5B7C99', bg: 'rgba(91, 124, 153, 0.15)' },
      invest: { color: '#5B7A99', bg: 'rgba(91, 122, 153, 0.15)' },
      bonus: { color: '#5E8C77', bg: 'rgba(94, 140, 119, 0.15)' },
      parttime: { color: '#A87D56', bg: 'rgba(168, 125, 86, 0.15)' },
      other_inc: { color: '#777594', bg: 'rgba(119, 117, 148, 0.15)' }
    }
  },
  taupe: {
    id: 'taupe',
    name: { en: 'Linen Taupe & Greige', 'zh-TW': '亞麻灰褐燕麥' },
    desc: { en: 'Pure neutral greige, warm cashmere paper texture', 'zh-TW': '去黃純粹冷灰褐，手帳羊絨紙感' },
    badge: { en: 'Neutral', 'zh-TW': '去黃純粹' },
    primary: '#807265',
    primaryDark: '#6A5E52',
    primaryRgb: '128 114 101',
    primaryDarkRgb: '106 94 82',
    income: '#62876F',
    incomeRgb: '98 135 111',
    expense: '#A85F64',
    expenseRgb: '168 95 100',
    bgLight: '#F5F3EF',
    bgDark: '#1E1C1A',
    cardDark: '#272421',
    borderDark: '#38332E',
    categories: {
      food: { color: '#B5745E', bg: 'rgba(181, 116, 94, 0.15)' },
      drinks: { color: '#826556', bg: 'rgba(130, 101, 86, 0.15)' },
      groceries: { color: '#72896D', bg: 'rgba(114, 137, 109, 0.15)' },
      transport: { color: '#6A7885', bg: 'rgba(106, 120, 133, 0.15)' },
      housing: { color: '#627D7C', bg: 'rgba(98, 125, 124, 0.15)' },
      household: { color: '#778A86', bg: 'rgba(119, 138, 134, 0.15)' },
      apparel: { color: '#A86D74', bg: 'rgba(168, 109, 116, 0.15)' },
      entertainment: { color: '#7E6F85', bg: 'rgba(126, 111, 133, 0.15)' },
      travel: { color: '#597C8A', bg: 'rgba(89, 124, 138, 0.15)' },
      education: { color: '#AD9261', bg: 'rgba(173, 146, 97, 0.15)' },
      health: { color: '#A35A62', bg: 'rgba(163, 90, 98, 0.15)' },
      taxes: { color: '#877C72', bg: 'rgba(135, 124, 114, 0.15)' },
      shopping: { color: '#9E6F7C', bg: 'rgba(158, 111, 124, 0.15)' },
      other_exp: { color: '#756D67', bg: 'rgba(117, 109, 103, 0.15)' },
      salary: { color: '#62876F', bg: 'rgba(98, 135, 111, 0.15)' },
      interest: { color: '#5E7A85', bg: 'rgba(94, 122, 133, 0.15)' },
      invest: { color: '#807265', bg: 'rgba(128, 114, 101, 0.15)' },
      bonus: { color: '#6F8C78', bg: 'rgba(111, 140, 120, 0.15)' },
      parttime: { color: '#A67954', bg: 'rgba(166, 121, 84, 0.15)' },
      other_inc: { color: '#7E6F85', bg: 'rgba(126, 111, 133, 0.15)' }
    }
  },
  periwinkle: {
    id: 'periwinkle',
    name: { en: 'Muted Periwinkle', 'zh-TW': '微調灰霧靛青' },
    desc: { en: 'Soft lavender-blue, desaturated tech indigo', 'zh-TW': '保留原版識別，低飽和灰紫藍' },
    badge: { en: 'Original', 'zh-TW': '原版灰調' },
    primary: '#7785AF',
    primaryDark: '#606E96',
    primaryRgb: '119 133 175',
    primaryDarkRgb: '96 110 150',
    income: '#598E7B',
    incomeRgb: '89 142 123',
    expense: '#BE6C7A',
    expenseRgb: '190 108 122',
    bgLight: '#F2F4F8',
    bgDark: '#171A24',
    cardDark: '#202534',
    borderDark: '#2E354A',
    categories: {
      food: { color: '#C77D6A', bg: 'rgba(199, 125, 106, 0.15)' },
      drinks: { color: '#8D7068', bg: 'rgba(141, 112, 104, 0.15)' },
      groceries: { color: '#6E967D', bg: 'rgba(110, 150, 125, 0.15)' },
      transport: { color: '#6281A6', bg: 'rgba(98, 129, 166, 0.15)' },
      housing: { color: '#56848E', bg: 'rgba(86, 132, 142, 0.15)' },
      household: { color: '#6E8CA0', bg: 'rgba(110, 140, 160, 0.15)' },
      apparel: { color: '#AC6D8A', bg: 'rgba(172, 109, 138, 0.15)' },
      entertainment: { color: '#7E769E', bg: 'rgba(126, 118, 158, 0.15)' },
      travel: { color: '#5184B0', bg: 'rgba(81, 132, 176, 0.15)' },
      education: { color: '#B89B66', bg: 'rgba(184, 155, 102, 0.15)' },
      health: { color: '#AC6369', bg: 'rgba(172, 99, 105, 0.15)' },
      taxes: { color: '#7C7B8A', bg: 'rgba(124, 123, 138, 0.15)' },
      shopping: { color: '#A36E8F', bg: 'rgba(163, 110, 143, 0.15)' },
      other_exp: { color: '#777E90', bg: 'rgba(119, 126, 144, 0.15)' },
      salary: { color: '#598E7B', bg: 'rgba(89, 142, 123, 0.15)' },
      interest: { color: '#5A7F9D', bg: 'rgba(90, 127, 157, 0.15)' },
      invest: { color: '#7785AF', bg: 'rgba(119, 133, 175, 0.15)' },
      bonus: { color: '#649685', bg: 'rgba(100, 150, 133, 0.15)' },
      parttime: { color: '#B0835D', bg: 'rgba(176, 131, 93, 0.15)' },
      other_inc: { color: '#7E769E', bg: 'rgba(126, 118, 158, 0.15)' }
    }
  },
  rose: {
    id: 'rose',
    name: { en: 'Dusty Rose & Mauve', 'zh-TW': '煙燻暮粉' },
    desc: { en: 'French dried rose, soft, soothing & romantic', 'zh-TW': '乾燥玫瑰柔粉，法式優雅浪漫' },
    badge: { en: 'Pink 🌸', 'zh-TW': '偏粉色 🌸' },
    primary: '#B57786',
    primaryDark: '#9C616F',
    primaryRgb: '181 119 134',
    primaryDarkRgb: '156 97 111',
    income: '#5E8E7C',
    incomeRgb: '94 142 124',
    expense: '#BA5C6E',
    expenseRgb: '186 92 110',
    bgLight: '#F8F4F4',
    bgDark: '#221B1D',
    cardDark: '#2C2326',
    borderDark: '#3D3135',
    categories: {
      food: { color: '#C97D66', bg: 'rgba(201, 125, 102, 0.15)' },
      drinks: { color: '#8A6B5C', bg: 'rgba(138, 107, 92, 0.15)' },
      groceries: { color: '#729377', bg: 'rgba(114, 147, 119, 0.15)' },
      transport: { color: '#717E96', bg: 'rgba(113, 126, 150, 0.15)' },
      housing: { color: '#5E8284', bg: 'rgba(94, 130, 132, 0.15)' },
      household: { color: '#7E8F8B', bg: 'rgba(126, 143, 139, 0.15)' },
      apparel: { color: '#BD6D83', bg: 'rgba(189, 109, 131, 0.15)' },
      entertainment: { color: '#8E7591', bg: 'rgba(142, 117, 145, 0.15)' },
      travel: { color: '#5A83A2', bg: 'rgba(90, 131, 162, 0.15)' },
      education: { color: '#B89C67', bg: 'rgba(184, 156, 103, 0.15)' },
      health: { color: '#AB5C64', bg: 'rgba(171, 92, 100, 0.15)' },
      taxes: { color: '#8A787E', bg: 'rgba(138, 120, 126, 0.15)' },
      shopping: { color: '#B56F84', bg: 'rgba(181, 111, 132, 0.15)' },
      other_exp: { color: '#80777B', bg: 'rgba(128, 119, 123, 0.15)' },
      salary: { color: '#5E8E7C', bg: 'rgba(94, 142, 124, 0.15)' },
      interest: { color: '#607D8F', bg: 'rgba(96, 125, 143, 0.15)' },
      invest: { color: '#B57786', bg: 'rgba(181, 119, 134, 0.15)' },
      bonus: { color: '#6A9684', bg: 'rgba(106, 150, 132, 0.15)' },
      parttime: { color: '#B07F60', bg: 'rgba(176, 127, 96, 0.15)' },
      other_inc: { color: '#8E7591', bg: 'rgba(142, 117, 145, 0.15)' }
    }
  },
  ginkgo: {
    id: 'ginkgo',
    name: { en: 'Ginkgo Gold & Amber', 'zh-TW': '明亮銀杏金黃' },
    desc: { en: 'Radiant autumn ginkgo gold, sunny & vibrant', 'zh-TW': '璀璨銀杏金黃，鮮明暖陽活力' },
    badge: { en: 'Yellow ☀️', 'zh-TW': '偏亮黃 ☀️' },
    primary: '#C98F28',
    primaryDark: '#A8741B',
    primaryRgb: '201 143 40',
    primaryDarkRgb: '168 116 27',
    income: '#4F8A67',
    incomeRgb: '79 138 103',
    expense: '#BE5448',
    expenseRgb: '190 84 72',
    bgLight: '#FAF7EE',
    bgDark: '#1F1C12',
    cardDark: '#2A2518',
    borderDark: '#3B3421',
    categories: {
      food: { color: '#D47E35', bg: 'rgba(212, 126, 53, 0.15)' },
      drinks: { color: '#996F40', bg: 'rgba(153, 111, 64, 0.15)' },
      groceries: { color: '#6E9954', bg: 'rgba(110, 153, 84, 0.15)' },
      transport: { color: '#547E95', bg: 'rgba(84, 126, 149, 0.15)' },
      housing: { color: '#58807C', bg: 'rgba(88, 128, 124, 0.15)' },
      household: { color: '#6D8C83', bg: 'rgba(109, 140, 131, 0.15)' },
      apparel: { color: '#B8686D', bg: 'rgba(184, 104, 109, 0.15)' },
      entertainment: { color: '#816F8C', bg: 'rgba(129, 111, 140, 0.15)' },
      travel: { color: '#4688A6', bg: 'rgba(70, 136, 166, 0.15)' },
      education: { color: '#C98F28', bg: 'rgba(201, 143, 40, 0.15)' },
      health: { color: '#B35750', bg: 'rgba(179, 87, 80, 0.15)' },
      taxes: { color: '#8A7963', bg: 'rgba(138, 121, 99, 0.15)' },
      shopping: { color: '#A86C78', bg: 'rgba(168, 108, 120, 0.15)' },
      other_exp: { color: '#7D7668', bg: 'rgba(125, 118, 104, 0.15)' },
      salary: { color: '#4F8A67', bg: 'rgba(79, 138, 103, 0.15)' },
      interest: { color: '#507D8C', bg: 'rgba(80, 125, 140, 0.15)' },
      invest: { color: '#C98F28', bg: 'rgba(201, 143, 40, 0.15)' },
      bonus: { color: '#5E9473', bg: 'rgba(94, 148, 115, 0.15)' },
      parttime: { color: '#B8783B', bg: 'rgba(184, 120, 59, 0.15)' },
      other_inc: { color: '#816F8C', bg: 'rgba(129, 111, 140, 0.15)' }
    }
  }
};

// Category Definitions with distinct color palette & icons (defaults to Sage)
const CATEGORIES = {
  expense: [
    { id: 'food', name: { en: 'Food & Dining', 'zh-TW': '餐飲正餐' }, icon: '🍽️', color: '#CB8364', bg: 'rgba(203, 131, 100, 0.15)' },
    { id: 'drinks', name: { en: 'Drinks & Desserts', 'zh-TW': '飲品點心' }, icon: '☕', color: '#8C6C58', bg: 'rgba(140, 108, 88, 0.15)' },
    { id: 'groceries', name: { en: 'Groceries', 'zh-TW': '食材生鮮' }, icon: '🛒', color: '#709775', bg: 'rgba(112, 151, 117, 0.15)' },
    { id: 'transport', name: { en: 'Transportation', 'zh-TW': '通勤交通' }, icon: '🚇', color: '#6A839A', bg: 'rgba(106, 131, 154, 0.15)' },
    { id: 'housing', name: { en: 'Housing & Utilities', 'zh-TW': '居住水電' }, icon: '🏠', color: '#5A8485', bg: 'rgba(90, 132, 133, 0.15)' },
    { id: 'household', name: { en: 'Household Essentials', 'zh-TW': '生活日用' }, icon: '🧻', color: '#7A938C', bg: 'rgba(122, 147, 140, 0.15)' },
    { id: 'apparel', name: { en: 'Apparel & Beauty', 'zh-TW': '服飾美妝' }, icon: '👗', color: '#B47B82', bg: 'rgba(180, 123, 130, 0.15)' },
    { id: 'entertainment', name: { en: 'Entertainment', 'zh-TW': '休閒娛樂' }, icon: '🎮', color: '#837B97', bg: 'rgba(131, 123, 151, 0.15)' },
    { id: 'travel', name: { en: 'Travel & Vacation', 'zh-TW': '旅遊度假' }, icon: '✈️', color: '#538B9E', bg: 'rgba(83, 139, 158, 0.15)' },
    { id: 'education', name: { en: 'Education & Growth', 'zh-TW': '學習進修' }, icon: '📚', color: '#BF9F5F', bg: 'rgba(191, 159, 95, 0.15)' },
    { id: 'health', name: { en: 'Health & Medical', 'zh-TW': '醫療保健' }, icon: '💊', color: '#AB5F5F', bg: 'rgba(171, 95, 95, 0.15)' },
    { id: 'taxes', name: { en: 'Taxes & Fees', 'zh-TW': '稅費規費' }, icon: '🧾', color: '#8E8279', bg: 'rgba(142, 130, 121, 0.15)' },
    { id: 'shopping', name: { en: 'Gadgets & Shopping', 'zh-TW': '3C 購物' }, icon: '🛍️', color: '#9E778E', bg: 'rgba(158, 119, 142, 0.15)' },
    { id: 'other_exp', name: { en: 'Other Expense', 'zh-TW': '其他支出' }, icon: '✨', color: '#788282', bg: 'rgba(120, 130, 130, 0.15)' }
  ],
  income: [
    { id: 'salary', name: { en: 'Salary & Wages', 'zh-TW': '薪資收入' }, icon: '💰', color: '#5E8C78', bg: 'rgba(94, 140, 120, 0.15)' },
    { id: 'interest', name: { en: 'Interest Income', 'zh-TW': '利息收入' }, icon: '🏦', color: '#5F828F', bg: 'rgba(95, 130, 143, 0.15)' },
    { id: 'invest', name: { en: 'Investments', 'zh-TW': '投資回報' }, icon: '📈', color: '#5B7C75', bg: 'rgba(91, 124, 117, 0.15)' },
    { id: 'bonus', name: { en: 'Bonus & Incentives', 'zh-TW': '獎金分紅' }, icon: '🎉', color: '#6A9484', bg: 'rgba(106, 148, 132, 0.15)' },
    { id: 'parttime', name: { en: 'Freelance & Side-gig', 'zh-TW': '副業接案' }, icon: '💻', color: '#B08852', bg: 'rgba(176, 136, 82, 0.15)' },
    { id: 'other_inc', name: { en: 'Other Income', 'zh-TW': '其他收入' }, icon: '🧧', color: '#837B97', bg: 'rgba(131, 123, 151, 0.15)' }
  ]
};

// Autocomplete Presets per Language
const AUTOCOMPLETE_PRESETS = {
  en: [
    { title: 'Large Iced Latte', category: 'drinks', type: 'expense', amount: 5.5, currency: 'USD' },
    { title: 'Artisan Sourdough Bread', category: 'drinks', type: 'expense', amount: 6.5, currency: 'USD' },
    { title: 'Whole Foods Grocery', category: 'groceries', type: 'expense', amount: 68.5, currency: 'USD' },
    { title: 'Paper Towels & Detergent', category: 'household', type: 'expense', amount: 24.5, currency: 'USD' },
    { title: 'Flight Tickets to Tokyo', category: 'travel', type: 'expense', amount: 480, currency: 'USD' },
    { title: 'Uniqlo Winter Jacket', category: 'apparel', type: 'expense', amount: 79.9, currency: 'USD' },
    { title: 'Metro Transit Pass', category: 'transport', type: 'expense', amount: 35, currency: 'USD' },
    { title: 'Uber Ride', category: 'transport', type: 'expense', amount: 24, currency: 'USD' },
    { title: 'DoorDash Lunch Delivery', category: 'food', type: 'expense', amount: 22.5, currency: 'USD' },
    { title: 'Steam Game Sale', category: 'entertainment', type: 'expense', amount: 39.99, currency: 'USD' },
    { title: 'Annual Property / Income Tax', category: 'taxes', type: 'expense', amount: 350, currency: 'USD' },
    { title: 'High-Yield Savings Interest', category: 'interest', type: 'income', amount: 48.5, currency: 'USD' },
    { title: 'Stock Dividend', category: 'invest', type: 'income', amount: 350, currency: 'USD' },
    { title: 'Project Performance Bonus', category: 'bonus', type: 'income', amount: 1500, currency: 'USD' }
  ],
  'zh-TW': [
    { title: '中杯燕麥熱拿鐵', category: 'drinks', type: 'expense', amount: 85, currency: 'TWD' },
    { title: '法式可頌麵包', category: 'drinks', type: 'expense', amount: 65, currency: 'TWD' },
    { title: '全聯生鮮買菜', category: 'groceries', type: 'expense', amount: 560, currency: 'TWD' },
    { title: '好市多衛生紙與洗衣精', category: 'household', type: 'expense', amount: 890, currency: 'TWD' },
    { title: '日本東京機票訂位', category: 'travel', type: 'expense', amount: 13500, currency: 'TWD' },
    { title: 'Uniqlo 保暖發熱衣', category: 'apparel', type: 'expense', amount: 990, currency: 'TWD' },
    { title: '中油加油', category: 'transport', type: 'expense', amount: 150, currency: 'TWD' },
    { title: '地鐵通勤週票', category: 'transport', type: 'expense', amount: 350, currency: 'TWD' },
    { title: 'Uber 乘車', category: 'transport', type: 'expense', amount: 240, currency: 'TWD' },
    { title: '週末朋友聚餐', category: 'food', type: 'expense', amount: 580, currency: 'TWD' },
    { title: '外送午餐便當', category: 'food', type: 'expense', amount: 180, currency: 'TWD' },
    { title: 'Steam 遊戲特價', category: 'entertainment', type: 'expense', amount: 590, currency: 'TWD' },
    { title: '年度綜合所得稅/房屋稅', category: 'taxes', type: 'expense', amount: 4500, currency: 'TWD' },
    { title: '銀行活存/定存利息', category: 'interest', type: 'income', amount: 35, currency: 'TWD' },
    { title: '股票股利入帳', category: 'invest', type: 'income', amount: 3500, currency: 'TWD' },
    { title: '專案獎金', category: 'bonus', type: 'income', amount: 10000, currency: 'TWD' }
  ]
};

// Initial Sample Data (default English with Traditional Chinese localization)
const DEMO_TRANSACTIONS = [
  { id: 'tx_1', title: 'Shopping & Essentials', title_tw: '商場生活用品購物', amount: 68.5, type: 'expense', category: 'shopping', date: '2026-10-17', currency: 'USD' },
  { id: 'tx_2', title: 'Oat Milk Latte', title_tw: '中杯燕麥熱拿鐵', amount: 5.75, type: 'expense', category: 'drinks', date: '2026-10-17', currency: 'USD' },
  { id: 'tx_3', title: 'Weekly Metro Pass', title_tw: '地鐵通勤週票', amount: 35, type: 'expense', category: 'transport', date: '2026-10-16', currency: 'USD' },
  { id: 'tx_4', title: 'Weekend Dinner with Friends', title_tw: '週末朋友聚餐', amount: 92, type: 'expense', category: 'food', date: '2026-10-15', currency: 'USD' },
  { id: 'tx_5', title: 'Gaming & Entertainment Subscription', title_tw: '遊戲娛樂月費訂閱', amount: 15.99, type: 'expense', category: 'entertainment', date: '2026-10-15', recurringId: 'rec_netflix', currency: 'USD' },
  { id: 'tx_9', title: 'High-Yield Savings Interest', title_tw: '高利活存利息入帳', amount: 48.5, type: 'income', category: 'interest', date: '2026-10-12', currency: 'USD' },
  { id: 'tx_6', title: 'Monthly Salary Deposit', title_tw: '10月份薪資入帳', amount: 5200, type: 'income', category: 'salary', date: '2026-10-05', recurringId: 'rec_salary', currency: 'USD' },
  { id: 'tx_7', title: 'Apartment Rent & Utilities', title_tw: '公寓房租與水電', amount: 1650, type: 'expense', category: 'housing', date: '2026-10-10', recurringId: 'rec_rent', currency: 'USD' },
  { id: 'tx_8', title: 'Web Design Project Payment', title_tw: '網站設計接案款', amount: 850, type: 'income', category: 'parttime', date: '2026-10-08', currency: 'USD' }
];

const DEMO_RECURRING = [
  { id: 'rec_salary', title: 'Monthly Salary Deposit', title_tw: '每月薪資發放', amount: 5200, type: 'income', category: 'salary', freq: 'monthly', day: 5, currency: 'USD' },
  { id: 'rec_rent', title: 'Apartment Rent & Utilities', title_tw: '公寓房租與水電', amount: 1650, type: 'expense', category: 'housing', freq: 'monthly', day: 10, currency: 'USD' },
  { id: 'rec_netflix', title: 'Gaming & Entertainment Subscription', title_tw: '遊戲娛樂月費訂閱', amount: 15.99, type: 'expense', category: 'entertainment', freq: 'monthly', day: 15, currency: 'USD' },
  { id: 'rec_gym', title: 'Health Supplement Plan', title_tw: '常備保健品定期方案', amount: 45, type: 'expense', category: 'health', freq: 'monthly', day: 25, currency: 'USD' }
];

const isDemoMode = localStorage.getItem('pocketflow_is_demo') !== 'false';

function loadInitialData(key, fallback) {
  const item = localStorage.getItem(key);
  if (item !== null) {
    try {
      const parsed = JSON.parse(item);
      if (Array.isArray(parsed)) return parsed;
    } catch (e) {
      console.warn('Failed to parse storage item:', key, e);
    }
  }
  return isDemoMode ? fallback : [];
}

// App State
let state = {
  lang: localStorage.getItem(LANG_KEY) || 'en', // Default to English as requested
  palette: localStorage.getItem(PALETTE_KEY) || 'sage', // Default to classic Morandi Sage
  transactions: loadInitialData(STORAGE_KEY, DEMO_TRANSACTIONS),
  recurring: loadInitialData(RECURRING_KEY, DEMO_RECURRING),
  currency: localStorage.getItem(CURRENCY_KEY) || 'USD',
  isDemo: isDemoMode,
  currentDate: new Date(2026, 9, 1), // Oct 2026
  currentFilter: 'all',
  searchQuery: '',
  modalType: 'expense',
  selectedCategory: 'food',
  chartType: 'expense',
  modalIsRecurring: false,
  isKeypadVisible: true
};

let modalRecDayTouched = false;

// Normalize demo items if user has demo state
function normalizeDemoItems() {
  if (state.isDemo) {
    state.transactions = state.transactions.map(tx => {
      const demo = DEMO_TRANSACTIONS.find(d => d.id === tx.id);
      if (demo) {
        return { ...tx, title: demo.title, title_tw: demo.title_tw, category: demo.category, currency: tx.currency || demo.currency };
      }
      return tx;
    });
    state.recurring = state.recurring.map(rec => {
      const demo = DEMO_RECURRING.find(d => d.id === rec.id);
      if (demo) {
        return { ...rec, title: demo.title, title_tw: demo.title_tw, category: demo.category, currency: rec.currency || demo.currency };
      }
      return rec;
    });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
    localStorage.setItem(RECURRING_KEY, JSON.stringify(state.recurring));
  }
}

// Helpers for Title & Category Localized Strings
function getItemTitle(item) {
  if (!item) return '';
  if (state.lang === 'zh-TW') {
    return item.title_tw || item.title || '';
  }
  return item.title || item.title_tw || '';
}

function getCategoryName(cat) {
  if (!cat) return '';
  if (typeof cat.name === 'object') {
    return cat.name[state.lang] || cat.name.en || cat.name['zh-TW'];
  }
  return cat.name;
}

// Smart item icon resolver to pair accurate icons with item descriptions
function resolveItemIcon(category, title, fallbackIcon = '✨') {
  if (!title) return fallbackIcon;
  const t = title.toLowerCase();

  // Beverages & Drinks (differentiates coffee, tea, juices, drinks from meals)
  if (/latte|coffee|cafe|espresso|cappuccino|mocha|americano|tea|boba|milk tea|beverage|drink|smoothie|juice|starbucks|拿鐵|咖啡|美式|摩卡|卡布|手搖|珍奶|奶茶|鮮奶|茶|綠茶|紅茶|烏龍|燕麥奶|果汁|飲料|汽水|可樂|星巴克/.test(t)) {
    return '☕';
  }
  if (/beer|wine|cocktail|bar|pub|whiskey|sake|酒|啤酒|調酒|居酒屋|微醺/.test(t)) {
    return '🍺';
  }
  // Bakery, Desserts & Afternoon Tea
  if (/bread|bakery|cake|dessert|pastry|croissant|donut|toast|cookie|waffle|麵包|烘焙|蛋糕|甜點|點心|泡芙|甜甜圈|吐司|鬆餅|餅乾|下午茶/.test(t)) {
    return '🥐';
  }

  // Travel & Vacation (hotels, flights, tour tickets)
  if (category === 'travel' || /travel|trip|hotel|hostel|resort|airbnb|tour|vacation|sightseeing|luggage|passport|旅遊|旅行|飯店|旅館|民宿|住宿|景點|行程|渡假|度假|出國|一日遊/.test(t)) {
    if (/hotel|hostel|resort|airbnb|飯店|旅館|住宿|民宿|訂房/.test(t)) return '🏨';
    if (/flight|airline|plane|airport|機票|航空|飛機/.test(t)) return '✈️';
    if (/ticket|pass|tour|門票|景點|行程|票券/.test(t)) return '🎫';
    return '✈️';
  }

  // Taxes & Government Fees
  if (category === 'taxes' || /tax|duty|fee|fine|license|levy|所得稅|綜所稅|房屋稅|地價稅|牌照稅|燃料費|稅|規費|罰單|印花稅/.test(t)) {
    return '🧾';
  }

  // Household & Daily Essentials
  if (category === 'household' || (!['shopping', 'travel'].includes(category) && /tissue|shampoo|soap|detergent|towel|clean|toilet|toothpaste|衛生紙|洗髮|沐浴|洗衣精|洗碗精|清潔劑|牙膏|毛巾|垃圾袋|掃具|日用品/.test(t))) {
    return '🧻';
  }

  // Apparel & Beauty / Personal Care
  if (category === 'apparel' || (!['shopping', 'travel'].includes(category) && /clothes|clothing|shirt|pants|dress|shoes|jacket|uniqlo|zara|cosmetic|skincare|makeup|haircut|salon|beauty|衣服|服飾|褲|洋裝|外套|鞋|保養品|化妝|彩妝|防曬|面霜|口紅|剪髮|理髮|美甲|染髮/.test(t))) {
    if (/cosmetic|skincare|makeup|beauty|保養|化妝|彩妝|口紅|乳液|精華|防曬/.test(t)) return '💄';
    if (/haircut|salon|barber|剪髮|理髮|美髮|美甲|燙髮|染髮/.test(t)) return '✂️';
    return '👗';
  }

  // Groceries & Fresh Cooking Ingredients
  if (category === 'groceries' || (!['shopping', 'apparel', 'household', 'travel'].includes(category) && /grocery|market|supermarket|vegetable|fruit|meat|seafood|cooking|食材|買菜|生鮮|蔬菜|水果|全聯|家樂福|好市多|costco|px mart|大潤發|愛買|菜市場|傳統市場|肉品|海鮮/.test(t))) {
    return '🛒';
  }

  // Food & Meals
  if (category === 'food' || (!['travel', 'groceries', 'household', 'apparel', 'taxes', 'shopping', 'housing'].includes(category) && !/飯店|旅館|民宿|住宿/.test(t) && /food|meal|dinner|lunch|breakfast|brunch|burger|sandwich|pizza|sushi|ramen|noodle|pasta|steak|rice|bento|salad|snack|restaurant|餐|飯|麵|午餐|晚餐|早餐|早午餐|聚餐|便當|火鍋|壽司|拉麵|牛排|披薩|漢堡|炸雞|水餃|夜市|小吃/.test(t))) {
    if (/burger|hamburger|漢堡|麥當勞|肯德基|fast food/.test(t)) return '🍔';
    if (/noodle|ramen|pasta|spaghetti|麵|拉麵|義大利麵|牛肉麵/.test(t)) return '🍜';
    if (/pizza|披薩|比薩/.test(t)) return '🍕';
    if (/sushi|japanese|壽司|生魚片|日料/.test(t)) return '🍣';
    if (/bento|便當/.test(t)) return '🍱';
    return '🍽️';
  }

  // Transportation (public transit vs driving vs taxi vs bike vs car maintenance)
  if (category === 'transport' || /metro|subway|transit|bus|train|mrt|uber|taxi|gas|fuel|flight|air|parking|traffic|交通|通勤|車/.test(t)) {
    if (/metro|subway|mrt|train|rail|pass|ticket|transit|地鐵|捷運|高鐵|火車|台鐵|電車|週票|月票|票|悠遊卡|一卡通/.test(t)) return '🚇';
    if (/bus|coach|公車|客運|巴士/.test(t)) return '🚌';
    if (/uber|taxi|cab|lyft|計程車|小黃|乘車|叫車/.test(t)) return '🚕';
    if (/bike|bicycle|youbike|ubike|單車|腳踏車|自行車/.test(t)) return '🚲';
    if (/gas|fuel|petrol|oil|加油|中油|台塑/.test(t)) return '⛽';
    if (/parking|parking fee|停車|車位/.test(t)) return '🅿️';
    if (/maintenance|repair|tire|service|保養|修車|車輛保養|驗車/.test(t)) return '🔧';
    if (/flight|plane|airline|airport|機票|航空|飛機/.test(t)) return '✈️';
    return '🚗';
  }

  // Entertainment
  if (category === 'entertainment' || /game|stream|movie|cinema|netflix|spotify|youtube|娛樂|休閒/.test(t)) {
    if (/netflix|disney|movie|cinema|film|theater|hbo|tv|電影|影集|戲院|串流/.test(t)) return '🎬';
    if (/spotify|music|concert|apple music|音樂|演唱會|k歌|ktv/.test(t)) return '🎵';
    if (/exhibition|expo|museum|gallery|展覽|看展|美術館|博覽會/.test(t)) return '🎨';
    if (/game|steam|playstation|switch|xbox|nintendo|遊戲|電玩/.test(t)) return '🎮';
    return '🎮';
  }

  // Housing & Utilities
  if (category === 'housing' || /rent|mortgage|utility|water|electric|power|gas|internet|wifi|phone|telecom|房租|房貸|水電|水費|電費|瓦斯|電話費|話費|網費|寬頻|電信/.test(t)) {
    if (/water|水費/.test(t)) return '💧';
    if (/electric|power|energy|電費/.test(t)) return '⚡';
    if (/wifi|internet|telecom|broadband|phone|mobile|網費|網路|寬頻|電信|話費|電話費/.test(t)) return '🌐';
    if (/mortgage|房貸/.test(t)) return '🏠';
    if (/rent|apartment|lease|房租|租金|公寓/.test(t)) return '🏠';
    return '🏠';
  }

  // Health & Medical
  if (category === 'health' || /gym|fitness|workout|hospital|clinic|doctor|medicine|pharmacy|健保|看診|醫院|診所|藥|健身/.test(t)) {
    if (/gym|fitness|workout|sport|yoga|健身|重訓|運動|瑜伽/.test(t)) return '🏋️';
    if (/hospital|clinic|doctor|dentist|醫|診所|牙醫|健檢/.test(t)) return '🏥';
    return '💊';
  }

  // Education
  if (category === 'education' || /book|course|study|class|tutor|lesson|書|課程|學習|進修|學費/.test(t)) {
    return '📚';
  }

  // Gadgets & Shopping
  if (category === 'shopping' || /shopping|apple|iphone|ipad|mac|electronic|gadget|3c|device|appliance|電腦|手機|平板|筆電|耳機|相機|家電|購物/.test(t)) {
    if (/apple|iphone|ipad|mac|phone|laptop|pc|electronic|gadget|3c|手機|電腦|筆電|平板|耳機|相機/.test(t)) return '📱';
    return '🛍️';
  }

  // Income sources
  if (/salary|payroll|wage|薪資|月薪|發薪/.test(t)) return '💰';
  if (/interest|bank|savings|利息|活存|定存/.test(t)) return '🏦';
  if (/dividend|stock|invest|crypto|股利|股票|投資|分紅/.test(t)) return '📈';
  if (/bonus|獎金|紅利/.test(t)) return '🎉';
  if (/freelance|project|side-gig|parttime|接案|副業|外包/.test(t)) return '💻';

  return fallbackIcon;
}

function getCategoryMeta(type, catId, title = '') {
  const list = CATEGORIES[type] || CATEGORIES.expense;
  const found = list.find(c => c.id === catId);
  const baseIcon = found ? found.icon : '✨';
  const resolvedIcon = title ? resolveItemIcon(catId, title, baseIcon) : baseIcon;
  if (found) {
    return {
      ...found,
      name: getCategoryName(found),
      icon: resolvedIcon
    };
  }
  return {
    id: catId,
    name: state.lang === 'en' ? 'Other' : '其他',
    icon: resolvedIcon,
    color: '#788282',
    bg: 'rgba(120, 130, 130, 0.15)'
  };
}

function getCurrencySymbol() {
  return (CURRENCIES[state.currency] && CURRENCIES[state.currency].symbol) || '$';
}

function updateCurrencySymbols() {
  const sym = getCurrencySymbol();
  document.querySelectorAll('.curr-symbol').forEach(el => {
    el.textContent = sym;
  });
}

// Helper: Get local YYYY-MM-DD date string without UTC timezone shift
function getLocalDateString(d = new Date()) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Format Numbers with Commas according to active locale and currency standards
function formatMoney(amount, currency = null) {
  const curr = currency || state.currency || 'USD';
  const locale = state.lang === 'en' ? 'en-US' : 'zh-TW';
  const num = Number(amount || 0);

  // Currencies without cents/decimals
  if (curr === 'JPY' || curr === 'KRW') {
    return num.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  // TWD: whole numbers use 0 decimals, fractional uses 2 decimals
  if (curr === 'TWD') {
    if (num % 1 === 0) {
      return num.toLocaleString(locale, { minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return num.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // USD, EUR, GBP, HKD: always 2 decimals so +$6,098.50 is properly formatted and neat
  return num.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

// Autocomplete suggestions based on transaction history & localized presets
function getAutocompleteSuggestions(query) {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  const map = new Map();

  const presets = AUTOCOMPLETE_PRESETS[state.lang] || AUTOCOMPLETE_PRESETS.en;

  // Search through presets
  presets.forEach(p => {
    if (p.title.toLowerCase().includes(q)) {
      map.set(p.title, {
        title: p.title,
        category: p.category,
        amount: p.amount,
        type: p.type,
        currency: p.currency || 'USD'
      });
    }
  });

  // Search through recurring rules
  state.recurring.forEach(item => {
    const title = getItemTitle(item);
    if (title && title.toLowerCase().includes(q)) {
      if (!map.has(title)) {
        map.set(title, {
          title,
          category: item.category,
          amount: item.amount,
          type: item.type,
          currency: item.currency || 'USD',
          isRecurring: true,
          freq: item.freq,
          day: item.day
        });
      }
    }
  });

  // Search through transaction history
  state.transactions.forEach(item => {
    const title = getItemTitle(item);
    if (title && title.toLowerCase().includes(q)) {
      if (!map.has(title)) {
        map.set(title, {
          title,
          category: item.category,
          amount: item.amount,
          type: item.type,
          currency: item.currency || 'USD'
        });
      }
    }
  });

  return Array.from(map.values()).slice(0, 5);
}

// Save to LocalStorage
function persistData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
  localStorage.setItem(RECURRING_KEY, JSON.stringify(state.recurring));
  localStorage.setItem(CURRENCY_KEY, state.currency);
  localStorage.setItem(LANG_KEY, state.lang);
  render();
}

// ================= I18N APPLICATION ENGINE =================
function applyLanguage() {
  const lang = state.lang;
  const dict = I18N[lang] || I18N.en;

  // Update HTML document attributes
  document.documentElement.lang = lang === 'en' ? 'en' : 'zh-TW';
  document.title = dict.appTitle;

  // Header
  const subTitle = document.getElementById('app-subtitle');
  if (subTitle) subTitle.textContent = dict.appSubtitle;

  const langLabel = document.getElementById('lang-label');
  if (langLabel) langLabel.textContent = dict.langSwitchLabel;

  const settingsBtn = document.getElementById('open-settings-btn');
  if (settingsBtn) settingsBtn.setAttribute('title', dict.settingsTitle);

  // Screen Mode Indicator
  updateScreenMode();

  // Demo Banner
  const bannerTag = document.getElementById('demo-banner-tag');
  if (bannerTag) bannerTag.textContent = dict.demoBannerTag;

  const bannerText = document.getElementById('demo-banner-text');
  if (bannerText) bannerText.innerHTML = dict.demoBannerText;

  const bannerClearBtn = document.getElementById('banner-clear-btn-text');
  if (bannerClearBtn) bannerClearBtn.textContent = dict.demoBannerClearBtn;

  // Recurring Alert Banner
  const applyRecBtn = document.getElementById('apply-recurring-btn');
  if (applyRecBtn) applyRecBtn.textContent = dict.applyRecurringBtn;
  checkDueRecurring();

  // Left Pane - Balance Card
  const balTitle = document.getElementById('monthly-balance-title');
  if (balTitle) balTitle.textContent = dict.monthlyBalance;

  const incTitle = document.getElementById('total-income-title');
  if (incTitle) incTitle.textContent = dict.totalIncome;

  const expTitle = document.getElementById('total-expense-title');
  if (expTitle) expTitle.textContent = dict.totalExpense;

  // Left Pane - Donut Card
  const catBreakdownTitle = document.getElementById('category-breakdown-title');
  if (catBreakdownTitle) catBreakdownTitle.textContent = dict.categoryBreakdown;

  const expTab = document.getElementById('chart-tab-expense');
  if (expTab) expTab.textContent = dict.tabExpense;

  const incTab = document.getElementById('chart-tab-income');
  if (incTab) incTab.textContent = dict.tabIncome;

  // Left Pane - Savings Card
  const savTitle = document.getElementById('savings-rate-title');
  if (savTitle) savTitle.textContent = dict.savingsRateTitle;

  const recBtnLabel = document.getElementById('manage-recurring-label');
  if (recBtnLabel) recBtnLabel.textContent = dict.manageRecurringBtn;

  // Right Pane - Filter & Search
  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.setAttribute('placeholder', dict.searchPlaceholder);

  const filterAll = document.getElementById('filter-all-btn');
  if (filterAll) filterAll.textContent = dict.filterAll;

  const filterExp = document.getElementById('filter-expense-btn');
  if (filterExp) filterExp.textContent = dict.filterExpense;

  const filterInc = document.getElementById('filter-income-btn');
  if (filterInc) filterInc.textContent = dict.filterIncome;

  // Empty State
  const emptyTitle = document.getElementById('empty-state-title');
  if (emptyTitle) emptyTitle.textContent = dict.emptyTitle;

  const emptyDesc = document.getElementById('empty-state-desc');
  if (emptyDesc) emptyDesc.textContent = dict.emptyDesc;

  // Bottom Nav & Floating Add
  const navRecLabel = document.getElementById('nav-records-label');
  if (navRecLabel) navRecLabel.textContent = dict.navRecords;

  const navRecurringLabel = document.getElementById('nav-recurring-label');
  if (navRecurringLabel) navRecurringLabel.textContent = dict.navRecurring;

  const desktopAddLabel = document.getElementById('desktop-add-label');
  if (desktopAddLabel) desktopAddLabel.textContent = dict.quickAdd;

  // Add/Edit Transaction Modal
  const isEditingTx = Boolean(document.getElementById('edit-id')?.value);
  const modalHeading = document.getElementById('modal-heading-text');
  if (modalHeading) modalHeading.textContent = isEditingTx ? dict.modalEditTitle : dict.modalNewTitle;

  const typeExpBtn = document.getElementById('type-expense-btn');
  if (typeExpBtn) typeExpBtn.textContent = dict.modalExpenseTab;

  const typeIncBtn = document.getElementById('type-income-btn');
  if (typeIncBtn) typeIncBtn.textContent = dict.modalIncomeTab;

  const modalAmtLabel = document.getElementById('modal-amount-label');
  if (modalAmtLabel) modalAmtLabel.textContent = dict.amountLabel;

  const toggleKeypadText = document.getElementById('toggle-keypad-text');
  if (toggleKeypadText) {
    toggleKeypadText.textContent = state.isKeypadVisible !== false ? dict.calcToggleHide : dict.calcToggleShow;
  }

  const modalDescText = document.getElementById('modal-desc-text');
  if (modalDescText) modalDescText.textContent = dict.descLabel;

  const modalDescHint = document.getElementById('modal-desc-hint');
  if (modalDescHint) modalDescHint.textContent = dict.descHint;

  const inputTitle = document.getElementById('input-title');
  if (inputTitle) inputTitle.setAttribute('placeholder', dict.descPlaceholder);

  const modalCatLabel = document.getElementById('modal-cat-label');
  if (modalCatLabel) modalCatLabel.textContent = dict.categoryLabel;

  const modalDateLabel = document.getElementById('modal-date-label');
  if (modalDateLabel) modalDateLabel.textContent = dict.dateLabel;

  const modalSubmitBtn = document.getElementById('modal-submit-btn');
  if (modalSubmitBtn) modalSubmitBtn.textContent = isEditingTx ? dict.updateTransaction : dict.saveTransaction;

  // Recurring Controls in Add Modal
  const modalRecTitle = document.getElementById('modal-rec-title');
  if (modalRecTitle) modalRecTitle.textContent = dict.modalRecTitle;

  const modalRecDesc = document.getElementById('modal-rec-desc');
  if (modalRecDesc) modalRecDesc.textContent = dict.modalRecDesc;

  const modalRecNoBtn = document.getElementById('modal-rec-no-btn');
  if (modalRecNoBtn) modalRecNoBtn.textContent = dict.modalRecNo;

  const modalRecYesBtn = document.getElementById('modal-rec-yes-btn');
  if (modalRecYesBtn) modalRecYesBtn.textContent = dict.modalRecYes;

  const modalRecFreqLabel = document.getElementById('modal-rec-freq-label');
  if (modalRecFreqLabel) modalRecFreqLabel.textContent = dict.modalRecFreqLabel;

  const modalRecFreqMonthly = document.getElementById('modal-rec-freq-monthly');
  if (modalRecFreqMonthly) modalRecFreqMonthly.textContent = dict.modalRecFreqMonthly;

  const modalRecFreqWeekly = document.getElementById('modal-rec-freq-weekly');
  if (modalRecFreqWeekly) modalRecFreqWeekly.textContent = dict.modalRecFreqWeekly;

  const modalRecDayLabel = document.getElementById('modal-rec-day-label');
  if (modalRecDayLabel) modalRecDayLabel.textContent = dict.modalRecDayLabel;

  const modalRecHelpText = document.getElementById('modal-rec-help-text');
  if (modalRecHelpText) modalRecHelpText.textContent = dict.modalRecHelpText;

  // Recurring Modal Shortcut Tip & Button
  const recQuickAddTip = document.getElementById('rec-quick-add-tip');
  if (recQuickAddTip) recQuickAddTip.textContent = dict.recQuickAddTip;

  const recQuickAddBtn = document.getElementById('rec-quick-add-btn');
  if (recQuickAddBtn) recQuickAddBtn.textContent = dict.recQuickAddBtn;

  // Recurring Modal
  const recModalTitle = document.getElementById('rec-modal-title');
  if (recModalTitle) {
    recModalTitle.innerHTML = `
      <svg class="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/></svg>
      ${dict.recurringModalTitle}
    `;
  }

  const recModalDesc = document.getElementById('rec-modal-desc');
  if (recModalDesc) recModalDesc.textContent = dict.recurringModalDesc;

  const isEditingRec = Boolean(document.getElementById('rec-edit-id')?.value);
  const recAddTitle = document.getElementById('rec-add-title');
  if (recAddTitle) recAddTitle.textContent = isEditingRec ? dict.editRecurringTitle : dict.addRecurringTitle;

  const recCancelBtn = document.getElementById('rec-cancel-edit-btn');
  if (recCancelBtn) recCancelBtn.textContent = dict.cancelEditBtn;

  const recTitle = document.getElementById('rec-title');
  if (recTitle) recTitle.setAttribute('placeholder', dict.recTitlePlaceholder);

  const recAmount = document.getElementById('rec-amount');
  if (recAmount) recAmount.setAttribute('placeholder', dict.recAmountPlaceholder);

  const recOptExp = document.getElementById('rec-opt-expense');
  if (recOptExp) recOptExp.textContent = dict.recTypeExpense;

  const recOptInc = document.getElementById('rec-opt-income');
  if (recOptInc) recOptInc.textContent = dict.recTypeIncome;

  const recOptMonthly = document.getElementById('rec-opt-monthly');
  if (recOptMonthly) recOptMonthly.textContent = dict.recFreqMonthly;

  const recOptWeekly = document.getElementById('rec-opt-weekly');
  if (recOptWeekly) recOptWeekly.textContent = dict.recFreqWeekly;

  const recDay = document.getElementById('rec-day');
  if (recDay) recDay.setAttribute('placeholder', dict.recDayPlaceholder);

  const recDayLabel = document.getElementById('rec-day-label');
  if (recDayLabel) recDayLabel.textContent = dict.recDayLabel;

  const recDaySuffix = document.getElementById('rec-day-suffix');
  if (recDaySuffix) recDaySuffix.textContent = dict.recDaySuffix;

  const recSubmitBtn = document.getElementById('rec-submit-btn');
  if (recSubmitBtn) recSubmitBtn.textContent = isEditingRec ? dict.updateRecurringBtn : dict.addRecurringBtn;

  updateRecCategoryOptions();

  // Settings Modal - Morandi Palette Section
  const paletteSettingsTitle = document.getElementById('palette-settings-title');
  if (paletteSettingsTitle) paletteSettingsTitle.textContent = dict.paletteSettingsTitle;

  const paletteSettingsDesc = document.getElementById('palette-settings-desc');
  if (paletteSettingsDesc) paletteSettingsDesc.textContent = dict.paletteSettingsDesc;

  const paletteToggleBtn = document.getElementById('palette-toggle-btn');
  if (paletteToggleBtn) paletteToggleBtn.setAttribute('title', dict.paletteToggleTitle);

  const paletteQuickLabel = document.getElementById('palette-quick-label');
  if (paletteQuickLabel) paletteQuickLabel.textContent = dict.paletteQuickLabel;

  renderPaletteSelectorUI();

  // Settings Modal
  const settingsTitle = document.getElementById('settings-modal-title');
  if (settingsTitle) settingsTitle.textContent = dict.settingsTitle;

  const aiExportTitle = document.getElementById('ai-export-title');
  if (aiExportTitle) aiExportTitle.textContent = dict.aiExportTitle;

  const aiExportDesc = document.getElementById('ai-export-desc');
  if (aiExportDesc) aiExportDesc.innerHTML = dict.aiExportDesc;

  const copyAiBtnText = document.getElementById('copy-ai-btn-text');
  if (copyAiBtnText) copyAiBtnText.textContent = dict.copyAiPromptBtn;

  // Google Drive Backup UI
  const gdriveTitle = document.getElementById('gdrive-title');
  if (gdriveTitle) gdriveTitle.textContent = dict.gdriveTitle;

  const gdriveDesc = document.getElementById('gdrive-desc');
  if (gdriveDesc) gdriveDesc.textContent = dict.gdriveDesc;

  const gdriveBackupLabel = document.getElementById('gdrive-backup-label');
  if (gdriveBackupLabel) gdriveBackupLabel.textContent = dict.gdriveBackupBtn;

  const gdriveRestoreLabel = document.getElementById('gdrive-restore-label');
  if (gdriveRestoreLabel) gdriveRestoreLabel.textContent = dict.gdriveRestoreBtn;

  const disconnectBtn = document.getElementById('gdrive-disconnect-btn');
  if (disconnectBtn) disconnectBtn.textContent = dict.gdriveDisconnectBtn;

  const gdriveToggleConfigLabel = document.getElementById('gdrive-toggle-config-label');
  if (gdriveToggleConfigLabel) gdriveToggleConfigLabel.textContent = dict.gdriveToggleConfig;

  const gdriveClientIdLabel = document.getElementById('gdrive-client-id-label');
  if (gdriveClientIdLabel) gdriveClientIdLabel.textContent = dict.gdriveClientIdLabel;

  const gdriveSaveClientIdBtn = document.getElementById('gdrive-save-client-id-btn');
  if (gdriveSaveClientIdBtn) gdriveSaveClientIdBtn.textContent = dict.gdriveSaveClientIdBtn;

  const gdriveGuideTitle = document.getElementById('gdrive-guide-title');
  if (gdriveGuideTitle) gdriveGuideTitle.textContent = dict.gdriveGuideTitle;

  const gdriveGuideStep1 = document.getElementById('gdrive-guide-step1');
  if (gdriveGuideStep1) gdriveGuideStep1.innerHTML = dict.gdriveGuideStep1;

  const gdriveGuideStep2 = document.getElementById('gdrive-guide-step2');
  if (gdriveGuideStep2) gdriveGuideStep2.innerHTML = dict.gdriveGuideStep2;

  const gdriveGuideStep3 = document.getElementById('gdrive-guide-step3');
  if (gdriveGuideStep3) gdriveGuideStep3.innerHTML = dict.gdriveGuideStep3;

  updateGoogleDriveStatusUI();

  const backupTitle = document.getElementById('backup-title');
  if (backupTitle) backupTitle.textContent = dict.backupTitle;

  const backupDesc = document.getElementById('backup-desc');
  if (backupDesc) backupDesc.textContent = dict.backupDesc;

  const exportJsonLabel = document.getElementById('export-json-label');
  if (exportJsonLabel) exportJsonLabel.textContent = dict.exportJsonBtn;

  const exportCsvLabel = document.getElementById('export-csv-label');
  if (exportCsvLabel) exportCsvLabel.textContent = dict.exportCsvBtn;

  const importJsonLabel = document.getElementById('import-json-label');
  if (importJsonLabel) importJsonLabel.textContent = dict.importJsonBtn;

  const clearDataTitle = document.getElementById('clear-data-title');
  if (clearDataTitle) clearDataTitle.textContent = dict.clearDataTitle;

  const clearDataDesc = document.getElementById('clear-data-desc');
  if (clearDataDesc) clearDataDesc.textContent = dict.clearDataDesc;

  const clearAllDataBtn = document.getElementById('clear-all-data-btn');
  if (clearAllDataBtn) clearAllDataBtn.textContent = dict.clearDataBtn;

  const reloadDemoBtn = document.getElementById('reload-demo-btn');
  if (reloadDemoBtn) reloadDemoBtn.textContent = dict.reloadDemoBtn;

  const pwaUpdateText = document.getElementById('pwa-update-text');
  if (pwaUpdateText) pwaUpdateText.textContent = dict.pwaUpdateText;

  const pwaUpdateBtn = document.getElementById('pwa-update-btn');
  if (pwaUpdateBtn) pwaUpdateBtn.textContent = dict.pwaUpdateBtn;

  // Re-render UI components with localized text
  renderCategoryPicker();
  render();
  renderRecurringList();
}

function toggleLanguage() {
  state.lang = state.lang === 'en' ? 'zh-TW' : 'en';
  localStorage.setItem(LANG_KEY, state.lang);
  applyLanguage();
}

// Foldable Screen observer
function initFoldScreenObserver() {
  window.addEventListener('resize', updateScreenMode);
  updateScreenMode();
}

function updateScreenMode() {
  const isDualPane = window.innerWidth >= 768;
  const textEl = document.getElementById('screen-mode-text');
  const dict = I18N[state.lang] || I18N.en;
  if (textEl) {
    textEl.textContent = isDualPane ? dict.screenModeDual : dict.screenModeSingle;
  }
  updateMonthLabel();
}

function updateMonthLabel() {
  const monthLabel = document.getElementById('current-month-label');
  if (!monthLabel) return;
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth() + 1;
  const dict = I18N[state.lang] || I18N.en;
  if (state.lang === 'en') {
    const isMobile = window.innerWidth < 640;
    const monthName = isMobile && dict.shortMonths ? dict.shortMonths[month - 1] : dict.months[month - 1];
    monthLabel.textContent = `${monthName} ${year}`;
  } else {
    monthLabel.textContent = `${year}年${month}月`;
  }
}

// Currency Symbol Init
function initCurrency() {
  updateCurrencySymbols();
}

// Theme handling
function initTheme() {
  const isDark = localStorage.getItem(THEME_KEY) === 'dark' || 
    (!localStorage.getItem(THEME_KEY) && window.matchMedia('(prefers-color-scheme: dark)').matches);
  if (isDark) {
    document.documentElement.classList.add('dark');
    document.getElementById('moon-icon').classList.add('hidden');
    document.getElementById('sun-icon').classList.remove('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    document.getElementById('sun-icon').classList.add('hidden');
    document.getElementById('moon-icon').classList.remove('hidden');
  }

  document.getElementById('theme-toggle').addEventListener('click', () => {
    const dark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, dark ? 'dark' : 'light');
    document.getElementById('moon-icon').classList.toggle('hidden', dark);
    document.getElementById('sun-icon').classList.toggle('hidden', !dark);
    const p = MORANDI_PALETTES[state.palette] || MORANDI_PALETTES.sage;
    const metaTheme = document.querySelector && document.querySelector('meta[name="theme-color"]');
    if (metaTheme && typeof metaTheme.setAttribute === 'function') {
      metaTheme.setAttribute('content', dark ? p.bgDark : p.primary);
    }
  });
}

// Morandi Palette Controller
function applyPalette(paletteKey, save = true) {
  const p = MORANDI_PALETTES[paletteKey] || MORANDI_PALETTES.sage;
  state.palette = p.id;
  if (save) {
    try {
      localStorage.setItem(PALETTE_KEY, p.id);
    } catch (_) {}
  }

  // Set CSS Custom Properties on documentElement safely
  if (document.documentElement && document.documentElement.style && typeof document.documentElement.style.setProperty === 'function') {
    document.documentElement.style.setProperty('--pf-primary', p.primary);
    document.documentElement.style.setProperty('--pf-primary-rgb', p.primaryRgb);
    document.documentElement.style.setProperty('--pf-primary-dark', p.primaryDark);
    document.documentElement.style.setProperty('--pf-primary-dark-rgb', p.primaryDarkRgb);
    document.documentElement.style.setProperty('--pf-income', p.income);
    document.documentElement.style.setProperty('--pf-income-rgb', p.incomeRgb);
    document.documentElement.style.setProperty('--pf-expense', p.expense);
    document.documentElement.style.setProperty('--pf-expense-rgb', p.expenseRgb);
    document.documentElement.style.setProperty('--pf-bg-light', p.bgLight);
    document.documentElement.style.setProperty('--pf-bg-dark', p.bgDark);
    document.documentElement.style.setProperty('--pf-card-dark', p.cardDark);
    document.documentElement.style.setProperty('--pf-border-dark', p.borderDark);
  }

  // Update Category colors dynamically
  if (CATEGORIES && CATEGORIES.expense && CATEGORIES.income) {
    CATEGORIES.expense.forEach(c => {
      if (p.categories[c.id]) {
        c.color = p.categories[c.id].color;
        c.bg = p.categories[c.id].bg;
      }
    });
    CATEGORIES.income.forEach(c => {
      if (p.categories[c.id]) {
        c.color = p.categories[c.id].color;
        c.bg = p.categories[c.id].bg;
      }
    });
  }

  // Update mobile browser toolbar color
  const isDark = document.documentElement && document.documentElement.classList && document.documentElement.classList.contains && document.documentElement.classList.contains('dark');
  const metaTheme = document.querySelector && document.querySelector('meta[name="theme-color"]');
  if (metaTheme && typeof metaTheme.setAttribute === 'function') {
    metaTheme.setAttribute('content', isDark ? p.bgDark : p.primary);
  }

  // Update quick dot in header
  const quickDot = document.getElementById('palette-quick-dot');
  if (quickDot && quickDot.style) {
    quickDot.style.backgroundColor = p.primary;
  }

  // Render selector grid in Settings modal
  renderPaletteSelectorUI();

  // If UI components exist, refresh views that depend on palette colors
  if (typeof render === 'function' && document.getElementById('net-balance')) {
    render();
  }
  if (typeof renderCategoryPicker === 'function' && document.getElementById('category-grid')) {
    renderCategoryPicker();
  }
  if (typeof renderRecurringList === 'function' && document.getElementById('recurring-rules-list')) {
    renderRecurringList();
  }
}

function renderPaletteSelectorUI() {
  const grid = document.getElementById('palette-options-grid');
  if (!grid) return;
  const isEn = state.lang === 'en';

  const badgeEl = document.getElementById('palette-active-badge');
  const activePalette = MORANDI_PALETTES[state.palette] || MORANDI_PALETTES.sage;
  if (badgeEl) {
    badgeEl.textContent = isEn ? activePalette.badge.en : activePalette.badge['zh-TW'];
  }

  grid.innerHTML = Object.values(MORANDI_PALETTES).map(p => {
    const isActive = p.id === state.palette;
    const name = isEn ? p.name.en : p.name['zh-TW'];
    const badge = isEn ? p.badge.en : p.badge['zh-TW'];
    const activeClasses = isActive 
      ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-sm ring-2 ring-indigo-500/20' 
      : 'border-slate-200/80 dark:border-slate-800 hover:bg-slate-100/70 dark:hover:bg-slate-800/60';

    return `
      <button type="button" data-palette-id="${p.id}" class="palette-option-btn text-left p-2.5 rounded-2xl border transition-all flex flex-col justify-between ${activeClasses}">
        <div class="flex items-center justify-between w-full mb-1.5">
          <span class="w-3.5 h-3.5 rounded-full shadow-inner border border-black/10 shrink-0" style="background-color: ${p.primary}"></span>
          <span class="text-[9px] font-bold px-1.5 py-0.5 rounded-md ${isActive ? 'bg-indigo-600 text-white' : 'bg-slate-200/70 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}">
            ${badge}
          </span>
        </div>
        <div class="text-[11px] font-bold text-slate-800 dark:text-slate-100 truncate">${name}</div>
      </button>
    `;
  }).join('');

  if (typeof grid.querySelectorAll === 'function') {
    grid.querySelectorAll('.palette-option-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pId = btn.getAttribute('data-palette-id');
        if (pId) {
          applyPalette(pId);
        }
      });
    });
  }
}

function initPalette() {
  applyPalette(state.palette, false);
}

// Demo Preview Banner controller
function updateDemoBanner() {
  const banner = document.getElementById('demo-mode-banner');
  if (banner) {
    if (state.isDemo && state.transactions.length > 0) {
      banner.classList.remove('hidden');
    } else {
      banner.classList.add('hidden');
    }
  }
}

// ================= CALCULATOR KEYPAD CONTROLLER =================

// Safe arithmetic evaluator supporting +, -, ×, ÷ (*, /) with order of operations
function evaluateExpression(exprStr) {
  if (!exprStr || typeof exprStr !== 'string') return null;
  var s = exprStr.replace(/×/g, '*').replace(/÷/g, '/').replace(/−/g, '-').replace(/\s+/g, '');
  if (!s) return null;
  s = s.replace(/[+\-*/.]+$/, ''); // Strip trailing operators for partial evaluation
  if (!s) return null;

  var tokens = [];
  var i = 0;
  while (i < s.length) {
    var ch = s[i];
    if ('+-*/'.indexOf(ch) !== -1) {
      if (ch === '-' && (tokens.length === 0 || ['+', '-', '*', '/'].indexOf(tokens[tokens.length - 1]) !== -1)) {
        var numStr = '-';
        i++;
        while (i < s.length && /[0-9.]/.test(s[i])) {
          numStr += s[i];
          i++;
        }
        var val = parseFloat(numStr);
        if (isNaN(val)) return null;
        tokens.push(val);
        continue;
      }
      tokens.push(ch);
      i++;
    } else if (/[0-9.]/.test(ch)) {
      var numStr = '';
      while (i < s.length && /[0-9.]/.test(s[i])) {
        numStr += s[i];
        i++;
      }
      var val = parseFloat(numStr);
      if (isNaN(val)) return null;
      tokens.push(val);
    } else {
      return null;
    }
  }

  if (tokens.length === 0) return null;

  // Pass 1: Multiplication and Division
  var pass1 = [];
  var k = 0;
  while (k < tokens.length) {
    var token = tokens[k];
    if (token === '*' || token === '/') {
      var prev = pass1.pop();
      var next = tokens[k + 1];
      if (typeof prev !== 'number' || typeof next !== 'number') return null;
      if (token === '/' && next === 0) return null; // Division by zero
      var res = token === '*' ? prev * next : prev / next;
      pass1.push(res);
      k += 2;
    } else {
      pass1.push(token);
      k++;
    }
  }

  // Pass 2: Addition and Subtraction
  var result = pass1[0];
  if (typeof result !== 'number') return null;
  var m = 1;
  while (m < pass1.length) {
    var op = pass1[m];
    var next = pass1[m + 1];
    if (typeof next !== 'number') return null;
    if (op === '+') result += next;
    else if (op === '-') result -= next;
    else return null;
    m += 2;
  }

  if (isNaN(result) || !isFinite(result)) return null;
  return Math.round(result * 10000) / 10000;
}

// Updates live calculation preview under amount input
function updateCalcPreview() {
  const input = document.getElementById('input-amount');
  const preview = document.getElementById('calc-preview');
  if (!input || !preview) return;

  const val = (input.value || '').trim();
  const dict = I18N[state?.lang || 'en'] || I18N.en;

  if (!val) {
    preview.textContent = '';
    return;
  }

  // Check if expression contains an operator (besides standalone leading minus)
  const hasOperator = /[+\-×÷*/]/.test(val) && val !== '-';
  if (!hasOperator) {
    preview.textContent = '';
    return;
  }

  // Division by zero check
  if (/[÷/]\s*0(\.0*)?($|\s|[+\-×÷*/])/.test(val)) {
    preview.textContent = dict.calcDivZero;
    return;
  }

  const result = evaluateExpression(val);
  if (result !== null && !isNaN(result)) {
    const cleanNum = parseFloat(result.toFixed(2));
    preview.textContent = `= ${cleanNum.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
  } else {
    preview.textContent = '';
  }
}

// Toggles visibility of the interactive keypad and updates input mode
function setKeypadVisible(visible) {
  state.isKeypadVisible = visible;
  const keypad = document.getElementById('calc-keypad');
  const toggleText = document.getElementById('toggle-keypad-text');
  const inputAmount = document.getElementById('input-amount');
  const dict = I18N[state?.lang || 'en'] || I18N.en;

  if (keypad && keypad.classList) {
    if (visible) {
      keypad.classList.remove('hidden');
    } else {
      keypad.classList.add('hidden');
    }
  }

  if (toggleText) {
    toggleText.textContent = visible ? dict.calcToggleHide : dict.calcToggleShow;
  }

  if (inputAmount && typeof inputAmount.setAttribute === 'function') {
    inputAmount.setAttribute('inputmode', visible ? 'none' : 'decimal');
  }
}

// Handles tap/click on calculator keys
function handleCalcInput(key) {
  const input = document.getElementById('input-amount');
  if (!input) return;

  let val = input.value || '';

  if (key === 'clear') {
    input.value = '';
    updateCalcPreview();
    return;
  }

  if (key === 'backspace') {
    if (val.length > 0) {
      if (/\s[+\-×÷*/]\s$/.test(val)) {
        val = val.slice(0, -3);
      } else if (/\s$/.test(val)) {
        val = val.trimEnd().slice(0, -1);
      } else {
        val = val.slice(0, -1);
      }
      input.value = val;
    }
    updateCalcPreview();
    return;
  }

  if (key === '=') {
    const trimmed = val.trim();
    if (!trimmed) return;
    const evaluated = evaluateExpression(trimmed);
    if (evaluated !== null && !isNaN(evaluated)) {
      const cleanNum = parseFloat(evaluated.toFixed(2));
      input.value = cleanNum.toString();
      const preview = document.getElementById('calc-preview');
      if (preview) preview.textContent = '';
    }
    return;
  }

  // Operators (+, -, ×, ÷)
  const isOperator = ['+', '-', '×', '÷', '*', '/'].indexOf(key) !== -1;
  const displayOp = key === '*' ? '×' : key === '/' ? '÷' : key;

  if (isOperator) {
    const trimmed = val.trim();
    if (!trimmed || trimmed === '0') {
      if (key === '-') {
        input.value = '-';
        updateCalcPreview();
      }
      return;
    }
    // If ends with an operator, replace it
    if (/\s[+\-×÷*/]\s$/.test(val)) {
      val = val.replace(/\s[+\-×÷*/]\s$/, ` ${displayOp} `);
      input.value = val;
      updateCalcPreview();
      return;
    }
    if (/[+\-×÷*/]$/.test(trimmed)) {
      val = trimmed.replace(/[+\-×÷*/]$/, `${displayOp}`);
      input.value = val + ' ';
      updateCalcPreview();
      return;
    }
    // Append operator with spacing for readability
    input.value = trimmed + ` ${displayOp} `;
    updateCalcPreview();
    return;
  }

  // Decimal point (.)
  if (key === '.') {
    const trimmed = val.trim();
    if (!trimmed || trimmed === '0' || /\s[+\-×÷*/]\s$/.test(val)) {
      input.value = (!trimmed || trimmed === '0') ? '0.' : val + '0.';
      updateCalcPreview();
      return;
    }
    // Check if current number segment already has a decimal
    const parts = trimmed.split(/[+\-×÷*/\s]+/);
    const lastPart = parts[parts.length - 1];
    if (lastPart.indexOf('.') !== -1) {
      return;
    }
    input.value = val + '.';
    updateCalcPreview();
    return;
  }

  // Digits (0-9)
  if (/^[0-9]$/.test(key)) {
    if (val === '0') {
      input.value = key;
    } else {
      input.value = val + key;
    }
    updateCalcPreview();
  }
}

// Initialize Calculator Keypad Event Listeners
function initCalcKeypad() {
  const toggleBtn = document.getElementById('toggle-keypad-btn');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      setKeypadVisible(!state.isKeypadVisible);
    });
  }

  const calcKeypad = document.getElementById('calc-keypad');
  if (calcKeypad) {
    calcKeypad.addEventListener('click', (e) => {
      const btn = e.target.closest && e.target.closest('.calc-key');
      if (!btn) return;
      const key = btn.getAttribute('data-calc');
      if (key) {
        handleCalcInput(key);
      }
    });
  }

  const inputAmount = document.getElementById('input-amount');
  if (inputAmount) {
    inputAmount.addEventListener('input', () => {
      updateCalcPreview();
    });

    inputAmount.addEventListener('focus', () => {
      if (!state.isKeypadVisible) {
        setKeypadVisible(true);
      }
    });

    inputAmount.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const val = (inputAmount.value || '').trim();
        if (/[+\-×÷*/]/.test(val)) {
          e.preventDefault();
          handleCalcInput('=');
        }
      } else if (e.key === 'Escape') {
        e.preventDefault();
        handleCalcInput('clear');
      }
    });
  }
}

// Initialize Elements
document.addEventListener('DOMContentLoaded', () => {
  normalizeDemoItems();
  initTheme();
  initPalette();
  initCurrency();
  initFoldScreenObserver();
  initEvents();
  applyLanguage();
  updateDemoBanner();
});

// Event Listeners Setup
function initEvents() {
  initCalcKeypad();

  // Language Switcher Toggle
  const langToggleBtn = document.getElementById('lang-toggle-btn');
  if (langToggleBtn) {
    langToggleBtn.addEventListener('click', toggleLanguage);
  }

  // Morandi Palette Quick Switcher button in header: cycles to next palette
  const paletteToggleBtn = document.getElementById('palette-toggle-btn');
  if (paletteToggleBtn) {
    paletteToggleBtn.addEventListener('click', () => {
      const keys = Object.keys(MORANDI_PALETTES);
      const currIdx = keys.indexOf(state.palette);
      const nextIdx = (currIdx + 1) % keys.length;
      applyPalette(keys[nextIdx]);
    });
  }

  // Month Navigator
  document.getElementById('prev-month-btn').addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() - 1);
    render();
    checkDueRecurring();
  });
  document.getElementById('next-month-btn').addEventListener('click', () => {
    state.currentDate.setMonth(state.currentDate.getMonth() + 1);
    render();
    checkDueRecurring();
  });

  // Chart Type toggle
  document.getElementById('chart-tab-expense').addEventListener('click', () => {
    state.chartType = 'expense';
    updateChartTabs();
    renderChart();
  });
  document.getElementById('chart-tab-income').addEventListener('click', () => {
    state.chartType = 'income';
    updateChartTabs();
    renderChart();
  });

  // Filter Tabs
  document.querySelectorAll('.filter-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      document.querySelectorAll('.filter-tab').forEach(t => {
        t.className = 'filter-tab px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition';
      });
      e.target.className = 'filter-tab px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 text-white shadow-sm transition';
      state.currentFilter = e.target.getAttribute('data-filter');
      renderTransactions();
    });
  });

  // Search input
  document.getElementById('search-input').addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    renderTransactions();
  });

  // Modal Open, Edit & Close
  window.openModal = function(prefillRecurring = false) {
    document.getElementById('transaction-form').reset();
    document.getElementById('edit-id').value = '';
    modalRecDayTouched = false;
    const dict = I18N[state.lang] || I18N.en;
    const modalHeading = document.getElementById('modal-heading-text');
    if (modalHeading) modalHeading.textContent = dict.modalNewTitle;
    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    if (modalSubmitBtn) modalSubmitBtn.textContent = dict.saveTransaction;

    const todayStr = getLocalDateString();
    document.getElementById('input-date').value = todayStr;
    setModalType('expense');
    
    // Set default currency to last used in modal
    const lastCurr = localStorage.getItem(DEFAULT_CURR_KEY) || 'USD';
    const modalCurrSelect = document.getElementById('modal-currency-select');
    if (modalCurrSelect) modalCurrSelect.value = lastCurr;

    setModalRecurring(Boolean(prefillRecurring));
    const modalRecFreq = document.getElementById('modal-rec-freq');
    if (modalRecFreq) modalRecFreq.value = 'monthly';
    const modalRecDay = document.getElementById('modal-rec-day');
    if (modalRecDay) {
      const parts = todayStr.split('-');
      modalRecDay.value = parts.length === 3 ? parseInt(parts[2], 10) : new Date().getDate();
    }

    document.getElementById('input-amount').value = '';
    const calcPrev = document.getElementById('calc-preview');
    if (calcPrev) calcPrev.textContent = '';
    setKeypadVisible(true);

    document.getElementById('add-modal').classList.remove('hidden');
    document.getElementById('add-modal').classList.add('flex');
    setTimeout(() => document.getElementById('input-amount').focus(), 100);
  };

  window.closeModal = function() {
    const calcPrev = document.getElementById('calc-preview');
    if (calcPrev) calcPrev.textContent = '';
    document.getElementById('add-modal').classList.add('hidden');
    document.getElementById('add-modal').classList.remove('flex');
    document.getElementById('autocomplete-list').classList.add('hidden');
  };

  window.openEditModal = function(id) {
    const tx = state.transactions.find(t => t.id === id);
    if (!tx) return;
    const dict = I18N[state.lang] || I18N.en;

    document.getElementById('transaction-form').reset();
    document.getElementById('edit-id').value = tx.id;
    modalRecDayTouched = false;

    const calcPrev = document.getElementById('calc-preview');
    if (calcPrev) calcPrev.textContent = '';
    setKeypadVisible(true);

    const modalHeading = document.getElementById('modal-heading-text');
    if (modalHeading) modalHeading.textContent = dict.modalEditTitle;

    const modalSubmitBtn = document.getElementById('modal-submit-btn');
    if (modalSubmitBtn) modalSubmitBtn.textContent = dict.updateTransaction;

    document.getElementById('input-title').value = getItemTitle(tx);
    document.getElementById('input-amount').value = tx.amount;
    document.getElementById('input-date').value = tx.date;

    const modalCurrSelect = document.getElementById('modal-currency-select');
    if (modalCurrSelect) {
      modalCurrSelect.value = tx.currency || state.currency || 'USD';
    }

    setModalType(tx.type);
    selectCategory(tx.category);

    const modalRecFreq = document.getElementById('modal-rec-freq');
    const modalRecDay = document.getElementById('modal-rec-day');

    if (tx.recurringId) {
      setModalRecurring(true);
      const rule = state.recurring.find(r => r.id === tx.recurringId);
      if (rule) {
        if (modalRecFreq) modalRecFreq.value = rule.freq || 'monthly';
        if (modalRecDay) modalRecDay.value = rule.day || 1;
      } else {
        if (modalRecFreq) modalRecFreq.value = 'monthly';
        if (modalRecDay) {
          const d = tx.date ? parseInt(tx.date.split('-')[2], 10) : 1;
          modalRecDay.value = d;
        }
      }
    } else {
      setModalRecurring(false);
      if (modalRecFreq) modalRecFreq.value = 'monthly';
      if (modalRecDay) {
        const d = tx.date ? parseInt(tx.date.split('-')[2], 10) : 1;
        modalRecDay.value = d;
      }
    }

    document.getElementById('add-modal').classList.remove('hidden');
    document.getElementById('add-modal').classList.add('flex');
    setTimeout(() => document.getElementById('input-amount').focus(), 100);
  };

  document.getElementById('open-add-modal-btn').addEventListener('click', () => window.openModal(false));
  document.getElementById('desktop-add-btn').addEventListener('click', () => window.openModal(false));
  document.getElementById('close-add-modal-btn').addEventListener('click', window.closeModal);

  // Modal Type Switchers
  document.getElementById('type-expense-btn').addEventListener('click', () => setModalType('expense'));
  document.getElementById('type-income-btn').addEventListener('click', () => setModalType('income'));

  // Recurring toggle buttons in Quick Add Modal
  const modalRecNoBtn = document.getElementById('modal-rec-no-btn');
  if (modalRecNoBtn) {
    modalRecNoBtn.addEventListener('click', () => setModalRecurring(false));
  }
  const modalRecYesBtn = document.getElementById('modal-rec-yes-btn');
  if (modalRecYesBtn) {
    modalRecYesBtn.addEventListener('click', () => setModalRecurring(true));
  }

  // Date change syncs to recurring day
  const inputDate = document.getElementById('input-date');
  if (inputDate) {
    inputDate.addEventListener('change', () => {
      if (!modalRecDayTouched && inputDate.value) {
        const parts = inputDate.value.split('-');
        if (parts.length === 3) {
          const d = parseInt(parts[2], 10);
          const modalRecDay = document.getElementById('modal-rec-day');
          if (modalRecDay && d >= 1 && d <= 31) {
            modalRecDay.value = d;
          }
        }
      }
    });
  }

  const modalRecDayInput = document.getElementById('modal-rec-day');
  if (modalRecDayInput) {
    modalRecDayInput.addEventListener('input', () => {
      modalRecDayTouched = true;
    });
  }

  // Autocomplete Input Handling
  const titleInput = document.getElementById('input-title');
  const autocompleteList = document.getElementById('autocomplete-list');

  titleInput.addEventListener('input', (e) => {
    const query = e.target.value;
    const matches = getAutocompleteSuggestions(query);
    if (matches.length === 0) {
      autocompleteList.classList.add('hidden');
      return;
    }

    autocompleteList.innerHTML = matches.map(item => {
      const cat = getCategoryMeta(item.type, item.category, item.title);
      const itemSym = (CURRENCIES[item.currency] && CURRENCIES[item.currency].symbol) || '$';
      const typeLabel = item.type === 'expense' 
        ? (state.lang === 'en' ? 'Expense' : '支出') 
        : (state.lang === 'en' ? 'Income' : '收入');
      const recBadge = item.isRecurring ? (state.lang === 'en' ? ' · 🔄 Recurring' : ' · 🔄 固定週期') : '';

      return `
        <div class="auto-item px-3 py-2.5 hover:bg-indigo-50 dark:hover:bg-slate-700/80 cursor-pointer flex items-center justify-between transition"
             data-title="${item.title}" data-category="${item.category}" data-type="${item.type}" data-amount="${item.amount}" data-currency="${item.currency || 'USD'}"
             data-is-recurring="${item.isRecurring ? 'true' : 'false'}" data-freq="${item.freq || 'monthly'}" data-day="${item.day || ''}">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style="background:${cat.bg}">${cat.icon}</span>
            <div>
              <div class="text-xs font-bold text-slate-800 dark:text-slate-100">${item.title}</div>
              <div class="text-[10px] text-slate-400">${cat.name} · ${typeLabel}${recBadge}</div>
            </div>
          </div>
          <div class="text-xs font-semibold ${item.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'}">
            ${itemSym} ${formatMoney(item.amount, item.currency)}
          </div>
        </div>
      `;
    }).join('');

    autocompleteList.classList.remove('hidden');

    autocompleteList.querySelectorAll('.auto-item').forEach(el => {
      el.addEventListener('click', () => {
        titleInput.value = el.getAttribute('data-title');
        const selectedType = el.getAttribute('data-type');
        const selectedCat = el.getAttribute('data-category');
        const recentAmt = el.getAttribute('data-amount');
        const itemCurr = el.getAttribute('data-currency');

        setModalType(selectedType);
        selectCategory(selectedCat);

        const modalCurrSelect = document.getElementById('modal-currency-select');
        if (itemCurr && modalCurrSelect) {
          modalCurrSelect.value = itemCurr;
        }

        if (el.getAttribute('data-is-recurring') === 'true') {
          setModalRecurring(true);
          const f = el.getAttribute('data-freq');
          const d = el.getAttribute('data-day');
          if (f && document.getElementById('modal-rec-freq')) document.getElementById('modal-rec-freq').value = f;
          if (d && document.getElementById('modal-rec-day')) document.getElementById('modal-rec-day').value = d;
        }

        if (!document.getElementById('input-amount').value || document.getElementById('input-amount').value === '0') {
          document.getElementById('input-amount').value = recentAmt;
          updateCalcPreview();
        }
        autocompleteList.classList.add('hidden');
      });
    });
  });

  document.addEventListener('click', (e) => {
    if (!titleInput.contains(e.target) && !autocompleteList.contains(e.target)) {
      autocompleteList.classList.add('hidden');
    }
  });

  // Submit Transaction Form (Add or Edit)
  document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('edit-id').value;
    const title = document.getElementById('input-title').value.trim();
    const rawAmt = (document.getElementById('input-amount').value || '').trim();
    const dict = I18N[state.lang] || I18N.en;

    // Check division by zero
    if (/[÷/]\s*0(\.0*)?($|\s|[+\-×÷*/])/.test(rawAmt)) {
      alert(dict.calcDivZero);
      return;
    }

    let amount = 0;
    if (rawAmt) {
      const evaluated = evaluateExpression(rawAmt);
      amount = (evaluated !== null && !isNaN(evaluated)) ? evaluated : (parseFloat(rawAmt) || 0);
    }
    if (amount > 0) {
      document.getElementById('input-amount').value = parseFloat(amount.toFixed(2));
    }
    const date = document.getElementById('input-date').value;
    const currency = document.getElementById('modal-currency-select').value || 'USD';
    const isRecurring = Boolean(state.modalIsRecurring);
    const recFreq = document.getElementById('modal-rec-freq')?.value || 'monthly';
    let recDay = parseInt(document.getElementById('modal-rec-day')?.value, 10);
    if (isNaN(recDay) || recDay < 1) {
      recDay = date ? parseInt(date.split('-')[2], 10) : 1;
    }
    if (recDay > 31) recDay = 31;

    // Remember currency for next time
    localStorage.setItem(DEFAULT_CURR_KEY, currency);

    if (editId) {
      const idx = state.transactions.findIndex(t => t.id === editId);
      if (idx !== -1) {
        let recId = state.transactions[idx].recurringId;

        if (isRecurring) {
          const recTitle = title || getCategoryMeta(state.modalType, state.selectedCategory).name;
          if (recId) {
            const rIdx = state.recurring.findIndex(r => r.id === recId);
            if (rIdx !== -1) {
              state.recurring[rIdx] = {
                ...state.recurring[rIdx],
                title: recTitle,
                currency,
                amount,
                type: state.modalType,
                category: state.selectedCategory,
                freq: recFreq,
                day: recDay
              };
              if (state.lang === 'zh-TW') {
                state.recurring[rIdx].title_tw = recTitle;
              } else {
                state.recurring[rIdx].title = recTitle;
              }
            } else {
              const newRule = {
                id: recId,
                title: recTitle,
                currency,
                amount,
                type: state.modalType,
                category: state.selectedCategory,
                freq: recFreq,
                day: recDay
              };
              if (state.lang === 'zh-TW') newRule.title_tw = recTitle;
              state.recurring.push(newRule);
            }
          } else {
            recId = 'rec_' + Date.now();
            const newRule = {
              id: recId,
              title: recTitle,
              currency,
              amount,
              type: state.modalType,
              category: state.selectedCategory,
              freq: recFreq,
              day: recDay
            };
            if (state.lang === 'zh-TW') newRule.title_tw = recTitle;
            state.recurring.push(newRule);
          }
        } else {
          recId = undefined;
        }

        state.transactions[idx] = {
          ...state.transactions[idx],
          title,
          amount,
          type: state.modalType,
          category: state.selectedCategory,
          currency,
          date
        };

        if (recId) {
          state.transactions[idx].recurringId = recId;
        } else {
          delete state.transactions[idx].recurringId;
        }

        if (state.lang === 'zh-TW') {
          state.transactions[idx].title_tw = title;
        } else {
          state.transactions[idx].title = title;
        }
      }
    } else {
      let recId = undefined;
      if (isRecurring) {
        const recTitle = title || getCategoryMeta(state.modalType, state.selectedCategory).name;
        recId = 'rec_' + Date.now();
        const newRule = {
          id: recId,
          title: recTitle,
          currency,
          amount,
          type: state.modalType,
          category: state.selectedCategory,
          freq: recFreq,
          day: recDay
        };
        if (state.lang === 'zh-TW') {
          newRule.title_tw = recTitle;
        }
        state.recurring.push(newRule);
      }

      const newTx = {
        id: 'tx_' + Date.now(),
        title,
        amount,
        type: state.modalType,
        category: state.selectedCategory,
        currency,
        date
      };
      if (recId) {
        newTx.recurringId = recId;
      }
      if (state.lang === 'zh-TW') {
        newTx.title_tw = title;
      }
      state.transactions.unshift(newTx);
    }

    state.isDemo = false;
    localStorage.setItem('pocketflow_is_demo', 'false');
    updateDemoBanner();

    persistData();
    renderRecurringList();
    checkDueRecurring();
    window.closeModal();
  });

  // Recurring Modal
  const recModal = document.getElementById('recurring-modal');
  const openRecModal = () => {
    cancelEditRecurring();
    renderRecurringList();
    recModal.classList.remove('hidden');
    recModal.classList.add('flex');
  };
  const closeRecModal = () => {
    cancelEditRecurring();
    recModal.classList.add('hidden');
    recModal.classList.remove('flex');
  };

  document.getElementById('open-recurring-modal-btn').addEventListener('click', openRecModal);
  document.getElementById('nav-recurring').addEventListener('click', openRecModal);
  document.getElementById('close-recurring-modal-btn').addEventListener('click', closeRecModal);

  const recQuickAddBtn = document.getElementById('rec-quick-add-btn');
  if (recQuickAddBtn) {
    recQuickAddBtn.addEventListener('click', () => {
      closeRecModal();
      window.openModal(true);
    });
  }

  // Recurring Type change updates category dropdown
  const recTypeSelect = document.getElementById('rec-type');
  if (recTypeSelect) {
    recTypeSelect.addEventListener('change', () => updateRecCategoryOptions());
  }

  // Recurring Cancel Edit Button
  const recCancelBtn = document.getElementById('rec-cancel-edit-btn');
  if (recCancelBtn) {
    recCancelBtn.addEventListener('click', cancelEditRecurring);
  }

  // Settings Modal Handlers
  const settingsModal = document.getElementById('settings-modal');
  document.getElementById('open-settings-btn').addEventListener('click', () => {
    updateGoogleDriveStatusUI();
    settingsModal.classList.remove('hidden');
    settingsModal.classList.add('flex');
  });
  document.getElementById('close-settings-modal-btn').addEventListener('click', () => {
    settingsModal.classList.add('hidden');
    settingsModal.classList.remove('flex');
  });

  // FEATURE: Google Drive Backup & Sync
  const gdriveBackupBtn = document.getElementById('gdrive-backup-btn');
  if (gdriveBackupBtn) {
    gdriveBackupBtn.addEventListener('click', () => {
      backupToGoogleDrive();
    });
  }

  const gdriveRestoreBtn = document.getElementById('gdrive-restore-btn');
  if (gdriveRestoreBtn) {
    gdriveRestoreBtn.addEventListener('click', () => {
      restoreFromGoogleDrive();
    });
  }

  const gdriveDisconnectBtn = document.getElementById('gdrive-disconnect-btn');
  if (gdriveDisconnectBtn) {
    gdriveDisconnectBtn.addEventListener('click', () => {
      disconnectGoogleDrive();
    });
  }

  const gdriveToggleConfigBtn = document.getElementById('gdrive-toggle-config-btn');
  const gdriveConfigPanel = document.getElementById('gdrive-config-panel');
  if (gdriveToggleConfigBtn && gdriveConfigPanel) {
    gdriveToggleConfigBtn.addEventListener('click', () => {
      gdriveConfigPanel.classList.toggle('hidden');
    });
  }

  const gdriveSaveClientIdBtn = document.getElementById('gdrive-save-client-id-btn');
  const gdriveClientIdInput = document.getElementById('gdrive-client-id-input');
  if (gdriveSaveClientIdBtn && gdriveClientIdInput) {
    gdriveSaveClientIdBtn.addEventListener('click', () => {
      const val = gdriveClientIdInput.value.trim();
      localStorage.setItem(GDRIVE_CLIENT_ID_KEY, val);
      gdriveAccessToken = null;
      gdriveTokenExpiresAt = 0;
      updateGoogleDriveStatusUI();
      const dict = I18N[state.lang] || I18N.en;
      alert(dict.gdriveSavedClientId);
    });
  }

  // FEATURE: Copy AI Financial Advisor Prompt
  document.getElementById('copy-ai-prompt-btn').addEventListener('click', () => {
    copyAIPrompt();
  });

  // FEATURE: Export JSON Backup
  document.getElementById('export-json-btn').addEventListener('click', () => {
    exportJSON();
  });

  // FEATURE: Export CSV Spreadsheet
  document.getElementById('export-csv-btn').addEventListener('click', () => {
    exportCSV();
  });

  // FEATURE: Import JSON Backup
  const importInput = document.getElementById('import-json-input');
  document.getElementById('import-json-btn').addEventListener('click', () => {
    importInput.click();
  });
  importInput.addEventListener('change', (e) => {
    importJSON(e);
  });

  // Banner Clear Demo Data Button
  const bannerClearBtn = document.getElementById('banner-clear-btn');
  if (bannerClearBtn) {
    bannerClearBtn.addEventListener('click', () => {
      state.transactions = [];
      state.recurring = [];
      state.isDemo = false;
      localStorage.setItem('pocketflow_is_demo', 'false');
      cancelEditRecurring();
      persistData();
      renderRecurringList();
      checkDueRecurring();
      updateDemoBanner();
    });
  }

  // Clear all data (Start fresh)
  document.getElementById('clear-all-data-btn').addEventListener('click', () => {
    const dict = I18N[state.lang] || I18N.en;
    if (confirm(dict.clearConfirm)) {
      state.transactions = [];
      state.recurring = [];
      state.isDemo = false;
      localStorage.setItem('pocketflow_is_demo', 'false');
      cancelEditRecurring();
      persistData();
      renderRecurringList();
      checkDueRecurring();
      updateDemoBanner();
      settingsModal.classList.add('hidden');
      settingsModal.classList.remove('flex');
    }
  });

  // Reload demo data
  document.getElementById('reload-demo-btn').addEventListener('click', () => {
    state.transactions = [...DEMO_TRANSACTIONS];
    state.recurring = [...DEMO_RECURRING];
    state.isDemo = true;
    localStorage.setItem('pocketflow_is_demo', 'true');
    cancelEditRecurring();
    persistData();
    renderRecurringList();
    checkDueRecurring();
    updateDemoBanner();
    settingsModal.classList.add('hidden');
    settingsModal.classList.remove('flex');
  });

  // Add / Edit Recurring Rule Form
  document.getElementById('recurring-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('rec-edit-id').value;
    const title = document.getElementById('rec-title').value.trim();
    const currency = document.getElementById('rec-currency').value || 'USD';
    const amount = parseFloat(document.getElementById('rec-amount').value) || 0;
    const type = document.getElementById('rec-type').value;
    const category = document.getElementById('rec-category').value;
    const freq = document.getElementById('rec-freq').value;
    const day = parseInt(document.getElementById('rec-day').value) || 1;

    if (editId) {
      const idx = state.recurring.findIndex(r => r.id === editId);
      if (idx !== -1) {
        state.recurring[idx] = {
          ...state.recurring[idx],
          title,
          currency,
          amount,
          type,
          category,
          freq,
          day
        };
        if (state.lang === 'zh-TW') {
          state.recurring[idx].title_tw = title;
        } else {
          state.recurring[idx].title = title;
        }
      }
    } else {
      const newRule = {
        id: 'rec_' + Date.now(),
        title,
        currency,
        amount,
        type,
        category,
        freq,
        day
      };
      if (state.lang === 'zh-TW') {
        newRule.title_tw = title;
      }
      state.recurring.push(newRule);
    }

    cancelEditRecurring();
    persistData();
    renderRecurringList();
    checkDueRecurring();
  });

  // Batch apply recurring
  document.getElementById('apply-recurring-btn').addEventListener('click', () => {
    applyAllDueRecurring();
  });
}

function updateChartTabs() {
  const expBtn = document.getElementById('chart-tab-expense');
  const incBtn = document.getElementById('chart-tab-income');

  if (state.chartType === 'expense') {
    expBtn.className = 'px-2.5 py-1 rounded-lg font-bold bg-white dark:bg-slate-700 text-rose-500 shadow-sm transition';
    incBtn.className = 'px-2.5 py-1 rounded-lg font-medium text-slate-500 dark:text-slate-400 transition';
  } else {
    incBtn.className = 'px-2.5 py-1 rounded-lg font-bold bg-white dark:bg-slate-700 text-emerald-500 shadow-sm transition';
    expBtn.className = 'px-2.5 py-1 rounded-lg font-medium text-slate-500 dark:text-slate-400 transition';
  }
}

function setModalType(type) {
  state.modalType = type;
  const expBtn = document.getElementById('type-expense-btn');
  const incBtn = document.getElementById('type-income-btn');

  if (type === 'expense') {
    expBtn.className = 'px-4 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-rose-500 shadow-sm transition';
    incBtn.className = 'px-4 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 transition';
  } else {
    incBtn.className = 'px-4 py-1.5 rounded-xl text-xs font-bold bg-white dark:bg-slate-700 text-emerald-500 shadow-sm transition';
    expBtn.className = 'px-4 py-1.5 rounded-xl text-xs font-medium text-slate-500 dark:text-slate-400 transition';
  }

  renderCategoryPicker();
}

function setModalRecurring(isRecurring) {
  state.modalIsRecurring = Boolean(isRecurring);
  const noBtn = document.getElementById('modal-rec-no-btn');
  const yesBtn = document.getElementById('modal-rec-yes-btn');
  const fields = document.getElementById('modal-recurring-fields');

  if (state.modalIsRecurring) {
    if (noBtn) {
      noBtn.className = 'px-3 py-1 rounded-lg text-xs font-medium text-slate-400 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition';
    }
    if (yesBtn) {
      yesBtn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-indigo-600 text-white shadow-sm transition';
    }
    if (fields) {
      fields.classList.remove('hidden');
    }
  } else {
    if (noBtn) {
      noBtn.className = 'px-3 py-1 rounded-lg text-xs font-bold bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 shadow-sm transition';
    }
    if (yesBtn) {
      yesBtn.className = 'px-3 py-1 rounded-lg text-xs font-medium text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition';
    }
    if (fields) {
      fields.classList.add('hidden');
    }
  }
}

function renderCategoryPicker() {
  const container = document.getElementById('category-grid');
  if (!container) return;
  const list = CATEGORIES[state.modalType];

  if (!list.some(c => c.id === state.selectedCategory)) {
    state.selectedCategory = list[0].id;
  }

  container.innerHTML = list.map(cat => {
    const isSelected = cat.id === state.selectedCategory;
    const catName = getCategoryName(cat);
    return `
      <button type="button" class="category-btn flex flex-col items-center p-2 rounded-2xl border transition ${
        isSelected 
          ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-sm ring-2 ring-indigo-500/20' 
          : 'border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
      }" data-cat="${cat.id}">
        <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-1" style="background:${cat.bg}">${cat.icon}</span>
        <span class="text-[11px] font-medium text-slate-700 dark:text-slate-200 truncate max-w-full">${catName}</span>
      </button>
    `;
  }).join('');

  container.querySelectorAll('.category-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      selectCategory(btn.getAttribute('data-cat'));
    });
  });
}

function selectCategory(catId) {
  state.selectedCategory = catId;
  renderCategoryPicker();
}

function getDueRecurringItems() {
  const curYear = state.currentDate.getFullYear();
  const curMonth = state.currentDate.getMonth() + 1;
  const monthStr = `${curYear}-${String(curMonth).padStart(2, '0')}`;

  return state.recurring.filter(rule => {
    const alreadyRecorded = state.transactions.some(tx => 
      tx.recurringId === rule.id && tx.date.startsWith(monthStr)
    );
    return !alreadyRecorded;
  });
}

function checkDueRecurring() {
  const dueItems = getDueRecurringItems();
  const alertBar = document.getElementById('recurring-alert-bar');
  const alertText = document.getElementById('recurring-alert-text');
  const dict = I18N[state.lang] || I18N.en;

  if (!alertBar || !alertText) return;

  if (dueItems.length > 0) {
    alertBar.classList.remove('hidden');
    const itemsSummary = dueItems.map(i => getItemTitle(i)).join(state.lang === 'en' ? ', ' : '、');
    alertText.textContent = dict.recurringAlertText(dueItems.length, itemsSummary);
  } else {
    alertBar.classList.add('hidden');
  }
}

function applyAllDueRecurring() {
  const dueItems = getDueRecurringItems();
  const curYear = state.currentDate.getFullYear();
  const curMonth = state.currentDate.getMonth() + 1;

  dueItems.forEach(rule => {
    const day = Math.min(rule.day || 1, 28);
    const dateStr = `${curYear}-${String(curMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    state.transactions.unshift({
      id: 'tx_rec_' + Date.now() + Math.random().toString(36).substr(2, 4),
      recurringId: rule.id,
      title: rule.title,
      title_tw: rule.title_tw,
      currency: rule.currency || 'USD',
      amount: rule.amount,
      type: rule.type,
      category: rule.category || (rule.type === 'income' ? 'salary' : 'housing'),
      date: dateStr
    });
  });

  persistData();
  checkDueRecurring();
}

function updateRecCategoryOptions(selectedCatId) {
  const recCatSelect = document.getElementById('rec-category');
  if (!recCatSelect) return;
  const type = document.getElementById('rec-type')?.value || 'expense';
  const list = CATEGORIES[type] || CATEGORIES.expense;

  recCatSelect.innerHTML = list.map(c => {
    const name = getCategoryName(c);
    return `<option value="${c.id}">${c.icon} ${name}</option>`;
  }).join('');

  if (selectedCatId && list.some(c => c.id === selectedCatId)) {
    recCatSelect.value = selectedCatId;
  }
}

function startEditRecurring(id) {
  const rule = state.recurring.find(r => r.id === id);
  if (!rule) return;
  const dict = I18N[state.lang] || I18N.en;

  document.getElementById('rec-edit-id').value = rule.id;
  document.getElementById('rec-title').value = getItemTitle(rule);
  document.getElementById('rec-currency').value = rule.currency || 'USD';
  document.getElementById('rec-amount').value = rule.amount;
  document.getElementById('rec-type').value = rule.type;
  updateRecCategoryOptions(rule.category);
  document.getElementById('rec-freq').value = rule.freq || 'monthly';
  document.getElementById('rec-day').value = rule.day;

  const recAddTitle = document.getElementById('rec-add-title');
  if (recAddTitle) recAddTitle.textContent = dict.editRecurringTitle;

  const recSubmitBtn = document.getElementById('rec-submit-btn');
  if (recSubmitBtn) recSubmitBtn.textContent = dict.updateRecurringBtn;

  const cancelBtn = document.getElementById('rec-cancel-edit-btn');
  if (cancelBtn) cancelBtn.classList.remove('hidden');

  document.getElementById('rec-title').focus();
}

function cancelEditRecurring() {
  const dict = I18N[state.lang] || I18N.en;
  const editIdEl = document.getElementById('rec-edit-id');
  if (editIdEl) editIdEl.value = '';

  const recForm = document.getElementById('recurring-form');
  if (recForm) recForm.reset();

  updateRecCategoryOptions();

  const recAddTitle = document.getElementById('rec-add-title');
  if (recAddTitle) recAddTitle.textContent = dict.addRecurringTitle;

  const recSubmitBtn = document.getElementById('rec-submit-btn');
  if (recSubmitBtn) recSubmitBtn.textContent = dict.addRecurringBtn;

  const cancelBtn = document.getElementById('rec-cancel-edit-btn');
  if (cancelBtn) cancelBtn.classList.add('hidden');
}

function renderRecurringList() {
  const listEl = document.getElementById('recurring-rules-list');
  if (!listEl) return;
  const dict = I18N[state.lang] || I18N.en;

  if (state.recurring.length === 0) {
    listEl.innerHTML = `<p class="text-xs text-slate-400 text-center py-6">${dict.noRecurringRules}</p>`;
    return;
  }

  listEl.innerHTML = state.recurring.map(rule => {
    const title = getItemTitle(rule);
    const cat = getCategoryMeta(rule.type, rule.category, title);
    const ruleSym = (CURRENCIES[rule.currency] && CURRENCIES[rule.currency].symbol) || '$';
    const subText = dict.recurringItemSub(rule.day, rule.type);

    return `
      <div class="group flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-700 transition">
        <div class="flex items-center gap-3 cursor-pointer flex-1" data-edit-rec="${rule.id}" title="${state.lang === 'en' ? 'Click to edit recurring item' : '點擊以編輯此定期收支'}">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg shadow-sm" style="background:${cat.bg}">${cat.icon}</span>
          <div>
            <div class="text-xs font-bold text-slate-800 dark:text-slate-100">${title}</div>
            <div class="text-[10px] text-slate-400">${subText} · ${cat.name}</div>
          </div>
        </div>
        <div class="flex items-center gap-1 sm:gap-2">
          <div class="text-xs font-extrabold mr-1 ${rule.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'}">
            ${rule.type === 'expense' ? '-' : '+'}${ruleSym} ${formatMoney(rule.amount, rule.currency)}
          </div>
          <!-- Edit recurring button -->
          <button class="edit-rec-btn p-1.5 text-slate-400 hover:text-indigo-600 rounded-lg hover:bg-indigo-50 dark:hover:bg-slate-700 transition"
                  data-id="${rule.id}" title="${dict.editTxBtn}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
          </button>
          <!-- Delete recurring button -->
          <button class="delete-rec-btn p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-slate-700 transition"
                  data-id="${rule.id}" title="${dict.deleteTxBtn}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('[data-edit-rec]').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.getAttribute('data-edit-rec');
      startEditRecurring(id);
    });
  });

  listEl.querySelectorAll('.edit-rec-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      startEditRecurring(id);
    });
  });

  listEl.querySelectorAll('.delete-rec-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      if (document.getElementById('rec-edit-id')?.value === id) {
        cancelEditRecurring();
      }
      state.recurring = state.recurring.filter(r => r.id !== id);
      persistData();
      renderRecurringList();
      checkDueRecurring();
    });
  });
}

function render() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth() + 1;
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  const dict = I18N[state.lang] || I18N.en;

  // Month Navigator text
  updateMonthLabel();

  const monthTxs = state.transactions.filter(t => t.date.startsWith(monthStr));

  let income = 0;
  let expense = 0;

  monthTxs.forEach(t => {
    if (t.type === 'income') income += Number(t.amount);
    if (t.type === 'expense') expense += Number(t.amount);
  });

  const net = income - expense;

  document.getElementById('total-income').textContent = formatMoney(income, state.currency);
  document.getElementById('total-expense').textContent = formatMoney(expense, state.currency);
  document.getElementById('net-balance').textContent = formatMoney(net, state.currency);

  const balanceBadge = document.getElementById('balance-badge');
  if (net >= 0) {
    balanceBadge.textContent = dict.balanceHealthy;
    balanceBadge.className = 'px-2.5 py-0.5 rounded-full bg-emerald-500/25 text-emerald-200 border border-emerald-400/30 text-[11px] font-bold backdrop-blur-sm';
  } else {
    balanceBadge.textContent = dict.balanceDeficit;
    balanceBadge.className = 'px-2.5 py-0.5 rounded-full bg-rose-500/25 text-rose-200 border border-rose-400/30 text-[11px] font-bold backdrop-blur-sm';
  }

  const sym = getCurrencySymbol();
  const rate = income > 0 ? Math.round((net / income) * 100) : 0;
  document.getElementById('savings-rate-label').textContent = dict.savingsRateLabel(rate, sym, formatMoney(net, state.currency));

  updateCurrencySymbols();
  renderChart();
  renderTransactions();
}

// Helper to calculate SVG donut arc coordinates
function polarToCartesian(cx, cy, r, angleInDegrees) {
  const angleInRadians = angleInDegrees * Math.PI / 180.0;
  return {
    x: cx + (r * Math.cos(angleInRadians)),
    y: cy + (r * Math.sin(angleInRadians))
  };
}

function describeDonutArc(cx, cy, r_in, r_out, startAngle, endAngle) {
  if (endAngle <= startAngle) return '';
  const p1 = polarToCartesian(cx, cy, r_out, startAngle);
  const p2 = polarToCartesian(cx, cy, r_out, endAngle);
  const p3 = polarToCartesian(cx, cy, r_in, endAngle);
  const p4 = polarToCartesian(cx, cy, r_in, startAngle);
  const largeArcFlag = (endAngle - startAngle) > 180 ? 1 : 0;

  return [
    `M ${p1.x.toFixed(2)} ${p1.y.toFixed(2)}`,
    `A ${r_out} ${r_out} 0 ${largeArcFlag} 1 ${p2.x.toFixed(2)} ${p2.y.toFixed(2)}`,
    `L ${p3.x.toFixed(2)} ${p3.y.toFixed(2)}`,
    `A ${r_in} ${r_in} 0 ${largeArcFlag} 0 ${p4.x.toFixed(2)} ${p4.y.toFixed(2)}`,
    `Z`
  ].join(" ");
}

function renderChart() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth() + 1;
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  const dict = I18N[state.lang] || I18N.en;

  const monthTxs = state.transactions.filter(t => 
    t.date.startsWith(monthStr) && t.type === state.chartType
  );

  const catSums = {};
  let total = 0;

  monthTxs.forEach(t => {
    catSums[t.category] = (catSums[t.category] || 0) + Number(t.amount);
    total += Number(t.amount);
  });

  const svg = document.getElementById('donut-svg');
  const legend = document.getElementById('category-legend-list');
  const sym = getCurrencySymbol();

  document.getElementById('donut-center-sub').textContent = state.chartType === 'expense' ? dict.donutCenterExp : dict.donutCenterInc;
  document.getElementById('donut-center-val').textContent = `${sym} ${formatMoney(total, state.currency)}`;
  document.getElementById('donut-center-cat').textContent = dict.donutCenterAll;

  if (total === 0) {
    svg.innerHTML = `
      <circle cx="100" cy="100" r="70" fill="none" stroke="#e2e8f0" stroke-width="24" class="dark:stroke-slate-800"/>
    `;
    legend.innerHTML = `<p class="text-xs text-slate-400 text-center py-4">${dict.donutNoData}</p>`;
    return;
  }

  const sortedCats = Object.entries(catSums).sort((a, b) => b[1] - a[1]);

  if (sortedCats.length === 1) {
    const meta = getCategoryMeta(state.chartType, sortedCats[0][0]);
    svg.innerHTML = `
      <path class="donut-slice" fill="${meta.color}"
            d="${describeDonutArc(100, 100, 58, 84, 0, 179.99)} ${describeDonutArc(100, 100, 58, 84, 180, 359.99)}"
            data-cat-name="${meta.name}" data-cat-amount="${total}" data-cat-pct="100">
      </path>
    `;
  } else {
    const gapDeg = 2.5;
    const totalGaps = gapDeg * sortedCats.length;
    const availableDeg = 360 - totalGaps;
    const minDeg = 6.0; // Guarantee minimum visual width for tiny slices (e.g. 1%)

    let degs = sortedCats.map(([catId, amt]) => Math.max((amt / total) * availableDeg, minDeg));
    const sumDegs = degs.reduce((a, b) => a + b, 0);
    degs = degs.map(d => (d / sumDegs) * availableDeg);

    let currentAngle = 0;
    svg.innerHTML = sortedCats.map(([catId, amount], idx) => {
      const meta = getCategoryMeta(state.chartType, catId);
      const sliceDeg = degs[idx];
      const startAngle = currentAngle;
      const endAngle = startAngle + sliceDeg;
      currentAngle = endAngle + gapDeg;
      const rawPct = (amount / total) * 100;
      const pctDisplay = rawPct < 1 && rawPct > 0 ? '< 1' : Math.round(rawPct);

      return `
        <path class="donut-slice" fill="${meta.color}"
              d="${describeDonutArc(100, 100, 58, 84, startAngle, endAngle)}"
              data-cat-name="${meta.name}" data-cat-amount="${amount}" data-cat-pct="${pctDisplay}">
        </path>
      `;
    }).join('');
  }

  svg.querySelectorAll('.donut-slice').forEach(slice => {
    const handleInspect = () => {
      const name = slice.getAttribute('data-cat-name');
      const amt = slice.getAttribute('data-cat-amount');
      const pct = slice.getAttribute('data-cat-pct');
      document.getElementById('donut-center-sub').textContent = `${pct}% ${dict.donutCenterPct}`;
      document.getElementById('donut-center-val').textContent = `${sym} ${formatMoney(amt, state.currency)}`;
      document.getElementById('donut-center-cat').textContent = name;
    };

    const handleReset = () => {
      document.getElementById('donut-center-sub').textContent = state.chartType === 'expense' ? dict.donutCenterExp : dict.donutCenterInc;
      document.getElementById('donut-center-val').textContent = `${sym} ${formatMoney(total, state.currency)}`;
      document.getElementById('donut-center-cat').textContent = dict.donutCenterAll;
    };

    slice.addEventListener('mouseenter', handleInspect);
    slice.addEventListener('mouseleave', handleReset);
    slice.addEventListener('touchstart', handleInspect, { passive: true });
  });

  legend.innerHTML = sortedCats.map(([catId, amount]) => {
    const meta = getCategoryMeta(state.chartType, catId);
    const rawPct = (amount / total) * 100;
    const pctText = rawPct < 1 && rawPct > 0 ? '< 1%' : `${Math.round(rawPct)}%`;
    return `
      <div class="legend-row flex items-center justify-between p-1.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition cursor-pointer"
           data-cat-name="${meta.name}" data-cat-amount="${amount}" data-cat-pct="${pctText}">
        <div class="flex items-center gap-1.5 min-w-0">
          <span class="w-6 h-6 rounded-lg flex items-center justify-center text-xs shrink-0" style="background:${meta.bg}">
            ${meta.icon}
          </span>
          <span class="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">${meta.name}</span>
        </div>
        <div class="flex items-center gap-1.5 shrink-0 pl-1 text-right">
          <span class="text-[10px] font-bold text-slate-400">${pctText}</span>
          <span class="text-xs font-bold text-slate-800 dark:text-slate-100">${sym} ${formatMoney(amount, state.currency)}</span>
        </div>
      </div>
    `;
  }).join('');

  legend.querySelectorAll('.legend-row').forEach(row => {
    const handleInspect = () => {
      const name = row.getAttribute('data-cat-name');
      const amt = row.getAttribute('data-cat-amount');
      const pct = row.getAttribute('data-cat-pct');
      document.getElementById('donut-center-sub').textContent = `${pct} ${dict.donutCenterPct}`;
      document.getElementById('donut-center-val').textContent = `${sym} ${formatMoney(amt, state.currency)}`;
      document.getElementById('donut-center-cat').textContent = name;
    };
    const handleReset = () => {
      document.getElementById('donut-center-sub').textContent = state.chartType === 'expense' ? dict.donutCenterExp : dict.donutCenterInc;
      document.getElementById('donut-center-val').textContent = `${sym} ${formatMoney(total, state.currency)}`;
      document.getElementById('donut-center-cat').textContent = dict.donutCenterAll;
    };
    row.addEventListener('mouseenter', handleInspect);
    row.addEventListener('mouseleave', handleReset);
    row.addEventListener('click', handleInspect);
  });
}

function renderTransactions() {
  const container = document.getElementById('transactions-container');
  const emptyState = document.getElementById('empty-state');
  const sym = getCurrencySymbol();
  const dict = I18N[state.lang] || I18N.en;

  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth() + 1;
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;

  let list = state.transactions.filter(t => t.date.startsWith(monthStr));

  if (state.currentFilter !== 'all') {
    list = list.filter(t => t.type === state.currentFilter);
  }

  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(t => {
      const title = getItemTitle(t).toLowerCase();
      const meta = getCategoryMeta(t.type, t.category, title);
      const catName = meta.name.toLowerCase();
      return title.includes(q) || catName.includes(q);
    });
  }

  if (list.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  list.sort((a, b) => b.date.localeCompare(a.date));

  const groups = {};
  list.forEach(t => {
    if (!groups[t.date]) groups[t.date] = [];
    groups[t.date].push(t);
  });

  const todayStr = getLocalDateString(new Date());
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = getLocalDateString(yesterday);

  container.innerHTML = Object.entries(groups).map(([dateStr, items]) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const isCurrentYear = y === new Date().getFullYear();

    let dateLabel = '';
    if (dateStr === todayStr) {
      dateLabel = state.lang === 'en'
        ? `${dict.today} · ${dict.shortMonths[m - 1]} ${d}`
        : `${dict.today} · ${m}月${d}日`;
    } else if (dateStr === yesterdayStr) {
      dateLabel = state.lang === 'en'
        ? `${dict.yesterday} · ${dict.shortMonths[m - 1]} ${d}`
        : `${dict.yesterday} · ${m}月${d}日`;
    } else {
      if (state.lang === 'en') {
        dateLabel = isCurrentYear
          ? `${dict.shortMonths[m - 1]} ${d}`
          : `${dict.shortMonths[m - 1]} ${d}, ${y}`;
      } else {
        dateLabel = isCurrentYear
          ? `${m}月${d}日`
          : `${y}年${m}月${d}日`;
      }
    }

    const dayTotalExpense = items.filter(i => i.type === 'expense').reduce((sum, i) => sum + Number(i.amount), 0);

    const itemsHtml = items.map(item => {
      const title = getItemTitle(item);
      const meta = getCategoryMeta(item.type, item.category, title);
      const isExpense = item.type === 'expense';
      const itemSym = (CURRENCIES[item.currency] && CURRENCIES[item.currency].symbol) || sym;

      return `
        <div class="tx-item group flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 hover:shadow-md shadow-sm transition cursor-pointer"
             data-id="${item.id}" title="${state.lang === 'en' ? 'Click to edit transaction' : '點擊以編輯此筆紀錄'}">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm" style="background:${meta.bg}">
              ${meta.icon}
            </span>
            <div>
              <div class="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                ${title || meta.name}
                ${item.recurringId ? `<span class="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-500 font-semibold dark:bg-indigo-950 dark:text-indigo-400">${dict.recurringBadge}</span>` : ''}
              </div>
              ${title ? `<div class="text-[10px] text-slate-400 font-medium">${meta.name}</div>` : ''}
            </div>
          </div>

          <div class="flex items-center gap-1 sm:gap-2">
            <div class="text-right mr-1">
              <div class="text-sm font-extrabold ${isExpense ? 'text-rose-500' : 'text-emerald-500'}">
                ${isExpense ? '-' : '+'}${itemSym} ${formatMoney(item.amount, item.currency)}
              </div>
            </div>

            <!-- Edit Button -->
            <button class="edit-tx-btn p-1.5 text-slate-400 hover:text-indigo-600 rounded-xl hover:bg-indigo-50 dark:hover:bg-slate-800 transition opacity-80 sm:opacity-0 group-hover:opacity-100"
                    data-id="${item.id}" title="${dict.editTxBtn}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/></svg>
            </button>

            <!-- Delete Button -->
            <button class="delete-tx-btn p-1.5 text-slate-400 hover:text-rose-500 rounded-xl hover:bg-rose-50 dark:hover:bg-slate-800 transition opacity-80 sm:opacity-0 group-hover:opacity-100"
                    data-id="${item.id}" title="${dict.deleteTxBtn}">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="space-y-2">
        <div class="flex items-center justify-between px-2 text-xs font-semibold text-slate-400">
          <span>${dateLabel}</span>
          ${dayTotalExpense > 0 ? `<span>${dict.dailyExpense(sym, formatMoney(dayTotalExpense, state.currency))}</span>` : ''}
        </div>
        <div class="space-y-1.5">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');

  // Row click to edit transaction
  container.querySelectorAll('.tx-item').forEach(row => {
    row.addEventListener('click', (e) => {
      if (e.target.closest('.delete-tx-btn') || e.target.closest('.edit-tx-btn')) return;
      const id = row.getAttribute('data-id');
      window.openEditModal(id);
    });
  });

  // Edit button click
  container.querySelectorAll('.edit-tx-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      window.openEditModal(id);
    });
  });

  // Delete button click
  container.querySelectorAll('.delete-tx-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const id = btn.getAttribute('data-id');
      state.transactions = state.transactions.filter(t => t.id !== id);
      persistData();
      checkDueRecurring();
    });
  });
}

// ================= AI FINANCIAL ADVISOR PROMPT PACKAGER =================
function copyAIPrompt() {
  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth() + 1;
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;
  const sym = getCurrencySymbol();
  const dict = I18N[state.lang] || I18N.en;

  const monthTxs = state.transactions.filter(t => t.date.startsWith(monthStr));
  let income = 0;
  let expense = 0;
  const catSums = {};

  monthTxs.forEach(t => {
    const amt = Number(t.amount);
    if (t.type === 'income') income += amt;
    if (t.type === 'expense') {
      expense += amt;
      catSums[t.category] = (catSums[t.category] || 0) + amt;
    }
  });

  const net = income - expense;
  const rate = income > 0 ? Math.round((net / income) * 100) : 0;
  const sortedCats = Object.entries(catSums).sort((a, b) => b[1] - a[1]);

  let promptText = '';

  if (state.lang === 'en') {
    // English Prompt
    const catLines = sortedCats.map(([catId, amt]) => {
      const meta = getCategoryMeta('expense', catId);
      const pct = expense > 0 ? Math.round((amt / expense) * 100) : 0;
      return `- ${meta.name} (${meta.icon}): ${sym}${formatMoney(amt)} (${pct}%)`;
    }).join('\n') || '- No expense records for this month';

    const recurringLines = state.recurring.map(r => {
      const isExp = r.type === 'expense';
      const cat = getCategoryMeta(r.type, r.category);
      const title = getItemTitle(r) || cat.name;
      return `- [${isExp ? 'Fixed Expense' : 'Fixed Income'}] ${title}: Day ${r.day} each month ${sym}${formatMoney(r.amount)}`;
    }).join('\n') || '- No recurring items configured';

    const topExpenses = monthTxs
      .filter(t => t.type === 'expense')
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .slice(0, 5)
      .map((t, idx) => {
        const cat = getCategoryMeta(t.type, t.category);
        const title = getItemTitle(t) || cat.name;
        return `${idx + 1}. ${title} (${t.date}): ${sym}${formatMoney(t.amount)}`;
      })
      .join('\n') || 'None';

    const txListSample = monthTxs.slice(0, 25).map(t => {
      const sign = t.type === 'expense' ? '-' : '+';
      const cat = getCategoryMeta(t.type, t.category);
      const title = getItemTitle(t);
      const displayDesc = title ? `${title} (${cat.name})` : cat.name;
      return `- ${t.date} | ${displayDesc} | ${sign}${sym}${formatMoney(t.amount)}`;
    }).join('\n') || 'No records for this month';

    promptText = `# Personal Financial Review & Budget Analysis Request (from PocketFlow)

Hello! Please act as my "Personal Financial Advisor and Budgeting Coach".
Here are my actual income, expense, and transaction details from PocketFlow for ${dict.months[month - 1]} ${year}. Please conduct a comprehensive financial health assessment and provide actionable savings tips:

---

## 📊 Monthly Financial Overview
- Currency: ${state.currency} (${sym})
- Total Income: ${sym}${formatMoney(income)}
- Total Expense: ${sym}${formatMoney(expense)}
- Net Balance (Savings): ${sym}${formatMoney(net)}
- Savings Rate: ${rate}%

## 🍩 Expense Breakdown by Category
${catLines}

## 🔍 Top 5 Largest Expenses
${topExpenses}

## 🔄 Monthly Recurring Items
${recurringLines}

## 📝 Transaction Details Sample
${txListSample}
${monthTxs.length > 25 ? `\n(and ${monthTxs.length - 25} smaller transactions omitted)` : ''}

---

## 🎯 Based on the data above, please answer these 4 questions:
1. **[Financial Health Score (1-10)]**: Evaluating my savings rate, income-to-expense ratio, and recurring overhead, how healthy are my finances?
2. **[Spending Blind Spots & "Latte Factor"]**: Based on the transactions, are there discretionary, recurring, or optimizable hidden expenses?
3. **[50/30/20 Budget Recommendations]**: Help me reallocate next month's budget (50% Needs, 30% Wants, 20% Savings & Debt/Investments).
4. **[3 Concrete Action Steps for Next Month]**: Give me 3 high-impact, easy-to-adopt micro-habits to cut unnecessary spending.

Thank you! Please provide a structured, friendly, and professional response in English.`;

  } else {
    // Traditional Chinese Prompt
    const catLines = sortedCats.map(([catId, amt]) => {
      const meta = getCategoryMeta('expense', catId);
      const pct = expense > 0 ? Math.round((amt / expense) * 100) : 0;
      return `- ${meta.name} (${meta.icon}): ${sym}${formatMoney(amt)} (${pct}%)`;
    }).join('\n') || '- 本月尚無支出紀錄';

    const recurringLines = state.recurring.map(r => {
      const isExp = r.type === 'expense';
      const cat = getCategoryMeta(r.type, r.category);
      const title = getItemTitle(r) || cat.name;
      return `- [${isExp ? '固定支出' : '固定收入'}] ${title}: 每月 ${r.day} 號 ${sym}${formatMoney(r.amount)}`;
    }).join('\n') || '- 目前無設定固定週期收支';

    const topExpenses = monthTxs
      .filter(t => t.type === 'expense')
      .sort((a, b) => Number(b.amount) - Number(a.amount))
      .slice(0, 5)
      .map((t, idx) => {
        const cat = getCategoryMeta(t.type, t.category);
        const title = getItemTitle(t) || cat.name;
        return `${idx + 1}. ${title} (${t.date}): ${sym}${formatMoney(t.amount)}`;
      })
      .join('\n') || '無';

    const txListSample = monthTxs.slice(0, 25).map(t => {
      const sign = t.type === 'expense' ? '-' : '+';
      const cat = getCategoryMeta(t.type, t.category);
      const title = getItemTitle(t);
      const displayDesc = title ? `${title} (${cat.name})` : cat.name;
      return `- ${t.date} | ${displayDesc} | ${sign}${sym}${formatMoney(t.amount)}`;
    }).join('\n') || '本月尚無明細';

    promptText = `# 財務健檢與預算分析請求 (來自 PocketFlow 記帳本)

你好！請擔任我的「個人專屬財務顧問與理財教練」。
以下是我在 PocketFlow 記帳本中本月份（${year}年 ${month}月）的真實收支與花費數據，請為我進行專業的財務評估與省錢健檢：

---

## 📊 本月財務數據概覽
- 記帳幣別：${state.currency} (${sym})
- 本月總收入：${sym}${formatMoney(income)}
- 本月總支出：${sym}${formatMoney(expense)}
- 本月結餘 (淨儲蓄)：${sym}${formatMoney(net)}
- 本月儲蓄率：${rate}%

## 🍩 支出分類佔比排行
${catLines}

## 🔍 本月前 5 大單筆支出項目
${topExpenses}

## 🔄 每月固定週期收支 (Recurring)
${recurringLines}

## 📝 本月消費明細清單
${txListSample}
${monthTxs.length > 25 ? `\n(還有 ${monthTxs.length - 25} 筆較小金額紀錄已略過)` : ''}

---

## 🎯 請針對以上數據，為我回答以下 4 個問題：
1. **【財務健康指數 (1-10分)】**：以我的儲蓄率、收支比與固定開銷比例，整體健康度如何？
2. **【花費盲點與「拿鐵因子」】**：根據明細，是否有非必要、重複性或可優化的隱形開銷？
3. **【50/30/20 預算調整建議】**：請幫我重新規劃下個月的預算分配（50% 必要需求、30% 彈性渴望、20% 儲蓄投資）。
4. **【下個月 3 個具體省錢行動】**：給我 3 個下個月容易落地執行的省錢微習慣。

謝謝！請用親切、專業、條理分明的繁體中文回答我。`;
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(promptText).then(showCopiedSuccess).catch(() => fallbackCopy(promptText));
  } else {
    fallbackCopy(promptText);
  }
}

function showCopiedSuccess() {
  const btnText = document.getElementById('copy-ai-btn-text');
  if (!btnText) return;
  const dict = I18N[state.lang] || I18N.en;
  const oldText = btnText.textContent;
  btnText.textContent = dict.copyAiSuccess;
  setTimeout(() => {
    btnText.textContent = oldText;
  }, 3500);
}

function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text;
  ta.style.position = 'fixed';
  ta.style.opacity = '0';
  document.body.appendChild(ta);
  ta.select();
  document.execCommand('copy');
  document.body.removeChild(ta);
  showCopiedSuccess();
}

// ================= DATA EXPORT & IMPORT =================
function exportJSON() {
  const data = {
    appName: 'PocketFlow',
    version: 1,
    exportedAt: new Date().toISOString(),
    language: state.lang,
    currency: state.currency,
    transactions: state.transactions,
    recurring: state.recurring
  };
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pocketflow-backup-${new Date().toISOString().split('T')[0]}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function exportCSV() {
  const isEn = state.lang === 'en';
  let csv = isEn ? '\uFEFFDate,Type,Title,Category,Amount,Currency\n' : '\uFEFF日期,類型,項目名稱,分類,金額,幣別\n';

  state.transactions.forEach(t => {
    const meta = getCategoryMeta(t.type, t.category);
    const title = getItemTitle(t);
    const typeLabel = t.type === 'expense' ? (isEn ? 'Expense' : '支出') : (isEn ? 'Income' : '收入');
    const cleanTitle = (title || '').replace(/,/g, ' ');
    csv += `${t.date},${typeLabel},"${cleanTitle}",${meta.name},${t.amount},${t.currency || state.currency}\n`;
  });

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `pocketflow-transactions-${new Date().toISOString().split('T')[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;
  const dict = I18N[state.lang] || I18N.en;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data.transactions)) {
        if (confirm(dict.importConfirm(data.transactions.length))) {
          state.transactions = data.transactions;
          if (Array.isArray(data.recurring)) {
            state.recurring = data.recurring;
          } else {
            state.recurring = [];
          }
          if (data.currency) state.currency = data.currency;
          if (data.language) state.lang = data.language;
          state.isDemo = false;
          localStorage.setItem('pocketflow_is_demo', 'false');

          cancelEditRecurring();
          persistData();
          initCurrency();
          applyLanguage();
          checkDueRecurring();
          updateDemoBanner();
          alert(dict.importSuccess);
          document.getElementById('settings-modal').classList.add('hidden');
          document.getElementById('settings-modal').classList.remove('flex');
        }
      } else {
        alert(dict.importInvalid);
      }
    } catch (err) {
      alert(dict.importError);
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// ================= GOOGLE DRIVE BACKUP & RESTORE =================
function getGoogleClientId() {
  const custom = (localStorage.getItem(GDRIVE_CLIENT_ID_KEY) || '').trim();
  return custom || DEFAULT_GDRIVE_CLIENT_ID;
}

function updateGoogleDriveStatusUI() {
  const dict = I18N[state.lang] || I18N.en;
  const statusBadge = document.getElementById('gdrive-status-badge');
  const disconnectBtn = document.getElementById('gdrive-disconnect-btn');
  const lastBackupText = document.getElementById('gdrive-last-backup-text');
  const clientIdInput = document.getElementById('gdrive-client-id-input');

  const clientId = getGoogleClientId();
  if (clientIdInput && document.activeElement !== clientIdInput) {
    clientIdInput.value = clientId;
  }

  const isConnected = localStorage.getItem(GDRIVE_CONNECTED_KEY) === 'true';
  const userEmail = localStorage.getItem(GDRIVE_USER_EMAIL_KEY);
  const hasActiveToken = Boolean(gdriveAccessToken && Date.now() < gdriveTokenExpiresAt - 10000);

  // Status Badge & Disconnect Button
  if (statusBadge) {
    if (hasActiveToken || isConnected) {
      const emailDisplay = userEmail ? ` (${userEmail})` : '';
      statusBadge.textContent = `${dict.gdriveStatusConnected}${emailDisplay}`;
      statusBadge.className = 'text-[10px] px-2 py-0.5 rounded-full font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400';
      if (disconnectBtn) disconnectBtn.classList.remove('hidden');
    } else if (clientId) {
      statusBadge.textContent = dict.gdriveStatusDisconnected;
      statusBadge.className = 'text-[10px] px-2 py-0.5 rounded-full font-medium bg-slate-200/70 dark:bg-slate-700 text-slate-500 dark:text-slate-400';
      if (disconnectBtn) disconnectBtn.classList.add('hidden');
    } else {
      statusBadge.textContent = dict.gdriveStatusNeedConfig;
      statusBadge.className = 'text-[10px] px-2 py-0.5 rounded-full font-medium bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400';
      if (disconnectBtn) disconnectBtn.classList.add('hidden');
    }
  }

  // Last Backup Info
  if (lastBackupText) {
    const lastBackupIso = localStorage.getItem(GDRIVE_LAST_BACKUP_KEY);
    if (lastBackupIso) {
      const d = new Date(lastBackupIso);
      const timeStr = state.lang === 'zh-TW'
        ? `${d.getFullYear()}/${d.getMonth() + 1}/${d.getDate()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
        : d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
      lastBackupText.textContent = dict.gdriveLastBackup(timeStr);
    } else {
      lastBackupText.textContent = dict.gdriveNoBackup;
    }
  }
}

async function fetchGoogleDriveUserInfo(token) {
  try {
    const res = await fetch('https://www.googleapis.com/drive/v3/about?fields=user(displayName,emailAddress)', {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.ok) {
      const data = await res.json();
      if (data.user && data.user.emailAddress) {
        localStorage.setItem(GDRIVE_USER_EMAIL_KEY, data.user.emailAddress);
        updateGoogleDriveStatusUI();
      }
    }
  } catch (e) {
    console.log('Failed to fetch Drive user info:', e);
  }
}

function disconnectGoogleDrive() {
  const dict = I18N[state.lang] || I18N.en;
  if (!confirm(dict.gdriveDisconnectConfirm)) return;

  if (gdriveAccessToken && typeof google !== 'undefined' && google.accounts && google.accounts.oauth2) {
    try {
      google.accounts.oauth2.revoke(gdriveAccessToken, () => {});
    } catch (e) {
      console.log('Revoke token note:', e);
    }
  }

  gdriveAccessToken = null;
  gdriveTokenExpiresAt = 0;
  localStorage.removeItem(GDRIVE_TOKEN_KEY);
  localStorage.removeItem(GDRIVE_TOKEN_EXPIRES_KEY);
  localStorage.removeItem(GDRIVE_USER_EMAIL_KEY);
  localStorage.removeItem(GDRIVE_CONNECTED_KEY);
  updateGoogleDriveStatusUI();
}

function initGoogleDriveClient(callback) {
  const dict = I18N[state.lang] || I18N.en;
  const clientId = getGoogleClientId();

  if (!clientId) {
    alert(dict.gdriveMissingClientId);
    const panel = document.getElementById('gdrive-config-panel');
    if (panel) panel.classList.remove('hidden');
    const input = document.getElementById('gdrive-client-id-input');
    if (input) input.focus();
    return;
  }

  if (typeof google === 'undefined' || !google.accounts || !google.accounts.oauth2) {
    alert(dict.gdriveLibraryLoading);
    return;
  }

  // Reuse unexpired access token
  if (gdriveAccessToken && Date.now() < gdriveTokenExpiresAt - 30000) {
    callback(gdriveAccessToken);
    return;
  }

  try {
    gdriveTokenClient = google.accounts.oauth2.initTokenClient({
      client_id: clientId,
      scope: 'https://www.googleapis.com/auth/drive.file',
      callback: (response) => {
        if (response.error) {
          console.error('Google OAuth error:', response);
          if (response.error !== 'popup_closed_by_user') {
            alert(dict.gdriveBackupError(response.error_description || response.error));
          }
          return;
        }
        gdriveAccessToken = response.access_token;
        const expiresInSec = parseInt(response.expires_in, 10) || 3599;
        gdriveTokenExpiresAt = Date.now() + expiresInSec * 1000;
        localStorage.setItem(GDRIVE_TOKEN_KEY, gdriveAccessToken);
        localStorage.setItem(GDRIVE_TOKEN_EXPIRES_KEY, String(gdriveTokenExpiresAt));
        localStorage.setItem(GDRIVE_CONNECTED_KEY, 'true');
        fetchGoogleDriveUserInfo(gdriveAccessToken);
        updateGoogleDriveStatusUI();
        callback(gdriveAccessToken);
      }
    });

    gdriveTokenClient.requestAccessToken({ prompt: '' });
  } catch (err) {
    console.error('GIS initialization error:', err);
    alert(err.message || 'Google Auth Error');
  }
}

async function backupToGoogleDrive() {
  const dict = I18N[state.lang] || I18N.en;
  const backupBtn = document.getElementById('gdrive-backup-btn');
  const backupLabel = document.getElementById('gdrive-backup-label');
  const originalLabel = backupLabel ? backupLabel.textContent : '';

  initGoogleDriveClient(async (token) => {
    try {
      if (backupBtn) backupBtn.disabled = true;
      if (backupLabel) backupLabel.textContent = dict.gdriveBackingUp;

      const backupData = {
        appName: 'PocketFlow',
        version: 1,
        exportedAt: new Date().toISOString(),
        language: state.lang,
        currency: state.currency,
        transactions: state.transactions,
        recurring: state.recurring
      };

      // Search for existing backup file
      const q = encodeURIComponent("name = 'pocketflow-backup.json' and trashed = false");
      const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (searchRes.status === 401) {
        gdriveAccessToken = null;
        gdriveTokenExpiresAt = 0;
        localStorage.removeItem(GDRIVE_TOKEN_KEY);
        localStorage.removeItem(GDRIVE_TOKEN_EXPIRES_KEY);
        updateGoogleDriveStatusUI();
        throw new Error('Google authorization expired. Please try again.');
      }

      if (!searchRes.ok) {
        const errText = await searchRes.text();
        throw new Error(`Search failed (${searchRes.status}): ${errText}`);
      }

      const searchJson = await searchRes.json();
      const existingFile = searchJson.files && searchJson.files.length > 0 ? searchJson.files[0] : null;

      if (existingFile) {
        // Update existing file content
        const updateRes = await fetch(`https://www.googleapis.com/upload/drive/v3/files/${existingFile.id}?uploadType=media`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json; charset=UTF-8'
          },
          body: JSON.stringify(backupData, null, 2)
        });

        if (!updateRes.ok) {
          const errText = await updateRes.text();
          throw new Error(`Update failed (${updateRes.status}): ${errText}`);
        }
      } else {
        // Create new backup file
        const metadata = {
          name: 'pocketflow-backup.json',
          mimeType: 'application/json'
        };
        const boundary = '-------pocketflow_multipart_' + Date.now();
        const delimiter = `\r\n--${boundary}\r\n`;
        const closeDelim = `\r\n--${boundary}--`;

        const multipartBody =
          delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          JSON.stringify(metadata) +
          delimiter +
          'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
          JSON.stringify(backupData, null, 2) +
          closeDelim;

        const createRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': `multipart/related; boundary=${boundary}`
          },
          body: multipartBody
        });

        if (!createRes.ok) {
          const errText = await createRes.text();
          throw new Error(`Create failed (${createRes.status}): ${errText}`);
        }
      }

      // Record successful backup time
      localStorage.setItem(GDRIVE_LAST_BACKUP_KEY, new Date().toISOString());
      updateGoogleDriveStatusUI();
      alert(dict.gdriveBackupSuccess);
    } catch (err) {
      console.error('Google Drive backup error:', err);
      alert(dict.gdriveBackupError(err.message || 'Unknown error'));
    } finally {
      if (backupBtn) backupBtn.disabled = false;
      if (backupLabel) backupLabel.textContent = originalLabel;
    }
  });
}

async function restoreFromGoogleDrive() {
  const dict = I18N[state.lang] || I18N.en;
  const restoreBtn = document.getElementById('gdrive-restore-btn');
  const restoreLabel = document.getElementById('gdrive-restore-label');
  const originalLabel = restoreLabel ? restoreLabel.textContent : '';

  initGoogleDriveClient(async (token) => {
    try {
      if (restoreBtn) restoreBtn.disabled = true;
      if (restoreLabel) restoreLabel.textContent = dict.gdriveRestoring;

      const q = encodeURIComponent("name = 'pocketflow-backup.json' and trashed = false");
      const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${q}&fields=files(id,name,modifiedTime)&orderBy=modifiedTime desc`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (searchRes.status === 401) {
        gdriveAccessToken = null;
        gdriveTokenExpiresAt = 0;
        localStorage.removeItem(GDRIVE_TOKEN_KEY);
        localStorage.removeItem(GDRIVE_TOKEN_EXPIRES_KEY);
        updateGoogleDriveStatusUI();
        throw new Error('Google authorization expired. Please try again.');
      }

      if (!searchRes.ok) {
        const errText = await searchRes.text();
        throw new Error(`Search failed (${searchRes.status}): ${errText}`);
      }

      const searchJson = await searchRes.json();
      if (!searchJson.files || searchJson.files.length === 0) {
        alert(dict.gdriveRestoreNotFound);
        return;
      }

      const targetFile = searchJson.files[0];

      // Download backup JSON content
      const contentRes = await fetch(`https://www.googleapis.com/drive/v3/files/${targetFile.id}?alt=media`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!contentRes.ok) {
        const errText = await contentRes.text();
        throw new Error(`Download failed (${contentRes.status}): ${errText}`);
      }

      const data = await contentRes.json();

      if (!Array.isArray(data.transactions)) {
        alert(dict.importInvalid);
        return;
      }

      const dateStr = data.exportedAt
        ? (state.lang === 'zh-TW'
            ? new Date(data.exportedAt).toLocaleString('zh-TW')
            : new Date(data.exportedAt).toLocaleString('en-US'))
        : (targetFile.modifiedTime ? new Date(targetFile.modifiedTime).toLocaleString() : '');

      if (confirm(dict.gdriveRestoreConfirm(dateStr, data.transactions.length))) {
        state.transactions = data.transactions;
        state.recurring = Array.isArray(data.recurring) ? data.recurring : [];
        if (data.currency) state.currency = data.currency;
        if (data.language) state.lang = data.language;
        state.isDemo = false;
        localStorage.setItem('pocketflow_is_demo', 'false');

        cancelEditRecurring();
        persistData();
        initCurrency();
        applyLanguage();
        checkDueRecurring();
        updateDemoBanner();

        alert(dict.gdriveRestoreSuccess);
        const settingsModal = document.getElementById('settings-modal');
        if (settingsModal) {
          settingsModal.classList.add('hidden');
          settingsModal.classList.remove('flex');
        }
      }
    } catch (err) {
      console.error('Google Drive restore error:', err);
      alert(dict.gdriveRestoreError(err.message || 'Unknown error'));
    } finally {
      if (restoreBtn) restoreBtn.disabled = false;
      if (restoreLabel) restoreLabel.textContent = originalLabel;
    }
  });
}

// Register Service Worker for PWA with aggressive update checks & instant reload
if ('serviceWorker' in navigator) {
  let hadController = Boolean(navigator.serviceWorker.controller);
  let refreshing = false;

  function triggerPwaReload() {
    if (refreshing) return;
    refreshing = true;
    window.location.reload();
  }

  function showPwaUpdateBanner() {
    const banner = document.getElementById('pwa-update-banner');
    if (banner) {
      banner.classList.remove('hidden');
    }
  }

  // When SW claims control, reload immediately if idle, or prompt user
  if (typeof navigator.serviceWorker.addEventListener === 'function') {
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!hadController) {
        hadController = true;
        return;
      }
      // Check if user is actively entering an unsaved transaction
      const modal = document.getElementById('add-modal');
      const isModalOpen = modal && !modal.classList.contains('hidden');
      const titleVal = document.getElementById('input-title') ? document.getElementById('input-title').value.trim() : '';
      const amountVal = document.getElementById('input-amount') ? document.getElementById('input-amount').value.trim() : '';
      const isDirty = isModalOpen && (Boolean(titleVal) || (Boolean(amountVal) && amountVal !== '0'));

      if (isDirty) {
        showPwaUpdateBanner();
      } else {
        triggerPwaReload();
      }
    });
  }

  window.addEventListener('load', () => {
    // updateViaCache: 'none' bypasses HTTP caching for sw.js byte checks
    navigator.serviceWorker.register('./sw.js', { updateViaCache: 'none' }).then((reg) => {
      // Actively check for SW updates when page loads
      reg.update().catch(() => {});

      // If an update is downloaded & ready
      reg.addEventListener('updatefound', () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              showPwaUpdateBanner();
            }
          });
        }
      });

      // Re-check for updates whenever user returns to the app tab or focuses window
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible') {
          reg.update().catch(() => {});
        }
      });
      window.addEventListener('focus', () => {
        reg.update().catch(() => {});
      });
    }).catch(err => {
      console.log('SW registration note:', err);
    });
  });

  // Bind update button
  document.addEventListener('DOMContentLoaded', () => {
    const updateBtn = document.getElementById('pwa-update-btn');
    if (updateBtn) {
      updateBtn.addEventListener('click', triggerPwaReload);
    }
  });
}
