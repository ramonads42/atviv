import Cliente from "../modelo/cliente"
import Listagem from "./listagem"
import Entrada from "../io/entrada"

export default class ListagemPets extends Listagem {
    private clientes: Array<Cliente>
    private entrada: Entrada
    
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    
    public listar(): void {
        console.log("\nListagem de pets")
        
        console.log("Escolha uma opção:")
        console.log("1 - Listar todos os pets")
        console.log("2 - Listar pets de um cliente específico")
        const opcao = this.entrada.receberNumero("Digite o número da opção: ")
        
        if (opcao === 1) {
            this.listarTodosPets()
        } else if (opcao === 2) {
            this.listarPetsCliente()
        } else {
            console.log("\nOpção inválida!")
        }
    }
    
    private listarTodosPets(): void {
        console.log("\nLista de todos os pets:")
        
        let encontrouPets = false
        
        for (let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i]
            let pets = cliente.getPets
            
            if (pets.length > 0) {
                console.log("\nPets de " + cliente.nome + ":")
                
                for (let j = 0; j < pets.length; j++) {
                    let pet = pets[j]
                    console.log("Nome: " + pet.getNome)
                    console.log("Tipo: " + pet.getTipo)
                    console.log("Raça: " + pet.getRaca)
                    console.log("Gênero: " + pet.getGenero)
                    console.log("--------------------------------------")
                }
                
                encontrouPets = true
            }
        }
        
        if (!encontrouPets) {
            console.log("\nNenhum pet cadastrado!")
        }
    }
    
    private listarPetsCliente(): void {
        const cpf = this.entrada.receberTexto("\nDigite o CPF do cliente: ")
        
        let clienteEncontrado = false
        
        for (let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i]
            if (cliente.getCpf.getValor === cpf) {
                clienteEncontrado = true
                let pets = cliente.getPets
                
                if (pets.length > 0) {
                    console.log("\nPets de " + cliente.nome + ":")
                    
                    for (let j = 0; j < pets.length; j++) {
                        let pet = pets[j]
                        console.log("Nome: " + pet.getNome)
                        console.log("Tipo: " + pet.getTipo)
                        console.log("Raça: " + pet.getRaca)
                        console.log("Gênero: " + pet.getGenero)
                        console.log("--------------------------------------")
                    }
                } else {
                    console.log("\nEste cliente não possui pets cadastrados!")
                }
                break
            }
        }
        
        if (!clienteEncontrado) {
            console.log("\nCliente não encontrado!")
        }
    }
}