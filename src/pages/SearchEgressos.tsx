import { useState, useEffect, useCallback } from "react";
import Layout from "../Layout";
import api from "../api";
import { Curso } from "../types/Curso";
import { DisplayEgressos } from "../components/DisplayEgressos";
import { Egresso } from "../types/Egresso";

function SearchEgressos() {
    const [currentSearchType, setCurrentSearchType] = useState<string | null>(null);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [anoSearch, setAnoSearch] = useState<string>("");
    const [selectedCurso, setSelectedCurso] = useState<string | null>(null);

    const [egressosCards, setEgressosCards] = useState<Egresso[]>([]);

    const getCursos = useCallback(async () => {
        try {
            const { data } = await api.get("curso/obterTodos");
            setCursos(data);
        } catch (error) {
            console.error("Erro ao buscar cursos:", error);
        }
    }, []);

    useEffect(() => {
        if (currentSearchType === "obterPorCursoId" && cursos.length === 0) {
            getCursos();
        }
    }, [currentSearchType, getCursos, cursos.length]);

    const handleSearch = async () => {
        if (!currentSearchType) return;
        const queryParam = currentSearchType === "obterPorAno" ? anoSearch : selectedCurso;
        if (!queryParam) return;

        try {
            const { data } = await api.get(`egresso/${currentSearchType}/${queryParam}`);
            setEgressosCards(data)
        } catch (error) {
            console.error("Erro ao buscar dados:", error);
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8 text-black">
                <h1>Selecione uma opção</h1>
                <div className="flex gap-5 justify-center">
                    <button
                        onClick={() => setCurrentSearchType("obterPorAno")}
                        className={currentSearchType === "obterPorAno" ? "bg-[#DCDCDD] text-black border border-[#646cff] border-2" : ""}
                    >
                        Ano
                    </button>
                    <button
                        onClick={() => setCurrentSearchType("obterPorCursoId")}
                        className={currentSearchType === "obterPorCursoId" ? "bg-[#DCDCDD] text-black border border-[#646cff] border-2" : ""}
                    >
                        Curso
                    </button>
                </div>

                <div className="flex items-center gap-5 justify-center">
                    {currentSearchType && (
                        currentSearchType === "obterPorAno" ? (
                            <input
                                className="p-2 rounded-md h-11 w-36"
                                placeholder="Digite um ano"
                                value={anoSearch}
                                onChange={(e) => setAnoSearch(e.target.value)}
                            />
                        ) : (
                            <select
                                className="p-2 rounded-md h-11 w-36 bg-slate-50"
                                value={selectedCurso || ""}
                                onChange={(e) => setSelectedCurso(e.target.value)}
                            >
                                <option value="">Selecione...</option>
                                {cursos.map((curso) => (
                                    <option key={curso.id} value={curso.id}>
                                        {curso.nome}
                                    </option>
                                ))}
                            </select>
                        )
                    )}

                    <button
                        className={`max-w-36 h-11 ${!currentSearchType ? "cursor-not-allowed" : ""}`}
                        onClick={handleSearch}
                        disabled={!currentSearchType}
                    >
                        Pesquisar
                    </button>
                </div>
                {egressosCards.length > 0 && <DisplayEgressos egressosCards={egressosCards} />}
            </div>
        </Layout>
    );
}

export default SearchEgressos;
