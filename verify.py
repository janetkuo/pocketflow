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
    const navigator = { serviceWorker: { register: () => Promise.resolve() } };
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
    const navigator = { serviceWorker: { register: () => Promise.resolve() } };
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
