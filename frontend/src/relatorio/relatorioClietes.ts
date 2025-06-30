import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

export default class RelatorioClientes {
    private clientes: Array<Cliente>;
    private entrada: Entrada;

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes;
        this.entrada = new Entrada();
    }

    public gerarTop10ClientesPorQuantidade(): void {
        console.log("\n=== TOP 10 CLIENTES QUE MAIS CONSUMIRAM (POR QUANTIDADE) ===");
        
        const listaClientes: { cliente: Cliente, quantidade: number }[] = [];
        
        this.clientes.forEach(cliente => {
            const produtos = cliente.getProdutosConsumidos.length;
            const servicos = cliente.getServicosConsumidos.length;
            const total = produtos + servicos;
            
            listaClientes.push({ cliente, quantidade: total });
        });
        
        const top10 = listaClientes
            .sort((a, b) => b.quantidade - a.quantidade)
            .slice(0, 10);
        
        if (top10.length === 0 || top10.every(item => item.quantidade === 0)) {
            console.log("Nenhum consumo registrado.");
            this.entrada.receberTexto("\nPressione Enter para continuar...");
            return;
        }
        
        console.log("\nPosição | Cliente | Produtos | Serviços | Total");
        console.log("--------|---------|----------|----------|------");
        
        top10.forEach((item, index) => {
            if (item.quantidade > 0) {
                const produtos = item.cliente.getProdutosConsumidos.length;
                const servicos = item.cliente.getServicosConsumidos.length;
                console.log(`${(index + 1).toString().padStart(7)} | ${item.cliente.nome.padEnd(7)} | ${produtos.toString().padStart(8)} | ${servicos.toString().padStart(8)} | ${item.quantidade}`);
            }
        });
        
        this.entrada.receberTexto("\nPressione Enter para continuar...");
    }

    public gerarTop5ClientesPorValor(): void {
        console.log("\n=== TOP 5 CLIENTES QUE MAIS CONSUMIRAM (POR VALOR) ===");
        
        const listaClientes: { cliente: Cliente, valor: number }[] = [];
        
        this.clientes.forEach(cliente => {
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
            .slice(0, 5);
        
        if (top5.length === 0 || top5.every(item => item.valor === 0)) {
            console.log("Nenhum consumo registrado.");
            this.entrada.receberTexto("\nPressione Enter para continuar...");
            return;
        }
        
        console.log("\nPosição | Cliente | Valor Total");
        console.log("--------|---------|------------");
        
        top5.forEach((item, index) => {
            if (item.valor > 0) {
                console.log(`${(index + 1).toString().padStart(7)} | ${item.cliente.nome.padEnd(7)} | R$ ${item.valor.toFixed(2)}`);
            }
        });
        
        this.entrada.receberTexto("\nPressione Enter para continuar...");
    }
}