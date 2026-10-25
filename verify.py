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
    print("🔍 [1/3] Validating JavaScript syntax with macOS JavaScriptCore...")
    
    # Test app.js
    app_test = """
    const localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
    const navigator = { serviceWorker: { register: () => Promise.resolve(), addEventListener: () => {} } };
    const window = { addEventListener: () => {}, innerWidth: 1024, matchMedia: () => ({ matches: false }) };
    const document = {
      documentElement: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } },
      addEventListener: () => {},
      getElementById: () => ({ classList: { add: () => {}, remove: () => {}, toggle: () => {} }, setAttribute: () => {}, addEventListener: () => {} }),
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
    print("🔍 [2/3] Checking DOM ID bindings between app.js and index.html...")
    if not os.path.exists('app.js') or not os.path.exists('index.html'):
        print("❌ app.js or index.html not found!")
        return False

    with open('app.js') as f:
        app_js = f.read()
    with open('index.html') as f:
        html = f.read()
    
    ids_in_js = set(re.findall(r'document\.getElementById\([\'\"]([a-zA-Z0-9_-]+)[\'\"]\)', app_js))
    ids_in_html = set(re.findall(r'id=[\'\"]([a-zA-Z0-9_-]+)[\'\"]', html))
    
    missing = ids_in_js - ids_in_html
    if missing:
        print(f"❌ Missing element IDs in index.html: {missing}")
        return False
    print(f"   ✅ All {len(ids_in_js)} DOM IDs match between app.js and index.html.")
    return True

def check_business_logic():
    print("🔍 [3/3] Validating helper functions and core calculations...")
    test_logic = """
    const localStorage = { getItem: () => null, setItem: () => {}, removeItem: () => {} };
    const navigator = { serviceWorker: { register: () => Promise.resolve(), addEventListener: () => {} } };
    const window = { addEventListener: () => {}, innerWidth: 1024, matchMedia: () => ({ matches: false }) };
    const document = {
      documentElement: { classList: { add: () => {}, remove: () => {}, toggle: () => {} } },
      addEventListener: () => {},
      getElementById: () => ({ classList: { add: () => {}, remove: () => {}, toggle: () => {} }, setAttribute: () => {}, addEventListener: () => {} }),
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

    'OK'
    """
    proc = subprocess.run(['osascript', '-l', 'JavaScript', '-e', test_logic], capture_output=True, text=True)
    if proc.returncode != 0:
        print(f"❌ Logic Test Error:\n{proc.stderr.strip()}")
        return False
    print("   ✅ formatMoney ($6,098.50) and resolveItemIcon (☕, 🚇) verified.")
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
