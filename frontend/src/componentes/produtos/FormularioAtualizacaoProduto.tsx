import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Produto from '../../modelo/produto';

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    produto: Produto;
    atualizarProduto: (nomeProdutoOriginal: string, novoNome: string, novoValor: number, novaDescricao: string) => void;
    atualizarDados: () => void;
};

type State = {
    nome: string;
    valor: string;
    descricao: string;
};

export default function FormularioAtualizacaoProduto(props: Props) {
    const [nome, setNome] = useState<string>(props.produto ? props.produto.getNome : '');
    const [valor, setValor] = useState<string>(props.produto ? props.produto.getValor.toFixed(2) : '');
    const [descricao, setDescricao] = useState<string>(props.produto ? props.produto.getDescricao : '');

    useEffect(() => {
        if (props.produto) {
            setNome(props.produto.getNome);
            setValor(props.produto.getValor.toFixed(2));
            setDescricao(props.produto.getDescricao);
        }
    }, [props.produto]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        else if (name === "valor") setValor(value);
        else if (name === "descricao") setDescricao(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!props.produto) {
            console.warn("Nenhum produto selecionado para atualização.");
            return;
        }

        const valorNumerico = parseFloat(valor);

        if (!nome || isNaN(valorNumerico) || valorNumerico < 0) {
            alert("Por favor, preencha o nome e um valor numérico válido para o produto.");
            return;
        }

        props.atualizarProduto(props.produto.getNome, nome, valorNumerico, descricao);
        props.atualizarDados();

        props.seletorView('Produtos', event);
    };

    const { tema, seletorView, produto } = props;

    if (!produto) {
        return (
            <div className="container-fluid">
                <h2>Atualizar Produto</h2>
                <p className="alert alert-warning">Nenhum produto selecionado para atualização. Por favor, volte para a lista de produtos e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Produtos', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Atualizar Produto: {produto.getNome}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome do Produto</label>
                    <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="valor" className="form-label">Valor (R$)</label>
                    <input type="number" step="0.01" className="form-control" id="valor" name="valor" value={valor} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="descricao" className="form-label">Descrição</label>
                    <textarea className="form-control" id="descricao" name="descricao" value={descricao} onChange={handleChange} rows={3}></textarea>
                </div>
                <button type="submit" className="btn btn-primary me-2">Atualizar</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Produtos', e)}>Cancelar</button>
            </form>
        </div>
    );
}
