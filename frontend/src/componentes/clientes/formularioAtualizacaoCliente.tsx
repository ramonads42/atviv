import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from 'modelo/cliente'; 

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    cliente: Cliente; 
    atualizarCliente: (idCliente: number, novoNome: string, novoNomeSocial: string) => Promise<boolean>; 
    atualizarDados: () => void;
};

export default function FormularioAtualizacaoCliente(props: Props) {
    const [nome, setNome] = useState<string>(props.cliente ? props.cliente.nome : '');
    const [nomeSocial, setNomeSocial] = useState<string>(props.cliente ? props.cliente.nomeSocial : '');

    useEffect(() => {
        if (props.cliente) {
            setNome(props.cliente.nome);
            setNomeSocial(props.cliente.nomeSocial);
        }
    }, [props.cliente]); 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        else if (name === "nomeSocial") setNomeSocial(value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!props.cliente || props.cliente.id === null) {
            console.warn("Nenhum cliente selecionado ou ID inválido para atualização.");
            return;
        }

        const idCliente = props.cliente.id;
        
        if (!nome || nome.trim() === '') {
            alert("O nome não pode ser vazio."); 
            return;
        }

        const sucesso = await props.atualizarCliente(idCliente, nome, nomeSocial);
        if (sucesso) { 
            console.log(`Cliente "${nome}" (ID: ${idCliente}) atualizado com sucesso via API!`);
            props.atualizarDados(); 
            props.seletorView('Clientes', event); 
        } else {
            console.error(`Falha ao atualizar cliente "${nome}" (ID: ${idCliente}) via API.`);
        }
    };

    const { tema, seletorView, cliente } = props;

    if (!cliente) {
        return (
            <div className="container-fluid">
                <h2>Atualizar Cliente</h2>
                <p className="alert alert-warning">Nenhum cliente selecionado para atualização. Por favor, volte para a lista de clientes e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Atualizar Cliente: {cliente.nome}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nome"
                        name="nome"
                        value={nome}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="nomeSocial" className="form-label">Nome Social</label>
                    <input
                        type="text"
                        className="form-control"
                        id="nomeSocial"
                        name="nomeSocial"
                        value={nomeSocial}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpf" className="form-label">CPF (Não Editável)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        name="cpf"
                        value={cliente.getCpf.getValor}
                        readOnly
                        disabled
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="id" className="form-label">ID (Backend - Não Editável)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="id"
                        name="id"
                        value={cliente.id !== null ? cliente.id.toString() : ''}
                        readOnly
                        disabled
                    />
                </div>
                <button type="submit" className="btn btn-primary me-2">Atualizar</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Cancelar</button>
            </form>
        </div>
    );
}
