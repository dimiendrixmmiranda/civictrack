import FormDenuncia from "@/app/criarDenuncia/FormDenuncia";

export default function NovaDenuncia() {
    return (
        <div className="bg-cinza my-1 mr-3 p-4">
            <div className="p-2 2xl:h-[700px] 2xl:overflow-y-scroll barra">
                <h2 className="font-bebas text-4xl">Nova denuncia</h2>
                <FormDenuncia />
            </div>
        </div>
    )
}