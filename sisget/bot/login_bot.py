import os
import asyncio
from playwright.async_api import async_playwright
from dotenv import load_dotenv

async def run_bot():
    # Carrega variáveis do arquivo .env
    load_dotenv()
    
    # Configurações
    url = "https://lifeonline.com.br/sistemas_v2/index.php"
    empresa = os.getenv("LIFE_COMPANY")
    usuario = os.getenv("LIFE_USER")
    senha = os.getenv("LIFE_PASS")
    
    if not all([empresa, usuario, senha]):
        print("[-] Erro: LIFE_COMPANY, LIFE_USER ou LIFE_PASS não configurados no .env")
        return

    async with async_playwright() as p:
        # Launching browser (headless for performance, but can be switched for debug)
        browser = await p.chromium.launch(headless=True)
        # Usando um User-Agent comum para evitar bloqueios básicos
        context = await browser.new_context(
            user_agent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
        )
        page = await context.new_page()
        
        print(f"[*] Acessando: {url}")
        await page.goto(url, wait_until="networkidle")
        
        # Preenchimento dos 3 inputs conforme inspeção
        print("[*] Realizando login...")
        try:
            await page.fill("#empresa", empresa)
            await page.fill("#login", usuario)
            await page.fill("#pass", senha)
            
            # Clique no botão de login
            await page.click("#btnLogin")
            
            # Aguardar carregamento da dashboard
            # Mono-index: a URL pode não mudar, então esperamos por um elemento que indique sucesso
            print("[*] Aguardando autenticação...")
            await page.wait_for_load_state("networkidle")
            
            # Navegação descrita pelo usuário: Acompanhamento -> Rastreamento -> online
            # Tentaremos clicar via texto, que é mais intuitivo para menus multinível
            print("[*] Navegando: Acompanhamento -> Rastreamento -> online")
            
            # Nota: Em sistemas mono-index, cliques em menus podem disparar chamadas AJAX.
            # Usamos timeouts generosos para lidar com a latência do sistema.
            
            # 0. Aceitar Cookies (usando o seletor validado)
            print("[*] Aceitando cookies...")
            try:
                await page.click("button.cookie-btn", timeout=5000)
            except:
                # Fallback via JS se o botão mudar
                await page.evaluate("() => { const b = document.querySelector('.btn-aceitar') || [...document.querySelectorAll('button')].find(el => el.innerText.includes('Aceitar')); if(b) b.click(); }")

            # 0. Limpeza Geral (Cookies e Banners)
            print("[*] Limpando o campo visual (cookies/banners)...")
            await page.evaluate("() => { const b = document.querySelector('button.cookie-btn') || [...document.querySelectorAll('button')].find(el => el.innerText.includes('Aceitar')); if(b) b.click(); }")
            await asyncio.sleep(1)

            # 1. Navegação via Simulação de Mouse (Hover + Click)
            print("[*] Navegando pelos menus (Simulação de Mouse)...")
            
            # Hover em Acompanhamento
            await page.get_by_text("Acompanhamento").first.hover()
            await asyncio.sleep(1)
            
            # Hover/Click em Rastreamento
            await page.get_by_text("Rastreamento").first.hover()
            await asyncio.sleep(1)
            
            # Clique final em 'online' (forçando via ID)
            print("[*] Clicando no destino final: online...")
            # Tentamos o clique normal primeiro, com fallback JS
            try:
                await page.locator("#ar-online").click(timeout=5000)
            except:
                print("[!] Clique normal falhou, tentando disparo direto via JS...")
                await page.evaluate("() => document.querySelector('#ar-online').click()")
            
            # Aguarda a página de rastreamento carregar
            print("[*] Aguardando carregamento dos dados...")
            await page.wait_for_load_state("networkidle")
            await asyncio.sleep(3) 
            
            # Aguarda a página de rastreamento carregar
            print("[*] Aguardando carregamento da grade de rastreamento...")
            await page.wait_for_load_state("networkidle")
            await asyncio.sleep(2) # Garantia visual
            
            # Screenshot final para prova de conceito
            screenshot_path = "tracking_success.png"
            await page.screenshot(path=screenshot_path, full_page=True)
            print(f"[+] Sucesso! Screenshot salva em: {screenshot_path}")
            
        except Exception as e:
            print(f"[-] Ocorreu um erro: {e}")
            await page.screenshot(path="login_error.png")
            print("[-] Screenshot do erro salva em: login_error.png")
            
        finally:
            await browser.close()

if __name__ == "__main__":
    asyncio.run(run_bot())
