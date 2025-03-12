import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../Layout";
import api from "../api";
import { useAuth } from "../components/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async () => {
        try {
            const encodedCredentials = btoa(`${email}:${password}`);

            const { data } = await api.post("/authenticate", {}, {
                headers: {
                    Authorization: `Basic ${encodedCredentials}`
                }
            });
            console.log(data)
            localStorage.setItem("token", data);

            login();
            navigate("/");
        } catch (err) {
            console.log(err);
            // @ts-ignore
            setError("Credenciais inválidas. Tente novamente.");
        }
    };

    return (
        <Layout>
            <div className="flex flex-col gap-8 items-center justify-center mt-10 text-black">
                <h1>Login</h1>
                <div className="flex flex-col gap-4">
                    <input
                        type="email"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="Digite seu e-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        className="p-2 rounded-md h-11 w-72 border"
                        placeholder="Digite sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button
                        className="bg-[#646cff] text-white p-2 rounded-md h-11 w-72"
                        onClick={handleLogin}
                    >
                        Entrar
                    </button>
                    {error && <p className="text-red-500">{error}</p>}
                </div>
            </div>
        </Layout>
    );
}

export default Login;