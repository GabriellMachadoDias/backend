const request = require("supertest");
const app = require("../app");

const url = "/tarefas";

let idCriado;

describe("Testes da rota /tarefas", () => {

  test("GET /tarefas deve retornar 200", async () => {
    const response = await request(app).get(url);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(Array.isArray(response.body)).toBe(true);
  });

  test("POST /tarefas deve retornar 201", async () => {
    const response = await request(app)
      .post(url)
      .send({ nome: "Estudar Node", concluida: false });
    
    expect(response.status).toBe(201);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe("Estudar Node");
    expect(response.body.concluida).toBe(false);

    idCriado = response.body.id;
  });

  test("GET /tarefas/:id deve retornar 200", async () => {
    const response = await request(app).get(`${url}/${idCriado}`);
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.id).toBe(idCriado);
  });

  test("GET /tarefas/1 deve retornar 404", async () => {
    const response = await request(app).get(`${url}/1`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Tarefa não encontrada");
  });

  test("PUT /tarefas/:id deve retornar 200", async () => {
    const response = await request(app)
      .put(`${url}/${idCriado}`)
      .send({ nome: "Estudar Node e Express", concluida: true });
    
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toMatch(/json/);
    expect(response.body.nome).toBe("Estudar Node e Express");
    expect(response.body.concluida).toBe(true);
  });

  test("PUT /tarefas/1 deve retornar 404", async () => {
    const response = await request(app)
      .put(`${url}/1`)
      .send({ nome: "Teste", concluida: true });

    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Tarefa não encontrada");
  });

  test("DELETE /tarefas/:id deve retornar 204", async () => {
    const response = await request(app).delete(`${url}/${idCriado}`);
    expect(response.status).toBe(204);
  });

  test("DELETE /tarefas/1 deve retornar 404", async () => {
    const response = await request(app).delete(`${url}/1`);
    expect(response.status).toBe(404);
    expect(response.body.msg).toBe("Tarefa não encontrada");
  });

});
