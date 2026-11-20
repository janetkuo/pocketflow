#!/usr/bin/env python3
"""
PocketFlow Pre-Push Verification Suite
Validates JavaScript syntax, DOM element bindings, and core runtime logic.
"""

import re
import subprocess
import sys
import os

def check_js_syntax():
    print("🔍 [1/4] Validating JavaScript syntax with macOS JavaScriptCore...")
    
    # Test app.js
    app_test = """
    const setTimeout = () => 1;
    const clearTimeout = () => {};
    const localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
    const navigator = { serviceWorker: { register: () => Promise.resolve(), addEventListener: () => {} } };
    const window = { addEventListener: () => {}, innerWidth: 1024, matchMedia: () => ({ matches: false }) };
    const _els = {};
    const document = {
      documentElement: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } },
      addEventListener: () => {},
      getElementById: (id) => (_els[id] || (_els[id] = { classList: { add: () => {}, remove: () => {}, toggle: () => {} }, setAttribute: () => {}, addEventListener: () => {}, focus: () => {} })),
      querySelectorAll: () => []
    };
    eval($.NSString.stringWithContentsOfFileEncodingError('app.js', $.NSUTF8StringEncoding, null).js);
    'OK'
    """
    proc = subprocess.run(['osascript', '-l', 'JavaScript', '-e', app_test], capture_output=True, text=True)
    if proc.returncode != 0:
        print(f"❌ Syntax Error in app.js:\n{proc.stderr.strip()}")
        return False
    print("   ✅ app.js parsed and executed cleanly with 0 syntax errors.")

    # Test sw.js
    sw_test = """
    const self = {
      addEventListener: () => {},
      skipWaiting: () => {},
      clients: { claim: () => {} }
    };
    const caches = { open: () => Promise.resolve(), keys: () => Promise.resolve([]) };
    eval($.NSString.stringWithContentsOfFileEncodingError('sw.js', $.NSUTF8StringEncoding, null).js);
    'OK'
    """
    proc = subprocess.run(['osascript', '-l', 'JavaScript', '-e', sw_test], capture_output=True, text=True)
    if proc.returncode != 0:
        print(f"❌ Syntax Error in sw.js:\n{proc.stderr.strip()}")
        return False
    print("   ✅ sw.js parsed cleanly.")
    return True

def check_dom_ids():
    print("🔍 [2/4] Checking DOM ID bindings between app.js and index.html...")
    if not os.path.exists('app.js') or not os.path.exists('index.html'):
        print("❌ app.js or index.html not found!")
        return False

    with open('app.js') as f:
        app_js = f.read()
    with open('index.html') as f:
        html = f.read()
    
    ids_in_js = set(re.findall(r'document\.getElementById\([\'\"]([a-zA-Z0-9_-]+)[\'\"]\)', app_js))
    all_ids_in_html = re.findall(r'id=[\'\"]([a-zA-Z0-9_-]+)[\'\"]', html)
    ids_in_html = set(all_ids_in_html)

    duplicates = sorted({i for i in all_ids_in_html if all_ids_in_html.count(i) > 1})
    if duplicates:
        print(f"❌ Duplicate element IDs in index.html: {duplicates}")
        return False
    
    missing = ids_in_js - ids_in_html
    if missing:
        print(f"❌ Missing element IDs in index.html: {missing}")
        return False
    print(f"   ✅ All {len(ids_in_js)} DOM IDs match between app.js and index.html (0 duplicates).")
    return True

