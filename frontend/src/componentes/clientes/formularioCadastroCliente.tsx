import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from 'modelo/cliente'; 
type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    cadastrarCliente: (nome: string, nomeSocial: string, cpfValor: string, dataEmissaoString: string) => Promise<boolean>;
    atualizarDados: () => void;
};

export default function FormularioCadastroCliente(props: Props) {
    const [nome, setNome] = useState<string>('');
    const [nomeSocial, setNomeSocial] = useState<string>('');
    const [cpf, setCpf] = useState<string>('');
    const [dataEmissaoCpf, setDataEmissaoCpf] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        else if (name === "nomeSocial") setNomeSocial(value);
        else if (name === "cpf") setCpf(value);
        else if (name === "dataEmissaoCpf") setDataEmissaoCpf(value);
    };

    const handleSubmit = async (event: React.FormEvent) => { 
        event.preventDefault();

        if (!nome || !cpf || !dataEmissaoCpf) {
            console.warn("Por favor, preencha todos os campos obrigatórios.");
            alert("Por favor, preencha todos os campos obrigatórios."); 
            return;
        }

        const sucesso = await props.cadastrarCliente(nome, nomeSocial, cpf, dataEmissaoCpf);

        if (sucesso) {
            console.log("Cliente cadastrado com sucesso!");
            props.atualizarDados(); 
            props.seletorView('Clientes', event); 
        } else {
            console.error("Falha ao cadastrar cliente.");
            alert("Erro ao cadastrar cliente. Verifique o console para mais detalhes."); 
        }
    };

    const { tema, seletorView } = props;

    return (
        <div className="container-fluid">
            <h2>Cadastro de Cliente</h2>
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
                    <label htmlFor="cpf" className="form-label">CPF</label>
                    <input
                        type="text"
                        className="form-control"
                        id="cpf"
                        name="cpf"
                        value={cpf}
                        onChange={handleChange}
                        placeholder="Ex: 123.456.789-00"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="dataEmissaoCpf" className="form-label">Data de Emissão do CPF (dd/mm/yyyy)</label>
                    <input
                        type="text"
                        className="form-control"
                        id="dataEmissaoCpf"
                        name="dataEmissaoCpf"
                        value={dataEmissaoCpf}
                        onChange={handleChange}
                        placeholder="Ex: 01/01/2020"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-success me-2">Cadastrar</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar</button>
            </form>
        </div>
    );
}
