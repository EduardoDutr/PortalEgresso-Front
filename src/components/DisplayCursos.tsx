import { ContainerForCards } from "./ContainerForCards";
import { Curso } from "../types/Curso";
import { useEffect, useState } from "react";
import api from "../api";

type DisplayCursoProps = {
    reload: object
  };

function DisplayCursos({ reload }: DisplayCursoProps) {

    const [cursos, setCursos] = useState<Curso[]>([]);

    const [loading, setLoading] = useState<string>('');
    const [error, setError] = useState<string>('');

    async function handleDelete(id: number) {
        try {
            await api.delete("/curso/deletar/" + id);
            setCursos(prevCursos => prevCursos.filter(curso => curso.id !== id));
        } catch (err) {
            setError("Credenciais inválidas. Tente novamente." + err);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading("Buscando Cursos...");
            try {
                const response = await api.get("/curso/obterTodos");
                setCursos(response.data);
            } catch (err: any) {
                const errorMessage = err?.response?.data?.message || err?.message || "Erro desconhecido";
                setError(errorMessage);
            } finally {
                setLoading("");
            }
        };

        fetchData();
    }, [setLoading, setError, reload]);

    return cursos.length > 0 ? (
        <ContainerForCards>
            {cursos.map(curso =>
                <div className="bg-background-ultra-light shadow-md rounded-2xl p-5 overflow-hidden" title={curso.nivel}>
                    <div
                        className="w-56 h-24 bg-element-primary rounded-lg border border-element-delimiter p-5 flex flex-row gap-8 items-center shadow-lg hover:cursor-pointer"
                    >
                        {/* <div className="p-5 rounded-xl h-24 w-24 border"></div> */}
                        <div className="flex flex-col gap-2 text-left w-full">
                            <div className="text-lg">
                                {curso.nome}
                            </div>
                            <div>
                                {curso.nivel}
                            </div>
                        </div>
                        <img
                            className="hover:cursor-pointer w-6"
                            onClick={() => handleDelete(curso.id)}
                            src="/trash.png"
                        />
                    </div>
                </div>
            )}
            {loading}
            {error && <p>Ocorreu um erro: {error}</p>}
        </ContainerForCards>
    ) : null
}

export { DisplayCursos };