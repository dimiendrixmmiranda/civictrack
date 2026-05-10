import Rodape from "./footer/Rodape"
import Cabecalho from "./header/Cabecalho"

interface TemplateProps {
    children: React.ReactNode
}

export default function Template({ children }: TemplateProps) {
    return (
        <>
            <Cabecalho />
            <main>
                {children}
            </main>
            <Rodape />
        </>
    )
}