def check_business_logic():
    print("🔍 [3/4] Validating helper functions and core calculations...")
    test_logic = """
    const setTimeout = () => 1;
    const clearTimeout = () => {};
    const localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
    const navigator = { serviceWorker: { register: () => Promise.resolve(), addEventListener: () => {} } };
    const window = { addEventListener: () => {}, innerWidth: 1024, matchMedia: () => ({ matches: false }) };
    const _els = {};
    const document = {
      documentElement: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } },
      addEventListener: () => {},
      getElementById: (id) => (_els[id] || (_els[id] = { classList: { add: () => {}, remove: () => {}, toggle: () => {} }, setAttribute: () => {}, addEventListener: () => {}, focus: () => {} })),
      querySelectorAll: () => []
    };
    eval($.NSString.stringWithContentsOfFileEncodingError('app.js', $.NSUTF8StringEncoding, null).js);
    
    // Check formatMoney 2-decimal alignment
    const usd = formatMoney(6098.5, 'USD');
    if (usd !== '6,098.50') throw new Error('formatMoney USD failed: got ' + usd);

    // Check smart category icon resolution
    const latteIcon = resolveItemIcon('food', '中杯燕麥熱拿鐵');
    if (latteIcon !== '☕') throw new Error('resolveItemIcon latte failed: got ' + latteIcon);

    const metroIcon = resolveItemIcon('transport', '地鐵通勤週票');
    if (metroIcon !== '🚇') throw new Error('resolveItemIcon metro failed: got ' + metroIcon);

    const shoppingIcon = resolveItemIcon('shopping', '商場生活用品購物', '🛍️');
    if (shoppingIcon !== '🛍️') throw new Error('resolveItemIcon shopping failed: got ' + shoppingIcon);

    const gamingIcon = resolveItemIcon('entertainment', '遊戲娛樂月費訂閱', '🎮');
    if (gamingIcon !== '🎮') throw new Error('resolveItemIcon gaming failed: got ' + gamingIcon);

    const healthIcon = resolveItemIcon('health', '常備保健品定期方案', '💊');
    if (healthIcon !== '💊') throw new Error('resolveItemIcon health failed: got ' + healthIcon);

    const travelIcon = resolveItemIcon('travel', '日本東京飯店住宿', '✈️');
    if (travelIcon !== '🏨') throw new Error('resolveItemIcon travel failed: got ' + travelIcon);

    const groceryIcon = resolveItemIcon('groceries', '全聯生鮮蔬菜', '🛒');
    if (groceryIcon !== '🛒') throw new Error('resolveItemIcon groceries failed: got ' + groceryIcon);

    const householdIcon = resolveItemIcon('household', '好市多三層抽取衛生紙', '🧻');
    if (householdIcon !== '🧻') throw new Error('resolveItemIcon household failed: got ' + householdIcon);

    const beautyIcon = resolveItemIcon('apparel', '專櫃保養品乳液', '👗');
    if (beautyIcon !== '💄') throw new Error('resolveItemIcon apparel/beauty failed: got ' + beautyIcon);

    const taxIcon = resolveItemIcon('taxes', '年度綜合所得稅繳納', '🧾');
    if (taxIcon !== '🧾') throw new Error('resolveItemIcon taxes failed: got ' + taxIcon);

    const dessertIcon = resolveItemIcon('drinks', '法式草莓千層蛋糕', '☕');
    if (dessertIcon !== '🥐') throw new Error('resolveItemIcon dessert failed: got ' + dessertIcon);

    // Check recurring schedule subtext formatting (Weekly vs Monthly)
    const enWeekly = window.I18N.en.recurringItemSub(1, 'expense', 'weekly');
    if (enWeekly !== 'Every Monday · Expense') throw new Error('enWeekly failed: ' + enWeekly);

    const twWeekly = window.I18N['zh-TW'].recurringItemSub(1, 'expense', 'weekly');
    if (twWeekly !== '每週一 · 支出') throw new Error('twWeekly failed: ' + twWeekly);

    const enMonthly = window.I18N.en.recurringItemSub(10, 'expense', 'monthly');
    if (enMonthly !== 'Day 10 each month · Expense') throw new Error('enMonthly failed: ' + enMonthly);

    const twMonthly = window.I18N['zh-TW'].recurringItemSub(10, 'expense', 'monthly');
    if (twMonthly !== '每月 10 號 · 支出') throw new Error('twMonthly failed: ' + twMonthly);

    const evChargeIcon = resolveItemIcon('transport', 'Tesla 特斯拉超充站充電', '🚗');
    if (evChargeIcon !== '⚡') throw new Error('resolveItemIcon ev charging failed: got ' + evChargeIcon);

    const tollIcon = resolveItemIcon('transport', '國道 eTag 通行費', '🚗');
    if (tollIcon !== '🛣️') throw new Error('resolveItemIcon tolls failed: got ' + tollIcon);

    const tireIcon = resolveItemIcon('transport', '特斯拉原廠換輪胎保養', '🚗');
    if (tireIcon !== '🔧') throw new Error('resolveItemIcon tire repair failed: got ' + tireIcon);

    const carLoanIcon = resolveItemIcon('transport', 'Tesla 每月車貸扣繳', '🚗');
    if (carLoanIcon !== '🚗') throw new Error('resolveItemIcon auto loan failed: got ' + carLoanIcon);

    const aiIcon = resolveItemIcon('education', 'Google AI Pro 方案訂閱', '📚');
    if (aiIcon !== '🤖') throw new Error('resolveItemIcon AI Pro failed: got ' + aiIcon);

    const laptopIcon = resolveItemIcon('shopping', 'MacBook Air M3 筆電', '📱');
    if (laptopIcon !== '💻') throw new Error('resolveItemIcon laptop failed: got ' + laptopIcon);

    const earphoneIcon = resolveItemIcon('shopping', 'AirPods Pro 2 降噪耳機', '📱');
    if (earphoneIcon !== '🎧') throw new Error('resolveItemIcon earphones failed: got ' + earphoneIcon);

    const cloudIcon = resolveItemIcon('housing', 'iCloud 2TB 雲端空間', '🏠');
    if (cloudIcon !== '☁️') throw new Error('resolveItemIcon cloud failed: got ' + cloudIcon);

    // Check HTML escaping & CSV escaping
    const escaped = escapeHtml('<img src=x onerror="alert(1)"> & \\'test\\'');
    if (escaped !== '&lt;img src=x onerror=&quot;alert(1)&quot;&gt; &amp; &#39;test&#39;') {
      throw new Error('escapeHtml failed: ' + escaped);
    }

    const csvFormula = escapeCsvCell('=CMD("calc")');
    if (csvFormula !== '"\\'=CMD(""calc"")"') {
      throw new Error('escapeCsvCell formula failed: ' + csvFormula);
    }
    const csvQuotes = escapeCsvCell('Coffee "Large", Iced');
    if (csvQuotes !== '"Coffee ""Large"", Iced"') {
      throw new Error('escapeCsvCell quotes failed: ' + csvQuotes);
    }
    const csvNewline = escapeCsvCell("Line1\\nLine2");
    if (csvNewline !== '"Line1\\nLine2"') {
      throw new Error('escapeCsvCell newline failed: ' + csvNewline);
    }
    const csvMinus = escapeCsvCell('-1+1');
    if (csvMinus !== "\\'-1+1") {
      throw new Error('escapeCsvCell minus formula failed: ' + csvMinus);
    }

    // Check expression evaluation & validation
    if (evaluateExpression('12.5 + 3 * 2') !== 18.5) throw new Error('evaluateExpression order of ops failed');
    if (evaluateExpression('12.34.56') !== null) throw new Error('evaluateExpression malformed decimal should be null');
    if (evaluateExpression('5++3') !== null) throw new Error('evaluateExpression double operator should be null');
    if (!isDivisionByZeroExpr('10 / 0.00')) throw new Error('isDivisionByZeroExpr failed for 0.00');
    if (!isDivisionByZeroExpr('10 / 0.')) throw new Error('isDivisionByZeroExpr failed for 0.');
    if (!isDivisionByZeroExpr('10 ÷ .0')) throw new Error('isDivisionByZeroExpr failed for .0');
    if (isDivisionByZeroExpr('10 / 0.5')) throw new Error('isDivisionByZeroExpr false positive for 0.5');
    if (isDivisionByZeroExpr('5 + 0 / 2')) throw new Error('isDivisionByZeroExpr false positive for 5 + 0 / 2');

    // Check bilingual title editing sync
    const txItem = { title: 'Oat Milk Latte', title_tw: '中杯燕麥熱拿鐵' };
    const unchangedCopy = { ...txItem };
    applyEditedTitle(unchangedCopy, txItem, 'Oat Milk Latte', 'en');
    if (unchangedCopy.title_tw !== '中杯燕麥熱拿鐵' || unchangedCopy.title !== 'Oat Milk Latte') {
      throw new Error('applyEditedTitle should preserve bilingual titles when unchanged');
    }
    const unchangedZhCopy = { ...txItem };
    applyEditedTitle(unchangedZhCopy, txItem, '中杯燕麥熱拿鐵', 'zh-TW');
    if (unchangedZhCopy.title_tw !== '中杯燕麥熱拿鐵' || unchangedZhCopy.title !== 'Oat Milk Latte') {
      throw new Error('applyEditedTitle should preserve English title when zh-TW unchanged');
    }
    const changedEnCopy = { ...txItem };
    applyEditedTitle(changedEnCopy, txItem, 'Matcha Latte', 'en');
    if (changedEnCopy.title !== 'Matcha Latte' || 'title_tw' in changedEnCopy) {
      throw new Error('applyEditedTitle should clear stale title_tw when edited in en');
    }
    const changedZhCopy = { ...txItem };
    applyEditedTitle(changedZhCopy, txItem, '抹茶拿鐵', 'zh-TW');
    if (changedZhCopy.title !== '抹茶拿鐵' || changedZhCopy.title_tw !== '抹茶拿鐵') {
      throw new Error('applyEditedTitle should sync both titles when edited in zh-TW');
    }
    const clearedCopy = { ...txItem };
    applyEditedTitle(clearedCopy, txItem, '', 'zh-TW');
    if (clearedCopy.title !== '' || 'title_tw' in clearedCopy) {
      throw new Error('applyEditedTitle should clear both titles when cleared to empty');
    }

    // Check generateId & sanitizeImportedRecord
    const id1 = generateId('tx');
    const id2 = generateId('tx');
    if (!id1.startsWith('tx_') || !id2.startsWith('tx_') || id1 === id2) {
      throw new Error('generateId failed: ' + id1 + ', ' + id2);
    }
    const sanitized = sanitizeImportedRecord({ title: 'Test', amount: -10, type: 'invalid', date: 'bad-date' }, false);
    if (!sanitized || sanitized.amount !== 0 || sanitized.type !== 'expense' || !/^\\d{4}-\\d{2}-\\d{2}$/.test(sanitized.date)) {
      throw new Error('sanitizeImportedRecord failed: ' + JSON.stringify(sanitized));
    }
    const sanitizedRec = sanitizeImportedRecord({ title: 'Gym', amount: 50, type: 'expense', freq: 'weekly', day: 99 }, true);
    if (!sanitizedRec || sanitizedRec.freq !== 'weekly' || sanitizedRec.day !== 7) {
      throw new Error('sanitizeImportedRecord recurring clamp failed: ' + JSON.stringify(sanitizedRec));
    }

    // Check monthly end-of-month clamping & weekly recurring occurrences
    const refNov19 = new Date(2026, 10, 19);
    const monthly31 = [{ id: 'r31', title: 'EndMonth', amount: 100, type: 'expense', freq: 'monthly', day: 31 }];
    const nov31 = getDueRecurringOccurrences(2026, 11, refNov19, monthly31, []);
    if (nov31.length !== 1 || nov31[0].date !== '2026-11-30') {
      throw new Error('monthly 31 in Nov failed: ' + JSON.stringify(nov31));
    }
    const febNonLeap = getDueRecurringOccurrences(2026, 2, refNov19, monthly31, []);
    if (febNonLeap.length !== 1 || febNonLeap[0].date !== '2026-02-28') {
      throw new Error('monthly 31 in Feb 2026 failed: ' + JSON.stringify(febNonLeap));
    }
    const febLeap = getDueRecurringOccurrences(2024, 2, refNov19, monthly31, []);
    if (febLeap.length !== 1 || febLeap[0].date !== '2024-02-29') {
      throw new Error('monthly 31 in Feb 2024 failed: ' + JSON.stringify(febLeap));
    }

    const weeklyThu = [{ id: 'rthu', title: 'Thu Lunch', amount: 20, type: 'expense', freq: 'weekly', day: 4 }];
    const thuDueAll = getDueRecurringOccurrences(2026, 11, refNov19, weeklyThu, []);
    if (thuDueAll.map(d => d.date).join(',') !== '2026-11-05,2026-11-12,2026-11-19') {
      throw new Error('weekly Thursday occurrences failed: ' + JSON.stringify(thuDueAll));
    }
    const thuDuePartial = getDueRecurringOccurrences(2026, 11, refNov19, weeklyThu, [
      { id: 't1', recurringId: 'rthu', date: '2026-11-12' }
    ]);
    if (thuDuePartial.map(d => d.date).join(',') !== '2026-11-05,2026-11-19') {
      throw new Error('weekly partial occurrences failed: ' + JSON.stringify(thuDuePartial));
    }
    const weeklyWithStart = [{ id: 'rthu2', title: 'Thu Lunch', amount: 20, type: 'expense', freq: 'weekly', day: 4, startDate: '2026-11-19' }];
    const thuDueStart = getDueRecurringOccurrences(2026, 11, refNov19, weeklyWithStart, [
      { id: 't2', recurringId: 'rthu2', date: '2026-11-19' }
    ]);
    if (thuDueStart.length !== 0) {
      throw new Error('weekly startDate guard failed: ' + JSON.stringify(thuDueStart));
    }

    // Check stable descending transaction sort
    const sorted = sortTransactionsDesc([
      { id: 'a', date: '2026-11-18', createdAt: 100 },
      { id: 'b', date: '2026-11-19', createdAt: 100 },
      { id: 'c', date: '2026-11-19', createdAt: 300 }
    ]);
    if (sorted.map(t => t.id).join(',') !== 'c,b,a') {
      throw new Error('sortTransactionsDesc failed: ' + JSON.stringify(sorted));
    }

    // Check multi-currency FX conversion & snapshot preservation
    const testRates = { USD: 1, TWD: 32, JPY: 160, EUR: 0.8, KRW: 1400, HKD: 7.8, GBP: 0.8 };
    if (Math.abs(getExchangeRate('JPY', 'TWD', testRates) - 0.2) > 1e-9) {
      throw new Error('getExchangeRate JPY->TWD failed');
    }
    if (convertTxToBase({ amount: 100, currency: 'USD' }, 'USD', testRates) !== 100) {
      throw new Error('convertTxToBase same currency failed');
    }
    if (Math.abs(convertTxToBase({ amount: 1600, currency: 'JPY', fxRate: 0.007, fxBase: 'USD' }, 'USD', testRates) - 11.2) > 1e-9) {
      throw new Error('convertTxToBase should honor matching fxRate snapshot');
    }
    if (Math.abs(convertTxToBase({ amount: 1600, currency: 'JPY', fxRate: 0.007, fxBase: 'USD' }, 'TWD', testRates) - 320) > 1e-9) {
      throw new Error('convertTxToBase should fallback to rate table when base currency changes');
    }
    const sanitizedFx = sanitizeImportedRecord({ title: 'Sushi', amount: 1500, currency: 'JPY', fxRate: 0.0065, fxBase: 'USD', date: '2026-11-19' }, false);
    if (!sanitizedFx || sanitizedFx.fxRate !== 0.0065 || sanitizedFx.fxBase !== 'USD') {
      throw new Error('sanitizeImportedRecord fx snapshot preservation failed');
    }
    const sanitizedBadFx = sanitizeImportedRecord({ title: 'Sushi', amount: 1500, currency: 'JPY', fxRate: -1, fxBase: 'ZZZ', date: '2026-11-19' }, false);
    if (!sanitizedBadFx || 'fxRate' in sanitizedBadFx || 'fxBase' in sanitizedBadFx) {
      throw new Error('sanitizeImportedRecord should drop invalid fx metadata');
    }

    // Check non-blocking toast & confirm dialog helpers
    showToast('Saved item', { variant: 'success', duration: 1000 });
    const toastMsgEl = document.getElementById('app-toast-message');
    if (toastMsgEl.textContent !== 'Saved item') {
      throw new Error('showToast failed to set message');
    }
    const pendingConfirm = showConfirmDialog({ title: 'Confirm', message: 'Proceed?' });
    resolveConfirmDialog(true);

    'OK'
    """
    proc = subprocess.run(['osascript', '-l', 'JavaScript', '-e', test_logic], capture_output=True, text=True)
    if proc.returncode != 0:
        print(f"❌ Logic Test Error:\n{proc.stderr.strip()}")
        return False
    print("   ✅ Core formatting, icon resolution, escaping, expression validation, and record sanitization verified.")
    return True

