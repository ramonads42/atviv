import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";

type Props = {
    tema: string;
    seletorView: (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => void;
    getRelatorio: () => { posicao: number, cliente: string, quantidadeProdutos: number, quantidadeServicos: number, total: number }[];
};

type RelatorioItem = {
    posicao: number;
    cliente: string;
    quantidadeProdutos: number;
    quantidadeServicos: number;
    total: number;
};

export default function RelatorioClientesMaisConsumiram(props: Props) {
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
            <h2>Top 10 Clientes que Mais Consumiram (Quantidade)</h2>
            {relatorio.length > 0 && relatorio.some(item => item.total > 0) ? (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Posição</th>
                            <th>Cliente</th>
                            <th>Produtos</th>
                            <th>Serviços</th>
                            <th>Total Consumido</th>
                        </tr>
                    </thead>
                    <tbody>
                        {relatorio.filter(item => item.total > 0).map((item) => (
                            <tr key={item.posicao}>
                                <td>{item.posicao}</td>
                                <td>{item.cliente}</td>
                                <td>{item.quantidadeProdutos}</td>
                                <td>{item.quantidadeServicos}</td>
                                <td>{item.total}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="alert alert-info">Nenhum consumo registrado ou clientes com consumo zero.</p>
            )}
            <button type="button" className="btn btn-secondary mt-3" onClick={(e) => seletorView('Relatórios', e)}>
                Voltar aos Relatórios
            </button>
        </div>
    );
}