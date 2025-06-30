import React from 'react';
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
    excluirPet: (cpfCliente: string, nomePet: string) => void;
    atualizarDados: () => void;
};

export default function ConfirmacaoExclusaoPet(props: Props) {
    const handleExcluir = (event: React.MouseEvent) => {
        event.preventDefault();
        if (!props.pet) {
            console.warn("Nenhum pet selecionado para exclusão.");
            return;
        }

        const { pet } = props;
        props.excluirPet(pet.cpfCliente, pet.nome);
        props.atualizarDados();

        props.seletorView('Pets', event);
    };

    const { tema, seletorView, pet } = props;

    if (!pet) {
        return (
            <div className="container-fluid">
                <h2>Excluir Pet</h2>
                <p className="alert alert-warning">Nenhum pet selecionado para exclusão. Por favor, volte para a lista de pets e selecione um.</p>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Pets', e)}>Voltar</button>
            </div>
        );
    }

    return (
        <div className="container-fluid">
            <h2>Confirmar Exclusão de Pet</h2>
            <div className="alert alert-warning" role="alert">
                Você tem certeza que deseja excluir o pet: <strong>{pet.nome}</strong> (Tipo: {pet.tipo}, Raça: {pet.raca}) do cliente com CPF: {pet.cpfCliente}?
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
                onClick={(e) => seletorView('Pets', e)}
            >
                Cancelar
            </button>
        </div>
    );
}
