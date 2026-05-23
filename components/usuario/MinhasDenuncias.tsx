import TabelaDeProblemas from "../tabelaDeProblemas/TabelaDeProblemas";
import { useMinhasDenuncias } from "@/hooks/useDenunciasMe";

export default function MinhasDenuncias() {
    const { denuncias } = useMinhasDenuncias()
    return (
        <div className="bg-cinza xl:pl-8">
            <div className="bg-cinza p-4 min-h-full flex flex-col gap-4">
                <h2 className="font-bebas text-4xl">Lista de todas as suas denúncias:</h2>
                <div className="bg-cinza">
                    <TabelaDeProblemas altura="h-full xl:min-h-[400px]" denuncias={denuncias} qtdeDeLinhas={denuncias.length} />
                </div>
            </div>
        </div>
    )
}