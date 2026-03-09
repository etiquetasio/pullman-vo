# Airtable Carga Extension

Esta é uma extensão customizada para o Airtable que permite disparar webhooks no n8n para sincronização de dados.

## Funcionalidades

- **Carga de Alergênicos**: Dispara o webhook `https://n8n-railway.etiquetas.io/webhook/alergenicos-vo`.
- **Carga Full Pratos**: Dispara o webhook `https://n8n-railway.etiquetas.io/webhook/carga-full-vo`.

## Como Instalar no Airtable

1. Publique este repositório no seu GitHub.
2. No Airtable, vá em **Extensions** -> **Add an extension**.
3. Selecione **Build a custom extension**.
4. Siga as instruções do Airtable CLI para vincular este código à sua extensão.
   - Você precisará rodar `npm install` e `block run` ou `block release`.

## Configuração

Os URLs dos webhooks estão configurados diretamente no arquivo `src/App.tsx`.
