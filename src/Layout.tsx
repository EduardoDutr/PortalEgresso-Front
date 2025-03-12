import './App.css'
import Header from './components/Header';
import { useNavigate } from 'react-router-dom';

import { ReactNode } from "react";
import { useAuth } from './components/AuthContext';

type Props = {
    children?: ReactNode;
};

function Layout({ children }: Props) {
    const navigate = useNavigate();
    const { isAuthenticated, logout } = useAuth();

    return (
        <div className='mt-10 flex flex-col bg-white rounded-md shadow-md  p-5'>
            <Header>
                <img
                    className='p-2 hover:cursor-pointer'
                    onClick={() => navigate("/")}
                    src='/home.png'
                    title='Home'
                />
                <img
                    className='p-2 hover:cursor-pointer'
                    onClick={() => navigate("/buscarEgressos")}
                    src='/search.png'
                    title='Buscar egressos'
                />
                <img
                    className='p-2 hover:cursor-pointer'
                    onClick={() => navigate("/createEgresso")}
                    src='/plus.png'
                    title='Criar novo egresso'
                />
                <img
                    className='p-2 hover:cursor-pointer'
                    onClick={() => navigate("/oportunidades")}
                    src='/worldwide.png'
                    title='Visualizar oportunidades'
                />
                <img
                    className='p-2 hover:cursor-pointer'
                    onClick={() => navigate("/criarOportunidade")}
                    src='/world-map.png'
                    title='Adicionar oportunidade'
                />
                {!isAuthenticated ?
                    <img
                        className='p-2 hover:cursor-pointer'
                        onClick={() => navigate("/login")}
                        src='/login.png'
                        title='Fazer login'
                    />
                    :
                    <>
                        <img
                            className='p-2 hover:cursor-pointer'
                            onClick={() => {
                                logout()
                                navigate("/")
                            }}
                            src='/logout.png'
                            title='Encerrar sessao'
                        />
                        <img
                            className='p-2 hover:cursor-pointer'
                            onClick={() => navigate("/createCurso")}
                            src='/course.png'
                            title='Criar curso'
                        />
                        <img
                            className='p-2 hover:cursor-pointer'
                            onClick={() => navigate("/pendencias")}
                            src='/danger.png'
                            title='pendencias'
                        />
                    </>

                }
            </Header>
            {children}
        </div>
    )
}

export default Layout;