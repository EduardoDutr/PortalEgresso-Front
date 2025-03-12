import { useEffect, useState } from 'react';
import '../App.css'
import api from '../api';
import { Egresso } from '../types/Egresso';
import Layout from '../Layout';
import { DisplayEgressos } from '../components/DisplayEgressos';

function Home() {

    const [egressosCards, setEgressosCards] = useState<Egresso[]>([]);

    const [loading, setLoading] = useState<string>('');
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchData = async () => {
            setLoading("Buscando Egressos...");
            try {
                const response = await api.get("/egresso/obterTodos");
                setEgressosCards(response.data);
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
            <h1 className='my-5 p-5 bg-element-primary border border-element-delimiter rounded-xl shadow-lg'>Egressos</h1>
            <DisplayEgressos egressosCards={egressosCards}/>
            {loading}
            {error && <p>Ocorreu um erro: {error}</p>}
        </Layout>
    )
}

export default Home;