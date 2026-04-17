---
description: Implementar uma nova feature isolada com documentação e testes
---
// turbo-all

Quando o usuário digitar `/newfeature <descrição>`, orquestre o ciclo de desenvolvimento de uma feature isolada.

### Sequência de Execução:

1. Assuma o papel do **Product Manager (@pm)**:
   - Analise a descrição da feature.
   - Crie ou atualize o ADR correspondente em `docs/` se envolver uma decisão arquitetural.
   - Gere a especificação técnica da feature em `docs/001-Especificação Técnica - Sistema de Gerenciamento de Tráfego (SISGET WEB).md`.
   - **Aguarde aprovação do usuário** antes de prosseguir.

2. Assuma o papel do **Engenheiro Backend (@engineer)** e execute a skill `generate_code.md`:
   - Implemente a feature seguindo a spec aprovada.
   - Gere testes unitários para cada Service criado.

3. Assuma o papel do **Engenheiro de QA (@qa)** e execute a skill `audit_code.md`:
   - Audite o código gerado.
   - Execute `./mvnw test` para validar.
   - Corrija problemas encontrados.

4. Assuma o papel do **Mentor Técnico (@mentor)** e execute a skill `obsidian_sync.md`:
   - Documente a feature implementada.
   - Atualize MOCs e Kanban.
   - Gere flashcards dos novos conceitos.
