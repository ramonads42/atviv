import Entrada from "../io/entrada"
import Produto from "../modelo/produto"

export default class ExclusaoProduto {
    private produtos: Array<Produto>
    private entrada: Entrada

    constructor(produtos: Array<Produto>) {
        this.produtos = produtos
        this.entrada = new Entrada()
    }

    public excluir(): void {
        console.log("\nExclusão de produto")
        
        if (this.produtos.length === 0) {
            console.log("\nNão há produtos cadastrados para excluir!")
            return
        }
        
        console.log("\nProdutos disponíveis:")
        this.produtos.forEach((produto, index) => {
            console.log(`${index + 1} - ${produto.getNome} (R$ ${produto.getValor})`)
        })
        
        let indiceProduto = this.entrada.receberNumero("\nEscolha o número do produto que deseja excluir: ") - 1
        
        if (indiceProduto >= 0 && indiceProduto < this.produtos.length) {
            let produto = this.produtos[indiceProduto]
            
            let confirmacao = this.entrada.receberTexto(`\nTem certeza que deseja excluir o produto "${produto.getNome}"? (S/N): `)
            
            if (confirmacao.toUpperCase() === "S") {
                this.produtos.splice(indiceProduto, 1)
                console.log("\nProduto excluído com sucesso!")
            } else {
                console.log("\nOperação cancelada.")
            }
        } else {
            console.log("\nNúmero de produto inválido!")
        }
    }
}