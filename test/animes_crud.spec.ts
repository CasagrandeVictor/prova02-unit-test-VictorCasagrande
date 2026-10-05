import pactum from 'pactum';
import { like, string } from 'pactum-matchers';
import { StatusCodes } from 'http-status-codes';
import { SimpleReporter } from '../simple-reporter';

/**
 * CRUD de animes na API pública restful-api.dev (https://restful-api.dev).
 *
 * Fluxo: o POST cadastra um anime e salva o id no store do Pactum
 * ("animeId"); os cenários seguintes usam esse id com $S{animeId}
 * para buscar, listar, alterar (PUT e PATCH) e excluir o mesmo anime.
 */
describe('Restful API - CRUD de Animes', () => {
  const p = pactum;
  const rep = SimpleReporter;

  const anime = {
    name: 'Fullmetal Alchemist: Brotherhood',
    data: {
      estudio: 'Bones',
      genero: 'Aventura',
      episodios: 64,
      lancamento: 2009,
      finalizado: true
    }
  };

  p.request.setBaseUrl('https://api.restful-api.dev');
  p.request.setDefaultTimeout(30000);

  beforeAll(() => p.reporter.add(rep));
  afterAll(() => p.reporter.end());

  it('POST /objects - deve cadastrar um novo anime e retornar o id', async () => {
    await p
      .spec()
      .post('/objects')
      .withJson(anime)
      .expectStatus(StatusCodes.OK)
      .expectJsonMatch({
        id: string(),
        name: anime.name,
        createdAt: like(1700000000000),
        data: anime.data
      })
      .stores('animeId', 'id');
  });

  it('GET /objects/{id} - deve buscar o anime cadastrado pelo id', async () => {
    await p
      .spec()
      .get('/objects/{id}')
      .withPathParams('id', '$S{animeId}')
      .expectStatus(StatusCodes.OK)
      .expectJsonSchema({
        type: 'object',
        properties: {
          id: { type: 'string' },
          name: { type: 'string' },
          data: {
            type: 'object',
            properties: {
              estudio: { type: 'string' },
              genero: { type: 'string' },
              episodios: { type: 'integer' },
              lancamento: { type: 'integer' },
              finalizado: { type: 'boolean' }
            },
            required: ['estudio', 'genero', 'episodios']
          }
        },
        required: ['id', 'name', 'data']
      })
      .expectJson({ id: '$S{animeId}', ...anime });
  });

  it('GET /objects?id= - deve listar o anime filtrando pelo id', async () => {
    await p
      .spec()
      .get('/objects')
      .withQueryParams('id', '$S{animeId}')
      .expectStatus(StatusCodes.OK)
      .expectJsonLength(1)
      .expectJsonLike([{ id: '$S{animeId}', name: anime.name }]);
  });

  it('PUT /objects/{id} - deve substituir todos os dados do anime', async () => {
    await p
      .spec()
      .put('/objects/{id}')
      .withPathParams('id', '$S{animeId}')
      .withJson({
        name: 'Fullmetal Alchemist',
        data: {
          estudio: 'Bones',
          genero: 'Aventura',
          episodios: 51,
          lancamento: 2003,
          finalizado: true
        }
      })
      .expectStatus(StatusCodes.OK)
      .expectJsonMatch({
        id: '$S{animeId}',
        name: 'Fullmetal Alchemist',
        updatedAt: like(1700000000000),
        data: { episodios: 51, lancamento: 2003 }
      });
  });

  it('PATCH /objects/{id} - deve alterar apenas o nome do anime', async () => {
    await p
      .spec()
      .patch('/objects/{id}')
      .withPathParams('id', '$S{animeId}')
      .withJson({ name: 'Hagane no Renkinjutsushi' })
      .expectStatus(StatusCodes.OK)
      .expectJsonLike({
        id: '$S{animeId}',
        name: 'Hagane no Renkinjutsushi',
        // os demais dados devem continuar os mesmos do PUT
        data: { episodios: 51, lancamento: 2003 }
      });
  });

  it('DELETE /objects/{id} - deve excluir o anime', async () => {
    await p
      .spec()
      .delete('/objects/{id}')
      .withPathParams('id', '$S{animeId}')
      .expectStatus(StatusCodes.OK)
      .expectJson({
        message: 'Object with id = $S{animeId} has been deleted.'
      });
  });

  it('GET /objects/{id} - não deve encontrar o anime após a exclusão', async () => {
    await p
      .spec()
      .get('/objects/{id}')
      .withPathParams('id', '$S{animeId}')
      .expectStatus(StatusCodes.NOT_FOUND)
      .expectJson({
        error: 'Object with id=$S{animeId} was not found.'
      });
  });
});
