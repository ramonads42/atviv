import Cliente from "modelo/cliente"; 
import CPF from "modelo/cpf";      
import Telefone from "modelo/telefone"; 

const API_BASE_URL = 'http://localhost:32831/cliente';


class ClienteApiService {


    async getClientes(): Promise<Cliente[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/clientes`);
            if (!response.ok) {

                throw new Error(`Erro HTTP! status: ${response.status}`);
            }
            const data = await response.json();
            
            return data.map((clienteData: any) => {
                const id = clienteData.id; 

                const cpf = new CPF("CPF Não Disponível", new Date()); 
                
                const cliente = new Cliente(clienteData.nome, clienteData.nomeSocial, cpf, id);
                
                if (clienteData.telefones && Array.isArray(clienteData.telefones)) {
                    clienteData.telefones.forEach((telData: any) => {
                        cliente.getTelefones.push(new Telefone(telData.ddd, telData.numero));
                    });
                }

                return cliente;
            });
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
            return []; 
        }
    }


    async cadastrarCliente(cliente: { nome: string, nomeSocial: string, cpf: string, dataEmissaoCpf: string, telefones?: { ddd: string, numero: string }[] }): Promise<boolean> {
        try {
            const payload = {
                nome: cliente.nome,
                nomeSocial: cliente.nomeSocial,
                email: null, 
                endereco: null,
                telefones: [] 
            };

            const response = await fetch(`${API_BASE_URL}/cadastrar`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 200 || response.status === 201) {
                console.log("Cliente cadastrado com sucesso no backend!");
                return true;
            } else {
                const errorText = await response.text();
                console.error(`Erro ao cadastrar cliente! Status: ${response.status}, Resposta: ${errorText}`);
                return false;
            }
        } catch (error) {
            console.error("Erro na requisição de cadastro:", error);
            return false;
        }
    }

    async atualizarCliente(idCliente: number, novoNome: string, novoNomeSocial: string): Promise<boolean> {
        try {
            const payload = {
                id: idCliente,
                nome: novoNome,
                nomeSocial: novoNomeSocial,
            };

            const response = await fetch(`${API_BASE_URL}/atualizar`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 200) { 
                console.log(`Cliente ID ${idCliente} atualizado com sucesso no backend!`);
                return true;
            } else {
                const errorText = await response.text();
                console.error(`Erro ao atualizar cliente! Status: ${response.status}, Resposta: ${errorText}`);
                return false;
            }
        } catch (error) {
            console.error("Erro na requisição de atualização:", error);
            return false;
        }
    }

    async excluirCliente(idCliente: number): Promise<boolean> {
        try {
            const payload = { id: idCliente };

            const response = await fetch(`${API_BASE_URL}/excluir`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            if (response.status === 200) {
                console.log(`Cliente ID ${idCliente} excluído com sucesso do backend!`);
                return true;
            } else {
                const errorText = await response.text();
                console.error(`Erro ao excluir cliente! Status: ${response.status}, Resposta: ${errorText}`);
                return false;
            }
        } catch (error) {
            console.error("Erro na requisição de exclusão:", error);
            return false;
        }
    }
}

const clienteApiService = new ClienteApiService();
export default clienteApiService;
