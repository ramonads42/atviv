import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Pet from '../../modelo/pet';

type PetDataComCliente = {
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    cpfCliente: string;
};

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    pet: PetDataComCliente; 
    atualizarPet: (cpfClienteOriginal: string, nomePetOriginal: string, novoNome: string, novoTipo: string, novaRaca: string, novoGenero: string) => void;
    atualizarDados: () => void;
};

export default function FormularioAtualizacaoPet(props: Props) {
    const [nome, setNome] = useState<string>(props.pet ? props.pet.nome : '');
    const [tipo, setTipo] = useState<string>(props.pet ? props.pet.tipo : '');
    const [raca, setRaca] = useState<string>(props.pet ? props.pet.raca : '');
    const [genero, setGenero] = useState<string>(props.pet ? props.pet.genero : '');

    useEffect(() => {
        if (props.pet) {
            setNome(props.pet.nome);
            setTipo(props.pet.tipo);
            setRaca(props.pet.raca);
            setGenero(props.pet.genero);
        }
    }, [props.pet]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === "nome") setNome(value);
        else if (name === "tipo") setTipo(value);
        else if (name === "raca") setRaca(value);
        else if (name === "genero") setGenero(value);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!props.pet) {
            console.warn("Nenhum pet selecionado para atualização.");
            return;
        }

        const { pet } = props;
        props.atualizarPet(pet.cpfCliente, pet.nome, nome, tipo, raca, genero);
        props.atualizarDados();

        props.seletorView('Pets', event);
    };

    const { tema, seletorView, pet } = props;

    if (!pet) {
        return (
            <div className="container-fluid">
                <h2>Atualizar Pet</h2>
                <p className="alert alert-warning">Nenhum pet selecionado para atualização. Por favor, volte para a lista de pets e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Pets', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Atualizar Pet: {pet.nome}</h2>
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
                    <label htmlFor="cpfCliente" className="form-label">CPF do Cliente Dono (Não Editável)</label>
                    <input type="text" className="form-control" id="cpfCliente" name="cpfCliente" value={pet.cpfCliente} readOnly disabled />
                </div>
                <button type="submit" className="btn btn-primary me-2">Atualizar</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Pets', e)}>Cancelar</button>
            </form>
        </div>
    );
}
