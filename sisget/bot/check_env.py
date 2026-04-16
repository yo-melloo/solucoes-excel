import os
import sys
import asyncio
from playwright.async_api import async_playwright
from dotenv import load_dotenv

async def check_env():
    print(f"Python Version: {sys.version}")
    
    # Check .env
    load_dotenv()
    user = os.getenv("LIFE_USER")
    if not user:
        print("[-] .env file not configured correctly (LIFE_USER missing).")
    else:
        print("[+] .env file loaded.")

    # Check Playwright
    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            await page.goto("https://google.com")
            title = await page.title()
            print(f"[+] Playwright OK. Page title: {title}")
            await browser.close()
    except Exception as e:
        print(f"[-] Playwright Error: {e}")

if __name__ == "__main__":
    asyncio.run(check_env())
