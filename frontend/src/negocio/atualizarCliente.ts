import Entrada from "io/entrada"; 
import Cliente from "../modelo/cliente"; 
import CPF from "../modelo/cpf"; 

export default class AtualizacaoCliente {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    
    public atualizar(): void {
        console.log("\nAtualização de cliente")
        let cpf = this.entrada.receberTexto("Digite o CPF do cliente que deseja atualizar: ")
        
        let clienteEncontrado = false
        for (let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i]
            if (cliente.getCpf.getValor === cpf) {
                clienteEncontrado = true
                console.log("\nCliente encontrado!")
                console.log("Nome atual: " + cliente.nome)
                console.log("Nome social atual: " + cliente.nomeSocial)
                
                let novoNome = this.entrada.receberTexto("Digite o novo nome (deixe em branco para manter o atual): ")
                let novoNomeSocial = this.entrada.receberTexto("Digite o novo nome social (deixe em branco para manter o atual): ")
                
                if (novoNome.length > 0) {
                    cliente.nome = novoNome
                }
                
                if (novoNomeSocial.length > 0) {
                    cliente.nomeSocial = novoNomeSocial
                }
                
                console.log("\nCliente atualizado com sucesso!")

                break
            }
        }
        
        if (!clienteEncontrado) {
            console.log("\nCliente não encontrado!")
        }
    }
}
