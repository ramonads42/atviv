import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    getRelatorio: () => { nome: string, tipo: 'Produto' | 'Serviço', quantidade: number }[];
};

type RelatorioItem = {
    nome: string;
    tipo: 'Produto' | 'Serviço';
    quantidade: number;
};

export default function RelatorioProdutosServicosMaisConsumidos(props: Props) {
    const [relatorio, setRelatorio] = useState<RelatorioItem[]>([]);

    const carregarRelatorio = () => {
        const dadosRelatorio = props.getRelatorio();
        setRelatorio(dadosRelatorio);
    };

    useEffect(() => {
        carregarRelatorio();
    }, [props.getRelatorio]);

    const { tema, seletorView } = props;

    return (
        <div className="container-fluid">
            <h2>Produtos e Serviços Mais Consumidos (Geral)</h2>
            {relatorio.length > 0 ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Tipo</th>
                            <th>Nome</th>
                            <th>Quantidade Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {relatorio.map((item, index) => (
                            <tr key={index}> 
                                <td>{item.tipo}</td>
                                <td>{item.nome}</td>
                                <td>{item.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="alert alert-info">Nenhum produto ou serviço consumido.</p>
            )}
            <button type="button" className="btn btn-secondary mt-3" onClick={(e) => seletorView('Relatórios', e)}>
                Voltar aos Relatórios
            </button>
        </div>
    );
}
