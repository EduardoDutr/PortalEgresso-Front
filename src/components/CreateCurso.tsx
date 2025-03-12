import { useState } from "react";
import api from "../api";

type CreateCursoProps = {
    setReload: React.Dispatch<React.SetStateAction<object>>;
  };

function CreateCurso({ setReload }: CreateCursoProps) {
    const [nome, setNome] = useState<string>("");
    const [nivel, setNivel] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!nome || !nivel) {
            setError("Preencha todos os campos.");
            return;
        }

        try {
            await api.post("curso/salvar", { nome, nivel });
            setReload({});
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Erro ao criar o curso. Tente novamente.");
        }
    };

    return (
        <div className="flex flex-col gap-8 items-center justify-center mt-5">
            <h1 className="text-black">Criar Novo Curso</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <label className="text-gray-700" htmlFor="nome">
                    Nome do Curso
                </label>
                <input
                    id="nome"
                    type="text"
                    placeholder="Digite o nome do curso"
                    className="p-2 rounded-md h-11 w-72 border"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />

                <label className="text-gray-700" htmlFor="nivel">
                    Nível do Curso
                </label>
                <input
                    id="nivel"
                    type="text"
                    placeholder="Digite o nível do curso"
                    className="p-2 rounded-md h-11 w-72 border"
                    value={nivel}
                    onChange={(e) => setNivel(e.target.value)}
                />

                <button
                    type="submit"
                    className="bg-[#646cff] text-white p-2 rounded-md h-11 w-72 my-2"
                >
                    Criar Curso
                </button>

                {error && <p className="text-red-500">{error}</p>}
            </form>
        </div>
    )
}

export { CreateCurso };