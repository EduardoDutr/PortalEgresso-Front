import { useEffect, useState } from 'react';
import '../App.css'
import api from '../api';

import Layout from '../Layout';
import { Oportunidade } from '../types/Oportunidade';

function OportunitiesPanel() {

    const [oportunidadesCards, setOportunidadesCards] = useState<Oportunidade[]>([]);

    const [loading, setLoading] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading("Buscando Oportunidades...");
            try {
                const response = await api.get("oportunidade");
                setOportunidadesCards(response.data);
            } catch (err: any) {
                const errorMessage = err?.response?.data?.message || err?.message || "Erro desconhecido";
                setError(errorMessage);
            } finally {
                setLoading("");
            }
        };

        fetchData();
    }, [setLoading, setError]);

    return (
        <Layout>
            <h1 className='my-5 p-5 bg-element-primary border border-element-delimiter rounded-xl shadow-lg'>Painel de Oportunidades</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {oportunidadesCards.map((oportunidade) => (
                    <div key={oportunidade.id} className="p-4 bg-white rounded-lg shadow-md">
                        <h3 className="text-xl font-bold text-black">{oportunidade.titulo}</h3>
                        <p className="text-gray-600">{oportunidade.descricao}</p>
                        <a href={oportunidade.url} target="_blank" rel="noopener noreferrer" className="text-blue-500">Saiba mais</a>
                    </div>
                ))}
            </div>
            {loading && <p>{loading}</p>}
            {error && <p>Ocorreu um erro: {error}</p>}
        </Layout>
    )
}

export default OportunitiesPanel;
