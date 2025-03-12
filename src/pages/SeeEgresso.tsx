import { ContainerForEgressoInfo } from "../components/ContainerForEgressoInfo";
import Layout from "../Layout";
import { useLocation } from 'react-router-dom';

function SeeEgresso() {
    const location = useLocation();
    const egresso = location.state;
    
    return (
        <Layout>
            <ContainerForEgressoInfo {...egresso}/>
        </Layout>
    )
}

export default SeeEgresso;