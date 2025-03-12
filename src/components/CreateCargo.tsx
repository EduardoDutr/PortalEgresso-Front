import { useState } from "react";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { Egresso } from "../types/Egresso";
import Layout from "../Layout";

function CreateCargo() {
    const location = useLocation();
    const egresso: Egresso = location.state;

    const navigate = useNavigate();

    const [descricao, setDescricao] = useState<string>("");
    const [local, setLocal] = useState<string>("");
    const [anoInicio, setAnoInicio] = useState<string>("");
    const [anoFim, setAnoFim] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!descricao || !local || !anoInicio || !anoFim) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            await api.post("/cargo/salvar", {
                descricao: descricao,
                local: local,
                anoInicio: anoInicio,
                anoFim: anoFim,
                egressoId: egresso.id
            });
            navigate("/visualizarEgresso", { state: egresso })
        } catch (err) {
            setError("Erro ao criar o cargo. Tente novamente.");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8 items-center justify-center mt-5">
                <h1 className="text-black">Criar Novo Cargo</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="text-gray-700" htmlFor="descricao">
                        Descrição do Cargo
                    </label>
                    <input
                        id="descricao"
                        type="text"
                        placeholder="Digite a descrição do cargo"
                        className="p-2 rounded-md h-11 w-72 border"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />

                    <label className="text-gray-700" htmlFor="local">
                        Local do Cargo
                    </label>
                    <input
                        id="local"
                        type="text"
                        placeholder="Digite o local do cargo"
                        className="p-2 rounded-md h-11 w-72 border"
                        value={local}
                        onChange={(e) => setLocal(e.target.value)}
                    />

                    <label className="text-gray-700" htmlFor="anoInicio">
                        Ano de Início
                    </label>
                    <input
                        id="anoInicio"
                        type="text"
                        placeholder="Digite o ano de início"
                        className="p-2 rounded-md h-11 w-72 border"
                        value={anoInicio}
                        onChange={(e) => setAnoInicio(e.target.value)}
                    />

                    <label className="text-gray-700" htmlFor="anoFim">
                        Ano de Fim
                    </label>
                    <input
                        id="anoFim"
                        type="text"
                        placeholder="Digite o ano de fim"
                        className="p-2 rounded-md h-11 w-72 border"
                        value={anoFim}
                        onChange={(e) => setAnoFim(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-[#646cff] text-white p-2 rounded-md h-11 w-72 my-2"
                    >
                        Criar Cargo
                    </button>

                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </Layout>
    );
}

export { CreateCargo };
