import Endereco from "./Endereco"

export type Role = "user" | "admin"

export default interface User {
    id: string
    name: string
    email: string
    createdAt: Date
    updatedAt: Date
    endereco: Endereco
    role: Role
}