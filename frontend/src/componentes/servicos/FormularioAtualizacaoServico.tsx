import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Servico from '../../modelo/servico';

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    servico: Servico;
    atualizarServico: (nomeServicoOriginal: string, novoNome: string, novoValor: number, novaDescricao: string) => void;
    atualizarDados: () => void;
};

type State = {
    nome: string;
    valor: string; 
    descricao: string;
};

export default function FormularioAtualizacaoServico(props: Props) {
    const [nome, setNome] = useState<string>(props.servico ? props.servico.getNome : '');
    const [valor, setValor] = useState<string>(props.servico ? props.servico.getValor.toFixed(2) : '');
    const [descricao, setDescricao] = useState<string>(props.servico ? props.servico.getDescricao : '');

    useEffect(() => {
        if (props.servico) {
            setNome(props.servico.getNome);
            setValor(props.servico.getValor.toFixed(2));
            setDescricao(props.servico.getDescricao);
        }
    }, [props.servico]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        else if (name === "valor") setValor(value);
        else if (name === "descricao") setDescricao(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!props.servico) {
            console.warn("Nenhum serviço selecionado para atualização.");
            return;
        }

        const valorNumerico = parseFloat(valor);

        if (!nome || isNaN(valorNumerico) || valorNumerico < 0) {
            alert("Por favor, preencha o nome e um valor numérico válido para o serviço.");
            return;
        }

        props.atualizarServico(props.servico.getNome, nome, valorNumerico, descricao);
        props.atualizarDados();

        props.seletorView('Serviços', event);
    };

    const { tema, seletorView, servico } = props;

    if (!servico) {
        return (
            <div className="container-fluid">
                <h2>Atualizar Serviço</h2>
                <p className="alert alert-warning">Nenhum serviço selecionado para atualização. Por favor, volte para a lista de serviços e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Serviços', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Atualizar Serviço: {servico.getNome}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome do Serviço</label>
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
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Serviços', e)}>Cancelar</button>
            </form>
        </div>
    );
}
