# 🧭 Guia de Arquitetura e Desenvolvimento — Monorepo Soluções-Excel

Este repositório centraliza todas as ferramentas de automação e sistemas desenvolvidos para a Satélite Norte, organizados em uma estrutura de monorepo para facilitar a portabilidade.

---

## 📂 Estrutura do Repositório

- **`/` (Raiz)**: Contém planilhas legadas de controle (Alimentação, Escalas em Excel).
- **`Satélite Norte/`**: Pasta principal do projeto de modernização.
    - **`sisget/`**: O coração do sistema WEB (Frontend em Next.js, Backend em Java/Spring, Bot em Python).
    - **`runtime/`**: (**GIT-IGNORED**) Contém os binários portáteis (Node, Java, Python). Essencial para rodar o projeto em máquinas sem permissão de administrador.
    - **`scripts/`**: Scripts de automação (Setup do runtime e ativação do ambiente).
    - **`.agents/`**: Definições de personas de IA para Pair Programming.
- **`.gitignore`**: Centralizado na raiz para proteger todo o ecossistema.

---

## 🚀 Setup Rápido (Ambiente Portátil)

Para desenvolvedores em máquinas novas ou limitadas:

1.  **Setup Inicial**: Execute `Satélite Norte/scripts/setup-runtime.ps1` (Baixa os binários necessários).
2.  **Ativação**: Em cada nova sessão de terminal, execute:
    ```powershell
    . "Satélite Norte/scripts/activate-env.ps1"
    ```
    Isso colocará o Node, Java e Python locais no seu PATH.

---

## 🤖 Sistema de Agentes

Este projeto utiliza uma equipe de agentes de IA especializados (PM, Engineer, DevOps, Mentor, Glitch). As instruções de comportamento estão em `.agents/agents.md`. Futuros agentes devem ler este diretório antes de propor alterações estruturais.

---

## 🔒 Segurança (Regras de Ouro)

1.  **Zero Hardcoding**: NUNCA escreva senhas, tokens ou IPs fixos no código. Use o arquivo `.env` na pasta `sisget/bot/`.
2.  **Ignore Total**: Verifique sempre se arquivos JSON de dados reais (`fleet_status.json`) ou pastas de runtime não estão sendo rastreados pelo Git.
3.  **Fallback**: O código deve sempre tentar usar o binário portátil, mas permitir fallback para o binário do sistema caso o desenvolvedor prefira o ambiente global.

---

## 📜 Histórico de Decisões (ADRs)
Consulte `Satélite Norte/sisget/docs/adr/` para entender o porquê de escolhas polêmicas (ex: por que não usamos Docker neste momento).
