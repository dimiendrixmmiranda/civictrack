import bcrypt from "bcrypt"

import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { generateToken, verifyToken } from "@/lib/auth"

export async function POST(req: Request) {
    try {
        const { name, email, password, sexo, telefone, imagem, endereco } = await req.json()

        if (!email || !password) {
            return Response.json(
                { error: "Email e senha são obrigatórios" },
                { status: 400 }
            )
        }

        const userExists = await prisma.user.findUnique({
            where: { email }
        })

        if (userExists) {
            return Response.json(
                { error: "Usuário já existe" },
                { status: 400 }
            )
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                imagem: imagem || `${sexo === 'masculino' ? '/sexo/masculino.png': '/sexo/feminino.png'}`,
                sexo,
                telefone,

                endereco: {
                    create: {
                        rua: endereco.rua,
                        numero: endereco.numero,
                        bairro: endereco.bairro,
                        complemento: endereco.complemento,
                        latitude: endereco.latitude,
                        longitude: endereco.longitude
                    }
                },
            }
        })

        const token = generateToken(user.id)

        const cookieStore = await cookies()
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            maxAge: 60 * 60 * 24 * 7
        })

        return Response.json({
            id: user.id,
            name: user.name,
            email: user.email
        })

    } catch (error) {
        console.error(error)
        return Response.json(
            { error: "Erro interno" },
            { status: 500 }
        )
    }
}

export async function GET() {
    try {
        const cookieStore = await cookies()
        const token = cookieStore.get("token")?.value

        if (!token) {
            return Response.json({ user: null }, { status: 401 })
        }

        const payload = verifyToken(token)

        if (!payload) {
            return Response.json({ user: null }, { status: 401 })
        }

        const user = await prisma.user.findUnique({
            where: {
                id: payload.userId
            },
            include: {
                endereco: true
            }
        })

        if (!user) {
            return Response.json({ user: null }, { status: 401 })
        }

        return Response.json({
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            imagem: user.imagem,
            endereco: user.endereco,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })
    } catch (error) {
        return Response.json({ user: null }, { status: 500 })
    }
}