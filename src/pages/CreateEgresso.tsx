import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import api from "../api";
import { useAuth } from "../components/AuthContext";

function CreateEgresso() {
    const { isAuthenticated } = useAuth();

    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [descricao, setDescricao] = useState("");
    const [instagram, setInstagram] = useState("");
    const [linkedin, setLinkedin] = useState("");
    const [curriculo, setCurriculo] = useState("");
    const [foto, setFoto] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        if (!nome || !email || !descricao) {
            setError("Nome, email e descrição são obrigatórios.");
            return;
        }

        try {
            await api.post("egresso/salvar", {
                nome,
                email,
                descricao,
                instagram,
                linkedin,
                curriculo,
                foto,
            });
            navigate("/");
        } catch (err) {
            setError("Erro ao criar egresso. Tente novamente.");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8 items-center justify-center text-black">
                <h1>Criar Egresso</h1>
                {!isAuthenticated && <span className="p-0 text-red-600">Egresso precisara ser aprovado</span>}
                <div className="flex flex-col gap-4">
                    <input
                        type="text"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="Nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                    />
                    <input
                        type="email"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        placeholder="Instagram"
                        value={instagram}
                        onChange={(e) => setInstagram(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="LinkedIn"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="Currículo"
                        value={curriculo}
                        onChange={(e) => setCurriculo(e.target.value)}
                    />
                    <input
                        type="text"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="Foto (URL)"
                        value={foto}
                        onChange={(e) => setFoto(e.target.value)}
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

export default CreateEgresso;
