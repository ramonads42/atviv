import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"

export default class ExclusaoCliente {
    private clientes: Array<Cliente>
    private entrada: Entrada
    
    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    
    public excluir(): void {
        console.log("\nExclusão de cliente")
        let cpf = this.entrada.receberTexto("Digite o CPF do cliente que deseja excluir: ")
        
        let clienteEncontrado = false
        let indiceCliente = -1
            
        for (let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i]
            if (cliente.getCpf.getValor === cpf) {
                clienteEncontrado = true
                indiceCliente = i
                console.log("\nCliente encontrado: " + cliente.nome)
                
                let confirmacao = this.entrada.receberTexto("Tem certeza que deseja excluir este cliente? (S/N): ")
                
                if (confirmacao === "S" || confirmacao === "s") {
                    this.clientes.splice(indiceCliente, 1)
                    console.log("\nCliente excluído com sucesso!")
                } else {
                    console.log("\nOperação cancelada.")
                }
                break
            }
        }
        
        if (!clienteEncontrado) {
            console.log("\nCliente não encontrado!")
        }
    }
}