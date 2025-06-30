import Empresa from "modelo/empresa";
import Cliente from "modelo/cliente";
import Produto from "modelo/produto";
import Servico from "modelo/servico";
import Pet from "modelo/pet";
import CPF from "modelo/cpf";
import Telefone from "modelo/telefone";

import clienteApiService from "./ClienteApiService";

class EmpresaService {
    private empresa: Empresa;

    constructor() {
        this.empresa = new Empresa();

        this.cadastrarClienteComDados = this.cadastrarClienteComDados.bind(this);
        this.atualizarCliente = this.atualizarCliente.bind(this);
        this.excluirCliente = this.excluirCliente.bind(this);
        this.getClientes = this.getClientes.bind(this);


        this.cadastrarPet = this.cadastrarPet.bind(this);
        this.atualizarPet = this.atualizarPet.bind(this);
        this.excluirPet = this.excluirPet.bind(this);
        this.cadastrarProduto = this.cadastrarProduto.bind(this);
        this.atualizarProduto = this.atualizarProduto.bind(this);
        this.excluirProduto = this.excluirProduto.bind(this);
        this.cadastrarServico = this.cadastrarServico.bind(this);
        this.atualizarServico = this.atualizarServico.bind(this);
        this.excluirServico = this.excluirServico.bind(this);
        this.registrarConsumo = this.registrarConsumo.bind(this);

        this.getRelatorioTop10ClientesPorQuantidade = this.getRelatorioTop10ClientesPorQuantidade.bind(this);
        this.getRelatorioTop5ClientesPorValor = this.getRelatorioTop5ClientesPorValor.bind(this);
        this.getRelatorioProdutosServicosMaisConsumidos = this.getRelatorioProdutosServicosMaisConsumidos.bind(this);
        this.getRelatorioConsumoPorTipoRaca = this.getRelatorioConsumoPorTipoRaca.bind(this);
        this.getRelatorioConsumoPorTipo = this.getRelatorioConsumoPorTipo.bind(this);

        this.popularDadosIniciaisLocais();
    }

    async getClientes(): Promise<Cliente[]> {
        const clientesDoBackend = await clienteApiService.getClientes();
        this.empresa.getClientes.splice(0, this.empresa.getClientes.length, ...clientesDoBackend);
        return this.empresa.getClientes;
    }

    getProdutos(): Produto[] {
        return this.empresa.getProdutos;
    }

    getServicos(): Servico[] {
        return this.empresa.getServicos;
    }


    async cadastrarClienteComDados(nome: string, nomeSocial: string, cpfValor: string, dataEmissaoString: string): Promise<boolean> {
        const sucesso = await clienteApiService.cadastrarCliente({ nome, nomeSocial, cpf: cpfValor, dataEmissaoCpf: dataEmissaoString });
        if (sucesso) {
            console.log(`Cliente ${nome} cadastrado com sucesso via API!`);
            await this.getClientes(); 
        } else {
            console.warn(`Falha ao cadastrar cliente ${nome} via API.`);
        }
        return sucesso;
    }

    async atualizarCliente(idCliente: number, novoNome: string, novoNomeSocial: string): Promise<boolean> {
        const sucesso = await clienteApiService.atualizarCliente(idCliente, novoNome, novoNomeSocial);
        if (sucesso) {
            console.log(`Cliente ID ${idCliente} atualizado com sucesso via API!`);
            await this.getClientes(); 
        } else {
            console.warn(`Falha ao atualizar cliente ID ${idCliente} via API.`);
        }
        return sucesso;
    }

    async excluirCliente(idCliente: number): Promise<boolean> {
        const sucesso = await clienteApiService.excluirCliente(idCliente);
        if (sucesso) {
            console.log(`Cliente ID ${idCliente} excluído com sucesso via API!`);
            await this.getClientes();
        } else {
            console.warn(`Falha ao excluir cliente ID ${idCliente} via API.`);
        }
        return sucesso;
    }

