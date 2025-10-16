const readline = require("readline-sync");
const controlador = require("./controlador");

function menu() {
    console.log("Menu Principal");
    //  console.log("\n=== Menu Principal ===");
    console.log("1 - Adicionar contato");
    console.log("2 - Buscar contato");
    console.log("3 - Atualizar contato");
    console.log("4 - Remover contato");
    console.log("5 - Sair");
};

async function escolherOpcao(opcao) {
    switch (opcao) {
        case "1":
            const nomeAdicionar = readline.question("Digite o nome da tarefa: ");
            await controlador.adicionarTarefa(nomeAdicionar);
            console.log("Tarefa adicionada com sucesso!");
            break;
        case "2":
            const nomeBuscar = readline.question("Digite o nome da tarefa: ");
            const tarefaBuscada = await controlador.buscarTarefa(nomeBuscar);
            if (tarefaBuscada.id) {
                console.log(`Tarefa encontrada: Nome: ${tarefaBuscada.nome}, Concluída: ${tarefaBuscada.concluida}`);
            } else {
                console.log("Tarefa não encontrada.");
            }
            break;
        case "3":
            const nomeAtualizar = readline.question("Digite o nome da tarefa: ");
            const concluidaAtualizar = readline.question("Digite o status da tarefa: ");
            await controlador.atualizarTarefa(nomeAtualizar, concluidaAtualizar === "true");
            console.log("Tarefa atualizada com sucesso!");
            break;
        case "4":
            const nomeRemover = readline.question("Digite o nome da tarefa: ");
            await controlador.removerTarefa(nomeRemover);
            console.log("Tarefa removida com sucesso!");
            break;
        case "5":
            console.log("Saindo...");
            process.exit();
            break;
        default:
            console.log("opcao inválida, tente novamente.");
    }
};

async function main() {
    while (true) {
        menu();
        const opcao = readline.question("Escolha uma opcao: ");
        await escolherOpcao(opcao);
    }
};

main();
