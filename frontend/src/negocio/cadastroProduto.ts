import Entrada from "../io/entrada"
import Produto from "../modelo/produto"
import Empresa from "../modelo/empresa"
import Cadastro from "./cadastro"

export default class CadastroProduto extends Cadastro {
    private produtos: Array<Produto>
    private entrada: Entrada
    
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
        this.entrada = new Entrada()
    }
    
    public cadastrar(): void {
        console.log("\nCadastro de Produto")
        
        let nome = this.entrada.receberTexto("Digite o nome do produto: ")
        let valor = this.entrada.receberNumero("Digite o valor do produto: ")
        let descricao = this.entrada.receberTexto("Digite a descrição do produto: ")
        
        let produto = new Produto(nome, valor, descricao)
        
        this.produtos.push(produto)
        
        console.log("\nProduto cadastrado com sucesso!")
    }
}