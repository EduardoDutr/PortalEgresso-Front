import { Depoimento } from "../types/Depoimento";
import api from "../api";
import { useEffect, useState } from "react";

type ContainerForDepoimentosProps = {
    egressoId: number;
};

function ContainerForDepoimentos({ egressoId }: ContainerForDepoimentosProps) {
    const [depoimentos, setDepoimentos] = useState<Depoimento[]>([]);

    useEffect(() => {
        async function getDepoimentos() {
            try {
                const response = await api.get("depoimento/obterPorEgresso/" + egressoId);
                setDepoimentos(response.data);
            } catch (error) {
                console.error("Erro ao buscar depoimentos:", error);
            }
        }
        getDepoimentos();
    }, [egressoId]); // Agora recarrega se o ID do egresso mudar

    async function handleDelete(depoimentoId: number) {
        try {
            await api.delete("/depoimento/deletar/" + depoimentoId);
            setDepoimentos(prevDepoimentos => prevDepoimentos.filter(dep => dep.id !== depoimentoId));
        } catch (error) {
            console.error("Erro ao deletar depoimento:", error);
        }
    }

    return (
        <div className="border rounded-xl p-5">
            <div className="text-center text-2xl">Depoimentos</div>
            {depoimentos.map(depoimento => (
                <div key={depoimento.id} className="flex justify-between border rounded-xl p-5 my-2">
                    <div>
                        <p>{depoimento.texto}</p>
                        <span>{new Date(depoimento.data).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div>
                        <img
                            className="p-2 hover:cursor-pointer"
                            onClick={() => handleDelete(depoimento.id)}
                            src="/trash.png"
                            alt="Deletar"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export { ContainerForDepoimentos };
