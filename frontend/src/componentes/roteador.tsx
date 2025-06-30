import React, { useState, useEffect } from "react";
import BarraNavegacao from "./barraNavegacao";

import Cliente from "modelo/cliente"; 
import Produto from "modelo/produto"; 
import Servico from "modelo/servico"; 
import Pet from "modelo/pet";     

import empresaService from "servicos/EmpresaService"; 

import ListaClientes from "./clientes/listaCliente";
import FormularioCadastroCliente from "./clientes/formularioCadastroCliente";
import FormularioAtualizacaoCliente from "./clientes/formularioAtualizacaoCliente";
import ConfirmacaoExclusaoCliente from "./clientes/confirmacaoExclusaoCliente";

import FormularioCadastroPet from "./pets/FormularioCadastroPet";
import FormularioAtualizacaoPet from "./pets/FormularioAtualizacaoPet";
import ConfirmacaoExclusaoPet from "./pets/ConfirmacaoExclusaoPet";
import ListaPets from "./pets/ListaPets"; 

import ListaProdutos from "./produtos/ListaProdutos";
import FormularioCadastroProduto from "./produtos/FormularioCadastroProduto";
import FormularioAtualizacaoProduto from "./produtos/FormularioAtualizacaoProduto";
import ConfirmacaoExclusaoProduto from "./produtos/ConfirmacaoExclusaoProduto";

import ListaServicos from "./servicos/ListaServicos";
import FormularioCadastroServico from "./servicos/FormularioCadastroServico";
import FormularioAtualizacaoServico from "./servicos/FormularioAtualizacaoServico";
import ConfirmacaoExclusaoServico from "./servicos/ConfirmacaoExclusaoServico";

import RegistroConsumo from "./relatorios/RegistroConsumo"; 

import RelatorioClientesMaisConsumiram from "./relatorios/RelatorioClientesMaisConsumiram";
import RelatorioProdutosServicosMaisConsumidos from "./relatorios/RelatorioProdutosServicosMaisConsumidos";
import RelatorioConsumoPorTipoRaca from "./relatorios/RelatorioConsumoPorTipoRaca";
import RelatorioClientesMaisGastaram from "./relatorios/RelatorioClientesMaisGastaram";
import RelatorioConsumoPorTipo from "./relatorios/RelatorioConsumoPorTipo";


