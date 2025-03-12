import { Cargo } from "../types/Cargo";
import api from "../api";
import { useEffect, useState } from "react";

type ContainerForCargosProps = {
    egressoId: number;
};

function ContainerForCargos({ egressoId }: ContainerForCargosProps) {
    const [cargos, setCargos] = useState<Cargo[]>([]);

    useEffect(() => {
        async function getCargos() {
            try {
                const response = await api.get("cargo/obterPorEgressoId/" + egressoId);
                setCargos(response.data);
            } catch (error) {
                console.error("Erro ao buscar cargos:", error);
            }
        }
        getCargos();
    }, [egressoId]);

    async function handleDelete(cargoId: number) {
        try {
            await api.delete("cargo/deletar/" + cargoId);
            setCargos(prevCargos => prevCargos.filter(cargo => cargo.id !== cargoId));
        } catch (error) {
            console.error("Erro ao deletar cargo:", error);
        }
    }

    return (
        <div className="border rounded-xl p-5">
            <div className="text-center text-2xl">Cargos</div>
            {cargos.map(cargo => (
                <div key={cargo.id} className="flex justify-between border rounded-xl p-5 my-2">
                    <ul>
                        <li>Descrição: {cargo.descricao}</li>
                        <li>Início: {cargo.anoInicio}</li>
                        <li>Fim: {cargo.anoFim}</li>
                    </ul>
                    <div>
                        <img
                            className="p-2 hover:cursor-pointer"
                            onClick={() => handleDelete(cargo.id)}
                            src="/trash.png"
                            alt="Deletar"
                        />
                    </div>
                </div>
            ))}
        </div>
    );
}

export { ContainerForCargos };
