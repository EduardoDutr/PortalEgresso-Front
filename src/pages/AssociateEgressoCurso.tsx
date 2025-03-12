import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "../Layout";
import api from "../api";
import { Egresso } from "../types/Egresso";
import { Curso } from "../types/Curso";

function AssociateEgressoCurso() {
    const location = useLocation();
    const egresso = location.state;

    const [egressos, setEgressos] = useState<Egresso[]>([]);
    const [cursos, setCursos] = useState<Curso[]>([]);
    const [selectedEgresso, setSelectedEgresso] = useState<number>(egresso.id);
    const [selectedCurso, setSelectedCurso] = useState<string>("");
    const [anoInicio, setAnoInicio] = useState<string>(""); // Novo estado para anoInicio
    const [anoFim, setAnoFim] = useState<string>(""); // Novo estado para anoFim
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const egressosRes = await api.get("egresso/obterTodos");
                const cursosRes = await api.get("curso/obterTodos");
                setEgressos(egressosRes.data);
                setCursos(cursosRes.data);
            } catch (err) {
                setError("Erro ao buscar dados. Tente novamente.");
            }
        };
        fetchData();
    }, []);

    const handleSubmit = async () => {
        if (!selectedEgresso || !selectedCurso || !anoInicio || !anoFim) {
            setError("Preencha todos os campos.");
            return;
        } else if( anoInicio > anoFim){
            setError("Valores de ano de inicio e ano de fim sao invalidos")
            return;
        }
        try {
            await api.post("/curso/associar", {
                egressoId: selectedEgresso,
                cursoId: selectedCurso,
                anoInicio: anoInicio,
                anoFim: anoFim,
            });
            navigate("/");
        } catch (err) {
            setError("Erro ao associar egresso ao curso. Tente novamente.");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8 items-center justify-center mt-5 text-black">
                <h1>Associar Egresso a Curso</h1>
                <div className="flex flex-col gap-4">
                    <label className="text-black" htmlFor="egresso">
                        Selecione um Egresso
                    </label>
                    <select
                        className="p-2 rounded-md h-11 w-72 border bg-white"
                        value={selectedEgresso}
                        // @ts-ignore
                        onChange={(e) => setSelectedEgresso(e.target.value)}
                    >
                        <option value="">Selecione um egresso...</option>
                        {egressos.map((egresso) => (
                            <option key={egresso.id} value={egresso.id}>
                                {egresso.nome}
                            </option>
                        ))}
                    </select>

                    <label className="text-black" htmlFor="curso">
                        Selecione um Curso
                    </label>

                    <select
                        className="p-2 rounded-md h-11 w-72 border bg-white"
                        value={selectedCurso}
                        onChange={(e) => setSelectedCurso(e.target.value)}
                    >
                        <option value="">Selecione um curso...</option>
                        {cursos.map((curso) => (
                            <option key={curso.id} value={curso.id}>
                                {curso.nome}
                            </option>
                        ))}
                    </select>

                    <label className="text-black" htmlFor="anoInicio">
                        Ano de Início
                    </label>
                    <input
                        type="number"
                        placeholder="AAAA"
                        min="2000"
                        max="2100"
                        className="p-2 rounded-md h-11 w-72 border"
                        value={anoInicio}
                        onChange={(e) => setAnoInicio(e.target.value)}
                    />
                    <label className="text-black" htmlFor="anoFim">
                        Ano de Fim
                    </label>
                    <input
                        type="number"
                        placeholder="AAAA"
                        min="2000"
                        max="2100"
                        className="p-2 rounded-md h-11 w-72 border"
                        value={anoFim}
                        onChange={(e) => setAnoFim(e.target.value)}
                    />

                    <button
                        className="bg-[#646cff] text-white p-2 rounded-md h-11 w-72"
                        onClick={handleSubmit}
                    >
                        Associar
                    </button>
                </div>
                {error && <p className="text-red-500">{error}</p>}
            </div>
        </Layout>
    );
}

export default AssociateEgressoCurso;
