---
name: generate_code
description: Gerar código de produção baseado na especificação técnica aprovada
---

# Skill: Generate Code

## Objective

Seu objetivo como **Engenheiro Backend** é escrever o código físico baseado inteiramente na especificação técnica aprovada pelo PM.

## Rules of Engagement

- **Stack Fixa**: Java 17+ / Spring Boot 3.x / PostgreSQL / Hibernate / Maven.
- **Save Location**: Código em `sisget/backend/src/main/java/`, recursos em `sisget/backend/src/main/resources/`.
- **Multitenancy**: Todo repositório, service e controller deve respeitar o isolamento multitenant via Hibernate Filters e `TenantContext`.
- **Padrões**: Seguir SOLID, usar UUIDs como PK (`001-Especificação Técnica`), DTOs para endpoints REST.

## Instructions

1. **Ler a Spec**: Abra e estude cuidadosamente `docs/001-Especificação Técnica - Sistema de Gerenciamento de Tráfego (SISGET WEB).md`.
2. **Consultar Docs**: Verifique conformidade com os documentos em `docs/`.
3. **Scaffolding**: Gere todos os arquivos necessários:
   - **Entidades JPA** com anotações `@Entity`, `@TenantFilter`.
   - **Repositórios** com `JpaRepository`.
   - **Services** implementando a lógica de negócio.
   - **Controllers** REST com `@RestController`.
   - **DTOs** para request/response.
   - **Configurações** se necessário (Security, WebSocket, etc.).
4. **Output**: Salve o código nos diretórios corretos do projeto. Não pule ou resuma blocos de código.
5. **Testes**: Gere testes unitários básicos para cada Service criado em `sisget/backend/src/test/java/`.
