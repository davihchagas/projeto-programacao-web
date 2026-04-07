# Atividade TypeScript — CLI com Drizzle ORM e SQLite

Projeto de linha de comando para a atividade com as tabelas:

- `uf (id, nome, sigla)`
- `cidade (id, nome, uf_id)`
- `noticia (id, titulo, texto, cidade_id, data_criacao)`

O campo `data_criacao` é preenchido automaticamente pelo banco.

## Como executar

```bash
npm install
npm run dev
```

## Scripts

- `npm run dev` — executa o sistema no terminal
- `npm run build` — compila TypeScript
- `npm run start` — executa a versão compilada

## Observações

- Banco utilizado: SQLite
- ORM utilizado: Drizzle ORM
- Interface: CLI

O sistema inclui:
- cadastro de UF
- cadastro de cidade
- cadastro de notícia
- listagem de notícias em ordem crescente/decrescente por data
- filtro por UF
- listagem agrupada por UF
- detalhamento de notícia por número de referência