export default function Roteador() {
    const [tela, setTela] = useState<string>('Clientes');
    const [itemSelecionado, setItemSelecionado] = useState<Cliente | Pet | Produto | Servico | any>(undefined);
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [produtos, setProdutos] = useState<Produto[]>([]);
    const [servicos, setServicos] = useState<Servico[]>([]);


    const atualizarDados = async () => {
        const clientesAtualizados = await empresaService.getClientes();
        setClientes(clientesAtualizados);
        setProdutos(empresaService.getProdutos()); 
        setServicos(empresaService.getServicos()); 
    };

    useEffect(() => {
        atualizarDados();
    }, []); 


    useEffect(() => {
        if (['Clientes', 'Pets', 'Produtos', 'Serviços', 'Relatórios'].includes(tela)) {
            atualizarDados();
        }
    }, [tela]);


    const selecionarView = (novaTela: string, evento?: React.MouseEvent | React.FormEvent) => {
        if (evento) evento.preventDefault();
        console.log(novaTela);
        setTela(novaTela);
        setItemSelecionado(undefined); 
    };

    const selecionarViewComItem = (novaTela: string, item: any, evento?: React.MouseEvent | React.FormEvent) => {
        if (evento) evento.preventDefault();
        console.log(`Navegando para ${novaTela} com item:`, item);
        setItemSelecionado(item); 
        setTela(novaTela);
    };

    let barraNavegacao = <BarraNavegacao seletorView={selecionarView} tema="#e3f2fd" botoes={['Clientes', 'Pets', 'Produtos', 'Serviços', 'Consumo', 'Relatórios']} />;
    let conteudo;

    switch (tela) {
        case 'Clientes':
            conteudo = <ListaClientes
                tema="#e3f2fd"
                seletorView={selecionarView}
                selecionarViewComItem={selecionarViewComItem}
                clientes={clientes}
                atualizarDados={atualizarDados} 
            />;
            break;
        case 'Cadastros': 
        case 'Cadastrar Cliente': 
            conteudo = <FormularioCadastroCliente
                tema="#e3f2fd"
                seletorView={selecionarView}
                cadastrarCliente={empresaService.cadastrarClienteComDados} 
                atualizarDados={atualizarDados} 
            />;
            break;
        case 'Atualizar Cliente':
            conteudo = <FormularioAtualizacaoCliente
                tema="#e3f2fd"
                seletorView={selecionarView}
                cliente={itemSelecionado as Cliente} 
                atualizarCliente={empresaService.atualizarCliente} 
                atualizarDados={atualizarDados} 
            />;
            break;
        case 'Excluir Cliente':
            conteudo = <ConfirmacaoExclusaoCliente
                tema="#e3f2fd"
                seletorView={selecionarView}
                cliente={itemSelecionado as Cliente} 
                excluirCliente={empresaService.excluirCliente} 
                atualizarDados={atualizarDados} 
            />;
            break;

        case 'Pets':
            conteudo = <ListaPets
                tema="#e3f2fd"
                seletorView={selecionarView}
                selecionarViewComItem={selecionarViewComItem}
                pets={clientes.flatMap(c => c.getPets.map(p => ({

                    id: p.getNome, 
                    nome: p.getNome, tipo: p.getTipo, raca: p.getRaca, genero: p.getGenero, cpfCliente: c.getCpf.getValor
                })))}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Cadastrar Pet':
            conteudo = <FormularioCadastroPet
                tema="#e3f2fd"
                seletorView={selecionarView}
                cadastrarPet={empresaService.cadastrarPet}
                clientes={clientes}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Atualizar Pet':
            conteudo = <FormularioAtualizacaoPet
                tema="#e3f2fd"
                seletorView={selecionarView}
                pet={itemSelecionado as {nome: string, tipo: string, raca: string, genero: string, cpfCliente: string}}
                atualizarPet={empresaService.atualizarPet}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Excluir Pet':
            conteudo = <ConfirmacaoExclusaoPet
                tema="#e3f2fd"
                seletorView={selecionarView}
                pet={itemSelecionado as {nome: string, tipo: string, raca: string, genero: string, cpfCliente: string}}
                excluirPet={empresaService.excluirPet}
                atualizarDados={atualizarDados}
            />;
            break;

        case 'Produtos':
            conteudo = <ListaProdutos
                tema="#e3f2fd"
                seletorView={selecionarView}
                selecionarViewComItem={selecionarViewComItem}
                produtos={produtos}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Cadastrar Produto':
            conteudo = <FormularioCadastroProduto
                tema="#e3f2fd"
                seletorView={selecionarView}
                cadastrarProduto={empresaService.cadastrarProduto}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Atualizar Produto':
            conteudo = <FormularioAtualizacaoProduto
                tema="#e3f2fd"
                seletorView={selecionarView}
                produto={itemSelecionado as Produto}
                atualizarProduto={empresaService.atualizarProduto}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Excluir Produto':
            conteudo = <ConfirmacaoExclusaoProduto
                tema="#e3f2fd"
                seletorView={selecionarView}
                produto={itemSelecionado as Produto}
                excluirProduto={empresaService.excluirProduto}
                atualizarDados={atualizarDados}
            />;
            break;

        case 'Serviços':
            conteudo = <ListaServicos
                tema="#e3f2fd"
                seletorView={selecionarView}
                selecionarViewComItem={selecionarViewComItem}
                servicos={servicos}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Cadastrar Serviço':
            conteudo = <FormularioCadastroServico
                tema="#e3f2fd"
                seletorView={selecionarView}
                cadastrarServico={empresaService.cadastrarServico}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Atualizar Serviço':
            conteudo = <FormularioAtualizacaoServico
                tema="#e3f2fd"
                seletorView={selecionarView}
                servico={itemSelecionado as Servico}
                atualizarServico={empresaService.atualizarServico}
                atualizarDados={atualizarDados}
            />;
            break;
        case 'Excluir Serviço':
            conteudo = <ConfirmacaoExclusaoServico
                tema="#e3f2fd"
                seletorView={selecionarView}
                servico={itemSelecionado as Servico}
                excluirServico={empresaService.excluirServico}
                atualizarDados={atualizarDados}
            />;
            break;

        case 'Consumo':
            conteudo = (
                <RegistroConsumo
                    tema="#e3f2fd"
                    seletorView={selecionarView}
                    clientes={clientes}
                    produtos={produtos}
                    servicos={servicos}
                    registrarConsumo={empresaService.registrarConsumo}
                    atualizarDados={atualizarDados}
                />
            );
            break;

        case 'Relatórios':
            conteudo = (
                <div className="container-fluid">
                    <h2>Relatórios Disponíveis</h2>
                    <div className="list-group">
                        <button type="button" className="list-group-item list-group-item-action" onClick={(e) => selecionarView('Relatório Clientes + Consumo', e)}>
                            Top 10 Clientes que Mais Consumiram (Quantidade)
                        </button>
                        <button type="button" className="list-group-item list-group-item-action" onClick={(e) => selecionarView('Relatório Clientes + Gastaram', e)}>
                            Top 5 Clientes que Mais Consumiram (Valor)
                        </button>
                        <button type="button" className="list-group-item list-group-item-action" onClick={(e) => selecionarView('Relatório Prod/Serv + Consumo', e)}>
                            Produtos e Serviços Mais Consumidos (Geral)
                        </button>
                        <button type="button" className="list-group-item list-group-item-action" onClick={(e) => selecionarView('Mais Consumidos por Raça', e)}>
                            Mais Consumidos por Raça
                        </button>
                        <button type="button" className="list-group-item list-group-item-action" onClick={(e) => selecionarView('Mais Consumidos por Tipo', e)}>
                            Mais Consumidos por Tipo
                        </button>
                    </div>
                </div>
            );
            break;
        case 'Relatório Clientes + Consumo':
            conteudo = <RelatorioClientesMaisConsumiram
                tema="#e3f2fd"
                seletorView={selecionarView}
                getRelatorio={empresaService.getRelatorioTop10ClientesPorQuantidade}
            />;
            break;
        case 'Relatório Clientes + Gastaram':
            conteudo = <RelatorioClientesMaisGastaram
                tema="#e3f2fd"
                seletorView={selecionarView}
                getRelatorio={empresaService.getRelatorioTop5ClientesPorValor}
            />;
            break;
        case 'Relatório Prod/Serv + Consumo':
            conteudo = <RelatorioProdutosServicosMaisConsumidos
                tema="#e3f2fd"
                seletorView={selecionarView}
                getRelatorio={empresaService.getRelatorioProdutosServicosMaisConsumidos}
            />;
            break;
        case 'Mais Consumidos por Raça':
            conteudo = <RelatorioConsumoPorTipoRaca
                tema="#e3f2fd"
                seletorView={selecionarView}
                getRelatorio={empresaService.getRelatorioConsumoPorTipoRaca}
            />;
            break;
        case 'Mais Consumidos por Tipo':
            conteudo = <RelatorioConsumoPorTipo
                tema="#e3f2fd"
                seletorView={selecionarView}
                getRelatorio={empresaService.getRelatorioConsumoPorTipo}
            />;
            break;
        default:
            conteudo = <div><h2>Bem-vindo!</h2><p>Selecione uma opção na barra de navegação.</p></div>;
    }

    return (
        <>
            {barraNavegacao}
            <div className="container-fluid">
                {conteudo}
            </div>
        </>
    );
}
