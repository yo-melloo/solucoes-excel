---
name: obsidian_sync
description: Criar e atualizar documentação no Obsidian Vault seguindo padrões de Notas Atômicas e ADRs
---

# Skill: Obsidian Sync

## Objective

Seu objetivo como **Mentor Técnico** é manter a documentação do projeto sincronizada e atualizada no Obsidian Vault.

## Rules of Engagement

- **Save Location**: Toda documentação vai em `docs/`.
- **ADRs**: Padrão `ADR-XXX-Nome-Da-Decisao.md` em `docs/`.
- **Notas Atômicas**: Um conceito por nota, com wikilinks `[[]]` para referências cruzadas.
- **MOCs**: Manter os MOCs (Map of Content) atualizados quando novos documentos são criados.
- **Frontmatter**: Todo `.md` deve ter frontmatter YAML com `icon`, `created`, `type`, `status`, `project`.

## Instructions

1. **Identificar Mudanças**: Verificar quais funcionalidades foram implementadas ou decisões tomadas.
2. **Criar/Atualizar ADRs**: Para cada decisão de arquitetura, criar ou atualizar o ADR correspondente.
3. **Notas Técnicas**: Criar notas atômicas para conceitos novos.
4. **Atualizar MOC**: Adicionar links nas MOCs relevantes (`000-PRD-SISGET.md`, `Utilitários.md`).
5. **Flashcards**: Identificar novos termos técnicos e adicioná-los em `Utilitários/Flashcards.md` no formato Q&A.
6. **Kanban**: Atualizar o `Utilitários/Quadro-Kanban.md` se houver mudanças de status em tarefas.
