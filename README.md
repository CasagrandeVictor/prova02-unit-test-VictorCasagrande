# API test automation with Jest and PactumJS

> Simple integration between JestJS and PactumJS.

## GitHub Actions

[![Node.js CI](https://github.com/CasagrandeVictor/prova02-unit-test-VictorCasagrande/actions/workflows/node.js.yml/badge.svg?branch=master)](https://github.com/CasagrandeVictor/prova02-unit-test-VictorCasagrande/actions/workflows/node.js.yml)

## SonarCloud

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=CasagrandeVictor_prova02-unit-test-VictorCasagrande&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=CasagrandeVictor_prova02-unit-test-VictorCasagrande)


# Prova 02 - CRUD de Animes (restful-api.dev)

Testes de API de um CRUD de **animes** usando a API pública [restful-api.dev](https://restful-api.dev), feitos com **Jest** + **PactumJS**.

Arquivo: [`test/animes_crud.spec.ts`](test/animes_crud.spec.ts)

### Como executar

```bash
npm install
npx jest animes_crud.spec.ts --config ./jest.config.js
```

O relatório HTML é gerado em `./output/report.html`.

### Recursos do PactumJS utilizados

- `request.setBaseUrl` e `setDefaultTimeout`: configuração global das requisições;
- `stores('animeId', 'id')` + `$S{animeId}`: guarda o id criado no POST e reutiliza nos próximos cenários;
- `withJson`, `withPathParams` e `withQueryParams`: montagem do body, parâmetros de rota e de query;
- `expectStatus`, `expectJson`, `expectJsonLike`, `expectJsonMatch` (com `pactum-matchers`), `expectJsonLength` e `expectJsonSchema`: validações da resposta.

### Cenários de teste

| # | Método e rota | Cenário | Resultado esperado |
|---|---|---|---|
| 1 | `POST /objects` | Cadastrar o anime *Fullmetal Alchemist: Brotherhood* | **200**, `id` gerado, `createdAt` e os dados enviados |
| 2 | `GET /objects/{id}` | Buscar o anime cadastrado pelo `id` | **200**, corpo de acordo com o JSON Schema e igual ao cadastrado |
| 3 | `GET /objects?id=` | Listar animes filtrando pelo `id` | **200** e lista com exatamente 1 anime |
| 4 | `PUT /objects/{id}` | Substituir todos os dados do anime | **200**, `updatedAt` e os novos dados (51 episódios, 2003) |
| 5 | `PATCH /objects/{id}` | Alterar apenas o nome do anime | **200**, nome alterado e demais dados mantidos |
| 6 | `DELETE /objects/{id}` | Excluir o anime | **200** e mensagem de exclusão com o `id` |
| 7 | `GET /objects/{id}` | Buscar o anime após a exclusão | **404** e mensagem `Object with id=... was not found.` |

> Os cenários dependem um do outro (usam o `id` criado no cenário 1), então devem ser executados juntos, em ordem.

# Getting Started

### Pactum docs:
 - [PactumJS](https://pactumjs.github.io/)

### Prerequisites:
 - NodeJS `v22`

### How to run?

Inside of the project folder run:

 1. `npm install --save-dev`
 1. `npm run ci`

After that you should see a `./output` folder with some `HTML` reports.

### Docs to Api under tests: 
 - [Dummyjson](https://dummyjson.com/docs)
 - [Gorest](https://gorest.co.in/)
 - [Toolshop API](https://api.practicesoftwaretesting.com/api/documentation)
 - [Deck of Cards](https://deckofcardsapi.com/)
 - [JSON placeholder](https://jsonplaceholder.typicode.com/)
 - [http bin](http://httpbin.org/)
 - [rick and morty api](https://rickandmortyapi.com/documentation/#rest)
 - [Petstore](https://petstore.swagger.io/#/) 
 - [ServeRest](https://serverest.dev/#/)
 - [ServeRest - Datadog](https://p.datadoghq.eu/sb/421fcfee-35ec-11ee-b87f-da7ad0900005-2aaf85264a89d11b7001bcab452a266e?refresh_mode=sliding&theme=light&tpl_var_env%5B0%5D=serverest.dev&from_ts=1699931511294&to_ts=1699932411294&live=true)
