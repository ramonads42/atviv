import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Produto from '../../modelo/produto';

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    produto: Produto;
    excluirProduto: (nomeProduto: string) => void;
    atualizarDados: () => void;
};

export default function ConfirmacaoExclusaoProduto(props: Props) {
    const handleExcluir = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!props.produto) {
            console.warn("Nenhum produto selecionado para exclusão.");
            return;
        }

        const nomeProduto = props.produto.getNome;
        props.excluirProduto(nomeProduto);
        props.atualizarDados();

        props.seletorView('Produtos', event);
    };

    const { tema, seletorView, produto } = props;

    if (!produto) {
        return (
            <div className="container-fluid">
                <h2>Excluir Produto</h2>
                <p className="alert alert-warning">Nenhum produto selecionado para exclusão. Por favor, volte para a lista de produtos e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Produtos', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Confirmar Exclusão de Produto</h2>
            <div className="alert alert-warning" role="alert">
                Você tem certeza que deseja excluir o produto: <strong>{produto.getNome}</strong> (Valor: R$ {produto.getValor.toFixed(2)}, Descrição: {produto.getDescricao})?
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
                onClick={(e) => seletorView('Produtos', e)}
            >
                Cancelar
            </button>
        </div>
    );
}
