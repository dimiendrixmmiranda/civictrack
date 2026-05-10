import cloudinary from "@/lib/cloudinary"

export async function POST(req: Request) {
    try {
        const formData = await req.formData()

        const file = formData.get("file") as File

        if (!file) {
            return Response.json(
                { error: "Arquivo obrigatório" },
                { status: 400 }
            )
        }

        const bytes = await file.arrayBuffer()

        const buffer = Buffer.from(bytes)

        const base64 = `data:${file.type};base64,${buffer.toString("base64")}`

        const uploadResponse = await cloudinary.uploader.upload(
            base64,
            {
                folder: "civictrack"
            }
        )

        return Response.json({
            url: uploadResponse.secure_url
        })

    } catch (error) {

        console.error(error)

        return Response.json(
            { error: "Erro ao enviar imagem" },
            { status: 500 }
        )
    }
}