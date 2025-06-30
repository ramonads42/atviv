export default class Entrada {
    public receberNumero(mensagem: string): number {

        console.warn(`Tentativa de receber número via Entrada (console) em ambiente web: ${mensagem}`);
        return 0; 
    }
    public receberTexto(mensagem: string): string {

        console.warn(`Tentativa de receber texto via Entrada (console) em ambiente web: ${mensagem}`);
        return ""; 
    }
}