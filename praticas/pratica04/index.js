const express = require('express');

const tarefas = [  
    { id: 1, nome: "Estudar middleware", concluida: false },  
    { id: 2, nome: "Praticar Express", concluida: true }  
];

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    const dataHora = new Date().toISOString();
    console.log(`[${dataHora}] ${req.method} ${req.url}`);
    next();
})

app.listen(3000, () => {
    console.log('App está on!');
});

module.exports = app;

const router = express.Router();

router.get('/', (req, res) => {
    res.json(tarefas);
});

router.post('/', (req, res) => {
    const { nome, concluida } = req.body;

    const naoSei = {
        id: tarefas.length > 0 ? tarefas[tarefas.length - 1].id + 1 : 1,
        nome,
        concluida: concluida || false
    };

    tarefas.push(naoSei);

    res.status(201).json(naoSei);
});

router.get('/:tarefaId', (req, res, next) => {
    const tarefaId = parseInt(req.params.tarefaId);
    const tarefa = tarefas.find(t => t.id === tarefaId);

    if (!tarefa) {
        return next(new Error('Tarefa não localizada'));
    }

    res.json(tarefa);
});

router.put('/:tarefaId', (req, res, next) => {
    const tarefaId = parseInt(req.params.tarefaId);
    const tarefa = tarefas.find(t => t.id === tarefaId);

    if (!tarefa) {
        return next(new Error('Tarefa não localizada'));
    }

    const { nome, concluida } = req.body;
    tarefa.nome = nome !== undefined ? nome : tarefa.nome;
    tarefa.concluida = concluida !== undefined ? concluida : tarefa.concluida;
    
    res.json(tarefa);
});

router.delete('/:tarefaId', (req, res, next) => {
    const tarefaId = parseInt(req.params.tarefaId);
    const index = tarefas.findIndex(t => t.id === tarefaId);

    if (index === -1) {
        return next(new Error('Tarefa não localizada'));
    }

    tarefas.splice(index, 1);
    res.status(204).send();
});

app.use('/tarefas', router);

app.use((err, req, res, next) => {
    res.status(400).json({ erro: err.message });
});