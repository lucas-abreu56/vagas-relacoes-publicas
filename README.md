# 📊 Dashboard Estratégico de Vagas (Comunicação & Marketing)

![n8n](https://img.shields.io/badge/n8n-FF6D5A?style=for-the-badge&logo=n8n&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![Antigravity](https://img.shields.io/badge/Antigravity-000000?style=for-the-badge&logo=vercel&logoColor=white) 
## 💡 A Origem e o Propósito
Este projeto nasceu de uma necessidade real: **auxiliar uma estudante de Relações Públicas da UFRGS (Universidade Federal do Rio Grande do Sul) a mapear o seu futuro profissional.** O objetivo era criar uma ferramenta que mostrasse em tempo real como está o mercado de trabalho na sua região (Porto Alegre e Canoas), quais empresas estão contratando e quais são os tipos de contratos mais comuns. O que começou como uma pesquisa pontual evoluiu para esta **pipeline de Engenharia de Dados de ponta a ponta**, que extrai, limpa, armazena e exibe oportunidades de Relações Públicas e Marketing em um painel interativo.

## ⚙️ Arquitetura e Tecnologias (Data Pipeline)
O sistema opera como um pipeline de ETL (Extract, Transform, Load) acoplado a um frontend de visualização:
- **Orquestração (ETL):** [n8n](https://n8n.io/) acionado via gatilho de agendamento (Cron).
- **Data Source:** JSearch API (via RapidAPI) para extração contínua de vagas reais.
- **Banco de Dados (Data Warehouse):** Supabase (PostgreSQL).
- **Frontend/Dashboard:** Antigravity (para renderização de gráficos e tabelas de dados em tempo real).

## 🚀 Como a Automação Funciona

1. **Extração Automática (n8n):** Diariamente, o n8n faz requisições à API buscando oportunidades abertas para "Relações Públicas" e "Marketing" especificamente nas cidades de Porto Alegre e Canoas/RS.
2. **Limpeza e Transformação (Node.js):** Um nó de código (Code) poda o JSON bruto retornado pela API, isolando apenas as informações cruciais (Título, Empresa, Local, Tipo de Contrato, Descrição e Link).
3. **Ingestão Inteligente (Supabase):** Os dados processados são enviados para o banco de dados. Utiliza-se a restrição de unicidade na coluna `job_apply_link` para executar operações de **Upsert**, garantindo que a base cresça sem duplicar vagas já registradas.
4. **Visualização em Tempo Real (Antigravity):** O dashboard consome os dados do Supabase (via chave pública com RLS configurado para leitura) e renderiza um painel gerencial contendo:
   - Volume total de vagas mapeadas.
   - Distribuição por Tipo de Contrato (Estágio, Efetivo, etc.).
   - Distribuição Geográfica (Porto Alegre vs. Canoas).
   - Tabela de dados interativa com links diretos para candidatura.
