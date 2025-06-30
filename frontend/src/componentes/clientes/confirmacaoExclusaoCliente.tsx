import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from 'modelo/cliente'; 

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    cliente: Cliente; 
    excluirCliente: (idCliente: number) => Promise<boolean>; 
    atualizarDados: () => void;
};

export default function ConfirmacaoExclusaoCliente(props: Props) {
    const handleExcluir = async (event: React.MouseEvent) => {
        event.preventDefault();
        if (!props.cliente || props.cliente.id === null) {
            console.warn("Nenhum cliente selecionado ou ID inválido para exclusão.");
            return;
        }

        const idCliente = props.cliente.id;
        const nomeCliente = props.cliente.nome;

        const sucesso = await props.excluirCliente(idCliente);
        if (sucesso) { 
            console.log(`Cliente "${nomeCliente}" (ID: ${idCliente}) excluído com sucesso via API!`);
            props.atualizarDados();
            props.seletorView('Clientes', event);
        } else {
            console.error(`Falha ao excluir cliente "${nomeCliente}" (ID: ${idCliente}) via API.`);

        }
    };

    const { tema, seletorView, cliente } = props;

    if (!cliente) {
        return (
            <div className="container-fluid">
                <h2>Excluir Cliente</h2>
                <p className="alert alert-warning">Nenhum cliente selecionado para exclusão. Por favor, volte para a lista de clientes e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Confirmar Exclusão de Cliente</h2>
            <div className="alert alert-warning" role="alert">
                Você tem certeza que deseja excluir o cliente: <strong>{cliente.nome}</strong> (CPF: {cliente.getCpf.getValor} - ID: {cliente.id})?
            </div>
            <button
                type="button"
                className="btn btn-danger me-2"
                onClick={handleExcluir}
            >
                Sim, Excluir
            </button>
            <button
                type="button"
                className="btn btn-secondary"
                onClick={(e) => seletorView('Clientes', e)}
            >
                Cancelar
            </button>
        </div>
    );
}
