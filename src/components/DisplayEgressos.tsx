import { useNavigate } from "react-router-dom";
import { Egresso } from "../types/Egresso";
import { ContainerForCards } from "./ContainerForCards";
import { EgressoCard } from "./EgressoCard";

type DisplayEgressosProps = {
    egressosCards: Egresso[];
};

function DisplayEgressos({egressosCards}: DisplayEgressosProps) {

    const navigate = useNavigate();

    return (
        <ContainerForCards>
            {egressosCards.map(egresso =>
                <EgressoCard
                    key={egresso.id}
                    nome={egresso.nome}
                    email={egresso.email}
                    descricao={egresso.descricao}
                    onClick={() => navigate("/visualizarEgresso", { state: egresso })}
                />
            )}
        </ContainerForCards>
    )
}

export { DisplayEgressos };