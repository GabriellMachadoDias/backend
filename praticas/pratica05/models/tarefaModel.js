const tarefas = [];

const listar = () => tarefas;

const buscarPeloId = (tarefaId) => {
  return tarefas.find((t) => t.id === tarefaId) || null;
};

const criar = (dados) => {
  const novaTarefa = {
    ...dados,
    id: Math.random().toString(36).substr(2, 4),
  };
  tarefas.push(novaTarefa);
  return novaTarefa;
};

const atualizar = (tarefa) => {
  const index = tarefas.findIndex((t) => t.id === tarefa.id);
  if (index >= 0) {
    tarefas[index] = { ...tarefas[index], ...tarefa };
    return tarefas[index];
  }
  return null;
};

const remover = (tarefaId) => {
  const index = tarefas.findIndex((t) => t.id === tarefaId);
  if (index >= 0) {
    return tarefas.splice(index, 1)[0];
  }
  return null;
};

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover,
};
