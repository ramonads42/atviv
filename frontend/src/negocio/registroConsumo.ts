import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Produto from "../modelo/produto"
import Servico from "../modelo/servico"

export default class RegistroConsumo {
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    private entrada: Entrada
    
    constructor(clientes: Array<Cliente>, produtos: Array<Produto>, servicos: Array<Servico>) {
        this.clientes = clientes
        this.produtos = produtos
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    
    public registrar(): void {
        console.log("\nRegistro de Consumo")
        
        if (this.clientes.length === 0) {
            console.log("\nNão há clientes cadastrados para registrar consumo!")
            return
        }
        
        console.log("\nClientes disponíveis:")
        for (let i = 0; i < this.clientes.length; i++) {
            console.log(`${i + 1} - ${this.clientes[i].nome}`)
        }
        
        let numeroCliente = this.entrada.receberNumero("\nDigite o número do cliente: ") - 1
        
        if (numeroCliente < 0 || numeroCliente >= this.clientes.length) {
            console.log("\nNúmero de cliente inválido!")
            return
        }
        
        let cliente = this.clientes[numeroCliente]
        
        console.log("\nO que deseja registrar?")
        console.log("1 - Produto")
        console.log("2 - Serviço")
        
        let opcao = this.entrada.receberNumero("\nEscolha uma opção: ")
        
        if (opcao === 1) {
            this.registrarProduto(cliente)
        } 
        else if (opcao === 2) {
            this.registrarServico(cliente)
        }
        else {
            console.log("\nOpção inválida!")
        }
    }
    
    private registrarProduto(cliente: Cliente): void {
        if (this.produtos.length === 0) {
            console.log("\nNão há produtos cadastrados!")
            return
        }
        
        console.log("\nProdutos disponíveis:")
        for (let i = 0; i < this.produtos.length; i++) {
            console.log(`${i + 1} - ${this.produtos[i].getNome} (R$ ${this.produtos[i].getValor})`)
        }
        
        let numeroProduto = this.entrada.receberNumero("\nDigite o número do produto: ") - 1
        
        if (numeroProduto < 0 || numeroProduto >= this.produtos.length) {
            console.log("\nNúmero de produto inválido!")
            return
        }
        
        let produto = this.produtos[numeroProduto]
        
        cliente.getProdutosConsumidos.push(produto)
        
        console.log(`\nProduto "${produto.getNome}" registrado para o cliente "${cliente.nome}" com sucesso!`)
    }
    
    private registrarServico(cliente: Cliente): void {
        if (this.servicos.length === 0) {
            console.log("\nNão há serviços cadastrados!")
            return
        }
        
        console.log("\nServiços disponíveis:")
        for (let i = 0; i < this.servicos.length; i++) {
            console.log(`${i + 1} - ${this.servicos[i].getNome} (R$ ${this.servicos[i].getValor})`)
        }
        
        let numeroServico = this.entrada.receberNumero("\nDigite o número do serviço: ") - 1
        
        if (numeroServico < 0 || numeroServico >= this.servicos.length) {
            console.log("\nNúmero de serviço inválido!")
            return
        }
        
        let servico = this.servicos[numeroServico]
        
        cliente.getServicosConsumidos.push(servico)
        
        console.log(`\nServiço "${servico.getNome}" registrado para o cliente "${cliente.nome}" com sucesso!`)
    }
}