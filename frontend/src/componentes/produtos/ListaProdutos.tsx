import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Produto from "../../modelo/produto";

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    selecionarViewComItem: (novaTela: string, item: any, evento?: React.MouseEvent | React.FormEvent) => void;
    produtos: Produto[];
    atualizarDados: () => void;
};

export default function ListaProdutos(props: Props) {
    const { tema, seletorView, selecionarViewComItem, produtos } = props;

    return (
        <div className="container-fluid">
            <h2>Lista de Produtos</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Valor</th>
                        <th>Descrição</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.length > 0 ? (
                        produtos.map((produto, index) => (
                            <tr key={`${produto.getNome}-${index}`}>
                                <td>{produto.getNome}</td>
                                <td>R$ {produto.getValor.toFixed(2)}</td>
                                <td>{produto.getDescricao}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-primary me-2"
                                        onClick={(e) => selecionarViewComItem('Atualizar Produto', produto, e)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-sm btn-danger"
                                        onClick={(e) => selecionarViewComItem('Excluir Produto', produto, e)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={4}>Nenhum produto cadastrado.</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <button
                className="btn btn-success mt-3"
                onClick={(e) => seletorView('Cadastrar Produto', e)}
            >
                Cadastrar Novo Produto
            </button>
        </div>
    );
}
