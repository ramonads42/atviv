import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Pet from "../modelo/pet"
import Cadastro from "./cadastro"

export default class CadastroPet extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    
    public cadastrar(): void {
        console.log("\nInício do cadastro de pet")
        
        let cpf = this.entrada.receberTexto("Digite o CPF do cliente proprietário do pet: ")
        
        let clienteEncontrado = false
        
        for (let i = 0; i < this.clientes.length; i++) {
            let cliente = this.clientes[i]
            if (cliente.getCpf.getValor === cpf) {
                clienteEncontrado = true
                console.log("\nCliente encontrado: " + cliente.nome)
                
                let nome = this.entrada.receberTexto("Digite o nome do pet: ")
                let tipo = this.entrada.receberTexto("Digite o tipo do pet (ex: cachorro, gato): ")
                let raca = this.entrada.receberTexto("Digite a raça do pet: ")
                let genero = this.entrada.receberTexto("Digite o gênero do pet (M/F): ")
                
                let pet = new Pet(nome, raca, genero, tipo)
                
                cliente.getPets.push(pet)
                
                console.log("\nPet cadastrado com sucesso!")
                break
            }
        }
        
        if (!clienteEncontrado) {
            console.log("\nCliente não encontrado!")
        }
    }
}