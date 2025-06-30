import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente';

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    cadastrarPet: (cpfCliente: string, nome: string, tipo: string, raca: string, genero: string) => void;
    clientes: Cliente[];
    atualizarDados: () => void;
};

export default function FormularioCadastroPet(props: Props) {
    const [nome, setNome] = useState<string>('');
    const [tipo, setTipo] = useState<string>('');
    const [raca, setRaca] = useState<string>('');
    const [genero, setGenero] = useState<string>('');
    const [cpfCliente, setCpfCliente] = useState<string>('');

    const { clientes } = props; 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        else if (name === "tipo") setTipo(value);
        else if (name === "raca") setRaca(value);
        else if (name === "genero") setGenero(value);
        else if (name === "cpfCliente") setCpfCliente(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!nome || !tipo || !raca || !genero || !cpfCliente) {
            console.warn("Por favor, preencha todos os campos do pet e selecione o cliente dono.");
            return;
        }

        props.cadastrarPet(cpfCliente, nome, tipo, raca, genero);
        props.atualizarDados();

        props.seletorView('Pets', event);
    };

    const { tema, seletorView } = props;

    return (
        <div className="container-fluid">
            <h2>Cadastro de Pet</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="nome" className="form-label">Nome do Pet</label>
                    <input type="text" className="form-control" id="nome" name="nome" value={nome} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="tipo" className="form-label">Tipo</label>
                    <input type="text" className="form-control" id="tipo" name="tipo" value={tipo} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="raca" className="form-label">Raça</label>
                    <input type="text" className="form-control" id="raca" name="raca" value={raca} onChange={handleChange} required />
                </div>
                <div className="mb-3">
                    <label htmlFor="genero" className="form-label">Gênero</label>
                    <select className="form-select" id="genero" name="genero" value={genero} onChange={handleChange} required>
                        <option value="">Selecione...</option>
                        <option value="Macho">Macho</option>
                        <option value="Fêmea">Fêmea</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpfCliente" className="form-label">CPF do Cliente Dono</label>
                    <select
                        className="form-select"
                        id="cpfCliente"
                        name="cpfCliente"
                        value={cpfCliente}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione o dono...</option>
                        {clientes.map(cliente => (
                            <option key={cliente.getCpf.getValor} value={cliente.getCpf.getValor}>
                                {cliente.nome} ({cliente.getCpf.getValor})
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-success me-2">Cadastrar</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Pets', e)}>Voltar</button>
            </form>
        </div>
    );
}
