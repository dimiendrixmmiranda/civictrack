import { FaArrowRight, FaClipboardList } from "react-icons/fa"
import { GiBrain } from "react-icons/gi"
import { GoCheckCircleFill } from "react-icons/go"

export default function Funcionamento() {

    const gerarCampo = (numero: string, icone: React.ReactElement, titulo: string, span: string) => {
        return (
            <div className="flex flex-col gap-2 justify-center items-center max-w-[130px]">
                <div className="w-8 h-8 flex justify-center items-center rounded-full bg-verde-claro">
                    <span style={{textShadow: '1px 1px 2px black'}}>{numero}</span>
                </div>
                <div className="text-6xl">
                    {icone}
                </div>
                <div className="flex flex-col justify-center items-center gap-1">
                    <h2 className="font-bebas text-xl leading-5">{titulo}</h2>
                    <span className="text-center leading-4 text-sm">{span}</span>
                </div>
            </div>
        )
    }
    return (
        <div className="2xl:col-start-2 2xl:col-end-3 2xl:row-start-2 2xl:row-end-3 bg-cinza rounded-xl p-4 flex flex-col gap-2">
            <h2 className="text-white font-bebas text-3xl">
                Como Funciona?
            </h2>
            <div className="grid grid-cols-[1fr_20px_1fr_20px_1fr]">
                {gerarCampo('1', <FaClipboardList />, 'Registre', 'Crie uma denuncia de forma simples')}
                <div className="flex justify-center items-center text-xl">
                    <FaArrowRight />
                </div>
                {gerarCampo('2', <GiBrain />, 'Análise', 'Sistema calcula risco, gravidade e prioridade')}
                <div className="flex justify-center items-center text-xl">
                    <FaArrowRight />
                </div>
                {gerarCampo('3', <GoCheckCircleFill />, 'Resolução', 'Acompanhe o progresso até a solução!')}
            </div>
        </div>
    )
}