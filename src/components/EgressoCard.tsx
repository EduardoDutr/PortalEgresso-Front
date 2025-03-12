interface EgressoCardProps {
    nome: string
    email: string,
    descricao: string,
    onClick: () => void;
}

function EgressoCard({ nome, email, descricao, onClick }: EgressoCardProps) {
    return (
        <div className="bg-background-ultra-light shadow-md rounded-2xl p-5">
            <div
                onClick={onClick}
                title="Clique para ver detalhes"
                className="w-52 h-80 bg-element-primary rounded-lg border border-element-delimiter p-5 flex flex-col gap-8 items-center shadow-lg hover:cursor-pointer"
            >
                <div className="p-5 rounded-xl h-24 w-24 border"></div>
                <div className="flex flex-col gap-2 text-left w-full">
                    <div>
                        {nome}
                    </div>
                    <div className="flex items-center justify-between ">
                        {email}
                    </div>
                    <div className="border rounded-xl p-2 h-20 text-clip overflow-hidden">
                        {descricao}
                    </div>
                </div>
            </div>
        </div>

    )
}

export { EgressoCard };