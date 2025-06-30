import Entrada from "io/entrada";     
import Servico from "../modelo/servico"; 

export default class AtualizacaoServico {
    private servicos: Array<Servico>
    private entrada: Entrada
    
    constructor(servicos: Array<Servico>) {
        this.servicos = servicos
        this.entrada = new Entrada()
    }
    
    public atualizar(): void {
        console.log("\nAtualização de serviço")
        
        if (this.servicos.length === 0) {
            console.log("\nNão há serviços para atualizar!")
            return
        }
        
        console.log("\nServiços disponíveis:")
        for (let i = 0; i < this.servicos.length; i++) {
            console.log(`${i + 1} - ${this.servicos[i].getNome}`)
        }
        
        let numero = this.entrada.receberNumero("\nDigite o número do serviço que quer atualizar: ") - 1
        
        if (numero >= 0 && numero < this.servicos.length) {
            let servico = this.servicos[numero]
            
            let nome = this.entrada.receberTexto("Novo nome: ")
            let valor = this.entrada.receberNumero("Novo valor: ")
            let descricao = this.entrada.receberTexto("Nova descrição: ")
            
            servico.setNome(nome)
            servico.setValor(valor)
            servico.setDescricao(descricao)
            
            console.log("\nServiço atualizado!")
        } else {
            console.log("\nNúmero inválido!")
        }
    }
}
