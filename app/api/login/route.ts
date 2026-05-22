import bcrypt from "bcrypt"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"
import { generateToken } from "@/lib/auth"

export async function POST(req: Request) {
    const { email, password } = await req.json()

    const user = await prisma.user.findUnique({
        where: { email }
    })

    if (user?.deleted) {
        return Response.json(
            { error: "Conta Excluida" },
            { status: 401 }
        )
    }

    if (!user) {
        return Response.json(
            { error: "Credenciais inválidas" },
            { status: 401 }
        )
    }

    const isValid = await bcrypt.compare(password, user.password)

    if (!isValid) {
        return Response.json({ error: "Credenciais inválidas" }, { status: 401 })
    }

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
}