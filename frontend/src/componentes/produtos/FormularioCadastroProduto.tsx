import React, { useState } from "react"; 
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    cadastrarProduto: (nome: string, valor: number, descricao: string) => void;
    atualizarDados: () => void;
};

export default function FormularioCadastroProduto(props: Props) {
    const [nome, setNome] = useState<string>('');
    const [valor, setValor] = useState<string>('');
    const [descricao, setDescricao] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        else if (name === "valor") setValor(value);
        else if (name === "descricao") setDescricao(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const valorNumerico = parseFloat(valor);

        if (!nome || isNaN(valorNumerico) || valorNumerico < 0) {
            alert("Por favor, preencha o nome e um valor numérico válido para o produto.");
            return;
        }

        props.cadastrarProduto(nome, valorNumerico, descricao);
        props.atualizarDados();

        props.seletorView('Produtos', event);
    };

    const { tema, seletorView } = props;

    return (
        <div className="container-fluid">
            <h2>Cadastro de Produto</h2>
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
                <button type="submit" className="btn btn-success me-2">Cadastrar</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Produtos', e)}>Voltar</button>
            </form>
        </div>
    );
}
