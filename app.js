// PocketFlow - Smart Expense Tracker for Pixel 10 Pro Fold
// State & Storage Configuration

const STORAGE_KEY = 'pocketflow_transactions_v1';
const RECURRING_KEY = 'pocketflow_recurring_v1';
const THEME_KEY = 'pocketflow_theme_v1';
const CURRENCY_KEY = 'pocketflow_currency_v1';

// Supported Currencies
const CURRENCIES = {
  USD: { symbol: '$', name: '美元' },
  TWD: { symbol: 'NT$', name: '新台幣' },
  JPY: { symbol: '¥', name: '日圓' },
  EUR: { symbol: '€', name: '歐元' },
  KRW: { symbol: '₩', name: '韓元' },
  HKD: { symbol: 'HK$', name: '港幣' },
  GBP: { symbol: '£', name: '英鎊' }
};

// Category Definitions with distinct color palette & icons
const CATEGORIES = {
  expense: [
    { id: 'food', name: '餐飲美食', icon: '🍔', color: '#f97316', bg: 'rgba(249, 115, 22, 0.15)' },
    { id: 'transport', name: '通勤交通', icon: '🚗', color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)' },
    { id: 'shopping', name: '購物消費', icon: '🛍️', color: '#ec4899', bg: 'rgba(236, 72, 153, 0.15)' },
    { id: 'entertainment', name: '休閒娛樂', icon: '🎮', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' },
    { id: 'housing', name: '居住水電', icon: '🏠', color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.15)' },
    { id: 'health', name: '醫療保健', icon: '💊', color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)' },
    { id: 'education', name: '學習進修', icon: '📚', color: '#eab308', bg: 'rgba(234, 179, 8, 0.15)' },
    { id: 'other_exp', name: '其他支出', icon: '✨', color: '#64748b', bg: 'rgba(100, 116, 139, 0.15)' }
  ],
  income: [
    { id: 'salary', name: '薪資收入', icon: '💰', color: '#10b981', bg: 'rgba(16, 185, 129, 0.15)' },
    { id: 'interest', name: '利息收入', icon: '🏦', color: '#0ea5e9', bg: 'rgba(14, 165, 233, 0.15)' },
    { id: 'invest', name: '投資回報', icon: '📈', color: '#6366f1', bg: 'rgba(99, 102, 241, 0.15)' },
    { id: 'bonus', name: '獎金分紅', icon: '🎉', color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.15)' },
    { id: 'parttime', name: '副業接案', icon: '💻', color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)' },
    { id: 'other_inc', name: '其他收入', icon: '🧧', color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.15)' }
  ]
};

// Initial Sample Data (can be cleared anytime by user)
const DEMO_TRANSACTIONS = [
  { id: 'tx_1', title: '超市日常補貨', amount: 68.5, type: 'expense', category: 'shopping', date: '2026-10-17' },
  { id: 'tx_2', title: '中杯燕麥熱拿鐵', amount: 5.75, type: 'expense', category: 'food', date: '2026-10-17' },
  { id: 'tx_3', title: '地鐵通勤週票', amount: 35, type: 'expense', category: 'transport', date: '2026-10-16' },
  { id: 'tx_4', title: '週末朋友聚餐', amount: 92, type: 'expense', category: 'food', date: '2026-10-15' },
  { id: 'tx_5', title: 'Netflix 串流訂閱', amount: 15.99, type: 'expense', category: 'entertainment', date: '2026-10-15', recurringId: 'rec_netflix' },
  { id: 'tx_9', title: '高利活存利息入帳', amount: 48.5, type: 'income', category: 'interest', date: '2026-10-12' },
  { id: 'tx_6', title: '10月份薪資入帳', amount: 5200, type: 'income', category: 'salary', date: '2026-10-05', recurringId: 'rec_salary' },
  { id: 'tx_7', title: '公寓房租與水電', amount: 1650, type: 'expense', category: 'housing', date: '2026-10-10', recurringId: 'rec_rent' },
  { id: 'tx_8', title: '網站設計接案款', amount: 850, type: 'income', category: 'parttime', date: '2026-10-08' }
];

const DEMO_RECURRING = [
  { id: 'rec_salary', title: '每月薪資發放', amount: 5200, type: 'income', category: 'salary', freq: 'monthly', day: 5 },
  { id: 'rec_rent', title: '公寓房租與水電', amount: 1650, type: 'expense', category: 'housing', freq: 'monthly', day: 10 },
  { id: 'rec_netflix', title: 'Netflix 串流訂閱', amount: 15.99, type: 'expense', category: 'entertainment', freq: 'monthly', day: 15 },
  { id: 'rec_gym', title: '健身房月費', amount: 45, type: 'expense', category: 'health', freq: 'monthly', day: 25 }
];

// App State
let state = {
  transactions: JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEMO_TRANSACTIONS,
  recurring: JSON.parse(localStorage.getItem(RECURRING_KEY)) || DEMO_RECURRING,
  currency: localStorage.getItem(CURRENCY_KEY) || 'USD',
  isDemo: localStorage.getItem('pocketflow_is_demo') !== 'false',
  currentDate: new Date(2026, 9, 1), // Oct 2026
  currentFilter: 'all',
  searchQuery: '',
  modalType: 'expense',
  selectedCategory: 'food',
  chartType: 'expense'
};

function getCurrencySymbol() {
  return (CURRENCIES[state.currency] && CURRENCIES[state.currency].symbol) || '$';
}

function updateCurrencySymbols() {
  const sym = getCurrencySymbol();
  document.querySelectorAll('.curr-symbol').forEach(el => {
    el.textContent = sym;
  });
}

// Autocomplete suggestions based on transaction history & common templates
function getAutocompleteSuggestions(query) {
  if (!query || query.trim() === '') return [];
  const q = query.toLowerCase().trim();
  const map = new Map();

  const presets = [
    { title: '大杯拿鐵', category: 'food', type: 'expense', amount: 85 },
    { title: '全聯日常採買', category: 'shopping', type: 'expense', amount: 650 },
    { title: '中油加油', category: 'transport', type: 'expense', amount: 150 },
    { title: 'Uber 乘車', category: 'transport', type: 'expense', amount: 240 },
    { title: '外送午餐', category: 'food', type: 'expense', amount: 180 },
    { title: 'Steam 遊戲特價', category: 'entertainment', type: 'expense', amount: 590 },
    { title: '銀行活存/定存利息', category: 'interest', type: 'income', amount: 35 },
    { title: '股票股利入帳', category: 'invest', type: 'income', amount: 3500 },
    { title: '專案獎金', category: 'bonus', type: 'income', amount: 10000 }
  ];

  [...state.transactions, ...presets].forEach(item => {
    if (item.title && item.title.toLowerCase().includes(q)) {
      if (!map.has(item.title)) {
        map.set(item.title, {
          title: item.title,
          category: item.category,
          amount: item.amount,
          type: item.type
        });
      }
    }
  });

  return Array.from(map.values()).slice(0, 5);
}

// Format Numbers with Commas
function formatMoney(amount) {
  return Number(amount || 0).toLocaleString('zh-TW');
}

// Helpers to get category meta
function getCategoryMeta(type, catId) {
  const list = CATEGORIES[type] || CATEGORIES.expense;
  return list.find(c => c.id === catId) || {
    id: catId,
    name: '其他',
    icon: '✨',
    color: '#64748b',
    bg: 'rgba(100, 116, 139, 0.15)'
  };
}

// Save to LocalStorage
function persistData() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.transactions));
  localStorage.setItem(RECURRING_KEY, JSON.stringify(state.recurring));
  localStorage.setItem(CURRENCY_KEY, state.currency);
  render();
}

