import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Produto from "../modelo/produto";
import Servico from "../modelo/servico";

export default class RelatorioProdutosServicos {
    private clientes: Array<Cliente>;
    private produtos: Array<Produto>;
    private servicos: Array<Servico>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        this.clientes = clientes;
        this.produtos = produtos;
        this.servicos = servicos;
        this.entrada = new Entrada();
    }

    public gerarRelatorioGeralMaisConsumidos(): void {
        console.log("\n=== PRODUTOS E SERVIÇOS MAIS CONSUMIDOS (GERAL) ===");
        
        const contagem: { nome: string, tipo: string, quantidade: number }[] = [];
        
        this.produtos.forEach(produto => {
            contagem.push({ nome: produto.getNome, tipo: 'Produto', quantidade: 0 });
        });
        
        this.servicos.forEach(servico => {
            contagem.push({ nome: servico.getNome, tipo: 'Serviço', quantidade: 0 });
        });
        
        this.clientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                const item = contagem.find(c => c.nome === produto.getNome && c.tipo === 'Produto');
                if (item) {
                    item.quantidade++;
                }
            });
            
            cliente.getServicosConsumidos.forEach(servico => {
                const item = contagem.find(c => c.nome === servico.getNome && c.tipo === 'Serviço');
                if (item) {
                    item.quantidade++;
                }
            });
        });
        
        const consumidos = contagem.filter(item => item.quantidade > 0);
        
        const ranking = consumidos.sort((a, b) => b.quantidade - a.quantidade);
        
        if (ranking.length === 0) {
            console.log("Nenhum consumo registrado.");
            this.entrada.receberTexto("\nPressione Enter para continuar...");
            return;
        }
        
        console.log("\nTipo     | Nome | Quantidade Total");
        console.log("---------|------|----------------");
        
        ranking.forEach(item => {
            console.log(`${item.tipo.padEnd(8)} | ${item.nome.padEnd(4)} | ${item.quantidade}`);
        });
    }}