'use client'
import AjudarCidade from "@/components/ajudarCidade/AjudarCidade";
import Dados from "@/components/dados/Dados";
import Funcionamento from "@/components/funcionamento/Funcionamento";
import Grafico from "@/components/grafico/Grafico";
import Home from "@/components/home/Home";
import TabelaDeProblemas from "@/components/tabelaDeProblemas/TabelaDeProblemas";
import Template from "@/components/template/Template";
import { useDenuncias } from "@/hooks/useDenuncias";

export default function Page() {
	const { denuncias } = useDenuncias()

	const categoriasFixas = [
		"infraestrutura",
		"iluminacao",
		"limpeza",
		"meio-ambiente",
		"drenagem",
		"seguranca",
		"outros",
	]
	
	const categorias = categoriasFixas.map((categoria) => {

		const quantidade = denuncias.filter(
			denuncia => denuncia.categoria === categoria
		).length

		return {
			name: categoria,
			value: quantidade
		}
	})

	console.log(denuncias)

	return (
		<Template>
			<Home />
			<Dados />
			<div className="bg-black">
				<div className="max-w-[1440px] p-4 mx-auto flex flex-col gap-6 pb-10 2xl:grid 2xl:grid-cols-[900px_1fr] 2xl:grid-rows-[300px_1fr] 2xl:gap-6">
					<TabelaDeProblemas qtdeDeLinhas={5} denuncias={denuncias} altura="h-[435px]"/>
					<Grafico categorias={categorias}/>
					<Funcionamento />
					<AjudarCidade />
				</div>
			</div>
		</Template>
	)
}

// Conta dmmiranda