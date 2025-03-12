import { useState } from "react";
import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { Egresso } from "../types/Egresso";
import Layout from "../Layout";

function CreateDepoimento() {
    const location = useLocation();
    const egresso: Egresso = location.state;

    const navigate = useNavigate();

    const [texto, setTexto] = useState<string>("");
    const [data, setData] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!texto || !data) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            const result = await api.post("/depoimento/salvar", {
                texto: texto,
                data: data,
                egressoId: egresso.id
            });
            console.log(result)
            navigate("/visualizarEgresso", { state: egresso });
        } catch (err) {
            setError("Erro ao criar o depoimento. Tente novamente.");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8 items-center justify-center mt-5 text-black">
                <h1>Adicionar Depoimento</h1>
                <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                    <label className="text-gray-700" htmlFor="texto">
                        Texto do Depoimento
                    </label>
                    <textarea
                        id="texto"
                        placeholder="Digite o depoimento"
                        className="p-2 rounded-md h-24 w-72 border"
                        value={texto}
                        onChange={(e) => setTexto(e.target.value)}
                    />

                    <label className="text-gray-700" htmlFor="data">
                        Data do Depoimento
                    </label>
                    <input
                        id="data"
                        type="date"
                        className="p-2 rounded-md h-11 w-72 border"
                        value={data}
                        onChange={(e) => setData(e.target.value)}
                    />

                    <button
                        type="submit"
                        className="bg-[#646cff] text-white p-2 rounded-md h-11 w-72 my-2"
                    >
                        Criar Depoimento
                    </button>

                    {error && <p className="text-red-500">{error}</p>}
                </form>
            </div>
        </Layout>
    );
}

export { CreateDepoimento };
