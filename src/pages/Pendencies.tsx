import { useEffect, useState } from "react";
import Layout from "../Layout";
import api from "../api";

type Egresso = {
    id: number;
    nome: string;
};

type Oportunidade = {
    id: number;
    titulo: string;
};

function Pendencies() {
    const [egressos, setEgressos] = useState<Egresso[]>([]);
    const [oportunidades, setOportunidades] = useState<Oportunidade[]>([]);

    useEffect(() => {
        const fetchEgressos = async () => {
            try {
                const response = await api.get("/egresso/pendentes");
                setEgressos(response.data);
            } catch (err: any) {
                console.error("Erro ao buscar egressos:", err?.response?.data?.message || err?.message || "Erro desconhecido");
            }
        };

        const fetchOportunidades = async () => {
            try {
                const response = await api.get("/oportunidade/pendentes");
                setOportunidades(response.data);
            } catch (err: any) {
                console.error("Erro ao buscar oportunidades:", err?.response?.data?.message || err?.message || "Erro desconhecido");
            }
        };

        fetchEgressos();
        fetchOportunidades();
    }, []);

    async function handleRejectionEgresso(egressoId: number) {
        try {
            await api.put("/egresso/" + egressoId + "/REJECTED");
            setEgressos(prevEgressos => prevEgressos.filter(egresso => egresso.id !== egressoId));
        } catch (error) {
            console.error("Erro ao rejeitar egresso:", error);
        }
    }

    async function handleApprovalEgresso(egressoId: number) {
        try {
            await api.put("/egresso/" + egressoId + "/ACTIVE");
            setEgressos(prevEgressos => prevEgressos.filter(egresso => egresso.id !== egressoId));
        } catch (error) {
            console.error("Erro ao aprovar egresso:", error);
        }
    }

    async function handleRejectionOportunidade(oportunidadeId: number) {
        try {
            await api.put("/oportunidade/" + oportunidadeId + "/REJECTED");
            setOportunidades(prevOportunidades => prevOportunidades.filter(oportunidade => oportunidade.id !== oportunidadeId));
        } catch (error) {
            console.error("Erro ao rejeitar oportunidade:", error);
        }
    }

    async function handleApprovalOportunidade(oportunidadeId: number) {
        try {
            await api.put("/oportunidade/" + oportunidadeId + "/ACTIVE");
            setOportunidades(prevOportunidades => prevOportunidades.filter(oportunidade => oportunidade.id !== oportunidadeId));
        } catch (error) {
            console.error("Erro ao aprovar oportunidade:", error);
        }
    }

    return (
        <Layout>
            <h1 className='my-5 p-5 bg-element-primary border border-element-delimiter rounded-xl shadow-lg'>Pendências</h1>

            <h2 className='mt-10 my-5 p-5 bg-element-primary border border-element-delimiter rounded-xl shadow-lg'>Egressos Pendentes</h2>
            
            <div style={{ width: "600px" }} className="flex flex-col gap-3">
                {egressos.map(egresso => (
                    <div key={egresso.id} className="flex justify-between p-3 text-black bg-slate-500 rounded-lg w-full">
                        <p>{egresso.nome}</p>
                        <div className="flex gap-5">
                            <img
                                className="p-2 w-[32px] hover:cursor-pointer"
                                onClick={() => handleRejectionEgresso(egresso.id)}
                                src="/trash.png"
                                alt="Rejeitar"
                            />
                            <img
                                className="p-2 w-[34px] hover:cursor-pointer"
                                onClick={() => handleApprovalEgresso(egresso.id)}
                                src="/check.png"
                                alt="Aprovar"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <h2 className='mt-10 my-5 p-5 bg-element-primary border border-element-delimiter rounded-xl shadow-lg'>Oportunidades Pendentes</h2>
            
            <div style={{ width: "600px" }} className="flex flex-col gap-3">
                {oportunidades.map(oportunidade => (
                    <div key={oportunidade.id} className="flex justify-between p-3 text-black bg-slate-500 rounded-lg w-full">
                        <p>{oportunidade.titulo}</p>
                        <div className="flex gap-5">
                            <img
                                className="p-2 w-[32px] hover:cursor-pointer"
                                onClick={() => handleRejectionOportunidade(oportunidade.id)}
                                src="/trash.png"
                                alt="Rejeitar"
                            />
                            <img
                                className="p-2 w-[34px] hover:cursor-pointer"
                                onClick={() => handleApprovalOportunidade(oportunidade.id)}
                                src="/check.png"
                                alt="Aprovar"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
}

export default Pendencies;
