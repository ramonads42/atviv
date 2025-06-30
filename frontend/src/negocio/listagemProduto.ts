import Produto from "../modelo/produto"
import Listagem from "./listagem"

export default class ListagemProdutos extends Listagem {
    private produtos: Array<Produto>
    
    constructor(produtos: Array<Produto>) {
        super()
        this.produtos = produtos
    }
    
    public listar(): void {
        console.log("\nLista de Produtos:")
        
        if (this.produtos.length === 0) {
            console.log("\nNenhum produto cadastrado!")
            return
        }
        
        for (let i = 0; i < this.produtos.length; i++) {
            let produto = this.produtos[i]
            console.log(`Nome: ${produto.getNome}`)
            console.log(`Valor: R$ ${produto.getValor}`)
            console.log(`Descrição: ${produto.getDescricao}`)
            console.log("--------------------------------------")
        }
    }
}