    cadastrarPet(cpfCliente: string, nome: string, tipo: string, raca: string, genero: string): void {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            const pet = new Pet(nome, raca, genero, tipo);
            cliente.getPets.push(pet);
            console.log(`Pet ${nome} cadastrado para o cliente ${cliente.nome} (localmente)`);
        } else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado para cadastrar pet (localmente).`);
        }
    }

    atualizarPet(cpfClienteOriginal: string, nomePetOriginal: string, novoNome: string, novoTipo: string, novaRaca: string, novoGenero: string): void {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfClienteOriginal);
        if (cliente) {
            const pet = cliente.getPets.find(p => p.getNome === nomePetOriginal);
            if (pet) {
                if (novoNome) pet.setNome(novoNome);
                if (novoTipo) pet.setTipo(novoTipo);
                if (novaRaca) pet.setRaca(novaRaca);
                if (novoGenero) pet.setGenero(novoGenero);
                console.log(`Pet ${nomePetOriginal} do cliente ${cliente.nome} atualizado (localmente).`);
            } else {
                console.warn(`Pet ${nomePetOriginal} não encontrado para o cliente ${cliente.nome} (localmente).`);
            }
        } else {
            console.warn(`Cliente com CPF ${cpfClienteOriginal} não encontrado para atualizar pet (localmente).`);
        }
    }

    excluirPet(cpfCliente: string, nomePet: string): void {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            const index = cliente.getPets.findIndex(p => p.getNome === nomePet);
            if (index !== -1) {
                cliente.getPets.splice(index, 1);
                console.log(`Pet ${nomePet} do cliente ${cliente.nome} excluído (localmente).`);
            } else {
                console.warn(`Pet ${nomePet} não encontrado para o cliente ${cliente.nome} (localmente).`);
            }
        } else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado para excluir pet (localmente).`);
        }
    }

    cadastrarProduto(nome: string, valor: number, descricao: string): void {
        const produto = new Produto(nome, valor, descricao);
        this.empresa.getProdutos.push(produto);
        console.log(`Produto ${nome} cadastrado (localmente).`);
    }

    atualizarProduto(nomeProdutoOriginal: string, novoNome: string, novoValor: number, novaDescricao: string): void {
        const produto = this.empresa.getProdutos.find(p => p.getNome === nomeProdutoOriginal);
        if (produto) {
            if (novoNome) produto.setNome(novoNome);
            if (novoValor !== undefined && novoValor !== null) produto.setValor(novoValor);
            if (novaDescricao) produto.setDescricao(novaDescricao);
            console.log(`Produto ${nomeProdutoOriginal} atualizado (localmente).`);
        } else {
            console.warn(`Produto ${nomeProdutoOriginal} não encontrado para atualização (localmente).`);
        }
    }

    excluirProduto(nomeProduto: string): void {
        const index = this.empresa.getProdutos.findIndex(p => p.getNome === nomeProduto);
        if (index !== -1) {
            this.empresa.getProdutos.splice(index, 1);
            console.log(`Produto ${nomeProduto} excluído (localmente).`);
        } else {
            console.warn(`Produto ${nomeProduto} não encontrado para exclusão (localmente).`);
        }
    }

    cadastrarServico(nome: string, valor: number, descricao: string): void {
        const servico = new Servico(nome, valor, descricao);
        this.empresa.getServicos.push(servico);
        console.log(`Serviço ${nome} cadastrado (localmente).`);
    }

    atualizarServico(nomeServicoOriginal: string, novoNome: string, novoValor: number, novaDescricao: string): void {
        const servico = this.empresa.getServicos.find(s => s.getNome === nomeServicoOriginal);
        if (servico) {
            if (novoNome) servico.setNome(novoNome);
            if (novoValor !== undefined && novoValor !== null) servico.setValor(novoValor);
            if (novaDescricao) servico.setDescricao(novaDescricao);
            console.log(`Serviço ${nomeServicoOriginal} atualizado (localmente).`);
        } else {
            console.warn(`Serviço ${nomeServicoOriginal} não encontrado para atualização (localmente).`);
        }
    }

    excluirServico(nomeServico: string): void {
        const index = this.empresa.getServicos.findIndex(s => s.getNome === nomeServico);
        if (index !== -1) {
            this.empresa.getServicos.splice(index, 1);
            console.log(`Serviço ${nomeServico} excluído (localmente).`);
        } else {
            console.warn(`Serviço ${nomeServico} não encontrado para exclusão (localmente).`);
        }
    }

    registrarConsumo(cpfCliente: string, nomeItem: string, tipoItem: 'produto' | 'servico'): void {
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpfCliente);
        if (cliente) {
            if (tipoItem === 'produto') {
                const produto = this.empresa.getProdutos.find(p => p.getNome === nomeItem);
                if (produto) {
                    cliente.getProdutosConsumidos.push(produto);
                    console.log(`Produto ${nomeItem} registrado para ${cliente.nome} (localmente)`);
                } else {
                    console.warn(`Produto ${nomeItem} não encontrado (localmente).`);
                }
            } else if (tipoItem === 'servico') {
                const servico = this.empresa.getServicos.find(s => s.getNome === nomeItem);
                if (servico) {
                    cliente.getServicosConsumidos.push(servico);
                    console.log(`Serviço ${nomeItem} registrado para ${cliente.nome} (localmente)`);
                } else {
                    console.warn(`Serviço ${nomeItem} não encontrado (localmente).`);
                }
            }
        } else {
            console.warn(`Cliente com CPF ${cpfCliente} não encontrado (localmente).`);
        }
    }

    getRelatorioTop10ClientesPorQuantidade() {
        const listaClientes: { cliente: Cliente, quantidade: number }[] = [];
        this.empresa.getClientes.forEach(cliente => {
            const produtos = cliente.getProdutosConsumidos.length;
            const servicos = cliente.getServicosConsumidos.length;
            const total = produtos + servicos;
            listaClientes.push({ cliente, quantidade: total });
        });
        const top10 = listaClientes
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 10)
            .map((item, index) => ({
                posicao: index + 1,
                cliente: item.cliente.nome,
                quantidadeProdutos: item.cliente.getProdutosConsumidos.length,
                quantidadeServicos: item.cliente.getServicosConsumidos.length,
                total: item.quantidade
            }));
        return top10.filter(item => item.total > 0);
    }

    getRelatorioTop5ClientesPorValor() {
        const listaClientes: { cliente: Cliente, valor: number }[] = [];
        this.empresa.getClientes.forEach(cliente => {
            let valorTotal = 0;
            cliente.getProdutosConsumidos.forEach(produto => {
                valorTotal += produto.getValor;
            });
            cliente.getServicosConsumidos.forEach(servico => {
                valorTotal += servico.getValor;
            });
            listaClientes.push({ cliente, valor: valorTotal });
        });
        const top5 = listaClientes
            .sort((a, b) => b.valor - a.valor)
            .slice(0, 5)
            .map((item, index) => ({
                posicao: index + 1,
                cliente: item.cliente.nome,
                valorTotal: item.valor
            }));
        return top5.filter(item => item.valorTotal > 0);
    }

    getRelatorioProdutosServicosMaisConsumidos() {
        const contagem: { [key: string]: { nome: string, tipo: 'Produto' | 'Serviço', quantidade: number } } = {};

        this.empresa.getProdutos.forEach(p => {
            contagem[`Produto-${p.getNome}`] = { nome: p.getNome, tipo: 'Produto', quantidade: 0 };
        });
        this.empresa.getServicos.forEach(s => {
            contagem[`Serviço-${s.getNome}`] = { nome: s.getNome, tipo: 'Serviço', quantidade: 0 };
        });

        this.empresa.getClientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                const key = `Produto-${produto.getNome}`;
                if (contagem[key]) {
                    contagem[key].quantidade++;
                }
            });
            cliente.getServicosConsumidos.forEach(servico => {
                const key = `Serviço-${servico.getNome}`;
                if (contagem[key]) {
                    contagem[key].quantidade++;
                }
            });
        });
        const ranking = Object.values(contagem)
            .filter(item => item.quantidade > 0)
            .sort((a, b) => b.quantidade - a.quantidade);
        return ranking;
    }

    getRelatorioConsumoPorTipoRaca() {
        const resultados: { tipoRaca: string, nome: string, tipo: 'Produto' | 'Serviço', quantidade: number }[] = [];

        this.empresa.getClientes.forEach(cliente => {
            cliente.getPets.forEach(pet => {
                const tipo = pet.getTipo;
                const raca = pet.getRaca;
                
                if (!tipo || !raca || tipo.trim() === '' || raca.trim() === '') {
                    console.warn(`[Relatório Tipo/Raça] Pulando Pet com tipo/raça indefinidos/vazios para cliente ${cliente.nome}: ${pet.getNome}`);
                    return;
                }

                const tipoRaca = `${tipo} - ${raca}`;

                cliente.getProdutosConsumidos.forEach(produto => {
                    let encontrado = resultados.find(r => r.tipoRaca === tipoRaca && r.nome === produto.getNome && r.tipo === 'Produto');
                    if (encontrado) {
                        encontrado.quantidade++;
                    } else {
                        resultados.push({ tipoRaca, nome: produto.getNome, tipo: 'Produto', quantidade: 1 });
                    }
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    let encontrado = resultados.find(r => r.tipoRaca === tipoRaca && r.nome === servico.getNome && r.tipo === 'Serviço');
                    if (encontrado) {
                        encontrado.quantidade++;
                    } else {
                        resultados.push({ tipoRaca, nome: servico.getNome, tipo: 'Serviço', quantidade: 1 });
                    }
                });
            });
        });
        
        const grupos: { [key: string]: { tipoRaca: string, nome: string, tipo: 'Produto' | 'Serviço', quantidade: number }[] } = {};
        resultados.forEach(item => {
            if (!grupos[item.tipoRaca]) grupos[item.tipoRaca] = [];
            grupos[item.tipoRaca].push(item);
        });
        
        const relatorioFinal: any[] = [];
        Object.keys(grupos).sort().forEach(tipoRaca => {
            grupos[tipoRaca].sort((a, b) => b.quantidade - a.quantidade).forEach(item => {
                relatorioFinal.push(item);
            });
        });
        
        return relatorioFinal;
    }

    getRelatorioConsumoPorTipo() {
        const resultados: { tipoPet: string, nomeItem: string, tipoItem: 'Produto' | 'Serviço', quantidade: number }[] = [];

        this.empresa.getClientes.forEach(cliente => {
            cliente.getPets.forEach(pet => {
                const tipoPet = pet.getTipo;
                
                if (!tipoPet || tipoPet.trim() === '') {
                    console.warn(`[Relatório Tipo] Pulando Pet com tipo indefinido/vazio para cliente ${cliente.nome}: ${pet.getNome}`);
                    return;
                }

                cliente.getProdutosConsumidos.forEach(produto => {
                    let encontrado = resultados.find(r => r.tipoPet === tipoPet && r.nomeItem === produto.getNome && r.tipoItem === 'Produto');
                    if (encontrado) {
                        encontrado.quantidade++;
                    } else {
                        resultados.push({ tipoPet, nomeItem: produto.getNome, tipoItem: 'Produto', quantidade: 1 });
                    }
                });
                cliente.getServicosConsumidos.forEach(servico => {
                    let encontrado = resultados.find(r => r.tipoPet === tipoPet && r.nomeItem === servico.getNome && r.tipoItem === 'Serviço');
                    if (encontrado) {
                        encontrado.quantidade++;
                    } else {
                        resultados.push({ tipoPet, nomeItem: servico.getNome, tipoItem: 'Serviço', quantidade: 1 });
                    }
                });
            });
        });

        const grupos: { [key: string]: { tipoPet: string, nomeItem: string, tipoItem: 'Produto' | 'Serviço', quantidade: number }[] } = {};
        resultados.forEach(item => {
            if (!grupos[item.tipoPet]) grupos[item.tipoPet] = [];
            grupos[item.tipoPet].push(item);
        });
        
        const relatorioFinal: any[] = [];
        Object.keys(grupos).sort().forEach(tipoPet => {
            grupos[tipoPet].sort((a, b) => b.quantidade - a.quantidade).forEach(item => {
                relatorioFinal.push(item);
            });
        });
        
        return relatorioFinal;
    }


    private popularDadosIniciaisLocais(): void {
        const racaoPremium = new Produto("Ração Premium", 75.50, "Ração de alta qualidade para cães e gatos");
        this.empresa.getProdutos.push(racaoPremium);

        const visitaVeterinaria = new Servico("Visita Veterinária", 500.00, "Consulta e check-up geral");
        this.empresa.getServicos.push(visitaVeterinaria);

        const petCachorro = new Pet("Buddy", "Poodle", "Macho", "Cachorro");
        const petGato = new Pet("Mia", "Siamese", "Fêmea", "Gato");
        const petPassaro = new Pet("Pipoca", "Calopsita", "Fêmea", "Pássaro");

        console.log("Produtos e Serviços locais populados.");
    }
}

const empresaService = new EmpresaService();
export default empresaService;