def check_branding_and_icons():
    print("🔍 [4/4] Checking branding assets and icon synchronization...")
    if not os.path.exists('icon.svg') or not os.path.exists('icon-maskable.svg'):
        print("❌ Missing icon.svg or icon-maskable.svg!")
        return False
    with open('index.html') as f:
        html = f.read()
    if 'src="./icon.svg"' not in html and "src='./icon.svg'" not in html:
        print("❌ index.html does not directly reference ./icon.svg (single source of truth violation)!")
        return False
    with open('manifest.json') as f:
        manifest = f.read()
    if './icon.svg' not in manifest or './icon-maskable.svg' not in manifest:
        print("❌ manifest.json missing icon.svg or icon-maskable.svg!")
        return False
    if os.path.exists('manifest.zh.json'):
        with open('manifest.zh.json') as f:
            manifest_zh = f.read()
        if './icon.svg' not in manifest_zh or './icon-maskable.svg' not in manifest_zh:
            print("❌ manifest.zh.json missing icon.svg or icon-maskable.svg!")
            return False
    print("   ✅ icon.svg, icon-maskable.svg, and index.html single source of truth verified.")
    return True

if __name__ == '__main__':
    print("=" * 60)
    print(" PocketFlow Automated Pre-Commit/Pre-Push Verification")
    print("=" * 60)
    success = check_js_syntax() and check_dom_ids() and check_business_logic() and check_branding_and_icons()
    print("=" * 60)
    if success:
        print("🎉 [SUCCESS] All checks passed! Safe to commit and push.")
        sys.exit(0)
    else:
        print("💥 [FAILURE] Pre-push checks failed. Fix the errors above.")
        sys.exit(1)