// Initialize Elements
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initCurrency();
  initFoldScreenObserver();
  initEvents();
  render();
  checkDueRecurring();
  updateDemoBanner();
});

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

// Foldable Screen observer
function initFoldScreenObserver() {
  const updateScreenMode = () => {
    const isDualPane = window.innerWidth >= 768;
    const textEl = document.getElementById('screen-mode-text');
    if (textEl) {
      textEl.textContent = isDualPane ? '雙欄大螢幕模式 (展開)' : '單欄手機模式 (閉合)';
    }
  };
  window.addEventListener('resize', updateScreenMode);
  updateScreenMode();
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
  });
}

// Event Listeners Setup
function initEvents() {
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

  // Modal Open & Close
  const openModal = () => {
    document.getElementById('transaction-form').reset();
    document.getElementById('edit-id').value = '';
    document.getElementById('input-date').value = new Date().toISOString().split('T')[0];
    setModalType('expense');
    
    // Set default currency to last used in modal
    const lastCurr = localStorage.getItem('pocketflow_default_currency') || 'USD';
    const modalCurrSelect = document.getElementById('modal-currency-select');
    if (modalCurrSelect) modalCurrSelect.value = lastCurr;

    document.getElementById('add-modal').classList.remove('hidden');
    document.getElementById('add-modal').classList.add('flex');
    setTimeout(() => document.getElementById('input-amount').focus(), 100);
  };

  const closeModal = () => {
    document.getElementById('add-modal').classList.add('hidden');
    document.getElementById('add-modal').classList.remove('flex');
    document.getElementById('autocomplete-list').classList.add('hidden');
  };

  document.getElementById('open-add-modal-btn').addEventListener('click', openModal);
  document.getElementById('desktop-add-btn').addEventListener('click', openModal);
  document.getElementById('close-add-modal-btn').addEventListener('click', closeModal);

  // Modal Type Switchers
  document.getElementById('type-expense-btn').addEventListener('click', () => setModalType('expense'));
  document.getElementById('type-income-btn').addEventListener('click', () => setModalType('income'));

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
      const cat = getCategoryMeta(item.type, item.category);
      const itemSym = (CURRENCIES[item.currency] && CURRENCIES[item.currency].symbol) || '$';
      return `
        <div class="auto-item px-3 py-2.5 hover:bg-indigo-50 dark:hover:bg-slate-700/80 cursor-pointer flex items-center justify-between transition"
             data-title="${item.title}" data-category="${item.category}" data-type="${item.type}" data-amount="${item.amount}" data-currency="${item.currency || 'USD'}">
          <div class="flex items-center gap-2">
            <span class="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style="background:${cat.bg}">${cat.icon}</span>
            <div>
              <div class="text-xs font-bold text-slate-800 dark:text-slate-100">${item.title}</div>
              <div class="text-[10px] text-slate-400">${cat.name} · ${item.type === 'expense' ? '支出' : '收入'}</div>
            </div>
          </div>
          <div class="text-xs font-semibold ${item.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'}">
            ${itemSym} ${formatMoney(item.amount)}
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

        if (!document.getElementById('input-amount').value || document.getElementById('input-amount').value === '0') {
          document.getElementById('input-amount').value = recentAmt;
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

  // Submit Transaction Form
  document.getElementById('transaction-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const editId = document.getElementById('edit-id').value;
    const title = document.getElementById('input-title').value.trim();
    const amount = parseFloat(document.getElementById('input-amount').value) || 0;
    const date = document.getElementById('input-date').value;
    const currency = document.getElementById('modal-currency-select').value || 'USD';

    // Remember currency for next time
    localStorage.setItem('pocketflow_default_currency', currency);

    if (editId) {
      const idx = state.transactions.findIndex(t => t.id === editId);
      if (idx !== -1) {
        state.transactions[idx] = {
          ...state.transactions[idx],
          title,
          amount,
          type: state.modalType,
          category: state.selectedCategory,
          currency,
          date
        };
      }
    } else {
      const newTx = {
        id: 'tx_' + Date.now(),
        title,
        amount,
        type: state.modalType,
        category: state.selectedCategory,
        currency,
        date
      };
      state.transactions.unshift(newTx);
    }

    state.isDemo = false;
    localStorage.setItem('pocketflow_is_demo', 'false');
    updateDemoBanner();

    persistData();
    closeModal();
  });

  // Recurring Modal
  const recModal = document.getElementById('recurring-modal');
  const openRecModal = () => {
    renderRecurringList();
    recModal.classList.remove('hidden');
    recModal.classList.add('flex');
  };
  const closeRecModal = () => {
    recModal.classList.add('hidden');
    recModal.classList.remove('flex');
  };

  document.getElementById('open-recurring-modal-btn').addEventListener('click', openRecModal);
  document.getElementById('nav-recurring').addEventListener('click', openRecModal);
  document.getElementById('close-recurring-modal-btn').addEventListener('click', closeRecModal);

  // Settings Modal (Clear data / Reload data)
  // Settings Modal Handlers
  const settingsModal = document.getElementById('settings-modal');
  document.getElementById('open-settings-btn').addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
    settingsModal.classList.add('flex');
  });
  document.getElementById('close-settings-modal-btn').addEventListener('click', () => {
    settingsModal.classList.add('hidden');
    settingsModal.classList.remove('flex');
  });

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
      state.isDemo = false;
      localStorage.setItem('pocketflow_is_demo', 'false');
      persistData();
      checkDueRecurring();
      updateDemoBanner();
    });
  }

  // Clear all data (Start fresh)
  document.getElementById('clear-all-data-btn').addEventListener('click', () => {
    if (confirm('確定要清空所有紀錄嗎？清空後你將擁有一本完全乾淨的私密帳本！')) {
      state.transactions = [];
      state.isDemo = false;
      localStorage.setItem('pocketflow_is_demo', 'false');
      persistData();
      checkDueRecurring();
      updateDemoBanner();
      settingsModal.classList.add('hidden');
      settingsModal.classList.remove('flex');
    }
  });

  // Reload demo data
  document.getElementById('reload-demo-btn').addEventListener('click', () => {
    state.transactions = [...DEMO_TRANSACTIONS];
    state.isDemo = true;
    localStorage.setItem('pocketflow_is_demo', 'true');
    persistData();
    checkDueRecurring();
    updateDemoBanner();
    settingsModal.classList.add('hidden');
    settingsModal.classList.remove('flex');
  });

  // Add Recurring Rule Form
  document.getElementById('recurring-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('rec-title').value.trim();
    const currency = document.getElementById('rec-currency').value || 'USD';
    const amount = parseFloat(document.getElementById('rec-amount').value) || 0;
    const type = document.getElementById('rec-type').value;
    const freq = document.getElementById('rec-freq').value;
    const day = parseInt(document.getElementById('rec-day').value) || 1;

    const newRule = {
      id: 'rec_' + Date.now(),
      title,
      currency,
      amount,
      type,
      category: type === 'expense' ? 'housing' : 'salary',
      freq,
      day
    };

    state.recurring.push(newRule);
    persistData();
    renderRecurringList();
    checkDueRecurring();
    document.getElementById('recurring-form').reset();
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

function renderCategoryPicker() {
  const container = document.getElementById('category-grid');
  const list = CATEGORIES[state.modalType];

  if (!list.some(c => c.id === state.selectedCategory)) {
    state.selectedCategory = list[0].id;
  }

  container.innerHTML = list.map(cat => {
    const isSelected = cat.id === state.selectedCategory;
    return `
      <button type="button" class="category-btn flex flex-col items-center p-2 rounded-2xl border transition ${
        isSelected 
          ? 'border-indigo-500 bg-indigo-50/70 dark:bg-indigo-950/50 shadow-sm ring-2 ring-indigo-500/20' 
          : 'border-slate-200/80 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800'
      }" data-cat="${cat.id}">
        <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg mb-1" style="background:${cat.bg}">${cat.icon}</span>
        <span class="text-[11px] font-medium text-slate-700 dark:text-slate-200 truncate max-w-full">${cat.name}</span>
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

  if (dueItems.length > 0) {
    alertBar.classList.remove('hidden');
    alertText.textContent = `本月有 ${dueItems.length} 筆週期收支尚未入帳 (${dueItems.map(i => i.title).join('、')})`;
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

function renderRecurringList() {
  const listEl = document.getElementById('recurring-rules-list');
  if (state.recurring.length === 0) {
    listEl.innerHTML = '<p class="text-xs text-slate-400 text-center py-6">目前沒有設定定期項目</p>';
    return;
  }

  listEl.innerHTML = state.recurring.map(rule => {
    const cat = getCategoryMeta(rule.type, rule.category);
    const ruleSym = (CURRENCIES[rule.currency] && CURRENCIES[rule.currency].symbol) || '$';
    return `
      <div class="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
        <div class="flex items-center gap-3">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style="background:${cat.bg}">${cat.icon}</span>
          <div>
            <div class="text-xs font-bold text-slate-800 dark:text-slate-100">${rule.title}</div>
            <div class="text-[10px] text-slate-400">每月 ${rule.day} 號 · ${rule.type === 'expense' ? '支出' : '收入'}</div>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <div class="text-xs font-extrabold ${rule.type === 'expense' ? 'text-rose-500' : 'text-emerald-500'}">
            ${rule.type === 'expense' ? '-' : '+'}${ruleSym} ${formatMoney(rule.amount)}
          </div>
          <button class="delete-rec-btn p-1.5 text-slate-400 hover:text-rose-500 transition" data-id="${rule.id}">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </div>
    `;
  }).join('');

  listEl.querySelectorAll('.delete-rec-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
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

  document.getElementById('current-month-label').textContent = `${year}年 ${month}月`;

  const monthTxs = state.transactions.filter(t => t.date.startsWith(monthStr));

  let income = 0;
  let expense = 0;

  monthTxs.forEach(t => {
    if (t.type === 'income') income += Number(t.amount);
    if (t.type === 'expense') expense += Number(t.amount);
  });

  const net = income - expense;

  document.getElementById('total-income').textContent = formatMoney(income);
  document.getElementById('total-expense').textContent = formatMoney(expense);
  document.getElementById('net-balance').textContent = formatMoney(net);

  const balanceBadge = document.getElementById('balance-badge');
  if (net >= 0) {
    balanceBadge.textContent = '盈餘良好 ✨';
    balanceBadge.className = 'px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-bold';
  } else {
    balanceBadge.textContent = '赤字注意 ⚠️';
    balanceBadge.className = 'px-2 py-0.5 rounded-full bg-rose-400/20 text-rose-300 text-[11px] font-bold';
  }

  const sym = getCurrencySymbol();
  const rate = income > 0 ? Math.round((net / income) * 100) : 0;
  document.getElementById('savings-rate-label').textContent = `${rate}% (結餘 ${sym} ${formatMoney(net)})`;

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

  document.getElementById('donut-center-sub').textContent = state.chartType === 'expense' ? '本月總支出' : '本月總收入';
  document.getElementById('donut-center-val').textContent = `${sym} ${formatMoney(total)}`;
  document.getElementById('donut-center-cat').textContent = '全部類別';

  if (total === 0) {
    svg.innerHTML = `
      <circle cx="100" cy="100" r="70" fill="none" stroke="#e2e8f0" stroke-width="24" class="dark:stroke-slate-800"/>
    `;
    legend.innerHTML = '<p class="text-xs text-slate-400 text-center py-4">本月尚無資料</p>';
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
      document.getElementById('donut-center-sub').textContent = `${pct}% 佔比`;
      document.getElementById('donut-center-val').textContent = `${sym} ${formatMoney(amt)}`;
      document.getElementById('donut-center-cat').textContent = name;
    };

    const handleReset = () => {
      document.getElementById('donut-center-sub').textContent = state.chartType === 'expense' ? '本月總支出' : '本月總收入';
      document.getElementById('donut-center-val').textContent = `${sym} ${formatMoney(total)}`;
      document.getElementById('donut-center-cat').textContent = '全部類別';
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
      <div class="flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition">
        <div class="flex items-center gap-2.5">
          <span class="w-7 h-7 rounded-lg flex items-center justify-center text-sm" style="background:${meta.bg}">
            ${meta.icon}
          </span>
          <span class="text-xs font-semibold text-slate-700 dark:text-slate-200">${meta.name}</span>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[11px] font-bold text-slate-400">${pctText}</span>
          <span class="text-xs font-bold text-slate-800 dark:text-slate-100">${sym} ${formatMoney(amount)}</span>
        </div>
      </div>
    `;
  }).join('');
}

function renderTransactions() {
  const container = document.getElementById('transactions-container');
  const emptyState = document.getElementById('empty-state');
  const sym = getCurrencySymbol();

  const year = state.currentDate.getFullYear();
  const month = state.currentDate.getMonth() + 1;
  const monthStr = `${year}-${String(month).padStart(2, '0')}`;

  let list = state.transactions.filter(t => t.date.startsWith(monthStr));

  if (state.currentFilter !== 'all') {
    list = list.filter(t => t.type === state.currentFilter);
  }

  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(t => t.title.toLowerCase().includes(q));
  }

  if (list.length === 0) {
    container.innerHTML = '';
    emptyState.classList.remove('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  list.sort((a, b) => new Date(b.date) - new Date(a.date));

  const groups = {};
  list.forEach(t => {
    if (!groups[t.date]) groups[t.date] = [];
    groups[t.date].push(t);
  });

  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  container.innerHTML = Object.entries(groups).map(([dateStr, items]) => {
    let dateLabel = dateStr;
    if (dateStr === todayStr) dateLabel = '今天';
    else if (dateStr === yesterdayStr) dateLabel = '昨天';
    else {
      const d = new Date(dateStr);
      dateLabel = `${d.getMonth() + 1}月${d.getDate()}日`;
    }

    const dayTotalExpense = items.filter(i => i.type === 'expense').reduce((sum, i) => sum + Number(i.amount), 0);

    const itemsHtml = items.map(item => {
      const meta = getCategoryMeta(item.type, item.category);
      const isExpense = item.type === 'expense';
      const itemSym = (CURRENCIES[item.currency] && CURRENCIES[item.currency].symbol) || sym;
      return `
        <div class="group flex items-center justify-between p-3.5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 shadow-sm transition">
          <div class="flex items-center gap-3">
            <span class="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-sm" style="background:${meta.bg}">
              ${meta.icon}
            </span>
            <div>
              <div class="text-xs font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
                ${item.title}
                ${item.recurringId ? '<span class="text-[9px] px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-500 font-semibold dark:bg-indigo-950 dark:text-indigo-400">週期</span>' : ''}
              </div>
              <div class="text-[10px] text-slate-400 font-medium">${meta.name}</div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <div class="text-right">
              <div class="text-sm font-extrabold ${isExpense ? 'text-rose-500' : 'text-emerald-500'}">
                ${isExpense ? '-' : '+'}${itemSym} ${formatMoney(item.amount)}
              </div>
            </div>

            <button class="delete-tx-btn opacity-0 group-hover:opacity-100 p-1.5 text-slate-300 hover:text-rose-500 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition"
                    data-id="${item.id}" title="刪除紀錄">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      `;
    }).join('');

    return `
      <div class="space-y-2">
        <div class="flex items-center justify-between px-2 text-xs font-semibold text-slate-400">
          <span>${dateLabel} (${dateStr})</span>
          ${dayTotalExpense > 0 ? `<span>日支出 ${sym} ${formatMoney(dayTotalExpense)}</span>` : ''}
        </div>
        <div class="space-y-1.5">
          ${itemsHtml}
        </div>
      </div>
    `;
  }).join('');

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

  // Breakdown lines
  const sortedCats = Object.entries(catSums).sort((a, b) => b[1] - a[1]);
  const catLines = sortedCats.map(([catId, amt]) => {
    const meta = getCategoryMeta('expense', catId);
    const pct = expense > 0 ? Math.round((amt / expense) * 100) : 0;
    return `- ${meta.name} (${meta.icon}): ${sym}${formatMoney(amt)} (${pct}%)`;
  }).join('\n') || '- 本月尚無支出紀錄';

  // Recurring lines
  const recurringLines = state.recurring.map(r => {
    const isExp = r.type === 'expense';
    return `- [${isExp ? '固定支出' : '固定收入'}] ${r.title}: 每月 ${r.day} 號 ${sym}${formatMoney(r.amount)}`;
  }).join('\n') || '- 目前無設定固定週期收支';

  // Top 5 largest expenses
  const topExpenses = monthTxs
    .filter(t => t.type === 'expense')
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .slice(0, 5)
    .map((t, idx) => `${idx + 1}. ${t.title} (${t.date}): ${sym}${formatMoney(t.amount)}`)
    .join('\n') || '無';

  // Transaction items sample
  const txListSample = monthTxs.slice(0, 25).map(t => {
    const sign = t.type === 'expense' ? '-' : '+';
    const cat = getCategoryMeta(t.type, t.category);
    return `- ${t.date} | ${t.title} (${cat.name}) | ${sign}${sym}${formatMoney(t.amount)}`;
  }).join('\n') || '本月尚無明細';

  const promptText = `# 財務健檢與預算分析請求 (來自 PocketFlow 記帳本)

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

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(promptText).then(showCopiedSuccess).catch(() => fallbackCopy(promptText));
  } else {
    fallbackCopy(promptText);
  }
}

function showCopiedSuccess() {
  const btnText = document.getElementById('copy-ai-btn-text');
  if (!btnText) return;
  const oldText = btnText.textContent;
  btnText.textContent = '✅ 已複製！可直接貼給 Gemini 或 ChatGPT';
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
  let csv = '\uFEFF日期,類型,項目名稱,分類,金額,幣別\n';
  state.transactions.forEach(t => {
    const meta = getCategoryMeta(t.type, t.category);
    const typeLabel = t.type === 'expense' ? '支出' : '收入';
    const cleanTitle = (t.title || '').replace(/,/g, ' ');
    csv += `${t.date},${typeLabel},"${cleanTitle}",${meta.name},${t.amount},${state.currency}\n`;
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

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const data = JSON.parse(event.target.result);
      if (Array.isArray(data.transactions)) {
        if (confirm(`成功讀取備份檔！包含 ${data.transactions.length} 筆交易紀錄。\n確定要匯入並覆蓋目前紀錄嗎？`)) {
          state.transactions = data.transactions;
          if (Array.isArray(data.recurring)) state.recurring = data.recurring;
          if (data.currency) state.currency = data.currency;

          persistData();
          initCurrency();
          checkDueRecurring();
          alert('🎉 備份還原成功！');
          document.getElementById('settings-modal').classList.add('hidden');
          document.getElementById('settings-modal').classList.remove('flex');
        }
      } else {
        alert('檔案格式不正確，找不到交易紀錄。');
      }
    } catch (err) {
      alert('解析檔案失敗，請確認是有效的 JSON 備份檔。');
    }
  };
  reader.readAsText(file);
  e.target.value = '';
}

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').catch(err => {
      console.log('SW registration note:', err);
    });
  });
}

