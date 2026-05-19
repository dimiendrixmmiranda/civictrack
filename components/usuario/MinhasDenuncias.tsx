import TabelaDeProblemas from "../tabelaDeProblemas/TabelaDeProblemas";
import { useMinhasDenuncias } from "@/hooks/useDenunciasMe";

export default function MinhasDenuncias() {
    const { denuncias } = useMinhasDenuncias()
    return (
        <div className="bg-cinza pl-8">
            <div className="bg-cinza p-4 min-h-full">
                <h2 className="font-bebas text-4xl">Lista de todas as suas denúncias:</h2>
                <div className="bg-cinza">
                    <TabelaDeProblemas altura="h-full" denuncias={denuncias} qtdeDeLinhas={denuncias.length} />
                </div>
            </div>
        </div>
    )
}