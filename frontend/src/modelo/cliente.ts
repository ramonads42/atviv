import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public id: number | null;
    public nome: string
    public nomeSocial: string
    private cpf: CPF 
    private rgs: Array<RG>
    private dataCadastro: Date
    private telefones: Array<Telefone>
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    private pets: Array<Pet>


    constructor(nome: string, nomeSocial: string, cpf: CPF | null = null, id: number | null = null) {
        this.id = id;
        this.nome = nome
        this.nomeSocial = nomeSocial
        this.cpf = cpf || new CPF("000.000.000-00", new Date()); 
        this.rgs = []
        this.dataCadastro = new Date()
        this.telefones = []
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.pets = []
    }

    public get getCpf(): CPF {
        return this.cpf
    }
    public get getRgs(): Array<RG> {
        return this.rgs
    }
    public get getDataCadastro(): Date {
        return this.dataCadastro
    }
    public get getTelefones(): Array<Telefone> {
        return this.telefones
    }
    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }
    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }
    public get getPets(): Array<Pet> {
        return this.pets
    }

    public setId(id: number): void {
        this.id = id;
    }

    public setCpf(cpf: CPF): void {
        this.cpf = cpf;
    }
}
