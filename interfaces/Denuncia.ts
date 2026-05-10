import Endereco from "./Endereco"
import User from "./user"

export default interface Denuncia {
    id:string
    categoria: string
    tipoDoProblema: string
    risco: string
    prioridade: string
    imagem: string
    custo: string
    status: string
    createdAt: Date
    updateAt: Date
    userId: string
    user: User
    enderecoId: string
    endereco: Endereco
}