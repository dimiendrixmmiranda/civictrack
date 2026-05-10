import AjudarCidade from "@/components/ajudarCidade/AjudarCidade";
import Dados from "@/components/dados/Dados";
import Funcionamento from "@/components/funcionamento/Funcionamento";
import Grafico from "@/components/grafico/Grafico";
import Home from "@/components/home/Home";
import TabelaDeProblemas from "@/components/tabelaDeProblemas/TabelaDeProblemas";
import Template from "@/components/template/Template";

export default function Page() {
	return (
		<Template>
			<Home />
			<Dados />
			<div className="bg-black">
				<div className="max-w-[1440px] p-4 mx-auto 2xl:grid 2xl:grid-cols-[900px_1fr] 2xl:grid-rows-[300px_1fr] 2xl:gap-6">
					<TabelaDeProblemas />
					<Grafico />
					<Funcionamento />
					<AjudarCidade />
				</div>
			</div>
		</Template>
	)
}