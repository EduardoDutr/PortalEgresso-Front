import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import api from "../api";
import { useAuth } from "../components/AuthContext";

function CreateOportunidade() {
    const { isAuthenticated } = useAuth();

    const [titulo, setTitulo] = useState("");
    const [descricao, setDescricao] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!titulo || !descricao || !url) {
            setError("Título, descrição e URL são obrigatórios.");
            return;
        }

        try {
            await api.post("oportunidade", {
                titulo: titulo,
                descricao: descricao,
                url: url
            });
            navigate("/oportunidades");
        } catch (err) {
            setError("Erro ao criar oportunidade. Tente novamente.");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8 items-center justify-center">
                <h1 className="text-black">Criar Oportunidade</h1>
                {!isAuthenticated && <span className="p-0 text-red-600">Oportunidade precisará ser aprovada</span>}
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="Título"
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                    <textarea
                        className="p-2 rounded-md h-24 w-72 border"
                        placeholder="Descrição"
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="URL"
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                    />
                    <button
                        className="bg-[#646cff] text-white p-2 rounded-md h-11 w-72"
                        onClick={handleSubmit}
                    >
                        Criar
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </Layout>
    );
};

export default CreateOportunidade;