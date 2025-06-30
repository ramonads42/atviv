import Servico from "../modelo/servico"
import Listagem from "./listagem"

export default class ListagemServico extends Listagem {
    private servicos: Array<Servico>
    
    constructor(servicos: Array<Servico>) {
        super()
        this.servicos = servicos
    }
    
    public listar(): void {
        console.log("\nLista de serviços:")
        
        if (this.servicos.length === 0) {
            console.log("Nenhum serviço cadastrado.")
            return
        }
        
        this.servicos.forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.getNome}`)
            console.log(`   Valor: R$ ${servico.getValor}`)
            console.log(`   Descrição: ${servico.getDescricao}`)
            console.log("--------------------------------------")
        })
    }
}