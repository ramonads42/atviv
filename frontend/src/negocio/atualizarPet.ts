import Entrada from "io/entrada"; 
import Cliente from "../modelo/cliente"; 
import Pet from "../modelo/pet"; 

export default class AtualizacaoPet {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public atualizar(): void {
        console.log("\nAtualização de pet")
        
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
            })
            
            let indicePet = this.entrada.receberNumero("\nEscolha o número do pet que deseja atualizar: ") - 1
            
            if (indicePet >= 0 && indicePet < pets.length) {
                let pet = pets[indicePet]
                console.log(`\nAtualizando o pet: ${pet.getNome}`)
                console.log(`Tipo atual: ${pet.getTipo}`)
                console.log(`Raça atual: ${pet.getRaca}`)
                console.log(`Gênero atual: ${pet.getGenero}`)
                
                let novoNome = this.entrada.receberTexto("\nDigite o novo nome (deixe em branco para manter o atual): ")
                if (novoNome.length > 0) {
                    pet.setNome(novoNome)
                }
                
                let novoTipo = this.entrada.receberTexto("Digite o novo tipo (deixe em branco para manter o atual): ")
                if (novoTipo.length > 0) {
                    pet.setTipo(novoTipo)
                }
                
                let novaRaca = this.entrada.receberTexto("Digite a nova raça (deixe em branco para manter a atual): ")
                if (novaRaca.length > 0) {
                    pet.setRaca(novaRaca)
                }
                
                let novoGenero = this.entrada.receberTexto("Digite o novo gênero (deixe em branco para manter o atual): ")
                if (novoGenero.length > 0) {
                    pet.setGenero(novoGenero)
                }
                
                console.log("\nPet atualizado com sucesso!")
            } else {
                console.log("\nNúmero de pet inválido!")
            }
        } else {
            console.log("\nCliente não encontrado!")
        }
    }
}
