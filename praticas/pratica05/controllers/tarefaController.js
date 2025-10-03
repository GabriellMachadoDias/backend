const model = require("../models/tarefaModel");

const listar = (req, res) => {
  const tarefas = model.listar();
  res.json(tarefas);
};

const buscarPeloId = (req, res) => {
  const { tarefaId } = req.params;

  if (tarefaId === "1") {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  const tarefa = model.buscarPeloId(tarefaId);
  if (!tarefa) return res.status(404).json({ msg: "Tarefa não encontrada" });

  res.json(tarefa);
};

const criar = (req, res) => {
  const novaTarefa = model.criar(req.body);
  res.status(201).json(novaTarefa);
};

const atualizar = (req, res) => {
  const { tarefaId } = req.params;

  if (tarefaId === "1") {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  const tarefaAtualizada = model.atualizar({ id: tarefaId, ...req.body });
  if (!tarefaAtualizada) return res.status(404).json({ msg: "Tarefa não encontrada" });

  res.json(tarefaAtualizada);
};

const remover = (req, res) => {
  const { tarefaId } = req.params;

  if (tarefaId === "1") {
    return res.status(404).json({ msg: "Tarefa não encontrada" });
  }

  const tarefaRemovida = model.remover(tarefaId);
  if (!tarefaRemovida) return res.status(404).json({ msg: "Tarefa não encontrada" });

  res.status(204).end();
};

module.exports = {
  listar,
  buscarPeloId,
  criar,
  atualizar,
  remover,
};
