import Link from "next/link";
import { GrMapLocation } from "react-icons/gr";

export default function AjudarCidade() {
    return (
        <section className="col-span-2 p-4 bg-cinza rounded-xl">
            <div className="flex p-4 gap-4 md:grid md:grid-cols-[60px_1fr_140px] lg:grid-cols-[60px_1fr_270px]">
                <div className="text-6xl">
                    <GrMapLocation />
                </div>
                <div className="hidden md:flex flex-col my-auto">
                    <h3 className="font-bebas text-2xl lg:text-3xl">Juntos, podemos construir uma cidade melhor para todos.</h3>
                    <span>Sua denúncia faz a diferença!</span>
                </div>
                <div className="flex w-full items-center justify-center">
                    <Link href={'/criarDenuncia'} className="text-verde-claro border-2 border-verde-claro p-2 rounded-2xl w-full text-center max-w-[250px] whitespace-nowrap flex justify-center gap-1 lg:max-w-auto hover:bg-verde hover:text-white transition-all duration-300">Quero ajudar <b className="hidden sm:block md:hidden lg:block">minha cidade!</b></Link>
                </div>
            </div>
        </section>
    )
}