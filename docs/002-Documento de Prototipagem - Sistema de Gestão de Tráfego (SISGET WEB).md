# Documento de Prototipagem — SISGET WEB (Sistema de Gestão de Tráfego)

> **Versão:** 1.1  
> **Atualizado em:** 15/04/2026  
> **Referência:** `000-PRD-SISGET.md`, `001-Especificação Técnica`  

Este documento formaliza o protótipo funcional do sistema, detalhando a integração de dados e os módulos de controle operacional.

---

## 1. Arquitetura de Integração e Dados

* **Persistência:** SQLite (desenvolvimento) → PostgreSQL (produção).
* **Fonte de Dados Primária:** Planilha **Escala do Fluxo** hospedada no **SharePoint Excel Online**. O sistema deve consumir essa planilha diariamente e segregar os dados por base/turno.
* **Seeds:** Base inicial de 604 motoristas, 170 veículos, 85 RAVs e 5 itens de reserva (diretório `/seeds/`).
* **Processamento Híbrido:** Sistema automático com interface aberta para correções e inserções manuais.
* **Estado da Interface:** Uso de componentes de *Skeleton* e *Progress* para sinalizar o carregamento de dados.

---

## 2. Módulo de Controle Operacional (Garagem)

### 2.1 Reservas (Oficina)

* **Controle de Recursos:** Tabelas específicas para Carros reserva e Pneus reserva.
* **Campos:** CÓD, TIPO, STATUS (Disponível/Indisponível), DESCRIÇÃO.
* **Interface:** Visualização em cards 1x1 com modais para adição/edição de registros.
* **Timestamp:** Cada atualização registra data/hora e autor.

### 2.2 Telemetria de Combustível

* **Monitoramento de Tanques:** Visualização de volume atual (ex: 3780/15.000 litros). 2 tanques de 15.000L.
* **Botão "Atualizar Medição":** Abre calculadora de volumetria embutida para converter medições lineares (cm) em volume real com base na tabela técnica de medição.
* **Contexto:** Primeira tarefa do auxiliar ao iniciar o plantão (central solicita a informação todas as manhãs).

---

## 3. Módulo de Frota e Logística

### 3.1 Posicionamento e Previsão

* **Distribuição Geográfica:** Organização do posicionamento de frota por bases estratégicas: **Imperatriz, São Luís e Belém**.
* **Estilização:** Linhas "CANCELADO" em vermelho. Rodapé resumo com Carro Reserva (verde), Grade Futura (amarelo), Indisponível (vermelho).
* **Planejamento Temporal:** Segregação entre Frota Diurna e Frota Noturna.

### 3.2 Operação de Frota (Diurna / Noturna)

Duas tabelas idênticas em estrutura, separadas por turno:

| Coluna | Descrição |
|--------|-----------|
| DATA | Data da operação |
| SAÍDA | Horário de saída |
| SERVIÇO | Código do serviço |
| FROTA | Prefixo do veículo |
| PLACA | Placa do veículo |
| MOTORISTA | Nome + Matrícula (operação solo) |
| LINHA | Trecho com horário |
| LOC. ATUAL | Localização via rastreamento (futuro) |
| PREVISÃO | ETA ou status (GARAGEM) |

* **Seção lateral:** CARROS RESERVA, PNEUS RESERVA, OCORRÊNCIAS, OUTROS.

### 3.3 Escala do Fluxo (Diária)

Fonte: **SharePoint Excel Online**. Campos: Dia da Semana, Data, Garagem, Carro, HR. Garagem, HR. Saída, Origem, Destino, Motorista, Linha, Serviço.

---

## 4. Módulo de Consulta Rápida (Pesquisa)

Interface dedicada para busca de dados avulsos:

* **Busca por Placa** → retorna Frota (prefixo).
* **Busca por Frota** → retorna Placa.
* **Busca por Nome/Matrícula** → retorna dados do motorista.
* **Spotlight (Ctrl+K):** Acesso rápido global a partir de qualquer tela.

---


## 5. (Reservado)

