import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"

export default class ExclusaoPet {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public excluir(): void {
        console.log("\nExclusão de pet")
        
        let cpf = this.entrada.receberTexto("Digite o CPF do cliente dono do pet: ")
        
        let clienteEncontrado = false
        let cliente: Cliente | undefined
        
        for (let i = 0; i < this.clientes.length; i++) {
            if (this.clientes[i].getCpf.getValor === cpf) {
                clienteEncontrado = true
                cliente = this.clientes[i]
                break
            }
        }

        if (clienteEncontrado && cliente) {
            console.log(`\nCliente encontrado: ${cliente.nome}`)
            
            let pets = cliente.getPets
            if (pets.length === 0) {
                console.log("\nEste cliente não possui pets cadastrados!")
                return
            }
            
            console.log("\nPets do cliente:")
            pets.forEach((pet, index) => {
                console.log(`${index + 1} - ${pet.getNome} (${pet.getTipo})`)
            })
            
            let indicePet = this.entrada.receberNumero("\nEscolha o número do pet que deseja excluir: ") - 1
            
            if (indicePet >= 0 && indicePet < pets.length) {
                let pet = pets[indicePet]
                
                let confirmacao = this.entrada.receberTexto(`\nTem certeza que deseja excluir o pet "${pet.getNome}"? (S/N): `)
                
                if (confirmacao.toUpperCase() === "S") {
                    pets.splice(indicePet, 1)
                    console.log("\nPet excluído com sucesso!")
                } else {
                    console.log("\nOperação cancelada.")
                }
            } else {
                console.log("\nNúmero de pet inválido!")
            }
        } else {
            console.log("\nCliente não encontrado!")
        }
    }
}