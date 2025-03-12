import { Egresso } from "../types/Egresso";
import { useAuth } from "./AuthContext";
import api from "../api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ContainerForCargos } from "./ContainerForCargos";
import { ContainerForDepoimentos } from "./ContainerForDepoimentos";

function ContainerForEgressoInfo(egresso: Egresso) {

    const { isAuthenticated } = useAuth();

    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();

    async function handleDelete() {
        try {
            await api.delete("egresso/deletar/" + egresso.id);
            navigate("/");
        } catch (err) {
            setError("Credenciais inválidas. Tente novamente." + err);
        }
    }

    return (
        <div
            style={{
                width: '1000px'
            }}
            className="relative p-10 border border-element-delimiter rounded-xl bg-background-header shadow-lg">
            {isAuthenticated && (
                <>
                    <div className="flex flex-col">
                        <img
                            className="absolute top-5 left-5 p-2 hover:cursor-pointer"
                            onClick={handleDelete}
                            title="Apagar egresso"
                            src="/trash.png"
                        />
                        <img
                            className="absolute top-5 left-20 p-2 hover:cursor-pointer"
                            onClick={() => navigate("/associarEgressoCurso", { state: egresso })}
                            title="Associar egresso a curso"
                            src="/assossiate.png"
                        />
                        <img
                            className="absolute top-5 left-36 p-2 hover:cursor-pointer"
                            onClick={() => navigate("/associarEgressoCargo", { state: egresso })}
                            title="Criar novo cargo para este egresso"
                            src="/cargo.png"
                        />
                        <img
                            className="absolute top-5 left-52 p-2 hover:cursor-pointer"
                            onClick={() => navigate("/adicionarDepoimento", { state: egresso })}
                            title="Adicionar depoimento"
                            src="/plus.png"
                        />
                    </div>
                    {error && <p className="text-red-500">{error}</p>}
                </>
            )}
            <div className="p-5 rounded-xl h-64 w-64 border mx-auto"></div>
            <div className="flex flex-col gap-2 text-left w-full py-2">
                <div className="text-3xl mx-auto py-2">
                    {egresso.nome}
                </div>
                <p
                    style={{ whiteSpace: 'normal', wordWrap: 'break-word' }}
                    className="border rounded-xl p-2 min-h-20 bg-[#C5C3C6] text-black"
                >
                    {egresso.descricao}
                </p>
                <div className="">
                    <div className="text-center text-2xl">
                        Contatos
                    </div>
                    <div className="flex flex-col gap-7 text-lg">
                        <div
                            title="Copiar para area de transferencia"
                            className="flex items-center justify-between hover:cursor-pointer"
                            onClick={() => { navigator.clipboard.writeText(egresso.email) }}
                        >
                            Email: {egresso.email}
                        </div>
                        <a
                            className="flex items-center justify-between hover:cursor-pointer no-underline"
                            href={`https://www.linkedin.com/in/${egresso.linkedin}/`}
                            target="_blank"
                        >
                            LinkedIn: {egresso.linkedin}
                        </a>
                        <a
                            className="flex items-center justify-between hover:cursor-pointer no-underline"
                            href={`https://www.instagram.com/${egresso.instagram}/`}
                            target="_blank"
                        >
                            Instagram: @{egresso.instagram}
                        </a>
                    </div>
                </div>
                <ContainerForCargos egressoId={egresso.id} />
                <ContainerForDepoimentos egressoId={egresso.id} />
            </div>
        </div>
    )
}

export { ContainerForEgressoInfo };