-- DESCARTAR!

---

## 6. Próximos Passos de Desenvolvimento

* [ ] Validação das tabelas de volumetria para a calculadora de tanques.
* [ ] Definição da interface de consumo da Escala do Fluxo (SharePoint Excel).
* [ ] Prototipagem do módulo de Consulta Rápida (Pesquisa).
* [ ] Design de UX/UI no Figma (pendente com desenvolvedor).

---

## 7. Protótipo Visual: Dashboard SISGET

``` text
[ CABEÇALHO: Saudação Dinâmica | 🌦️ Previsão (Mock) | 🔔 Alertas ]

=======================================================================
| 2. CONTROLE DE GARAGEM                                              |
=======================================================================
| [ CARD: CARROS RESERVA ]  | [ CARD: PNEUS RESERVA ]                |
| (Tabela: CÓD/STATUS)      | (Tabela: CÓD/STATUS)                   |
| [ + Adicionar ]            | [ + Adicionar ]                        |
|---------------------------------------------------------------------|
| 2.2 GESTÃO DE COMBUSTÍVEL                                           |
| Tanque 01: [|||||||---] 3.780 / 15.000 L                            |
| Tanque 02: [||||||||||] 15.000 / 15.000 L                           |
|---------------------------------------------------------------------|
| [ ATUALIZAR MEDIÇÃO ]                                               |
=======================================================================

=======================================================================
| 3.1 MODAL: POSICIONAMENTO DE FROTA                                  |
=======================================================================
| [ BASE IMPERATRIZ ]           | [ BASE SÃO LUÍS ]  | [ BASE BELÉM ]|
|------------------------------ |---------------------|----------------|
| DATA | FROTA | HORA | OR|DEST | (Repetir colunas)   | (Idem)        |
| 15/04| 24003 | 07:12| BEL|GYN |                     |                |
| 15/04| CANC. | 09:30| THE|GYN |                     |                |
|-------------------------------|---------------------|----------------|
| [ RODAPÉ ]                    | [ RODAPÉ ]          | [ RODAPÉ ]    |
| CARRO RESERVA (Verde)        | CARRO RESERVA       | CARRO RESERVA |
| GRADE FUTURA (Amarelo)       | GRADE FUTURA        | GRADE FUTURA  |
| INDISPONÍVEL (Vermelho)      | INDISPONÍVEL        | INDISPONÍVEL  |
=======================================================================

=======================================================================
| 3.2 CONTROLE DE OPERAÇÃO (DIURNA / NOTURNA)                         |
=======================================================================
| DATA | SAÍDA| SERV | FROTA | MOTORISTA | LINHA | LOC. | PREVISÃO   |
|------|------|------|-------|-----------|-------|------|------------|
| 15/04| 07:12| 2014 | 24014 | RODRIGO   |BELxGYN| ---  | [EM ROTA]  |
| 15/04| 08:00| 1072 | 24001 | JOSE N.   |SLZxGYN| ---  | [GARAGEM]  |
| 15/04| 09:30| CANC.| CANC. | CANCELADO |IMPxVLR| ---  | [---]      |
=======================================================================

=======================================================================
| 4. CONSULTA RÁPIDA (PESQUISA)                        [Ctrl+K]       |
=======================================================================
| DIGITE PLACA → RESULTADO (FROTA)                                    |
| DIGITE FROTA → RESULTADO (PLACA)                                    |
| DIGITE NOME/MAT → RESULTADO (MOTORISTA)                             |
=======================================================================

[ Escala do Fluxo: SharePoint | Última Sync: 07:38 ]
```

---

## 8. Módulos Futuros (não incluir agora)

* **Gestão de RAVs:** Seeds com 85 registros prontos em `/seeds/ravs.json`.
* **Gestão de Pessoal:** Controle de Dobras e horários de Refeição.
* **Pontos de Apoio (PAs):** Monitoramento de Grajaú, Araguaína e Santa Inês.
* **Bot de Rastreamento:** Automação Selenium (integração VITAE).
