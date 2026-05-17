import Template from "@/components/template/Template";
import FormDenuncia from "./FormDenuncia";
// aqui
export default function Page() {
    return (
        <Template>
            <div className="bg-zinc-200 min-h-screen text-black p-4">

                <h2 className="text-3xl font-bold mb-6 text-center">
                    Denuncie um problema!
                </h2>
                <FormDenuncia />
            </div>
        </Template>
    )
}