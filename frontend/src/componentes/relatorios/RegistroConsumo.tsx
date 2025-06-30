import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Cliente from '../../modelo/cliente';
import Produto from '../../modelo/produto';
import Servico from '../../modelo/servico';

type ClienteData = Cliente;
type ProdutoData = Produto;
type ServicoData = Servico;

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    clientes: ClienteData[];
    produtos: ProdutoData[];
    servicos: ServicoData[];
    registrarConsumo: (cpfCliente: string, nomeItem: string, tipoItem: 'produto' | 'servico') => void;
    atualizarDados: () => void;
};

export default function RegistroConsumo(props: Props) {
    const [clienteSelecionadoCpf, setClienteSelecionadoCpf] = useState<string>('');
    const [itemTipo, setItemTipo] = useState<'produto' | 'servico' | ''>('');
    const [itemId, setItemId] = useState<string | null>(null);
    const [feedback, setFeedback] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        if (name === "clienteSelecionadoCpf") {
            setClienteSelecionadoCpf(value);
            setItemTipo(''); 
            setItemId(null); 
        } else if (name === "itemTipo") {
            setItemTipo(value as 'produto' | 'servico' | '');
            setItemId(null); 
        } else if (name === "itemId") {
            setItemId(value);
        }
    };

    const handleSelectCliente = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setClienteSelecionadoCpf(event.target.value);
        setItemTipo(''); 
        setItemId(null); 
        setFeedback(''); 
    };

    const handleSelectTipoItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemTipo(event.target.value as 'produto' | 'servico' | '');
        setItemId(null); 
        setFeedback('');
    };

    const handleSelectItem = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItemId(event.target.value);
        setFeedback(''); 
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setFeedback(''); 

        if (!clienteSelecionadoCpf || !itemTipo || !itemId) {
            setFeedback('Por favor, selecione um cliente, tipo de item e o item.');
            return;
        }

        props.registrarConsumo(clienteSelecionadoCpf, itemId, itemTipo);
        props.atualizarDados();
        setFeedback(`Consumo de ${itemId} (${itemTipo}) registrado para o cliente com CPF: ${clienteSelecionadoCpf} com sucesso!`);


        setClienteSelecionadoCpf('');
        setItemTipo('');
        setItemId(null);
    };

    const { tema, seletorView, clientes, produtos, servicos } = props;

    const itensDisponiveis = itemTipo === 'produto' ? produtos : itemTipo === 'servico' ? servicos : [];

    return (
        <div className="container-fluid">
            <h2>Registro de Consumo</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="clienteSelecionadoCpf" className="form-label">Cliente</label>
                    <select
                        className="form-select"
                        id="clienteSelecionadoCpf"
                        name="clienteSelecionadoCpf"
                        value={clienteSelecionadoCpf}
                        onChange={handleSelectCliente}
                        required
                    >
                        <option value="">Selecione um cliente...</option>
                        {clientes.map(cliente => (
                            <option key={cliente.getCpf.getValor} value={cliente.getCpf.getValor}>
                                {cliente.nome} ({cliente.getCpf.getValor})
                            </option>
                        ))}
                    </select>
                </div>

                {clienteSelecionadoCpf && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="itemTipo" className="form-label">Tipo de Item</label>
                            <select
                                className="form-select"
                                id="itemTipo"
                                name="itemTipo"
                                value={itemTipo}
                                onChange={handleSelectTipoItem}
                                required
                            >
                                <option value="">Selecione o tipo...</option>
                                <option value="produto">Produto</option>
                                <option value="servico">Serviço</option>
                            </select>
                        </div>

                        {itemTipo && (
                            <div className="mb-3">
                                <label htmlFor="itemId" className="form-label">Item</label>
                                <select
                                    className="form-select"
                                    id="itemId"
                                    name="itemId"
                                    value={itemId || ''}
                                    onChange={handleSelectItem}
                                    required
                                >
                                    <option value="">Selecione o item...</option>
                                    {itensDisponiveis.map(item => (
                                        <option key={item.getNome} value={item.getNome}>
                                            {item.getNome} (R$ {item.getValor.toFixed(2)})
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                    </>
                )}

                {feedback && (
                    <div className={`alert ${feedback.includes('sucesso') ? 'alert-success' : 'alert-danger'} mt-3`} role="alert">
                        {feedback}
                    </div>
                )}

                <button type="submit" className="btn btn-success me-2" disabled={!clienteSelecionadoCpf || !itemTipo || !itemId}>Registrar Consumo</button>
                <button type="button" className="btn btn-secondary" onClick={(e) => seletorView('Clientes', e)}>Voltar ao Menu</button>
            </form>
        </div>
    );
}
